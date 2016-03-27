/**
 * jquery plugin -- jquery.tooltip.js
 * Description:：
 *       <a data-content='content'></a>
 *      调用方法：$('#element').tooltip({'color':'#000'});
 *      使用要求：需要引入.ToolTipBox基本样式以及jQuery
 * Version: 1.1
 * Author: Dong Yuhao
 * created: March 27, 2016
 */
;(function ($, window, document, undefined) {
    $.fn.tooltip = function (options) {

        /*默认参数*/
        $.fn.tooltip.defaults = {
            color : '#00abef',                  //toolTip内容颜色
            bgcolor : 'rgba(0,0,0,.6)',         //toolTip背景颜色
            border : '1px solid #6175FF',       //toolTip边框
            borderRadius : 5,                   //toolTip边框圆角

            _posX : 0,                           //toolTip离左部距离
            _tooltipBoxClass : 'toolTipBox'     //toolTipBox类名

        };

        /*$.extend 方法执行覆盖。jQuery 的 $.extend 方法合并两个或多个对象*/
        var config = $.extend($.fn.tooltip.defaults, options||{});
        var title;

        var _getWindowWidth = function () {
            if ( window.innerWidth ) {
                return window.innerWidth;
            } else if ( document.documentElement && document.documentElement.clientWidth ) {
                return document.documentElement.clientWidth;
            } else if ( document.body && document.body.clientWidth){
                return document.body.clientWidth;
            }
        };

        var _getWindowHeight = function () {
            if ( window.innerHeight ) {
                return window.innerHeight;
            } else if ( document.documentElement && document.documentElement.clientHeight ) {
                return document.documentElement.clientHeight;
            } else if ( document.body && document.body.clientHeight){
                return document.body.clientHeight;
            }
        };

        return this.each(function () {
            var me = $(this);

            me.hover(function (e) {
                toolTipBox = me.children('.'+config._tooltipBoxClass);

                if(toolTipBox.length > 0) {     /*jQuery中$('xxx')总是会返回对象*/
                    /*存在Box*/
                    toolTipBox.fadeIn(300);
                }else {
                    /*不存在Box*/

                    if(me.attr('data-content')){
                        config.content = me.attr('data-content');
                        title = me.attr('title');
                        me.attr('title', '');
                    }else if(me.attr('title') && me.attr('title') !== '' && !/^[\s]*$/gi.test(me.attr('title'))){
                        /*判断字符串是否是空串或者空白串，若是的话则不显示toolTipBox*/
                        config.content = title = me.attr('title');
                        me.attr('title', '');
                    }else{
                        return false;
                    }

                    me.append('<div class="'+config._tooltipBoxClass+'">'+config.content+'</div>').
                                children('.'+config._tooltipBoxClass).css('display','block');
                    toolTipBox = me.children('.'+config._tooltipBoxClass);

                    /*设置参数*/
                    var elem_css_top  = me.position().top;
                    var elem_css_left = me.position().left;
                    var mouse_pageY = e.pageY;
                    var mouse_pageX = e.pageX;
                    var elem_pageY = me.offset().top;
                    var elem_pageX = me.offset().left;
                    var relativeY = mouse_pageY - elem_pageY;
                    var relativeX = mouse_pageX - elem_pageX;

                    if ( elem_css_left + relativeX + toolTipBox.width() > _getWindowWidth() - 50 ) {
                        toolTipBox.width(toolTipBox.width()*0.4+'px');
                        config._posX = elem_css_left + relativeX - toolTipBox.width()/2;
                    } else {
                        config._posX = elem_css_left + relativeX + 15;
                    }

                    if(elem_css_top + relativeY + toolTipBox.height() > _getWindowHeight()){
                        toolTipBox.height(toolTipBox.height()*0.4+'px');
                    }

                    toolTipBox.css({
                        'left':config._posX,
                        'top':elem_css_top + me.height(),
                        'color':config.color,
                        'backgroundColor':config.bgcolor,
                        'border':config.border,
                        'borderRadius':config.borderRadius+'px'
                    }).fadeIn(300);
                }

            },function () {
                me.children('.'+config._tooltipBoxClass).fadeOut(300, function () {
                    if (title)
                        me.attr('title', title);
                    toolTipBox.remove();
                });
            });
        });
    };

})(jQuery, window, document);
