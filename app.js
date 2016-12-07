var http = require("http");
var server;
var express = require("express");
var url = require("http");
var app;

var port = 5614;

var uniqueCounter = 0;
var todos = [];

app = express();
http.createServer(app).listen(port);

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res){

    res.sendFile('/public/to do list.html', { root: __dirname});
});


app.get('/addlistitem', function(req,res){
    
    var listitem = new ListItem('insert title here','this is a discription', 'now','insane');
   // console.log(listitem.html);

   listitemjson = JSON.stringify(listitem);
   todos.push(listitemjson);
 
});

app.get('/gettodos', function (req, res){
    res.json(todos);
});


  var ListItem = function(title, discription, duedate, priority){
        this.title = title;
        this.discription = discription;
        this.duedate = duedate;
        this.priority = priority;
        this.id = uniqueCounter;
        uniqueCounter++;
       
     };
       
