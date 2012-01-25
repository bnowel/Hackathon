(function(){
    
    var randomOffset = function(base){
        return Math.random() * base;
    };
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    
    var oneInThree = function(){
        return Math.floor((Math.random()*100))%3 === 0;
    };
    
    $.smashBang = function(){
        $(window).delegate("*", 'mouseover', function(event){
            if ($(this).is(':not("body,html")'))
            $(this).smashBang();   
            event.stopPropagation();
        });    
                    
        setInterval(function(){
            var $divs = $("*").not('body','html');
            var rand = Math.random()*$divs.length;
            $divs.eq([rand]).trigger("mouseover");
        }, 10);
    };
    
    $.fn.smashBang = function(){

        return this.each(function(){  
            var $this = $(this);
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            
            var newCSS = {
                position:'absolute',
                top: Math.max(winHeight - randomOffset(winHeight) - $(this).height(), 0) + 'px',
                left: Math.max(winWidth - randomOffset(winWidth) - $(this).width(), 0) + 'px',
                opacity: (Math.random() + 0.5).toString()
            };
            
            if (oneInThree())
                $.extend(newCSS, {'background-color': getRandomColor() });
            if (oneInThree())
                $.extend(newCSS, {'color': getRandomColor() });
            
            $this.css(newCSS);
        });
    };    
})();
