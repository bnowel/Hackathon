// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.jumpy = function( options ) {  
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
        addShim : true
        // Maybe make it jump further?
    }, options);
    
    // Only calculate things once that won't change
    function getDeets( $elem ) {
        return {
            'width' : $elem.width(),
            'height' : $elem.height(),
            'hasJumped' : false
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

    return this.each(function() {        

      // Tooltip plugin code here
      $(this).mouseover( function( ev ) {
        var $this = $(this),
        pos = $this.offset(),
        deets = $this.data( 'jumpy' ) || getDeets( $this ),
        adjustX = calcDelta( ev.pageX, pos.left, deets.width ),
        adjustY = calcDelta( ev.pageY, pos.top, deets.height );
        
        if ( !deets.hasJumped ) {
            if ( settings.addShim ) {
                // Make an invisible copy of this element where the original was so page doesn't move
                $this.before( $this.clone().removeAttr( 'id name' ).css( { 'visibility': 'hidden' } ) );            
            }
            // Only save the data to the object the first time, then we don't have to recalculate
            deets.hasJumped = true;
            $this.data('jumpy', deets);            
        }
        $('body').append( $this );

        $this.css({ 'position': 'absolute', 'top': pos.top + adjustY, 'left': pos.left + adjustX });
        // Maybe put a shim where it used to be of the same height?
        // That would keep the page from moving around too much.
        }
      );
    });
  };
})( jQuery );