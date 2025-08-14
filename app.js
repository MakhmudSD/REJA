console.log("Let's start the Project");

const express = require("express");
const app = express();
const { ObjectId } = require("mongodb");

// Import MongoDB client from server.js
const db = require("./server").db();

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("views", "views");
app.set("view engine", "ejs");

// ----------------------- ROUTES ----------------------- //

// Create new item
app.post("/create-item", (req, res) => {
  const new_reja = req.body.reja;

  if (!new_reja) {
    return res.status(400).json({ error: "Reja cannot be empty" });
  }

  db.collection("plans").insertOne({ reja: new_reja }, (err, result) => {
    if (err) {
      console.error("Insert failed:", err);
      return res.status(500).json({ error: "Insert failed" });
    }
    res.json({ _id: result.insertedId, reja: new_reja });
  });
});

// Delete all items
app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany({}, (err) => {
      if (err) {
        console.error("Delete all failed:", err);
        return res.status(500).json({ error: "Delete all failed" });
      }
      res.json({ state: "All items are deleted" });
    });
  } else {
    res.json({ state: "No action taken" });
  }
});

// Delete single item
app.post("/delete-item", (req, res) => {
  const id = req.body.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  db.collection("plans").deleteOne({ _id: new ObjectId(id) }, (err) => {
    if (err) {
      console.error("Delete item failed:", err);
      return res.status(500).json({ error: "Delete failed" });
    }
    res.json({ state: "success" });
  });
});

// Edit item
app.post("/edit-item", (req, res) => {
  const { id, new_input } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  db.collection("plans").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { reja: new_input } },
    { returnDocument: "after" },
    (err, result) => {
      if (err) {
        console.error("Update failed:", err);
        return res.status(500).json({ error: "Update failed" });
      }
      res.json({ state: "success", updatedItem: result.value });
    }
  );
});

// Get all items
app.get("/", (req, res) => {
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.error("Fetch failed:", err);
        return res.status(500).send(err);
      }
      res.render("reja", { items: data });
    });
});

module.exports = app;
