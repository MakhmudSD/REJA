console.log("Let's start the project");
const express = require('express');
const app = express();

// MongoDB connected
const db = require("./server").db();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", "views");
app.set("view engine", "ejs");

app.post("/create-item", (req, res) => {
    console.log("user entered /create-item")
    console.log(req.body);
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({ reja : new_reja}, (err, data) => {
        res.json(data.ops[0]);
    })
});

app.get("/author", (req, res) => {
    res.render("author", { user: user });
});

app.get("/", function (req, res) {
    console.log("user entered /")
    db.collection("plans")
    .find()
    .toArray((err, data) => {
        if(err) {
            console.log("Something went wrong");
            res.end(err);
        }else {
            res.render("reja", { items: data});
        }
    });
});

module.exports = app;
