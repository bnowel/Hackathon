onload=function(){
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

function showOrHideChildren(id, targetClass){
    console.log("Showing this: " + id);
    id.parent().children("." + targetClass).toggleClass('hidden');
}
