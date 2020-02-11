//import other files
const db = require("./src/db");
const bcrypt = require("./src/bcrypt");
const ses = require("./src/ses");
const s3 = require("./s3");
const s3Url = "https://s3.amazonaws.com/spicedling/";

// require node packages
const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");

//sockets
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

// use this folder for static files
app.use(express.static("./public"));

//use g-zip to compress file size
app.use(compression());

//use json for axios
app.use(express.json());

// cookies
const cookieSessionMiddleware = cookieSession({
    secret: "V1JYz7qSJMoF",
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// csurf
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// serve js depending on production or developement
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// redis
let redis = require("redis");
let client = redis.createClient({
    host: "localhost",
    port: 6379
});
client.on("error", function(err) {
    console.log("error in redis client:", err);
});

/////////// boilerplate for multer file upload  ////////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

// **************  ROUTES  *******************
app.get("/welcome", (req, res) => {
    console.log("GET /welcome hit");
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("POST /register hit");
    //insert into db
    bcrypt
        .hash(req.body.pass)
        .then(hashedPass => {
            db.addUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPass
            )
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch(() => {
                    res.json({ success: false });
                });
        })
        .catch(() => {
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    console.log("POST /login hit");
    db.getUser(req.body.email)
        .then(data => {
            bcrypt.compare(req.body.pass, data[0].pass).then(match => {
                if (match) {
                    req.session.userId = data[0].id;
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            });
        })
        .catch(() => {
            res.json({ success: false });
        });
});

app.get("/logout", (req, res) => {
    console.log("POST to /logout hit");
    req.session.userId = null;
    res.redirect("/");
});

app.post("/reset/start", (req, res) => {
    console.log("POST /reset/start hit");
    if (!req.session.userId) {
        db.getUser(req.body.email)
            .then(data => {
                let email = data[0].email;
                const secretCode = cryptoRandomString({
                    length: 6
                });
                // REDIS //
                client.setex(email, 600, secretCode, err => {
                    if (err) {
                        return console.log("err in setex redis:", err);
                    }
                    // console.log(`the ${req.body.email} key was successfully set`);

                    client.get(email, err => {
                        if (err) {
                            return console.log("err in get redis:", err);
                        }
                        // console.log(`The value of the  ${req.body.email} key is: ${data}`);
                    });
                });
                // REDIS //

                // EMAIL //
                let recipientEmail = email.replace(/@/g, "_at_");
                let recipient = `hypnotic.chamomile+${recipientEmail}@spicedling.email`;
                let message = `your reset code is: ${secretCode}.`;
                let subject = "your reset code";
                ses.sendEmail(recipient, message, subject);
                // EMAIL //
            })
            .then(() => {
                res.json({ success: true });
            })
            .catch(() => {
                res.json({ success: false });
            });
    }
});

app.post("/reset/verify", (req, res) => {
    console.log("POST /reset/verify hit");
    let email = req.body.email;

    client.get(email, (err, data) => {
        if (err) {
            return console.log("err in get redis:", err);
        }
        if (req.body.code === data) {
            bcrypt.hash(req.body.pass).then(hashedPass => {
                db.updatePass(email, hashedPass).then(() => {
                    res.json({
                        success: true
                    });
                });
            });
        } else {
            res.json({
                success: false
            });
        }
    });
});

app.get("/getUser", (req, res) => {
    db.getUserById(req.session.userId)
        .then(data => {
            res.json(data[0]);
        })
        .catch(err => console.log("err in POST /getUser:", err));
});

app.get("/user/:id.json", (req, res) => {
    console.log("GET /getOtherUser hit");
    db.getUserById(req.params.id)
        .then(data => {
            res.json({ requestedUser: data[0], ownId: req.session.userId });
        })
        .catch(err => console.log("err in POST /getOtherUser", err));
});

app.post(
    "/uploadProfilePic/",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        console.log("POST /uploadProfilePicture hit");
        const imageUrl = s3Url + req.file.filename;
        db.updateProfilePic(imageUrl, req.session.userId)
            .then(() => {
                res.json({ imageUrl });
            })
            .catch(err => {
                console.log("err in POST /uploadProfilePic:", err);
            });
    }
);

app.post("/updateBio", async (req, res) => {
    console.log("POST /updateBio hit");
    try {
        await db.updateBio(req.body.bio, req.session.userId);
        res.sendStatus(200);
    } catch (error) {
        console.log("err in POST /updateBio");
        res.sendStatus(500);
    }
});

app.get("/mostRecentUsers", async (req, res) => {
    console.log("GET /mostRecentUsers hit");
    try {
        const rows = await db.getMostRecentUsers();
        res.json(rows);
    } catch (err) {
        console.log("err in GET /mostRecentUsers:", err);
        res.sendStatus(500);
    }
});

app.get("/getUsersBySearch/:search", async (req, res) => {
    console.log("GET /getUsersBySearch hit");
    try {
        const rows = await db.getUsersBySearch(req.params.search);
        res.json(rows);
    } catch (err) {
        console.log("err in GET /getUsersBySearch:", err);
        res.sendStatus(500);
    }
});

app.get("/friends-status/:id", async (req, res) => {
    console.log("GET /friends-status/:id hit");
    // gets initial status between logged in user and user who's page we're on
    try {
        const rows = await db.checkFriendship(
            req.session.userId,
            req.params.id
        );
        res.json({ rows: rows[0], ownId: req.session.userId });
    } catch (err) {
        console.log("err in GET /friends-status/:id:", err);
        res.sendStatus(500);
    }
});

app.post("/make-friend-request/:id", async (req, res) => {
    console.log("POST /make-friend-request/:id hit");
    // INSERT into friendships. Insert sender_id and recipient_id
    try {
        await db.makeFriendsRequest(req.session.userId, req.params.id);
        console.log("made friends request");
        res.sendStatus(200);
    } catch (err) {
        console.log("err in POST /make-friend-request/:id", err);
        res.sendStatus(500);
    }
});

app.post("/accept-friend-request/:id", async (req, res) => {
    console.log("POST /accept-friend-request/:id hit");
    // UPDATE friendships. It's going to set the accepted column to true for the two users.
    try {
        await db.acceptFriendRequest(req.session.userId, req.params.id);
        console.log("accepted friends request");
        res.sendStatus(200);
    } catch (err) {
        console.log("err in POST /accept-friend-request/:id", err);
        res.sendStatus(500);
    }
});

app.post("/end-friendship/:id", async (req, res) => {
    console.log("POST /end-friendship/:id hit");
    // DELETE the two user's row from friendships
    try {
        await db.endFriendship(req.session.userId, req.params.id);
        console.log("ended friendship");
        res.sendStatus(200);
    } catch (err) {
        console.log("err in POST /end-friendship/:id", err);
        res.sendStatus(500);
    }
});

app.get("/friends-wannabes", async (req, res) => {
    console.log("GET /friends-wannabes hit");
    try {
        const rows = await db.getFriendsAndWannabes(req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("err in GET /friends-wannabes:", err);
        res.sendStatus(500);
    }
});

app.get("/hotornot.json", async (req, res) => {
    console.log("GET /hotornot hit");
    try {
        const rows = await db.getHotOrNot(req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("err in GET /hotornot:", err);
        res.sendStatus(500);
    }
});

// THIS ROUTE LAST!
app.get("*", function(req, res) {
    console.log("GET * hit");
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// server
server.listen(8080, function() {
    console.log("I'm listening.");
});

// server side socket code
io.on("connection", async function(socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    const msgs = await db.getLastChatMessages();
    socket.emit("chatMessages", msgs);
});
