// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.colorMe = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'defaultC'         : 'black',
      'bad' : 'blue'
    }, options);
    
    var $body = $("body");
    return this.each(function() {        

     var $this = $(this);
        if ($this.is(":input")){
            $body.css("color", settings.defaultC)
            $body.on("keyup", $this, function(){
                $body.css("color",$this.val());
            });
        }
        
    });

  };
})( jQuery );