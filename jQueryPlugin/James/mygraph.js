/*
Mygraph
Auther: James Bennett
*/
function CanvasGraph(elementID){
  var canvas, ctx, DataLength, spacing, color;
  
  this.color 	= "#006eff";/*sets bar color*/
  this.barWidth = 20;
  this.spacing 	= 30;/*defines margin between bars*/
  this.animate  = "true"; /* is this graph awesome? */
  this.interval = 10;/* time for animation if any */
  this.data     = new Array(); /* bar height */
  this.label    = new Array();
  
  function rect(x,w,h,color) { /*builds the bars.*/
    ctx.beginPath();
    ctx.fillStyle = color;
    h = h*.01*canvas.height;
    y = canvas.height - h;
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  };
  
  function line(s,d) { /*creates a line on the right hand side with a 100% gadge*/
  	s = parseInt(s);
  	ctx.strokeStyle ="#066a93";
  	height = canvas.height;
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
  };
  
  function labels(dx,label){/*adds labels to each bar*/
  	ctx.rotate(-Math.PI/2);
	  ctx.strokeStyle = "black";
	  ctx.font = "16px Calibri";
	  ctx.fillText(label,4-canvas.height,dx+20);
	  ctx.strokeText(label,4-canvas.height,dx+20);
	  ctx.rotate(Math.PI/2);
  };
  		
  this.draw = function(){	
	color       = this.color;
  	canvas      = document.getElementById(elementID);
  	ctx    		= canvas.getContext("2d");
  	DataLength  = this.data.length;
  	spacing 	= this.spacing;
  	barWidth    = this.barWidth;
  	
  	for(i=0; i<DataLength; i++ ){
  		rect(i*spacing,barWidth,this.data[i],color);
  		labels(i*spacing,this.label[i]);
  	};
  	
  	line(spacing,DataLength);
  	
  };
 }
