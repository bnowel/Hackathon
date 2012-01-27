// This is a great place to start a simple plugin.
// http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.superBlink = function( ) {  

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    
    return this.each(function() {        

        var randomColor = getRandomColor();

        // On hover over set the background color to blue
        $(this).hover(
            function() {
                if (!$(this).data('clicked')) {
                    $(this).css( 'background-color', randomColor );
                }
            },
            function() {
                if (!$(this).data('clicked')) {
                    $(this).css( 'background-color', '#ffffff' );
                }
            }
        );
        
        $(this).click(function() {
            if ($(this).data('clicked')) {
                $(this).css('background-color', '#fff').data('clicked', false);
            }
            else { 
                $(this).css('background-color', randomColor ).data('clicked', true);
            }
        }
        );        
    });

  };
})( jQuery );