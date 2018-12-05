class Car{
			constructor(){
				this.url = "http://localhost/xiangmu/data/list.json";
				this.load()
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					type:"get",
					success:function(res){
//						console.log(res)
						that.res = res;
						that.getCookie();
						that.remove();
					},
					dataType:"json"
				})
			}
			getCookie(){
				console.log(1111111)
				console.log($.cookie("goods"))
				this.goods = JSON.parse($.cookie("goods"))
				this.display()
			}
			display(){
				var str = "";
//				console.log(this.goods.length)
//				console.log(this.res.length)
				if (this.goods) {
					for(var i=0;i<this.res.length;i++){
						for(var j=0;j<this.goods.length;j++){
							if(this.res[i].gId == this.goods[j].id){
								str += `<tr>
											<td><input type="checkbox" class="acheck"></td>
											<td><img src="${this.res[i].img}"/></td>
											<td>${this.res[i].tit}</td>
											<td class="pri" data-pri="${this.res[i].price}">${this.res[i].price}</td>
											<td><input type="number" value="${this.goods[j].num}" min="1" id="num1"></td>
											<td><em data-index="${this.res[i].gId}">删除</em></td>
										</tr>`
							}
						}
					}
					$("tbody").html(str);
					this.addnum();
					this.changeprice();
					this.check();
					this.allcheck()
				}
			}
			remove(){
				var that = this;
				$("tbody").on("click","em",function(){
					var id = $(this).attr("data-index");
					$(this).parent().parent().remove()
					
					for(var i=0;i<that.goods.length;i++){
						if(that.goods[i].id == id){
							that.goods.splice(i,1)
						}
					}
					$.cookie("goods",JSON.stringify(that.goods));
					that.aupdate()
				})
				$("#allremove").on("click",function(){
					$("tbody").remove();
					$.cookie("goods",null);
					history.go(0)
				})
			}
			aupdate(){
					var str1=0;
					var str2=0;
					var acheck=$(".acheck");
					var pri=$(".pri")
					var anum=$(".pri").next("td").children()
					for(var i=0;i<this.goods.length;i++){
						if (acheck[i].checked==true) {
							str1+=parseInt(anum[i].value);
							$(".allnum").html(str1);
							str2+=parseFloat(pri[i].innerHTML.slice(1,8))
							$(".allprice").html("￥"+str2.toFixed(2))
						}else{
							$(".allprice").html(0);
							$(".allnum").html(0);
						}
					}
					this.allcheck()
			}
			addnum(){
				var that = this;
				$("tbody").on("input","#num1",function(){
					var acheck=$(".acheck");
					var id = $(this).parent().next("td").children("em").attr("data-index");
					var val = $(this).val();
					var pric=$(this).parent().prev("td").attr("data-pri").slice(1,5)
					$(this).parent().prev("td").html("￥"+(parseFloat(pric)*$(this).val()).toFixed(2))
					var str1=0;
					var str2=0;
					var pri=$(".pri")
					var anum=$(".pri").next("td").children()
					for(var i=0;i<that.goods.length;i++){
						if (acheck[i].checked==true) {
							str1+=parseInt(anum[i].value);
							$(".allnum").html(str1);
							str2+=parseFloat(pri[i].innerHTML.slice(1,8))
							$(".allprice").html("￥"+str2.toFixed(2))
						}
						if(that.goods[i].id == id){
							that.goods[i].num = val
						}
					}
					$.cookie("goods",JSON.stringify(that.goods));
				})
			}
			changeprice(){
				var pri=$(".pri");
				var anum=$(".pri").next("td").children()
				for(var i=0; i<pri.length;i++){
					pri[i].innerHTML="￥"+(parseInt(anum[i].value)*(pri[i].innerHTML.slice(1,8))).toFixed(2);
				}
			}
			check(){
				$("tbody").on("click",".acheck",function(){
					var acheck=$(".acheck");
					var str=0;
					var str1=0
					var pri=$(".pri");
					var anum=$(".pri").next("td").children()
					$(".allprice").html(0);
					$(".allnum").html(0);
					for(var i=0; i<acheck.length;i++){
						if (acheck[i].checked==true) {
							str+=parseInt(anum[i].value);
							$(".allnum").html(str)
							str1+=parseFloat(pri[i].innerHTML.slice(1,8))
							$(".allprice").html("￥"+str1.toFixed(2))
						}
						if (acheck[i].checked==false) {
							$("#quanxuan")[0].checked=false
						}
					}
				})
			}
			allcheck(){
				var anum=$(".pri").next("td").children()
				var pri=$(".pri")
				var acheck=$(".acheck")
				$("#quanxuan").on("click",function(){
					var str=0;
					var str1=0;
					for(var i=0; i<acheck.length;i++){
						if ($("#quanxuan")[0].checked==true) {	
							acheck[i].checked=$(this)[0].checked;	
							str+=parseInt(anum[i].value);
							$(".allnum").html(str)
							str1+=parseFloat(pri[i].innerHTML.slice(1,8))
							$(".allprice").html("￥"+str1.toFixed(2))
						}
					}
				})
			}
		}