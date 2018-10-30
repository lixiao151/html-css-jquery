;(function($){
	"use strict";
	$.fn.banner=function(obj){
		let autoPlay = obj.autoPlay === false ? false : true;
		let delayTime=obj.delayTime||2000;
		let moveTime=obj.moveTime || 500;
		this.LOC={            
			index:0, 
			iNow:obj.items.length-1
		}
		var that=this;
		if (obj.list!=undefined && obj.list.length>0) {
			obj.list.on("click",function(){
				if (that.LOC.index<$(this).index()) {		
					that.LOC.move(1,$(this).index());   
				}
				if (that.LOC.index>$(this).index()) {
					that.LOC.move(-1,$(this).index())
				}
				
				that.LOC.index=$(this).index();  //把要去的位置设为当前的位置,,点击之后,点击的索引变成当前
			})
		}
		this.LOC.move=function(type,num){      //num就是要去的位置索引
				obj.items.eq(this.index).css({left:0}).stop().animate({left:-obj.items.eq(0).width()*type},moveTime).end().eq(num).css({left:obj.items.eq(0).width()*type}).stop().animate({left:0},moveTime)
				obj.list.removeClass("active").eq(num).addClass("active")   //当前去哪个那个变色
		}
		if (obj.left!=undefined && obj.left.length>0 && obj.right!=undefined && obj.right.length>0) {
			obj.left.on("click",function(){
				if (that.LOC.index==0) {           //要进来的
					that.LOC.index=obj.items.length-1;   //点击后的位置
					that.LOC.iNow=0;					//要走的
				}else{
					that.LOC.index--;
					that.LOC.iNow=that.LOC.index+1;    //点击left时，要走的总是要进来的下一个
				}
				that.LOC.btnmove(1);
			})
			obj.right.on("click",rightevent);
		}
		this.LOC.btnmove=function(type){
				obj.items.eq(that.LOC.iNow).css({left:0}).stop().animate({left:obj.items.eq(0).width()*type},moveTime).end().eq(that.LOC.index).css({left:-obj.items.eq(0).width()*type}).stop().animate({left:0},moveTime)
			if (obj.list!=undefined && obj.list.length>0) {
				obj.list.removeClass("active").eq(this.index).addClass("active");  //this就是this.LOC，谁进来谁的list变色；
			}
		}
		function rightevent(){
			if (that.LOC.index==obj.items.length-1) {
				that.LOC.index=0;
				that.LOC.iNow=obj.items.length-1;
			}else{
				that.LOC.index++;
				that.LOC.iNow=that.LOC.index-1;      //点击right时，要走的总比要进来的索引小1  ；
			}
			that.LOC.btnmove(-1);
//			obj.items.eq(that.LOC.iNow).css({left:0}).stop().animate({left:-obj.items.eq(0).width()}).end().eq(that.LOC.index).css({left:obj.items.eq(0).width()}).stop().animate({left:0});
//			obj.list.removeClass("active").eq(that.LOC.index).addClass("active");
		}
		if (autoPlay) {
			this.LOC.timer=setInterval(function(){
				rightevent()
			},delayTime)
			//			console.log(this)     //cont1对象
			this.hover(function(){
				clearInterval(that.LOC.timer)
			},function(){
				that.LOC.timer=setInterval(function(){
				rightevent()
				},delayTime)
			})
		}
	}
	
	
})(jQuery);




//$(".cont1").banner({
//				items:$(".cont1 .imgbox").children("img"),
//				left:$(".cont1 .btns").children("#prev"),
//				right:$(".cont1 .btns").children("#next"),
//				list:$(".cont1 .list").children("li"),
//				autoPlay:false,
//				delayTime:2000,
//				moveTime:500
//			});