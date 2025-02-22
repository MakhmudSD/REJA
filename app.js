console.log("Let's start the project");
const express = require('express');
const res = require("express/lib/response");
const app = express();

// MongoDB connected
const db = require("./server").db();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", "views");
app.set("view engine", "ejs");

app.post("/create-item", (req, res) => {
    // TODO Db code here!!!
});

app.get("/author", (req, res) => {
    res.render("author", { user: user });
});

app.get("/", function (req, res) {
    res.render("reja");
});

module.exports = app;
