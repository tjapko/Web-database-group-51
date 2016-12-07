var http = require("http");
var server;
var express = require("express");
var url = require("http");
var app;

var port = 5614;

var uniqueCounter = 0;
var todos = [];

var gettodo = function(id){
 var i;
    for(i = 0; i<todos.length;i++){
        if(todos[i].id==id){
           return todos[i] ;
        }
    }
};

app = express();
http.createServer(app).listen(port);

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res){

    res.sendFile('/public/to do list.html', { root: __dirname});
});


app.post('/addlistitem', function(req,res){
    
    var listitem = new ListItem('insert title here','this is a discription', 'now','insane');
   // console.log(listitem.html);

   todos.push(listitem);
   res.send("succes");
 
});

app.get('/gettodoinfo', function(req,res){
    id = req.query.id;
    res.json(gettodo(id));
});

app.get('/gettodos', function (req, res){
    res.json(todos);
});

app.get('/deleteitem', function(req,res){
    id = req.query.id;
    var i;
  

    for(i=0; i<todos.length; i++){
        if(todos[i].id==id){
            todos.splice(i,1);
        }
    }
res.json(todos);
});

  var ListItem = function(title, discription, duedate, priority){
        this.id = uniqueCounter;
        this.title = title + this.id;
        this.discription = discription + this.id;
        this.duedate = duedate;
        this.priority = priority;
      
        uniqueCounter++;
       
     };
       
