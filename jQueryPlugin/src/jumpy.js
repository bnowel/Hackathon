// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.jumpy = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
        // Maybe make it jump further?
    }, options);

    return this.each(function() {        

      // Tooltip plugin code here
      $(this).mouseover( function(ev) {
        var $this = $(this),
        pos = $this.offset(),
        width = $this.width(),
        // If we approach from the left move right otherwise move right
        // There is a bit of fudge factor for positions between mouse x,y and offset left
        adjustX = ev.pageX > pos.left + width / 2 ? -width : width,
        height = $this.height(),
        // Move like the x but for top
        adjustY = ev.pageY > pos.top + height / 2 ? -height : height;
        $('body').append($this);

        $this.css({ 'position': 'absolute', 'top': pos.top + adjustY, 'left': pos.left + adjustX});
        // Maybe put a shim where it used to be of the same height?
        // That would keep the page from moving around too much.
        }
      );
    });

  };
})( jQuery );