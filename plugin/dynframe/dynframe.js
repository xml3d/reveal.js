(function(){

    var scripts = document.getElementsByTagName("script"),
    CURRENT_SCRIPT_PATH = "";
    for(var i = 0; i < scripts.length; ++i){
        if(scripts[i].src.indexOf("dynframe.js") != -1)
            CURRENT_SCRIPT_PATH = scripts[i].src;
    }

    var head = document.getElementsByTagName("head")[0];
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = CURRENT_SCRIPT_PATH.replace(/[^/]*$/,'dynframe.css');
    head.appendChild(cssLink);

    var c_focusIFrame = null;
    var c_overlayTop = null, c_overlayBottom = null, c_overlayLeft = null, c_overlayRight = null;

    function initialize(){
        constructDOM();

        Reveal.addEventListener( 'slidechanged', onSlideChange );
        Reveal.addEventListener( 'ready', onSlideChange );
        window.setInterval(highlightIFrame, 100)
    }


    function highlightIFrame(){
        var focusElement = document.activeElement && document.activeElement.tagName == "IFRAME" ? document.activeElement : null;
        if(focusElement != c_focusIFrame){
            $(c_focusIFrame).removeClass('focused');

            c_focusIFrame = focusElement;
            if(c_focusIFrame){
                $(c_focusIFrame).addClass('focused');
            }
            if(c_focusIFrame){
                var offset = $(c_focusIFrame).offset(),
                    width = $(c_focusIFrame).outerWidth(),
                    height = $(c_focusIFrame).outerHeight();
                $(".dynframe-overlay").addClass("focused");
                c_overlayTop.height(offset.top);
                c_overlayBottom.css({'top': offset.top + height});
                c_overlayLeft.css({'top': offset.top, height: height, width: offset.left});
                c_overlayRight.css({'top': offset.top, height: height, left: offset.left + width});
            }
            else{
                $(".dynframe-overlay").removeClass("focused");
                $(".dynframe-overlay").attr("style", "");
            }

        }
    }

    function constructDOM(){
        c_overlayTop = $('<div class="dynframe-overlay top"></div>');
        c_overlayBottom = $('<div class="dynframe-overlay bottom"></div>');
        c_overlayLeft = $('<div class="dynframe-overlay left"></div>');
        c_overlayRight = $('<div class="dynframe-overlay right"></div>');
        $(".reveal").append(c_overlayTop);
        $(".reveal").append(c_overlayBottom);
        $(".reveal").append(c_overlayLeft);
        $(".reveal").append(c_overlayRight);
    }


    function onSlideChange(event){
        initExternalViews(event.previousSlide, event.currentSlide);
    }

    var c_showHandles = [];

    function initExternalViews(prevSlide, nextSlide){
        for(var i = 0; i < c_showHandles.length; ++i)
            window.clearTimeout(c_showHandles[i]);

        if(prevSlide){

            $(prevSlide).find(".dynframe iframe").remove();
        }

        $(nextSlide).find(".dynframe").each(function(){

                var self = $(this);
                if(self.find("iframe").length > 0) return;
                var src = this.getAttribute("data-src");

                var handle = window.setTimeout(function(){
                    console.log("Loading...");
                    var iframe = $("<iframe></iframe>");
                    iframe.width(self.width());
                    iframe.height(self.height());
                    iframe.addClass("hidden");
                    self.addClass("loading");
                    self.append(iframe);
                    iframe[0].onload = function(){
                        console.log("LOADED!");
                        self.removeClass("loading");
                        iframe.css({opacity: 0});
                        iframe.removeClass("hidden");
                        iframe.animate({opacity: 1}, 500);
                    }
                    iframe.attr("src", src);
                }, 500);
                c_showHandles.push(handle);
            })
    }

    initialize();

}());