const http = require("http");
const mongodb = require("mongodb");

const connectionString = "mongodb+srv://Makhmud:55VlC66b4UTReav3@cluster0.zcqov.mongodb.net/?retryWrites=true&w=majority&Reja=Cluster0";

mongodb.connect(connectionString, {
  useUnifiedTopology: true
},
  (err, client) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      console.log("Mongdodb is running successfully");
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3006;
      server.listen(PORT, (err, data) => {
        console.log(
          `The server is running successfully on ${PORT}, click the link http://localhost:${PORT}`
        );
      });
    }
  });