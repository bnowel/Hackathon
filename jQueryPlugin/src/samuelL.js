// #region
   // look @ all elements that have no children, update their text.



// 

(function( $ ){

  $.fn.samuelL = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {}, options);

    return this.each(function() {        

      // Tooltip plugin code here
      
      var these = $(this).andChildren();
      
      
      these.each(function (){
          if ($(this).data("sammed") != "true"){
            var kids = this.childNodes;
            for (var i in kids) {
                var kid = kids[i];
                if (kid.nodeType == 3) {
                    var oldVal = kid.nodeValue,
                        tmpVal,
                        newVal;
                    tmpVal = oldVal.replace(/!/g, ", MOTHERFUCKER!");
                    newVal = tmpVal.replace(/\?/g, ", MOTHERFUCKER!?");
                    newVal = tmpVal.replace(/\./g, ", MOTHERFUCKER!");
                    kid.nodeValue = newVal;
                }
            }
            $(this).data("sammed", "true");
          }
      });
      
    });

  };
  
  $.fn.andChildren = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    //var settings = $.extend( {}, options);

    return this.add($(this).find("*"));

  };
  
})( jQuery );