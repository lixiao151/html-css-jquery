	class Detail{
			constructor(obj){
				this.url=obj.url;
				this.det=obj.det;
				this.load();
			}
			load(){
				let that=this;
				$.ajax({
					type:"get",
					url:this.url,
					success:function(res){
//						console.log(res.length)
					that.res=res;
					that.display();
					},
					dataType:"json"
				})
			}
			display(){
//				console.log(this.res[str])
//				console.log(this.res[str].tit)
				let str1="";
				str1 +=`
				<a href="index.html">首页</a>&nbsp;&nbsp;>>&nbsp;&nbsp;<a href="list.html">书写用品</a>&nbsp;&nbsp;>>&nbsp;&nbsp;<a href="detail.html">中性笔 中性笔芯</a>&nbsp;&nbsp;<b>${this.res[str].tit}</b>
			<div class="det1 layout">
				<div id="box1">
					<img src="${this.res[str].img}"/>
					<span class="span1"></span>
					<em></em>
				</div>
				<div id="box2">
					<img src="${this.res[str].img}" />
				</div>
				<div id="box3" goodsId="${this.res[str].gId}">
					<h2>${this.res[str].tit}</h2>
					<p>促销<span>${this.res[str].price}</span><span>已有<i>${this.res[str].pingjia}</i>人评价</span><span>上海地区满329元包邮活动</span></p>
					<p>配送：上海市宝山区； 快递5元</p>
					<input type="button" name="btn2" id="btn2" value="立即购买" />
					<input type="button" name="btn3" id="btn3" value="加入购物车" />
				</div>
				<ul id="msg">
					<li><img src="images/B8569E1957ce3e51.jpg"/></li>
					<li><img src="images/f3Wv4a9737890433.jpg"/></li>
					<li><img src="images/i5s94F10523937400.jpg"/></li>
					<li><img src="images/KGgfjP10946918356.jpg"/></li>
				</ul>
			</div> `;
				this.det.html(str1);
				this.init();
				this.addcar()
			}
		addcar(){
			let that = this;
				this.goods = []
				this.det.on("click","#btn3",function(){
					if ($.cookie("myuser")!="0" && $.cookie("myuser")) {	
						let goodsId = $(this).parent().attr("goodsId");
//						console.log(goodsId)
						if(!$.cookie("goods")){              //一个参数表示查询
	//						第一次存
							that.goods.push({
								id:goodsId,
								num:1
							})
							$.cookie("goods",JSON.stringify(that.goods))      //添加; 转成字符串存起来
						}else{
	//						不是第一次存
							that.goods = JSON.parse($.cookie("goods"));
	//						点击的是已经存进去的商品
							var onOff = false;
							for(var i=0;i<that.goods.length;i++){
								if(that.goods[i].id == goodsId){
									that.goods[i].num++
									onOff = true;
								}
							}
	//						当前这一次点击的是新商品
							if(!onOff){
								that.goods.push({
									id:goodsId,
									num:1
								})
							}
							$.cookie("goods",JSON.stringify(that.goods));
						}
//						console.log($.cookie("goods"))
					}else{
						location.href="sub.html";
					}
				})
		}
		init(){	
			$("#box1").mouseover(function(){
			$("#box2").stop().show();
			$(".span1").stop().show();
			$(document).mousemove(function(eve){
				var l=eve.offsetX-$(".span1").width()/2;
				var t=eve.offsetY-$(".span1").height()/2;
				if (l<0) l=0;
				if (t<0) t=0;
				if(l>$("#box1").width()-$(".span1").width())  l=$("#box1").width()-$(".span1").width();
				if(t>$("#box1").height()-$(".span1").height())  t=$("#box1").height()-$(".span1").height();
				$(".span1").css({left:l,top:t});
				var x=l/($("#box1").width()-$(".span1").width());
				var y=t/($("#box1").height()-$(".span1").height());
				$("#box2").find("img").css({
					left:-($("#box2").find("img").width()-$("#box2").width())*x,
					top:-($("#box2").find("img").height()-$("#box2").height())*y
				})
			})
		})
			$("#msg li").mouseover(function(){
	//			console.log($("#box1").children("img")[0].src)
	//			console.log($("#msg").children("li").eq($(this).index()).children("img")[0])
				$("#box1").children("img")[0].src=$("#msg").children("li").eq($(this).index()).children("img")[0].src
				$("#box2").children("img")[0].src=$("#msg").children("li").eq($(this).index()).children("img")[0].src
			})
			$("#box1").mouseout(function(){
				$("#box2").stop().hide();
				$(".span1").stop().hide();
			})
			}
	}