//登录
	class Sub{
		constructor(){
			this.delu();
		}
		delu(){
			let that=this;
			$("#btn2").on("click",function(){
				$.ajax({
					type:"get",
					url:"http://www.liyangyf.com/ctrl/login.php",
					async:true,
					data:{
						user:$("#user").val(),
						pass:$("#pass").val()
					},
					success:function(res){
						console.log(res)
						that.res=res;
						$.cookie("myuser",that.res)
//						console.log(JSON.parse($.cookie("user")))
						if ($.cookie("myuser")!="0" && $.cookie("myuser")) {
							location.href="index.html";
						}
						else{							
							alert("账号密码不正确，请重新输入")
						}
					}
				})
			})			
		}
	}
	