(function(){	
	var KEYCOMBO = "gay";
	if (!window.jQuery){
		(function(d){
			var js, id = 'jquery'; if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
			d.getElementsByTagName('head')[0].appendChild(js);
			
			var i = setInterval(function(){
				if (window.jQuery){
					clearInterval(i);
					jQueryIsLoaded();
				}	
			}, 10);
		}(document));
	} else {
		jQueryIsLoaded();
	}

	function jQueryIsLoaded(){
		var keysPressedTowardCombo = "";
		$(window).bind('keypress', function(event){
			keysPressedTowardCombo += String.fromCharCode(event.which);
			if (KEYCOMBO.substr(0, keysPressedTowardCombo.length) == keysPressedTowardCombo) {
				if (KEYCOMBO == keysPressedTowardCombo) {
					findAndReplace(/\w/, "<span style='color:#C11'>Why you no like gay people?</span> ");
				}
			}else{
				keysPressedTowardCombo = "";
			}
		});	
	}

	function findAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        // Throw error here if you want...
        return;
    }
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'g') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,head,style,title,link,meta,script,object,iframe';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(regex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}
	
}());
