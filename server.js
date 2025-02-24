const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString = "mongodb+srv://Makhmud:jSyUPjqsnAATxo07@cluster0.zcqov.mongodb.net/"

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongDb");
    else {
      console.log("Mongodb Connection succesful");
      module.exports = client;
      
      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server has been running successfully on ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
