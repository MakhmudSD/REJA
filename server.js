const http = require("http");
const mongodb = require("mongodb");
<<<<<<< HEAD
require('dotenv').config(); // Load .env BEFORE using process.env

const connectionString = process.env.MONGO_URL;

if (!connectionString) {
  console.error("❌ MONGO_URL is not set in .env");
  process.exit(1);
}

mongodb.MongoClient.connect(
  connectionString,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.error("❌ MongoDB connection error:", err);
    } else {
      console.log("✅ MongoDB is running successfully");
=======

const connectionString = "mongodb+srv://Makhmud:55VlC66b4UTReav3@cluster0.zcqov.mongodb.net/?retryWrites=true&w=majority&Reja=Cluster0";

mongodb.connect(connectionString, {
  useUnifiedTopology: true
},
  (err, client) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      console.log("Mongdodb is running successfully");
>>>>>>> 5ff5c3408d9fdaa1666c0b86cf77b837dd8f7167
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
<<<<<<< HEAD
      const PORT = 3006;
      server.listen(PORT, () => {
        console.log(
          `✅ Server running on http://localhost:${PORT}`
        );
      });
    }
  }
);
=======
      let PORT = 3006;
      server.listen(PORT, (err, data) => {
        console.log(
          `The server is running successfully on ${PORT}, click the link http://localhost:${PORT}`
        );
      });
    }
  });
>>>>>>> 5ff5c3408d9fdaa1666c0b86cf77b837dd8f7167
