// -1 = left, 0 no movement, +1 = right
var flyingDirection = 0;

$("#left_scroll").hover( function() { flyingDirection= -1 ; }, function () { flyingDirection= 0 ;});
$("#right_scroll").hover( function() { flyingDirection= 1 ; }, function () { flyingDirection= 0 ;});

(function( $ ){ 
    
     $.fn.startFlying = function(  ) { 
         var childrens = $(this).children(".listitem");
         var top = 10;
         childrens.each( function ( ) {      
                $(this).css("left",top+"px");
                top += 30;
             });
             
         setInterval(
            ( function (){
             if(checkForNewElementAndRetrieve()){
                moveEveryoneDown();
            }
            console.log("about to delay");
             })
             ,500 );
        };
    
     
     function checkForNewElementAndRetrieve(){         
         if(flyingDirection != 0){
            $(".listitem:eq(0)").before($("<div class='listitem'> More trees! </div>"));
         }
         return true;
     }
     
     function moveEveryoneDown(){
        var childrens = $("#list_container").children(".listitem");
        
        childrens.each( function ( ) {      
                var curTop = $(this).css("left");
                
                
                curTop = curTop.replace("px", "");
                
                var newTop = parseInt(curTop) + flyingDirection;
                
                //TODO this doesn't work at the moment, so things keep moving down off the page, lame
                if(newTop >= 500){
                    $(this).remove();
                }
                
                $(this).css("left",newTop+"px");
        });
     }

})( jQuery );