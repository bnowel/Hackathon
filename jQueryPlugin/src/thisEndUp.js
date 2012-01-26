
(function( $ ){

  $.fn.thisEndUp = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
          'location' : 'top',
          'bad' : 'blue'
        }, options),
        $elems = $(),
        lastReading = 0,
        minDelta = 2,
        rotateCW = true;

    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientionEvent")

        window.addEventListener('deviceorientation', function(eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = eventData.gamma,
                tiltFB = eventData.beta,
                rotateVal;
            
            if ( tiltFB > 150 ) {
                rotateVal = 180 - tiltLR
            } else if ( tiltFB > 0 ) {
                rotateVal = -tiltLR;
            } else {
                rotateVal = 180 + tiltLR;
            }
            
            if ( Math.abs(rotateVal - lastReading) > minDelta) {
                if (lastReading > rotateVal) {
                    console.log("cw");
                } else {
                    console.log("ccw");
                }
                console.log(lastReading + " " + rotateVal);
                lastReading = rotateVal;

                $elems.each(function() {
                    $(this).css('-webkit-transform', 'rotate(' + rotateVal + 'deg)');
                })
                //console.log(lastReading + " " + rotateVal);
            }
        }, false);
    } else if (window.OrientationEvent) {
        console.log("OrientationEvent");
    }
    
    $elems = this;
    return $elems;
  };
})( jQuery );