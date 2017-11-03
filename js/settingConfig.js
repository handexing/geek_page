/**
 * 个人设置
 */
function settingConfig(){
	
	var self=this;
	var user = null;
	var colors = new Array("pink","red","orange","blue","brown","purple","teal","green","cyan","amber","deep-orange","lime")
	
	this.init=function(){
		
		self.settingUserInfo();
       	
       	$('.modifyPersonInfo').bind('click',function(){
        	self.modifyPersonInfo();
        });
       	self.pageable(123);
       	
       	$('#my_blog').bind('click',function(){
			self.initBlog();
		});
	}
	
	/**
	 * 初始化blog信息
	 */
	this.initBlog=function(){
		$.post(HOST_URL+'/blog/getBloglabelList',{"type":4,"userId":user.id},function(data){
			var result = data.data;
			var html="";
			
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].lableName;
				var color = random(0,10);
				html += "<li data-id="+id+" onclick=\"setting_config.switchTab("+id+")\" class=\"mdui-list-item mdui-ripple\"><span class=\"mdui-chip-icon mdui-color-"+colors[color]+" mdui-m-r-1\">"+(index+1)+"</span><div class=\"mdui-list-item-content\">"+name+"</div></li>";
			});
			$("#blog_type_list").html(html);
			
			//初始化第一个选项得blog信息
			var labelId = $("#blog_type_list li").first().attr("data-id");
			self.getBlogByType(labelId,0,true);
			
		});
		
	}
	
	/**
	 * 切换tab
	 */
	this.switchTab=function(id){
		self.getBlogByType(id,0,true);
	}
	
	/**
	 * 获取blog分页数据
	 */
	this.getBlogByType=function(id,pageNum,flag){
		
		$.post(HOST_URL+'/blog/getBlogList',{"labelId":id,"userId":user.id,"page":pageNum,"rows":10},function(data){
			var result = data.data;
			var html="";
			console.log(result);
			
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var title=result[index].title;  
				var subtitle=result[index].subtitle;  
				var bannerImg=result[index].bannerImg;  
				var status=result[index].status;  
				var collectCount=result[index].collectCount;  
				var browseCount=result[index].browseCount;  
				var createTime=result[index].createTime;  
				var updateTime=result[index].updateTime;  
				var commentCnt=result[index].commentCnt;  
				
				html += "<div class=\"line\"></div>";
				html += "<li class=\"mdui-list-item mdui-ripple\">";
				html += "<div class=\"mdui-list-item-content\">";
	      		html += "<div class=\"mdui-list-item-title\">"+title+"</div>";
	      		html += "<div class=\"mdui-list-item-text mdui-list-item-one-line\">"+subtitle+"</div>";
		      	html += "<div class=\"mdui-card-actions mdui-m-t-1\">";
				html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe725;</i><span style=\"font-size: 12px;color: grey;\">"+browseCount+"</span>&nbsp;&nbsp;&nbsp;";
				html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe69e;</i><span style=\"font-size: 12px;color: grey;\">"+collectCount+"</span>&nbsp;&nbsp;&nbsp;";
				html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe622;</i><span style=\"font-size: 12px;color: grey;\">"+commentCnt+"</span>";
				html += "</div>";
	    		html += "</div>";
				html += "</li>";
			});
			
			html += "<div class=\"line\"></div>";
			$("#blogList").html(html);
			
			if(flag){
				self.pageable(id,data.totalPageNumber);
			}
			
		});
	}
	
	/**
	 * 显示用户信息
	 */
	this.settingUserInfo=function(user){
		//因为修改信息和点击个人信息同时调用，所以给个判空，null就是点击，非空就是修改信息
		if(user == null)
		{
			user = $.cookie('geek_home_user'); 
			user = $.parseJSON(user);
			$("#userName").text(user.userName);
			$("#userNum").text(user.id);
			$("#createTime").text(user.createTime);
		}
		//需要修改cookie中的信息
		userNew = $.cookie('geek_home_user'); 
		userNew = $.parseJSON(userNew);
		userNew.brief = user.brief;
		userNew.email = user.email;
		userNew.phone = user.phone;
		userNew.my_brief = user.brief;
		userNew.company = user.company;
		userNew.address = user.address;
		userNew.webSiteUrl = user.webSiteUrl;
		userNew.gitHubUrl = user.gitHubUrl;
		$.cookie('geek_home_user', JSON.stringify(userNew))
		
		$("#brief").text(user.brief);
		$("#email").val(user.email);
		$("#phone").val(user.phone);
		$("#my_brief").val(user.brief);
		$("#company").val(user.company);
		$("#address").val(user.address);
		$("#webSiteUrl").val(user.webSiteUrl);
		$("#gitHubUrl").val(user.gitHubUrl);
		
		var user_info_html = "";
		
		if(user.company != null || user.company != ""){
			user_info_html += "<span>";
				user_info_html += "<button mdui-tooltip=\"{content: '所在公司'}\" class=\"mdui-btn mdui-btn-icon mdui-color-green-900 mdui-ripple\"><i class=\"Hui-iconfont\">&#xe643;</i></button>";
				user_info_html += "<span class=\"mdui-m-l-1\" style=\"font-weight: bold;color: gray;\">"+user.company+"</span>";
			user_info_html += "</span>";
		}
		
		if(user.address != null || user.address != ""){
			user_info_html += "<span class=\"mdui-m-l-1\">";
				user_info_html += "<button mdui-tooltip=\"{content: '所在地'}\" class=\"mdui-btn mdui-btn-icon mdui-color-deep-orange mdui-ripple\"><i class=\"Hui-iconfont\">&#xe671;</i></button>";
				user_info_html += "<span class=\"mdui-m-l-1\" style=\"font-weight: bold;color: gray;\">"+user.address+"</span>";
			user_info_html += "</span>";
		}
		
		if(user.gitHubUrl != null || user.gitHubUrl != ""){
			user_info_html += "<a class=\"mdui-m-l-1\">";
				user_info_html += "<button mdui-tooltip=\"{content: 'GitHub'}\" class=\"mdui-btn mdui-btn-icon mdui-color-red mdui-ripple\"><i class=\"Hui-iconfont\">&#xe6d1;</i></button>";
				user_info_html += "<span class=\"mdui-m-l-1\" style=\"font-weight: bold;color: gray;\">"+user.gitHubUrl+"</span>";
			user_info_html += "</a>";
		}
		
		if(user.webSiteUrl != null || user.webSiteUrl != ""){
			user_info_html += "<a class=\"mdui-m-l-1\">";
				user_info_html += "<button mdui-tooltip=\"{content: '个人网站'}\" class=\"mdui-btn mdui-btn-icon mdui-color-red-800 mdui-ripple\"><i class=\"Hui-iconfont\">&#xe67f;</i></button>";
				user_info_html += "<span class=\"mdui-m-l-1\" style=\"font-weight: bold;color: gray;\">"+user.webSiteUrl+"</span>";
			user_info_html += "</a>";
		}
		
		$(".user_info").html(user_info_html);
		
	}
	
	/**
	 * 修改个人信息
	 */
	this.modifyPersonInfo=function()
	{
		userT = $.cookie('geek_home_user'); 
		userT = $.parseJSON(userT);
		var email = $("#email").val();
		var phone = $("#phone").val();
		var company = $("#company").val();
		var webSiteUrl = $("#webSiteUrl").val();
		var address = $("#address").val();
		var gitHubUrl = $("#gitHubUrl").val();
		var my_brief = $("#my_brief").val();
		var user = {};
		user.email = email;
		user.phone = phone;
		user.company = company;
		user.webSiteUrl = webSiteUrl;
		user.address = address;
		user.gitHubUrl = gitHubUrl;
		user.brief = my_brief;
		user.id = userT.id;
		$.post(HOST_URL+'/user/modifyPersonInfo',user,function(data)
		{
			if(data.success)
			{
				alert("修改成功！");
				self.settingUserInfo(data.data);
			} 
			else
			{
				layer.msg('程序异常！', {icon: 5});
			}				
	//分页
	this.pageable=function(labelId,totalPageNumber){
		layui.use(['laypage', 'layer'], function(){
  			var laypage = layui.laypage;
  			layer = layui.layer;
		  	laypage({
		    	cont: 'paging',
		    	pages: totalPageNumber, //得到总页数
		    	jump: function(obj){
					self.getBlogByType(labelId,obj.curr-1,false);
		    	}
		  	});
 
		});
	}
	
	self.init();
	
}

//获取范围内的随机数
 function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}