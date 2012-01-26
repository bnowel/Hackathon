
(function(){
    
	var randomSort = function(a,b) {
		var temp = parseInt( Math.random()*10 );
		var isOddOrEven = temp%2;
		var isPosOrNeg = temp>5 ? 1 : -1;
	    // Return -1, 0, or +1
		return( isOddOrEven*isPosOrNeg );
	}

    var randomOffset = function(base){
        return Math.random() * base;
    };

	//function currying ftw
	var randomTo = function(x) {
		return Math.floor(Math.random()) * x * 10;
	};
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    
	function oneInX(x){
		return function(){
	        return Math.floor((Math.random()*30)) % x === 0;	
		}
	}
    var oneInThree = oneInX(3);
	var oneInFour = oneInX(4);
  
	var ElementData = function(el){

		var $el = $(el);
		this.oldCSS = {
    		position: el.style.position,
			top: el.style.top,
			left: el.style.left,
			backgroundColor: el.style.backgroundColor,
			color: el.style.color
		};
        this.id = $el.attr('id');
		this.classes = $el.attr("class")
	}
	
	function smashIt(element) {
		//bang is the element;
		var $this = $(element);
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		
        var myOriginalData = $this.data("originalData");
        if (!myOriginalData){
    		myOriginalData = new ElementData(element);
            $this.data("originalData", myOriginalData);
        };
        
        
		var newCSS = {
    		position:'absolute',
			top: Math.max(winHeight - randomOffset(winHeight) - $(this).height(), 0) + 'px',
			left: Math.max(winWidth - randomOffset(winWidth) - $(this).width(), 0) + 'px'
		};
        
		if (oneInThree())
			$.extend(newCSS, {'background-color': getRandomColor() });
		if (oneInThree())
			$.extend(newCSS, {'color': getRandomColor() });
		if (oneInThree())
			$this.removeAttr("id");
		
		$this.css(newCSS);
	};
	
	function bangIt(element){
		//put it back together
		var $el = $(element);
		
		var myOriginalData = $el.data('originalData');
        
        if (!myOriginalData){
            console.log("SUCK IT");
            return;
        }
	//	$el.addClass(myOriginalData.classes);
		$el.css( myOriginalData.oldCSS );
		$el.attr('id',myOriginalData.id);
	};

	//INITIALIZE THE SMASHBANG
    $.smashBang = function(){		
		//get all nodes;
		if (!window.jQuery){
			/*! jQuery v1.7.1 jquery.com | jquery.org/license */
			return;
		}
				
		var $allElements = $("*").not('html, body, script, style');
        if ($allElements.length > 250) $allElements = $allElements.slice(0,100);
		$allElements = Array.prototype.sort.call($allElements, randomSort);
        var fns2Execute = [];
		for ( var x=0;  x < 4; x++ ){
			for ( var q=0; q < $allElements.length; q++ ) {
                fns2Execute.push((function(x,q){
                    return function(){
        				x==0 && smashIt($allElements[q]);
        				x==1 && (!oneInFour() ? smashIt($allElements[q]) : bangIt($allElements[q]));
        				x==2 && (oneInThree() ? smashIt($allElements[q]) : bangIt($allElements[q]));
        				x==3 && bangIt($allElements[q]);
                    };
                })(x,q));
			}
		}
        
        var y = 0;
        function exec() {
             
            if (y == fns2Execute.length) return;
            fns2Execute[y]();
            y++;            
            setTimeout(function(){
                exec();
            }, 5);
        };
        exec();
        
        window.fns2Execute = fns2Execute;
    };
    
})();

$(function(){
    $.smashBang();
});