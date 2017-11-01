/**
 * 个人设置
 */
function settingConfig(){
	
	var self=this;
	var user = null;
	var colors = new Array("pink","red","orange","blue","brown","purple","teal","green","cyan","amber","deep-orange","lime")
	
	this.init=function(){
		
		self.settingUserInfo();
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
				html += "<li data-id="+id+" onclick=\"setting_config.getBlogByType("+id+")\" class=\"mdui-list-item mdui-ripple\"><span class=\"mdui-chip-icon mdui-color-"+colors[color]+" mdui-m-r-1\">"+(index+1)+"</span><div class=\"mdui-list-item-content\">"+name+"</div></li>";
			});
			$("#blog_type_list").html(html);
			
			//初始化第一个选项得blog信息
			var labelId = $("#blog_type_list li").first().attr("data-id");
			self.getBlogByType(labelId);
			
		});
		
	}
	
	/**
	 * 单机切换blog信息
	 */
	this.getBlogByType=function(id){
		alert("初始化分页信息");		
	}
	
	/**
	 * 显示用户信息
	 */
	this.settingUserInfo=function(){
		
		user = $.cookie('geek_home_user'); 
		user = $.parseJSON(user);
		
		$("#userName").text(user.userName);
		$("#userNum").text(user.id);
		$("#createTime").text(user.createTime);
		$("#brief").text(user.brief);
		$("#email").val(user.email);
		$("#phone").val(user.phone);
		$("#my_brief").val(user.brief);
		$("#company").val(user.company);
		$("#address").val(user.address);
		$("#webSiteUrl").val(user.webSiteUrl);
		$("#gitHubUrl").val(user.gitHubUrl);
		$("#head_img_url").attr("src","../"+user.headImgUrl);
		
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
	
	//分页
	this.pageable=function(totalPageNumber){
		layui.use(['laypage', 'layer'], function(){
  			var laypage = layui.laypage;
  			layer = layui.layer;
		  	laypage({
		    	cont: 'paging',
		    	pages: totalPageNumber, //得到总页数
		    	jump: function(obj){
					//self.initCommentContent(questionId,obj.curr-1,false);
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