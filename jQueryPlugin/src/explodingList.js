(function( $ ){
    
    $.fn.toggleAble = function(  ) { 
        $(this).toggleClass("selected");
        console.log("toggled"); 

    };
      
    $.fn.showHideChildren = function ( ) {
        $(this).live("click", function(){
                            showOrHideChildren($(this), "apiMethodList");
                            }
            );
    };


function hi(){
    $(".apiServiceHeader").live("click", function(){
            showOrHideChildren($(this), "apiMethodList");
        });
             
    $(".apiMethodHeader").live("click", function(){
            showOrHideChildren($(this), "apiArgumentList");
        });
        
    $(".argument").live("click",function(){
        $(this).toggleClass("selectedArg");
        console.log("toggled");
    });
};
/*  disabled 
function showOrHideChildren(id, targetClass){
    console.log("Showing this: " + id);
    id.parent().children("." + targetClass).toggleClass('hidden');
}*/

function showOrHideChildren(id){
    console.log("Hideshowing "+id);
    id.parent().children().toggleCLass('hidden');
}

})( jQuery );