
(function( $ ){
    var moveInterval = 10, //time in milliseconds
        tid = 0,
        paddle = {
            elem : $(),
            width : 50,
            height : 20,
            lastPos : 0,
            xPos : 0,
            speed : 10
        },
        board = {
            width: 0,
            height: 0,
        };
    
    function updatePaddlePos( dist ) {
        var newPos = paddle.xPos + (dist*3),
            maxX = board.width - paddle.width;
        
        if (newPos < 0 ) {
            paddle.xPos = 0;
        } else if ( newPos > maxX ) {
            paddle.xPos = maxX;
        } else {
            paddle.xPos = newPos;
        }
        //paddle.elem.css('left', paddle.xPos);
        //console.log(dist);
    }
    
    function animate() {
        var roundedPos = Math.round(paddle.xPos);
        
        tid = setTimeout( animate, moveInterval );
        
        if (paddle.lastPos != roundedPos) {
            paddle.elem.css({ 'left': roundedPos });            
            paddle.lastPos = roundedPos;
        }

    }
    
  $.fn.pong = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
        minDelta : 0.5 // Degrees
        }, options),
        lastReading = 0;
    
    // These need to get set on resize events
    board.width = this.width();
    board.height = this.height();
    paddle.elem = this.find('div.paddle');
    paddle.elem.width( paddle.width );
    paddle.elem.height( paddle.height );
    paddle.elem.css({'left': paddle.xPos, 'top': board.height - paddle.height});
    //console.log(board.width);
    tid = setTimeout( animate, moveInterval );
    
    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientionEvent")

        window.addEventListener('deviceorientation', function(eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = eventData.gamma,
                tiltFB = eventData.beta;
            
            
            //if ( Math.abs(tiltLR - lastReading) > settings.minDelta) {
                updatePaddlePos(tiltLR);
            //}
        }, false);
    } else if (window.OrientationEvent) {
        console.log("OrientationEvent");
    }
    
    $elems = this;
    return $elems;
  };
})( jQuery );