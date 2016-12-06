var http = require("http");
var server;
var express = require("express");

var simpleHTTPResponder = http.createServer(function(req, res){
    res.writeHead(200,{"Content-Type": "text/plain"});
    res.send('to do list.html');
    console.log("HTTP response sent");

});

server = http.createServer(simpleHTTPResponder);


server.listen(3000);
console.log("Server listening on port 3000");