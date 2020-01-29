//import other files
const db = require("./src/db");
const bcrypt = require("./src/bcrypt");

// require node packages
const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

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
                    res.json({ err: true });
                });
        })
        .catch(err => {
            console.log("err in POST /register:", err);
            res.json({ err: true });
            res.sendStatus(500);
        });
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
