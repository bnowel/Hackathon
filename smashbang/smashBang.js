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
		this.id = $el.attr('id');
		this.classes = ($el.attr("class") || "").split(" ");
		this.oldCSS = {
			position: el.style.position,
			top: el.style.top,
			left: el.style.left,
			opactiy: el.style.opacity,
			backgroundColor: el.style.backgroundColor,
			color: el.style.color
		};
	}
	
	function smashIt(element) {
		//bang is the element;
		var $this = $(element);
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		
		var myOriginalData = new ElementData(element);
		$this.data("originalData", myOriginalData);
		
		var newCSS = {
		position:'absolute',
			top: Math.max(winHeight - randomOffset(winHeight) - $(this).height(), 0) + 'px',
			left: Math.max(winWidth - randomOffset(winWidth) - $(this).width(), 0) + 'px',
			opacity: (Math.random() + 0.5).toString()
		};
		if (oneInThree())
			$.extend(newCSS, {'background-color': getRandomColor() });
		if (oneInThree())
			$.extend(newCSS, {'color': getRandomColor() });
		if (oneInThree())
			$this.removeAttr("id");

		$this.removeClass(myOriginalData.classes 
			&& myOriginalData.classes.length 
			&& myOriginalData.classes[randomTo(myOriginalData.classes.length)]
		);
		
		
		$this.css(newCSS);
	};
	
	function bangIt(element){
		//put it back together
		var $el = $(element);
		
		var myOriginalData = $el.data('originalData');
		
		$el
		.addClass(myOriginalData.classes)
		.css( myOriginalData.oldCss )
		.attr('id',myOriginalData.id);
	};

	//INITIALIZE THE SMASHBANG
    $.smashBang = function(){		
		//get all nodes;
		if (!window.jQuery){
			/*! jQuery v1.7.1 jquery.com | jquery.org/license */
			console.log("this page needs jQuery");
			return;
		}
				
		var $allElements = $("*").not('html, body, script, style');
		$allElements = Array.prototype.sort.call($allElements, randomSort);

		for ( var x=0;  x < 4; x++ ){
			for ( var q=0; q < $allElements.length; q++ ) {
				x==0 && smashIt($allElements[q]);
				x==1 && (!oneInFour ? smashIt($allElements[q]) : bangIt($allElements[q]));
				x==2 && (oneInThree ? smashIt($allElements[q]) : bangIt($allElements[q]));
				x==3 && bangIt($allElements[q]);
			}
		}			

    };
    
})();

$.smashBang();

