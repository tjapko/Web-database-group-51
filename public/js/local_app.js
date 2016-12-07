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
    
     var getgrouparray = function(groupid){
        var i;
       
        for(i=0; i<groups.length; i++){
            if(groups[i].id == groupid){
                return groups[i].grouparray;
            }
        }
    }
    
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
    
    var getlistarray = function(listid){
        var i;
        for(i=0; groups.length;i++){
            var j;
            for(j=0; j<groups[i].grouparray.length;j++){
                 if(groups[i].grouparray[j].id == listid){
                return groups[i].grouparray[j].listarray;
                 }
           
            }
        }
    }
    
    // test list
     var lijstA = new List('lijstA');

    //list item object constructor
    var ListItem = function(title, discription, duedate, priority){
        this.title = title;
        this.discription = discription;
        this.duedate = duedate;
        this.priority = priority;
        this.id = uniqueCounter;
        uniqueCounter++;
        this.html ='<div id="'+ this.id + '" class="listItem"><div class="listItemName">'+ this.title + '</div><div class="listItemDate">' +this.duedate+'</div></div>';
        this.infohtml = '<div class="itemInfoDiscription"><div class="ItemInfoTitle">Discription</div><div class="itemInfoDiscriptionConcent">' + this.discription + '</div></div><div class="itemInfodue">                <div class="ItemInfoTitle">Due</div><div class="itemInfoDeuDate">'+this.duedate + '</div></div>'
        };
        

    var createListItemHtml = function(id, title, duedate){
        var html = '<div id="'+ id + '" class="listItem"><div class="listItemName">'+ title + '</div><div class="listItemDate">' +duedate+'</div></div>';
        return html;
    }

//    var testitem = new ListItem('testitem','this is a discription', '01-01-1900', 'high');

    // add an item

    // the event handler
    $(".listItemAdd").on("click", function (event){
       // window.alert(testitem.html);
        //create a new item
       // var listitem= new ListItem('insert your title here');
        // add the item to the database
        $.get('/addlistitem', function(res){});
       // lijstA.listarray.push(listitem);
        $.getJSON("/gettodos", addToDoToList);
        // showing the item on screen
      // $(".itemWrapper").append(listitem.html);
    });

    var addToDoToList = function(todos){
        $(".itemWrapper").empty();
       
        for( var key in todos){
             console.log(todos[key]);
            var html = createListItemHtml(todos[key].id, todos[key].title, todos[key].duedate);
            $(".itemWrapper").append(html);
        }
    }
    
    $.getJSON("/gettodos", addToDoToList);
    

   
    
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
    groupB.addList(listB);
    
    var itemA = new ListItem('itemA', 'this is a filler items', 'due today', 'high');
    listA.listarray.push(itemA);
    listB.listarray.push(itemA);
    var itemB = new ListItem('itemB', 'this is a filler items', 'due today', 'high');
    listB.listarray.push(itemB);
    var itemC = new ListItem('itemC', 'this is a filler items', 'due today', 'high');
    listA.listarray.push(itemC);

   
    
    var extractlistshtml = function(groupid){
        var grouparray = getgrouparray(groupid);
        var listshtml = grouparray[0].html;
        var j;
        for(j=1; j<grouparray.length;j++){
            listshtml +=grouparray[j].html;
            
        }    
        return listshtml;
    };
    
    var extractitemshtml = function(listid){

        var items = getlistarray(listid);

        var itemshtml = items[0].html;
        var i;
        for(i=1; i<items.length; i++){
            itemshtml += items[i].html;
        }

        return itemshtml;
    }
    
    var extractiteminfohtml = function(itemid){
        var i;
        for(i = 0; i<groups.length; i++){
            var j;
            for(j = 0; j<groups[i].grouparray.length; j++){
                var k;
                for(k = 0; k<groups[i].grouparray[j].listarray.length; k++){
                    if(groups[i].grouparray[j].listarray[k].id == itemsid){
                        return groups[i].grouparray[j].listarray[k].infohtml;
                    }
                }
            }
        }
    }
    
    var Selectlist = function(listid){
         $(".itemWrapper").empty();
        var listarray = getlistarray(listid);
        $(".itemWrapper").append(listitems);
    }
    
    var addonclickitem = function(){
        $(".itemWrapper").toArray().forEach(function(element){
            $(element).on("click", function(){
                $(".listItem").removeClass("active");
                $(element).addClass("active");
                $(".itemInfoSpace").empty();
                var itemid = $(".listItem.active").get(0).id;
                var iteminfohtml = extractiteminfohtml(itemid);
                $(".itemInfoSpace").append(iteminfohtml);
            });
                
       });
    }
    
        // look for the current active list
    $(".sidebarGroup").toArray().forEach(function (element) {
        //create a click handler for this element
        $(element).on("click", function(){
            $(".sidebarGroup").removeClass("active");
            $(element).addClass("active");
            $(".sidebarList").remove();
            
            var groupid = $(".sidebarGroup.active").get(0).id;
            var listhtml = extractlistshtml(groupid);
            $(".isdebarGroup.active").empty();
            $(".sidebarGroup.active").append(listhtml);
            
            $(".sidebarGroup.active .sidebarlist").removeClass("active")
            $(".sidebarGroup.active .sidebarList:nth-child(1)").addClass("active");
                        
             $(".itemWrapper").empty();
            
            var listid = $(".sidebarList.active").get(0).id;
            var itemhtml = extractitemshtml(listid);
            console.log(itemhtml);
            $(".itemWrapper").append(itemhtml);
            
            addonclickitem();
            return false;
        });
    });
    
};

$(document).ready(main);