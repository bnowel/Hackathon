// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.mirrorMe = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
        
    }, options);

    return this.each(function() { 
        var $clonedText = $('#clonedText');
        var $this = ('#unoMe');
       $('#unoMe').keyup(function(){
           // $this.clone().val().appendTo($clonedText).addClass('cloneText');
           $clonedText.text($('#unoMe').val()).addClass('cloneText');
        });
        

     
    });//for each

  }; //function(options)
  
  
})( jQuery );