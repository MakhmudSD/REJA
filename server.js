const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString = "mongodb+srv://Makhmud:55VlC66b4UTReav3@cluster0.zcqov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDb");
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

