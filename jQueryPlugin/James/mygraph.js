/*
Mygraph
Author: James Bennett
*/
(function($){
    
    $.fn.CanvasGraph = function( options ){

      var canvas, ctx, DataLength, spacing, color;
      var dx = 0, dy = 0;
      var direction = 'down';
      //var CHeight = canvas.height;
      //var CWidth  = canvas.width;
      
      var settings = $.extend({
          'color'    : '#006eff',
          'barWidth' : 20,
          'spacing'  : 30,
          'animate'  : "true",
          'interval' : 10,
          'data'     : [],
          'font'     : "10px Segoe UI",
          'label'    : [],
          'graphType': 'default'
          
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
      function circle(x,y) {
          ctx.beginPath();
          ctx.fillRect(10,10,1,1);
          ctx.arc(x,y,5,360,180, true);
          ctx.fill();
      }
      
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
        ctx.lineWidth = 1;
        ctx.strokeStyle = "lightgrey";
        ctx.font = settings.font; //"16px Calibri";
        ctx.fillText(label,4-canvas.height,dx+20);
        ctx.strokeText(label,4-canvas.height,dx+20);
        ctx.rotate(Math.PI/2);
      }
      function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
           circle(dx, dy);
           
           if(direction == 'down')
           {   
              console.log(dy);
              console.log(direction);
            dx++;
            dy++;
            if(dy == canvas.height)
                {
                    console.log('IM HERE');
                    direction = 'up';
                    
                    }
           }
           else {
            dy--;
            dx++;
           }
      }
      var draw = function($this){
        color       = settings.color;
        canvas      =  $this;
        ctx         = canvas.getContext("2d");
        DataLength  = settings.data.length;
        spacing     = settings.spacing;
        barWidth    = settings.barWidth;
      	
        
        
        switch(settings.graphType) {
            case 'default': 
                line(spacing,DataLength);
                
                for(i=0; i<DataLength; i++ ){
                    rect(i*spacing,barWidth,settings.data[i],color);
                    labels(i*spacing,settings.label[i]);
                }
                
                break;
            case 'dot':
               // alert(canvas.height);
                setInterval(animate, 10)
                break;
        }
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














