;(function($){
	"use strict";
	$.fn.nav1=function(){
//		console.log(this)    //this就是nav这个对象，，就是$(".nav")
	this.children("ul").children("li").hover(function(){
//		console.log($(this))   //当前进入的li
			$(this).css({background: "#999"}).children("ul").stop().show(0).end().siblings().css({background:""}).children("ul").stop().hide(0)
		},function(){
			$(this).children("ul").stop().show(0).end().css({background:"#999"})
		})
	}

})(jQuery);
