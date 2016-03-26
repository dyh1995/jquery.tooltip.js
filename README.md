jquery.tooltip.js
==================================

在用户将指针放置在控件上时为用户显示提示信息，该插件基于jQuery

### How to use(使用方法)

        example:
             <a id='demoEl' title='demoEl' data-content='content'></a>
             $('#demoEl').tooltip({'color':'#000'});

        替换content为想要被tooltip展示的内容，在tooltip()内以传入options即可，例如文字，图片，网站，以及其他你能想到的东东~
        需要自己定义内容相关样式。


### Options(自定义属性)
* color         tooltip内容文字颜色
* bgcolor       tooltip背景颜色
* border        tooltip边框样式
* borderRadius  tooltip边框圆角

### Attention(注意事项)
*       插件内部默认会使用toolTipBox作为元素类名，为了避免代码冲突，请避免使用toolTipBox作为元素类名，
        或在插件内修改_tooltipBoxClass参数亦可。
*       内容显示优先级：
            data-content > title
            当data-content和title都为空时不会显示tooltip

