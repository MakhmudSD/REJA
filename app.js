console.log("Let's start the Project");
const express = require("express");
const app = express();

const db = require("./server").db();
const mongodb = require("mongodb");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set("views", "views");
app.set("view engine", "ejs");

app.post("/create-item", (req, res) => {
  console.log("user entered /");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
    res.json(data.ops[0]);
  });
});

app.post("/delete-all", function (req, res) {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "All items are deleted" });
    });
  }
});

// delete-item oper
app.post("/delete-item", function (req, res) {
  console.log("STEP2: user entered Backend");
  const id = req.body.id;
  console.log("STEP3: BACKEND => DATABASE");
  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectId(id) },
    console.log("STEP5: Database Delete Executed => Backend"),
    function (err, data) {
      res.json({ state: "success" });
      console.log("STEP6: Backend => FrontEnd");
    }
  );
});


// edit-item oper
app.post("/edit-item", (req, res) => {
  console.log("STEP2: Frontend => Backend");
  const data = req.body;
  console.log("STEP3: BACKEND => DATABASE");
  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) },
    { $set: { reja: data.new_input } },
    console.log("STEP6: new_input received and updated in DATABASE => Backend"),
    function (err, data) {
      res.json({ state: "success" });
      console.log("STEP7: Backend => FrontEnd");
    }
  );
});

app.get("/", function (req, res) {
  console.log(req.body);
  db.collection("plans")
    .find()
    .toArray(function (err, data) {
      if (err) {
        console.log("Something went wrong");
        res.end(err);
      } else {
        res.render("reja", {items: data});
      }
    });
});

module.exports = app;