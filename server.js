console.log("Let's start the project");
const express = require('express');
const http = require('http');
const app = express();


const server = http.createServer(app) 
    let PORT = 3000;
    server.listen(PORT, function () {
        console.log(`The server has been running successfully on ${PORT}`, "http://localhost.3000");
    });