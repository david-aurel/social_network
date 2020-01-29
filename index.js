//import other files
const db = require("./src/db");
const bcrypt = require("./src/bcrypt");
const ses = require("./src/ses");

// require node packages
const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");

// use this folder for static files
app.use(express.static("./public"));

//use g-zip to compress file size
app.use(compression());

//use json for axios
app.use(express.json());

// cookies
app.use(
    cookieSession({
        secret: "V1JYz7qSJMoF",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

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

app.get("*", function(req, res) {
    console.log("GET * hit");
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// server
app.listen(8080, function() {
    console.log("I'm listening.");
});
