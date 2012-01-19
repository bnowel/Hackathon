/*
Mygraph
Author: James Bennett
*/
(function($){
    
    $.fn.CanvasGraph = function( options ){
    
      var canvas, ctx, DataLength, spacing, color;
      var elementID = $(this).attr('id');
      
      var settings = $.extend({
          'color'   : '#006eff',
          'barWidth': 20,
          'spacing' : 30,
          'animate' : "true",
          'interval': 10,
          'data'    : [],
          'label'   : []
      }, options);
      
      function rect(x,w,h,color) { /*builds the bars.*/
        ctx.beginPath();
        ctx.fillStyle = color;
        h = h*.01*canvas.height;
        y = canvas.height - h;
        ctx.rect(x,y,w,h);
        ctx.closePath();
        ctx.fill();
      };
      
      function line(s,d) { /*creates a line on the right hand side with a 100% bar-line*/
      	s = parseInt(s);
      	ctx.strokeStyle ="#066a93";
        height  =   canvas.height;
      	var dx = (s * d) + s/10;	
        ctx.beginPath();
        ctx.moveTo(dx,height);
        ctx.lineTo(dx,0);
        ctx.closePath();
        ctx.stroke();
        /* generate 0 to 100% numbers */
        ctx.font = "19px Calibri";
        ctx.beginPath();
        ctx.rotate(-Math.PI/2);
        ctx.fillStyle = "#066a93";
        ctx.textAlign = "center";
        ctx.fillText("100%",-25,dx+16);
        ctx.fillText("0",8-canvas.height,dx+16);
        ctx.closePath();
      }
      
      function labels(dx,label){/*adds labels to each bar*/
        ctx.rotate(-Math.PI/2);
        ctx.strokeStyle = "black";
        ctx.font = "16px Calibri";
        ctx.fillText(label,4-canvas.height,dx+20);
        ctx.strokeText(label,4-canvas.height,dx+20);
        ctx.rotate(Math.PI/2);
      }
      
      var draw = function($this){
        color       = settings.color;
        canvas      =  $this;
        ctx         = canvas.getContext("2d");
        DataLength  = settings.data.length;
        spacing     = settings.spacing;
        barWidth    = settings.barWidth;
      	
        for(i=0; i<DataLength; i++ ){
            rect(i*spacing,barWidth,settings.data[i],color);
            labels(i*spacing,settings.label[i]);
        }
        
        line(spacing,DataLength);
      };
      
      return this.each(function(){
        var $this = $(this);
        
        if ($this.is(":not('canvas')"))
              return;
        var $this = this;
        draw($this);
      });
     };
})(jQuery);














