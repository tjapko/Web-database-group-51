var http = require("http");
var server;
var express = require("express");
var url = require("http");
var app;

var port = 5614;
app = express();
http.createServer(app).listen(port);

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res){

    res.sendFile('/public/to do list.html', { root: __dirname});
});


console.log("Server listening on port 5614");