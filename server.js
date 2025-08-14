const http = require("http");
const mongodb = require("mongodb");
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
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
      const PORT = 3006;
      server.listen(PORT, () => {
        console.log(
          `✅ Server running on http://localhost:${PORT}`
        );
      });
    }
  }
);
