
(function( $ ){

  $.fn.colorSpin = function( options ) {  
    function get100to255(val) {
        val = val % 255;
        if(val < 100) { val = val + 155; }    
        if(val > 255) { val = val - 155; }    
        return val;
    } 
     
    function getColors(angle){
        var r = 255 - get100to255(angle * 4), 
            g = 255 - get100to255(angle * 3), 
            b = 255 - get100to255(angle * 2), 
            a = 1;
        
        return '('+ r +',' + g + ',' + b + ',' + a + ')';    
    }      

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
          'location' : 'top',
          'bad' : 'blue'
        }, options),
        $elems = $(),
        lastReading = 0,
        currentAngle = 0,
        minDelta = 2,
        maxDelta = 100,
        rotateCW = true;

    if (window.DeviceOrientationEvent) {
        //console.log("DeviceOrientionEvent")

        window.addEventListener('deviceorientation', function(eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = eventData.gamma,
                tiltFB = eventData.beta,
                rotateVal;
            /*    
            if ( tiltFB > 150 ) {
                rotateVal = 180 - tiltLR
            } else if ( tiltFB > 0 ) {
                rotateVal = -tiltLR;
            } else {
                rotateVal = 180 + tiltLR;
            }
            */
            rotateVal = -tiltLR;
            
            
            var deltaRotate = Math.abs(rotateVal - lastReading);
            if (deltaRotate < maxDelta && deltaRotate > minDelta) {
                if (lastReading > rotateVal) {
                    //console.log("cw");
                } else {
                    //console.log("ccw");
                }
                //console.log(lastReading + " " + rotateVal);
                currentAngle = Math.floor(lastReading) + 180;
                lastReading = rotateVal;

                $elems.each(function() {
                    $(this).css('-webkit-transform', 'rotate(' + rotateVal + 'deg)');
                    $(this).css('background-color', 'rgba' + getColors(currentAngle));
                    //$(this).css('background-color', 'rgba(100,100,' + 180 + ', 1)');
                    $(this).html(currentAngle);
                    
                })
                //console.log(lastReading + " " + rotateVal);
            }
        }, false);
    } else if (window.OrientationEvent) {
        //console.log("OrientationEvent");
    }
    
    $elems = this;
    return $elems;
  };
})( jQuery );