// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.shadowMe = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'location'         : 'top',
      'bad' : 'blue'
    }, options);

    return this.each(function() {        

      // Tooltip plugin code here
      $(this).hover( 
          function() {
            $(this).css( 'text-shadow', '3px 3px 0px #000' );
          },
          function() {
            //$(this).css( 'background-color', '#ffffff' );          
          }
      );
      
      $(this).mousemove(function(e){
        var width = $(this).outerWidth();
        var height = $(this).outerHeight();
        
        var shadowX = .3 * (this.offsetLeft + width/2 - e.pageX);
        var shadowY = .3 * (this.offsetTop + height/2 - e.pageY);

        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var xy = x + " " + y;
        
        var distance = Math.abs(shadowX) + Math.abs(shadowY);
        //$(this).html(x +', '+ y);

        var blur = 2 + (distance * .1);
        var alpha = .8 - (distance * .0005);
            
        $(this).css( 'text-shadow', ' ' + shadowX + 'px ' + shadowY + 'px ' + blur + 'px rgba(0,0,0,' + alpha + ') ' );
        
        var lightColor = 'rgba(255,255,255,0.3)';
        var originalBG = 'rgba(0,0,0,1.0)';
        var gradientSize = 300;
        
        //bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", "+ gradientSize + ", from(" + orginalBG + "), to(" + lightColor + ")), " + originalBG;
        bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", 300, from(rgba(255,255,255,0.4)), to(rgba(255,255,255,0.0))), " + originalBG;
        
        bgMoz    = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBG + " " + gradientSize + "px)";

        $(this)
          .css({ background: bgWebKit })
          .css({ background: bgMoz });
      });  
    });

  };
})( jQuery );