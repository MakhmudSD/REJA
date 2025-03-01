console.log("Let's start the project");
const express = require("express");
const app = express();

const db = require("./server").db();
const mongodb = require("mongodb");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("views", "views");
app.set("view engine", "ejs");

app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  console.log(req.body);
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    res.json(data.ops[0]);
  });
});

app.post("/delete-all", (req, res) => {
  console.log("user entered /delete-all");
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "All items are deleted" });
    });
  };
});

app.post("/delete-item", (req, res) => {
    console.log("user entered /delete-item")
    const id = req.body.id
    db.collection("plans").deleteOne({_id: new mongodb.ObjectId(id)}, function(err, data) {
        res.json({state: "success"});
    });
})

app.post("/edit-item", (req, res) => {
    console.log("user entered /edit-item")
    const data = req.body;
    db.collection("plans")
    .findOneAndUpdate(
        { _id: new mongodb.ObjectId(data.id) },
        { $set: { reja: data.new_input } },
        function (err, data) {
        res.json({state: "success"});
    });
});

app.get("/", (req, res) => {
    console.log("user entered /")
    db.collection("plans").find().toArray(function (err, data) {
        if(err) {
            res.end(err);
        } else {
            res.render("reja", {items:data})
        };
    });
});

module.exports = app;