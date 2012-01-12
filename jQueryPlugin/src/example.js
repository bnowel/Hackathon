// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.colorMeBad = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'location'         : 'top',
      'bad' : 'blue'
    }, options);

    return this.each(function() {        

      // Tooltip plugin code here
      $(this).hover( 
          function() {
            $(this).css( 'background-color', settings.bad );
          },
          function() {
            $(this).css( 'background-color', '#ffffff' );          
          }
      );
    });

  };
})( jQuery );