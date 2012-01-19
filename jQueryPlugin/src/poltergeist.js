// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $, fnName ){
    var moveInterval = 200, //time in milliseconds
        maxMoves = 10, // number of times to move things before the next mouseMove
        moveCountdown = 0,
        tid = 0,
        mouse = {x: 0, y: 0},
        $elems = $(),
        boundMouse = false,
        closeness = 20; // pixels

    function moveIt( $elem, soul ) {
        // y = mx + b
        var pos = $elem.offset(),
            x = pos.left + soul.halfWidth,
            y = pos.top + soul.halfHeight,
            nextX = (x + mouse.x) / 2,
            nextY = (y + mouse.y) / 2;
        
        $elem.css( {'top' : nextY - soul.halfHeight, 'left' : nextX - soul.halfWidth} );
    }
    function animate() {
        if (--moveCountdown < 1 ) {
            //console.log("stop timer");
            clearInterval(tid);
            tid = 0;
        }
        
        $elems.each(function() {
            var $spirit = $( this ),
                soul = $spirit.data( fnName );
            if ( soul.posessed ) {
                moveIt( $spirit, soul );
            }
            else if ( closeEnough( $spirit, soul ) ) {// Check proximity to puppet master
                var pos = $spirit.offset();
                soul.posessed = true;
                // Make an invisible copy of this element where the original was so page doesn't move
                $spirit.before( $spirit.clone().removeAttr( 'id name' ).css( { 'visibility': 'hidden' } ) );
                $('body').append($spirit);

                
                $spirit.css({ 'position': 'absolute', 'top': pos.top, 'left': pos.left });
                //console.log('spirit posessed');
            }
        });
        //console.log("Timer: " + moveCountdown);
    }
    
    // Make a bounding box larger than the container and then test for being inside
    function closeEnough( $elem, soul ) {
        var pos = $elem.offset(), // Use offset so the position is relative to the document
            left = pos.left - closeness,
            right =  pos.left + soul.width + closeness,
            top = pos.top - closeness,
            bottom = pos.top + soul.height + closeness;
            
        return  ( mouse.y >= top ) && ( mouse.y <= bottom ) && ( mouse.x >= left ) && ( mouse.x <= right );
    }
    
    function bindMouseMove() {
        boundMouse = true;
        $( 'body' ).mousemove(function(ev) {   
            moveCountdown = maxMoves;
            if ( !tid ) {
                //console.log('start timer');
                tid = setInterval( animate, moveInterval );
            }
            mouse.x = ev.pageX;
            mouse.y = ev.pageY;
            console.log(mouse.x + " " + mouse.y);
        });
    }

  
  $.fn[fnName] = function( options ) {  
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {

    }, options );
    
    // Only calculate things once that won't change
    function sacredEncantation( $elem ) {
        return {
            'width' : $elem.width(),
            'halfWidth' : $elem.width() / 2,
            'height' : $elem.height(),
            'halfHeight' : $elem.height() / 2,
            'posessed' : false
        };
    }
    
    // This is where we can further make some sub objects to really freak out the squares
    $elems = this;
    
    $elems.each( function() {
       var $this = $( this );
       $this.data( fnName, sacredEncantation( $this ) );
    });
    
    // Only bind the mousemove event once someone wants us to start haunting
    if ( !boundMouse ) {
        bindMouseMove();
    }
        
    return this;
  };
})( jQuery, 'poltergeist' );
