!function(e){e.fn.autogrow=function(t){function i(i){var n,a=e(this),l=a.innerHeight(),s=this.scrollHeight,c=a.data("autogrow-start-height")||0;if(l<s)this.scrollTop=0,t.animate?a.stop().animate({height:s},t.speed):a.innerHeight(s);else if(!i||8==i.which||46==i.which||i.ctrlKey&&88==i.which)if(l>c){n=a.clone().addClass(t.cloneClass).css({position:"absolute",zIndex:-10,height:""}).val(a.val()),a.after(n);do{s=n[0].scrollHeight-1,n.innerHeight(s)}while(s===n[0].scrollHeight);s++,n.remove(),a.focus(),s<c&&(s=c),l>s&&t.animate?a.stop().animate({height:s},t.speed):a.innerHeight(s)}else a.innerHeight(c)}var n=e(this).css({overflow:"hidden",resize:"none"}),a=n.selector,l={context:e(document),animate:!0,speed:200,fixMinHeight:!0,cloneClass:"autogrowclone",onInitialize:!1};return t=e.isPlainObject(t)?t:{context:t||e(document)},t=e.extend({},l,t),n.each(function(n,a){var l,s;(a=e(a)).is(":visible")||parseInt(a.css("height"),10)>0?l=parseInt(a.css("height"),10)||a.innerHeight():(s=a.clone().addClass(t.cloneClass).val(a.val()).css({position:"absolute",visibility:"hidden",display:"block"}),e("body").append(s),l=s.innerHeight(),s.remove()),t.fixMinHeight&&a.data("autogrow-start-height",l),a.css("height",l),t.onInitialize&&a.length&&i.call(a[0])}),t.context.on("keyup paste",a,i),n}}(jQuery),$(document).ready(function(){$("textarea").autogrow({onInitialize:!0}),$(".circle--clone--list").on("click",".circle--clone--add",function(){var e=$(this).parent("li"),t=e.clone();e.after(t),t.find("input, textarea, select").val(""),t.find("*:first-child").focus()}),$(".circle--clone--list").on("click","li:not(:only-child) .circle--clone--remove",function(){$(this).parent("li").remove()}),$(".circle--pill--list a").click(function(){$(".circle--pill--list a").removeClass("selected"),$(this).addClass("selected")}),$(".circle--select select").focus(function(){$(this).parent().addClass("focus")}).blur(function(){$(this).parent().removeClass("focus")}),$(".clickable-row").click(function(){var e=$(this).data("href"),t=$(this).data("target");$(this).attr("data-target")?window.open(e,t):window.open(e,"_self")});var e=$(".circle--input--file"),t=e.data("text"),i=e.data("state");e.wrap(function(){return"<a class='button "+i+"'>"+t+"</div>"})});
//# sourceMappingURL=global.js.map