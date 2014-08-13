/**
 * Created with JetBrains PhpStorm.
 * User: lachsen
 * Date: 23.04.13
 * Time: 18:45
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var scripts = document.getElementsByTagName("script"),
    CURRENT_SCRIPT_PATH = "";
    for(var i = 0; i < scripts.length; ++i){
        if(scripts[i].src.indexOf("chartjs") != -1)
            CURRENT_SCRIPT_PATH = scripts[i].src;
    }

    var head = document.getElementsByTagName("head")[0];
    var scriptLink = document.createElement("script");
    scriptLink.type = "text/javascript";
    scriptLink.src = CURRENT_SCRIPT_PATH.replace(/[^/]*$/,'Chart.lib.js');
    head.appendChild(scriptLink);

    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = CURRENT_SCRIPT_PATH.replace(/[^/]*$/,'chartjs.css');
    head.appendChild(cssLink);

    function initialize(){
        Chart.defaults.global.scaleFontColor = "#ccc";
        Chart.defaults.global.scaleFontSize = 18;
        var charts =$('.chartJs');
        charts.each(function(i, element){
            var chart = $(element);
            if(!chart.height())
                chart.height(500);
        });
        Reveal.addEventListener( 'slidechanged', onSlideChange );
    }

    function onSlideChange(event){
        var slide = event.currentSlide;
        var charts =$(slide).find('.chartJs');
        charts.empty();
        charts.css({visibiliy: "hidden"});
        window.setTimeout(function(){
            charts.hide();
            charts.fadeIn(500);
            charts.each(function(i, element){

                var initFunctionName = element.getAttribute("data-init");
                var canvas = document.createElement("canvas");
                canvas.width = $(element).width();
                canvas.height = $(element).height() || 500;
                element.appendChild(canvas);
                var chart = window[initFunctionName](canvas.getContext("2d"));
                var legend = $(chart.generateLegend());
                element.appendChild(legend[0]);
            });

        }, 200);

    }

    scriptLink.onload = initialize;
})();