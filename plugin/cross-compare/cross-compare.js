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
        if(scripts[i].src.indexOf("cross-compare") != -1)
            CURRENT_SCRIPT_PATH = scripts[i].src;
    }
    var head = document.getElementsByTagName("head")[0];

    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = CURRENT_SCRIPT_PATH.replace(/[^/]*$/,'cross-compare.css');
    head.appendChild(cssLink);

    (function($){
        $.fn.extend({
        //plugin name - qbeforeafter
        qbeforeafter: function(options) {

            var targets = this;

            var updateMethod = function (e) {

                targets.each(function(){
                    var o = options;
                    var i = $(this);

                    right_border_width = parseInt(i.children('.ba-layer.tl').css("borderRightWidth"), 10);
                    bottom_border_width = parseInt(i.children('.ba-layer.tl').css("borderBottomWidth"), 10);
                    pos_imgX = this.getBoundingClientRect().left;
                    pos_imgY = this.getBoundingClientRect().top;
                    pos_mouseX = e.clientX - right_border_width * 0.5;
                    pos_mouseY = e.clientY - bottom_border_width * 0.5;
                    new_width  = pos_mouseX - pos_imgX;
                    new_height = pos_mouseY - pos_imgY;
                    img_width  = i.width();
                    img_height = i.height();
                    new_width = Math.max(0, Math.min(new_width, img_width));
                    new_height = Math.max(0,Math.min(new_height, img_height));
                    img_cap_tl = i.children('img:eq(0)').attr('alt');
                    img_cap_tr = i.children('img:eq(1)').attr('alt');
                    img_cap_bl = i.children('img:eq(2)').attr('alt');
                    img_cap_br = i.children('img:eq(3)').attr('alt');

                    i.children('.ba-layer.tl').width(new_width);
                    i.children('.ba-layer.tl').height(new_height);
                    i.children('.ba-layer.tr').height(new_height);
                    i.children('.ba-layer.bl').width(new_width);

                    i.children('.ba-caption.tl').css({ bottom: img_height - new_height, right: img_width - new_width });
                    i.children('.ba-caption.tr').css({ bottom: img_height - new_height, left:  new_width });
                    i.children('.ba-caption.bl').css({ top:    new_height,              right: img_width - new_width });
                    i.children('.ba-caption.br').css({ top:    new_height,              left:  new_width });
                });

			};

			$(document).mousemove(updateMethod);

            return this.each(function() {

	            var i = $(this);
				var img_layer_tl = i.children('img:eq(0)').attr('src');
				var img_layer_tr = i.children('img:eq(1)').attr('src');
				var img_layer_bl = i.children('img:eq(2)').attr('src');
				var img_layer_br = i.children('img:eq(3)').attr('src');
				var img_cap_tl = i.children('img:eq(0)').attr('alt');
				var img_cap_tr = i.children('img:eq(1)').attr('alt');
				var img_cap_bl = i.children('img:eq(2)').attr('alt');
				var img_cap_br = i.children('img:eq(3)').attr('alt');

				var width = i.width();
				var height = i.height();
                i.children("img").width(width);
                i.children("img").height(height);

				i.children('img').hide();

                i.children('.ba-layer,.ba-caption').remove();

				i.css({'overflow': 'hidden', 'position': 'relative'});
				i.append('<div class="ba-layer tl"></div>');
				i.append('<div class="ba-layer tr"></div>');
				i.append('<div class="ba-layer bl"></div>');
				i.append('<div class="ba-layer br"></div>');

				i.append('<div class="ba-caption tl">' + img_cap_tl + '</div>');
				i.append('<div class="ba-caption tr">' + img_cap_tr + '</div>');
				i.append('<div class="ba-caption bl">' + img_cap_bl + '</div>');
				i.append('<div class="ba-caption br">' + img_cap_br + '</div>');

				i.children('.ba-layer').width(width);
				i.children('.ba-layer').height(height);

				i.children('.ba-layer.tl').css('backgroundImage','url(' + img_layer_tl + ')');
				i.children('.ba-layer.tr').css('backgroundImage','url(' + img_layer_tr + ')');
				i.children('.ba-layer.bl').css('backgroundImage','url(' + img_layer_bl + ')');
				i.children('.ba-layer.br').css('backgroundImage','url(' + img_layer_br + ')');
                i.children('.ba-layer').css({'background-size': width +'px ' + height + "px"});

				i.children('.ba-layer.tl').width(width * 0.5);
				i.children('.ba-layer.tl').height(height * 0.5);
				i.children('.ba-layer.tr').height(height * 0.5);
				i.children('.ba-layer.bl').width(width * 0.5);

				i.children('.ba-caption.tl').show();
				i.children('.ba-caption.tr').show();
				i.children('.ba-caption.bl').show();
				i.children('.ba-caption.br').show();

				i.children('.ba-caption.tl').css({ bottom: height * 0.5, right: width * 0.5 });
				i.children('.ba-caption.tr').css({ bottom: height * 0.5, left:  width * 0.5 });
				i.children('.ba-caption.bl').css({ top:    height * 0.5, right: width * 0.5 });
				i.children('.ba-caption.br').css({ top:    height * 0.5, left:  width * 0.5 });

            });
        }
    });
	})(jQuery);

    function initialize(){
        $('.cross-compare').qbeforeafter({defaultgap:50, leftgap:0, rightgap:10, caption: true, reveal: 0.5});
        Reveal.addEventListener( 'slidechanged', onSlideChange );
    }

    function onSlideChange(event){
        var slide = event.currentSlide;
        var charts =$(slide).find('.cross-compare').qbeforeafter({defaultgap:50, leftgap:0, rightgap:10, caption: true, reveal: 0.5});
    }

    initialize();
})();