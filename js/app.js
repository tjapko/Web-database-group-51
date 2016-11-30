var main = function () {
    "user strict";

    // varriable
    var uniqueCounter = 0;

    //arrays
    var groups = [];

    // var group = function(groupname){
    //     this.groupname = groupname;
    //     var lists = [];
    // };


    // group object constructor
    var Group = function(name){
        this.name = name;
        this.grouparray = [];
        this.id = uniqueCounter;
        uniqueCounter++;
        this.html = '<div id="' + this.id +'" class="sidebarGroup">' + this.name + '</div>'
        $(".sidemenu").append(this.html);
    };
    
    
    // prototypes of Group
    
    // add method
    Group.prototype.addList = function(list){
        this.grouparray.push(list);
        divloc = '.sidebarGroup#' + this.id;
        $(divloc).append(list.html);
        
    }
    
    // list objec constructor
    var List = function(name){
        this.name = name;
        this.listarray = [];
        this.id = uniqueCounter;
        uniqueCounter++;
        this.html=' <div id="'+ this.id +'" class="sidebarList">'+ this.name + '</div>';
    };
    
    // test list
     var lijstA = new List('lijstA');

    //list item object constructor
    var ListItem = function(title, discription, duedate, priority){
        this.title = title;
        this.discription = discription;
        this.duedate = duedate;
        this.priority = priority;
        this.html ='<div class="listItem"><div class="listItemName">'+ this.title + '</div><div class="listItemDate">' +this.duedate+'</div></div>';
        this.id = uniqueCounter;
        uniqueCounter++;
        };

//    var testitem = new ListItem('testitem','this is a discription', '01-01-1900', 'high');

    // add an item

    // the event handler
    $(".listItemAdd").on("click", function (event){
       // window.alert(testitem.html);
        //create a new item
        var listitem= new ListItem('insert your title here');
        // add the item to the database
        
        lijstA.listarray.push(listitem);
        
        // showing the item on screen
       $(".itemWrapper").append(listitem.html);
    });

    
    

   
    
    // create a set of groups, lists and items
    var groupA = new Group('groupA');
    groups.push(groupA);
    var groupB = new Group('groupB');
    groups.push(groupB);
    var groupC = new Group('groupC');
    groups.push(groupC);
    var listA = new List('listA');
    groupA.addList(listA);
    var listB = new List('listB');
    groupA.addList(listB);
    groupB.addList(listA);
    
    var extractlisthtml = function(groupid){
       var i;
        for(i = 0; i < groups.length; i++){
            if(groups[i].id == groupid){
            window.alert("hoi");

             var html;
            var j;
                for(j=0; j<groups[i].grouparray.length;j++){
                    this.html +=groups[i].grouparray[j].html;
                }
            }
        }
        return this.html;
    };
    
        // look for the current active list
    $(".sidebarGroup").toArray().forEach(function (element) {
        //create a click handler for this element
        $(element).on("click", function(){
            $(".sidebarGroup").removeClass("active");
            $(element).addClass("active");
            $(".itemWrapper").empty();
            $(".sidebarList").remove();
            groupid = $(".sidebarGroup.active").get(0).id;
            listhtml = extractlisthtml(groupid);
            $(".sidebarGroup.active").append(listhtml);
            return false;
        });
    });
    
};

$(document).ready(main);