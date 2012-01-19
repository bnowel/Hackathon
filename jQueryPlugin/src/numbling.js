// This is a great place to start a simple plugin.
// Check http://docs.jquery.com/Plugins/Authoring for additional tips for plugins

(function( $ ){

  $.fn.numBling = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'location'         : 'top',
      'leftcolor' : 'FF0000',
      'rightcolor' : '00FF00',
      'fadecolor' : 'F0F0F0',
      'min' : '0',
      'max' : '100',
    }, options);

    function interpolateColor(minColor,maxColor,maxDepth,depth){
     
    function d2h(d) {return d.toString(16);}
    function h2d(h) {return parseInt(h,16);}
     
    if(depth == 0){
    return minColor;
    }
    if(depth == maxDepth){
    return maxColor;
    }
     
    var color = "#";
     
    for(var i=1; i <= 6; i+=2){
    var minVal = new Number(h2d(minColor.substr(i,2)));
    var maxVal = new Number(h2d(maxColor.substr(i,2)));
    var nVal = minVal + (maxVal-minVal) * (depth/maxDepth);
    var val = d2h(Math.floor(nVal));
    while(val.length < 2){
    val = "0"+val;
    }
    color += val;
    }
    return color;
    }
    
    
    return this.each(function() {        

      // Tooltip plugin code here
      $(this).change( 
          function() {
            $(this).css( 'color', '#FFFFFF' );
            $(this).css( 'text-align', 'center');
            $(this).css( 'font-weight', 'bold');
            $(this).css('background' , '#F0F0F0'); /* Old browsers */
        var percent = (($(this).val() - settings.min)/(settings.max - settings.min))*100;
            var endcolor = interpolateColor(settings.leftcolor,settings.rightcolor,101,percent);
/* IE9 SVG, needs conditional override of 'filter' to 'none' */
//background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2M2MDAwZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDg5MGYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
$(this).css('background' , '-moz-linear-gradient(left,  #' + settings.leftcolor + ' 0%, ' + endcolor +  ' ' + percent + '%, #' + settings.fadecolor + ' 100%'); /* FF3.6+ */

//-moz-linear-gradient(left, rgba(198,0,15,0.81) 0%, rgba(100,68,15,0.81) 41%, rgba(48,104,15,0.85) 63%, rgba(0,137,15,0.85) 83%);
//$(this).css('background' , '-webkit-gradient(linear, left top, right top, color-stop(0%,#c6000f), color-stop(100%,#00890f))'); /* Chrome,Safari4+ */
//$(this).css('background' ,'-webkit-linear-gradient(left,  #c6000f 0%,#00890f 100%)');; /* Chrome10+,Safari5.1+ */
//background: -o-linear-gradient(left,  #c6000f 0%,#00890f 100%); /* Opera 11.10+ */
//background: -ms-linear-gradient(left,  #c6000f 0%,#00890f 100%); /* IE10+ */
//background: linear-gradient(left,  #c6000f 0%,#00890f 100%); /* W3C */
//filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c6000f', endColorstr='#00890f',GradientType=1 ); /* IE6-8 * 
            
            
          }
      ).triggerHandler('change');
    });

  };
})( jQuery );