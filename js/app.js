var main = function () {
    "user strict";

    $(".sidebarGroup").toArray().forEach(function (element) {
        //create a click handler for this element
        $(element).on("click", function(){
            $(".sidebarGroup").removeClass("active");
            $(element).addClass("active");
            $(".itemWrapper").empty();
            return false;
        });
    });
   
};

$(document).ready(main);