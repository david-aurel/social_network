//import other files
import { addUser } from "./db.js";
import { hashPass, compare } from "./bcypt.js";

// require node packages
const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");

// use this folder for static files
app.use(express.static("./public"));

//use g-zip to compress file size
app.use(compression());

//use json for axios
app.use(express.json());

// cookies
app.use(
    cookieSession({
        secret: sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

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
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    //insert into db
    hashPass(req.body.pass).then(hashedPass => {
        addUser(req.body.first, req.body.last, req.body.email, hashedPass)
            .then(({ data }) => {
                req.session.userId = data.id;
            })
            .then(() => res.json({ success: true }))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    });
});

app.get("*", function(req, res) {
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
