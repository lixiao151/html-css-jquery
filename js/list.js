class Page{
	constructor(obj){
		this.url=obj.url;
		this.page=obj.page;
		this.cont=obj.cont;
		this.num=obj.num;
		this.index=0;
		this.init();
	}
	
	init(){
		let that=this;
		this.load();
	}
	load(){
		let that=this;
		$.ajax({
			type:"get",
			url:this.url,
			success:function(res){
//				console.log(res)
				that.res=res;
				that.display();
				that.createpage();
			},
			dataType:"json"
		})
	}
	createpage(){
		let that=this;
//		console.log(this.res.length)
		this.page.pagination(this.res.length,{
			items_per_page:this.num,
			num_display_entries:8,
			num_edge_entries:2,
			prev_text:"上一页",
			next_text:"下一页",
			callback:function(index){
				that.index=index;
				that.display();
				that.init2();
			}
		})
	}
	display(){
		let str="";
		for(let i=this.num*this.index; i<this.num*this.index+this.num;i++){
			if (i<this.res.length) {
				str+=`<li>
							<div class="goodlist" gid="${this.res[i].gId}">
								<img data-original
="${this.res[i].img}" title="${this.res[i].tit}" />
								<p>${this.res[i].price}</p>
								<p><a  target="_blank" title="${this.res[i].tit}">${this.res[i].tit}                
		                         </a></p>
		                         <p>${this.res[i].pingjia}</p>
							</div>
						</li>`;
			}
			this.cont.html(str);
			$(".listbiao img").lazyload({effect : "fadeIn"})
		}
	}
	init2(){
		let that=this;
		let glist=document.querySelectorAll(".goodlist");
		for(let i=0; i<glist.length; i++){
			glist[i].onclick=function(){
//				console.log(that.num*that.index+parseInt(that.res[i].gId))
				location.href="detail.html?"+(parseInt(that.res[i].gId)+that.num*that.index)
			}
		}
	}
}
