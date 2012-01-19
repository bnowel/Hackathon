// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.particlize = function( options ) {  
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
        addShim : true,
        byWord : true
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
    
    var $elems = $();
    
    this.each(function() {        

      // Tooltip plugin code here
      //$(this).click( function( ev ) {
        var $this = $(this),
        deets = $this.data( 'particlize' ) || getDeets( $this );
        
        var words = $this.text().split(' ');
        
        var wordsBlob = "";
        for (var i = 0; i < words.length; i++)
        {
            wordsBlob += "<span class='pt'>" + words[i] + "</span> ";
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
        $this.html(wordsBlob);
        
        // iterate in reverse order to maintain correct span positions
        $($(".pt", $this).get().reverse()).each(function (i, el) {
            var $pt = $(el);
            var pp = $pt.offset();
            
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
})( jQuery );