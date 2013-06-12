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
        if(scripts[i].src.indexOf("cg-master.js") != -1)
            CURRENT_SCRIPT_PATH = scripts[i].src;
    }

    var c_topics = {};
    var c_dom = null;
    var c_slidenumberDom = null;
    var c_topicsDom = null;

    var head = document.getElementsByTagName("head")[0];
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = CURRENT_SCRIPT_PATH.replace(/[^/]*$/,'cg-master.css');
    head.appendChild(cssLink);

    function initialize(){
        constructDOM();
        initTopics();

        Reveal.addEventListener( 'slidechanged', onSlideChange );
        Reveal.addEventListener( 'ready', onSlideChange );
    }


    function constructDOM(){
        c_dom = $('<div class="cg-master"></div>');
        c_slidenumberDom = $('<div class="cg-slide-number">1</div>');
        c_dom.append(c_slidenumberDom);
        $(".reveal").append(c_dom);
    }

    function initTopics(){
        var topics = {};

        // TODO: Initialize topics

        c_topicsDom = $('<ul class="cg-topics cg-hidden"></ul>');
        for(var i in topics){
            var dom = $('<li class="cg-topic" >' + topics[i] + '</li>');
            c_topicsDom.append(dom);
            c_topics[i] = {
                label: topics[i],
                dom: dom
            }
        }
        c_dom.append(c_topicsDom);
    }


    function onSlideChange(event){
        initSlide(event.currentSlide, event.indexh, event.indexv);
    }

    function initSlide(slide, indexH, indexV){
        c_slidenumberDom.html((indexH+1) + (indexV ? "." + indexV : ""));

        var slide = slide;
        var topic = slide.getAttribute("data-cg-topic") || slide.parentNode.getAttribute("data-cg-topic");

        if(topic == "hide")
            c_topicsDom.addClass("cg-hidden");
        else
            c_topicsDom.removeClass("cg-hidden");

        c_topicsDom.find(".cg-topic").removeClass("cg-current");

        c_topics[topic] && c_topics[topic].dom.addClass("cg-current");
    }

    initialize();
})();