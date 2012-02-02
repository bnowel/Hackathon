(function( $ ){

    $.fn.toggleAble = function(  ) { 
        $(this).live("click",function(){ 
                    $(this).toggleClass("selected");
                    console.log("was toggled");
        });
        
        console.log("added toggling"); 
    };

    $.fn.showHideChildren = function ( ) {
        console.log("setting up showHide");
        $(this).live("click", function(){
                            showOrHideChildren($(this));
                            }
            );
    };



function showOrHideChildren(id){
    console.log("Hideshowing "+id);
    id.parent().children("ul").toggleClass('hidden');
}

})( jQuery );