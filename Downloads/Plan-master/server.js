console.log("Web server started");
const express = require("express");
const app = express();
const http = require("http");

// 1: Intro code
app.use(express.static("public")); // hamma browserga public access qb beradi
app.use(express.json()); // json datani object qilib beradi
app.use(express.urlencoded({extended: true})); // HTML dan traditional form requestdam post qilingan codlarni express qabul qiladi 

// 2: Session code

// 3: Views code 
app.set("views", "views");
app.set("view engine", "ejs"); // HTML making via Backend/second name: BSSR

// 4: Routing code

app.post("/create-item", (req, res) => {
    console.log(req.body);
    res.json({test: "success"});
});

app.get("/", function (req, res) {
    res.render("harid");
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function() {
    console.log(`The server is running successfully on port: ${PORT}`);
});