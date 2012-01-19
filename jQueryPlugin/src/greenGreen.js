(function( $ ){

  $.fn.greenGreen = function(  ) {  


    return this.each(function() {    
        if (!$(this).hasClass("greenKids")) {
            var newHtml =  $(this).html().replace(/green/g,'<span class="greened">green</span>').replace(/GREEN/g,'<span class="greened">GREEN</span>').replace(/Green/g,'<span class="greened">Green</span>')
            $(this).html(newHtml).addClass("greenKids");
        }
        $(".greened").css("color", "green");
    });

  };
})( jQuery );