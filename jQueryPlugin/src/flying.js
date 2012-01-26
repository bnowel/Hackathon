(function( $ ){ 
    
     $.fn.startFlying = function(  ) { 
         var childrens = $(this).children(".listitem");
         var top = 10;
         childrens.each( function ( ) {      
                $(this).css("top",top+"px");
                top += 30;
             });
             
         setInterval(
            ( function (){
             if(checkForNewElementAndRetrieve()){
                moveEveryoneDown();
            }
            console.log("about to delay");
             })
             ,1000 );
        };
    
     
     function checkForNewElementAndRetrieve(){         
         $(".listitem:eq(0)").before($("<div class='listitem'> More trees! </div>"));
         return true;
     }
     
     function moveEveryoneDown(){
        var childrens = $("#list_container").children(".listitem");
        
        childrens.each( function ( ) {      
                var curTop = $(this).css("top");
                
                
                curTop = curTop.replace("px", "");
                var newTop = parseInt(curTop) +10;
                
                //TODO this doesn't work at the moment, so things keep moving down off the page, lame
                if(newTop >= 500){
                    $(this).remove();
                }
                
                $(this).css("top",newTop+"px");
        });
     }

})( jQuery );