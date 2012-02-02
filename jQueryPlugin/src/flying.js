// -1 = left, 0 no movement, +1 = right
var flyingDirection = 0;
var maxMovementLeft = 0;
var paddingSize = 0;

//this one has a set width, and contains the item below
var containerID = "#scroller";

//this one is the direct parent of the items that are flying, it has a huge width
var itemParentID = "#list_container";

var itemClass = ".listitem";

onload=function(){
        $("#left_scroll").hover( function() { flyingDirection= 1 ; }, function () { flyingDirection= 0 ;});
        $("#right_scroll").hover( function() { flyingDirection= -1 ; }, function () { flyingDirection= 0 ;});

        // scrolling effect
    	maxMovementLeft = parseInt($(containerID).css("width").replace("px", ""))*-1;
    	console.log("## initial maxMovement: "+maxMovementLeft);
    	var childrens = $(itemParentID).children(itemClass);
    	var top = 0;
    	childrens.each( function ( ) { 
    		$(this).css("left",top+"px");
    		
    		maxMovementLeft += parseInt($(this).css("width").replace("px", "")) + paddingSize;
    		console.log("maxMovement: "+maxMovementLeft);
    	 });
    	 
    	setInterval(
    	( function (){
    		if(flyingDirection !=0){
    			console.log("Moving");
    			moveEveryoneOver();
    		}
    	 })
    	 ,50 );
    };
    

function checkForNewElementAndRetrieve(){         
    //    if(flyingDirection != 0){
    //     $(".listitem:eq(0)").before($("<div class='listitem'> More trees! </div>"));
    // }
    return true;
}

function moveEveryoneOver(){
   	var childrens = $(itemParentID).children(itemClass);

	childrens.each( function ( ) {
		var curTop = $(this).css("left");
		
		curTop = curTop.replace("px", "");
		
		var newTop = parseInt(curTop) + flyingDirection*8;
		
		if(checkRightBound(newTop) && checkLeftBound(newTop)){
			$(this).css("left",newTop+"px");
		}
    });
}

function checkRightBound(bound){
	return (bound <= 0);
}

function checkLeftBound(bound){
	console.log("Bound: "+bound+" >= movement:"+(-1*maxMovementLeft));
	return (bound >= (-1*maxMovementLeft));
}