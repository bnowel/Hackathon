(function( $ ){

  $.fn.particlize = function( options ) {
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
        addShim : true,
        byWord : true,
        unit : "word"
    }, options);
    
    // Only calculate things once that won't change
    function getDeets( $elem ) {
        return {
            'width' : $elem.width(),
            'height' : $elem.height(),
            'hasJumped' : false,
            'ox' : 0,
            'oy' : 0
        };
    }
    
    function calcDelta( point, bound, length ) {
        // point: *
        //      length
        //       ____                     ____
        //     *|   | return length      |   |* return -length
        //      ----                     ----
        // There is a bit of fudge factor for positions between mouse x,y and offset left
        return point > bound + (length / 2) ? -length : length;
    }
    
    var $elems = $();
    
    this.each(function() {        

      // Tooltip plugin code here
      //$(this).click( function( ev ) {
        var $this = $(this),
        deets = $this.data( 'particlize' ) || getDeets( $this );
        
        var ps = Array();
        var pBlob = "";
        
        if (settings.unit == "word")
        {
        	ps = $this.text().split(' ');
        	
        	for (var i = 0; i < ps.length; i++)
	        {
	            pBlob += "<span class='pt'>" + ps[i] + "</span> ";
	        }
        }
        else if (settings.unit == "char")
        {
        	ps = $this.text();
        	
        	for (var i = 0; i < ps.length; i++)
	        {
	        	if (ps[i] != ' ')
	        	{
	            	pBlob += "<span class='pt'>" + ps[i] + "</span>";
	            }
	            else
	            {
	            	pBlob += " ";
	            }
	        }
        }
        
        var $shim = $this.clone().removeAttr( 'id name' );
        
        if ( !deets.hasJumped ) {
            if ( settings.addShim ) {
                // make an invisible copy of this element - don't take up space initially
                $this.before($shim.css("display", "none"));            
            }
            
            // Only save the data to the object the first time, then we don't have to recalculate
            deets.hasJumped = true;
            $this.data('particlize', deets);            
        }
        
        // put the wrapped spans back into the original container
        $this.html(pBlob);
        
        // iterate in reverse order to maintain correct span positions
        $($(".pt", $this).get().reverse()).each(function (i, el) {
            var $pt = $(el);
            var pp = $pt.offset();
            
            // store original position
            $pt.data({"ox" : pp.left, "oy" : pp.top});
            
            // absolutely position each word
            $pt.css({ 'position': 'absolute', 'top': pp.top, 'left': pp.left });
            
            // add to list of elements
            $elems = $elems.add($pt);
        });
        
        if ( settings.addShim ) {
            // the shim takes up the original space again
            $this.before( $shim.css( { "display" : "", "visibility": "hidden" } ) );            
        }
        // Maybe put a shim where it used to be of the same height?
        // That would keep the page from moving around too much.
        //}
      //);
    });
    
    return $elems;
  };
  
  // create a wave effect with the letters in the selected objects
  $.fn.wave = function( options ) {
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
        unit : "word",
        cycleTime : 2000, // total cycle time
        dist : 4, // total sway distance in px
        steps : 20 // stagger time
    }, options);
    
    var $pts;
  	var tid;
    var staggerTime = settings.cycleTime / settings.steps; // stagger steps
	var halfSway = settings.dist / 2; // half dat
    
	function tick() {
		var ms = (new Date()).getTime(); // clock time
		
		for (var i = 0; i < $pts.length; i++)
		{
			// animation t
			var t = (ms + ((i % settings.steps) * staggerTime)) % settings.cycleTime;
			var yi = $($pts[i]).data("oy");
			
			// calc yf
			//var yf = (yi + (swayDist * (t / cycleTime)) - halfSway); // linear cycling fall
			var yf = (yi + (settings.dist * Math.sin((t / settings.cycleTime) * 2 * Math.PI)) - halfSway); // sine wave baby
			
			$pts[i].style.top = yf+"px";
		}
	}
    
    $pts = $(this).particlize({unit:settings.unit});
    tid = setInterval(tick, 100);
    
    return $pts;
  };
})( jQuery );