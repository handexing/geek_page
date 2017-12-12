/**
 * 个人设置
 */
function settingConfig(){
	
	var self=this;
	var user;
	var colors = new Array("pink","red","orange","blue","brown","purple","teal","green","cyan","amber","deep-orange","lime");
	var modifyPersonAvatar = new mdui.Dialog("#uploadPhotoDialog");
       	
	this.init=function(){
		
		self.settingUserInfo();
		
		$('.check_in_lead_points').bind('click',function(){
			self.check_in_lead_points();
		});
       	
       	$('.modifyPersonInfo').bind('click',function(){
        	self.modifyPersonInfo();
        });
        
       	$('#my_blog').bind('click',function(){
			self.initBlog();
		});
		
		$('.modifyPersonAvatar').bind('click',function(){
        	self.modifyPersonAvatar();
        });
        
        $('.directModifyPwd').bind('click',function(){
        	self.directModifyPwd();
        })
        
		$('.blog_type_btn').bind('click',function(){
        	// 含标题
			mdui.prompt('请输入类型名称', '添加类型',
			  function (value) {
			  	if(value == null || value == ""){
	        		layer.msg("类型名称不能为空！");
	        		return;
        		}
			  	self.addBlogType(value);
			  },
			  function (value) {},
			  {
			    confirmText: '确认',
			    cancelText: '取消'
			  }
			);
        });
        
        $('.cancelUpload').bind('click',function(){
        	modifyPersonAvatar.close();
        });
        $('#avatarInput').bind('change',function(){
        	self.synchronizePhoto(this);
        });
        $(".uploadSave").bind('click',function(){
        	self.uploadSavePhoto(this);
        });
        
        //动态设置高度
		var m_Iframe = $(window.parent.document).find("#m_Iframe");
		m_Iframe.height(1140);
			
	}
	
	/**
	 * 签到领积分
	 */
	this.check_in_lead_points = function()
	{
		user = $.parseJSON($.cookie('geek_home_user'));//获取cookie中的用户信息
		var currentIntegral = $('#personalPoints').text();//获取当前用户积分
		
		$.ajax({
			url:HOST_URL+"/integral/signInForIntegral",  
	        type: "POST",
	        dataType: "json",//跨域ajax请求,返回数据格式为json
	        cache: false,
	        timeout: 10000,//请求超时时间,单位为毫秒
	        async: true,
	        global: false,//禁用Jquery全局事件
	        scriptCharset: 'UTF-8',
	        //processData : false,         // 告诉jQuery不要去处理发送的数据
	        contentType: 'application/x-www-form-urlencoded' ,//请求内容的MIMEType
			data:{"userName":user.userName,"currentIntegral":currentIntegral},
			xhrFields:{withCredentials:true},
			success:function(responseData, status){
				if(responseData.data.id == null && responseData.success == false)
				{
					layer.msg('今日已签到！', {icon: 5});
					return;
				}
				var result = responseData.data;//积分信息
				var current_integral = result.integral;//签到后积分
				$("#personalPoints").text(current_integral);//修改页面信息
				$("#signOrNot").text("今日已签到");//修改按钮为已签到
				var geekHomeUser = $.parseJSON($.cookie('geek_home_user'));
				geekHomeUser.integral = current_integral;//修改缓存后的信息
				geekHomeUser.signUpState = 1; //修改为已签到
				$.cookie('geek_home_user',JSON.stringify(geekHomeUser), {expires: 7});			
			},
			error: function () {
			      	layer.msg('签到失败！', {icon: 5});
			    } 
		});
	}
	
	/**
	 * 同步图片
	 */
	this.synchronizePhoto = function(node){
		var imgURL = ""; 
		try{  
            var file = null;  
            if(node.files && node.files[0] ){  
                file = node.files[0];  
            }else if(node.files && node.files.item(0)) {  
                file = node.files.item(0);  
            }  
            try{  
                imgURL =  file.getAsDataURL();  
            }catch(e){  
                imgRUL = window.URL.createObjectURL(file);  
            }  
        }catch(e){  
            if (node.files && node.files[0]) {  
                var reader = new FileReader();  
                reader.onload = function (e) {  
                    imgURL = e.target.result;  
                };  
                reader.readAsDataURL(node.files[0]);  
            }  
        } 
        creatImg(imgRUL);  
        return imgURL; 
	}
	
	/**
	 * 拼接img
	 */
	function creatImg(imgRUL){
		var preview_lg = $('.preview-lg');
		var avatar_wrapper = $(".avatar-wrapper");
        var textHtml = "<img src='"+imgRUL+"'width='414px' height='600px' class='mainImg'/>";
        avatar_wrapper.empty();
        avatar_wrapper.append(textHtml); 
        $('.mainImg').cropper({
        	aspectRatio: 16 / 16 ,
        	preview:preview_lg ,
        	/*crop: function(e) {
        		self.uploadSavePhoto(e);
		  	}*/
        });
    }
	
	this.uploadSavePhoto = function()
	{
		$('.mainImg').cropper('getCroppedCanvas').toBlob(function(blob){
			var formData = new FormData();
			var ImageURL = $('#avatarInput').val();
			var imageNames = ImageURL.split("\\");
			var imageName = imageNames[imageNames.length - 1];
			formData.append('croppedImage', blob);
			formData.append('imageName',imageName);
			formData.append('userName',$.parseJSON($.cookie('geek_home_user')).userName);
			$.ajax(HOST_URL+'/user/modifyAvatar', {
			    method: "POST",
			    data: formData,
			    processData: false,
			    contentType: false,
			    global: false,//禁用Jquery全局事件
			    success: function (responseData,status) {
			    	if(responseData.success == 1){
			    		var geekHomeUser = $.parseJSON($.cookie('geek_home_user'));
			    		geekHomeUser.headImgUrl = responseData.url;
			    		$(".head_img_url").attr("src","../"+responseData.url);
			    		parent.$('.headImg').children().attr('src',responseData.url);
			    		$.cookie('geek_home_user',JSON.stringify(geekHomeUser), {expires: 7});
			    	}
			    	layer.msg('修改成功！');
			    	modifyPersonAvatar.close();
			    },
			    error: function () {
			      	layer.msg('修改失败！', {icon: 5});
			    } 
			});
		});
	}
		
	/**
	 * 添加blog类型
	 */
	this.addBlogType=function(name){
		
		var blogType = {};
		blogType.userId = $("#userNum").text();
		blogType.name = name;
		blogType.status = 1;
		blogType.parentId = 0;
		blogType.sort = 0;
		
		$.ajax({
			url:HOST_URL+'/blog/saveLabel',  
	        type: "POST",
	        dataType: "json",//跨域ajax请求,返回数据格式为json
	        cache: false,
	        timeout: 10000,//请求超时时间,单位为毫秒
	        async: true,
	        global: false,//禁用Jquery全局事件
	        scriptCharset: 'UTF-8',
	        //processData : false,         // 告诉jQuery不要去处理发送的数据
	        contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
			data:JSON.stringify(blogType),
			success:function(responseData, status){
				if(responseData.data==1){
					self.initBlog();
					layer.msg('添加成功！');
				}else if(responseData.data==-1){
					layer.msg('相同名称已存在,请修改！');
					mdui.prompt('请输入类型名称', '添加类型',
					  function (value) {
					  	if(value == null || value == ""){
			        		layer.msg("类型名称不能为空！");
			        		return;
		        		}
					  	self.addBlogType(value);
					  },
					  function (value) {},
					  {
					    confirmText: '确认',
					    cancelText: '取消',
					    defaultValue:name
					  }
					);
				}else{
					layer.msg('操作失败！', {icon: 5});
				}
			}
		});
	}
	
	/**
	 * 初始化blog信息
	 */
	this.initBlog=function(){
		
		$.post(HOST_URL+'/blog/getBloglabelList',{"userId":user.id},function(data){
			var result = data.data;
			var html="";
			if(result.length>0){
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var name=result[index].name;
					var color = random(0,10);
					html += "<li data-id="+id+" onclick=\"setting_config.switchTab("+id+")\" class=\"mdui-list-item mdui-ripple\"><span class=\"mdui-chip-icon mdui-color-"+colors[color]+" mdui-m-r-1\">"+(index+1)+"</span><div class=\"mdui-list-item-content\">"+name+"</div></li>";
				});
				$("#blog_type_list").html(html);
				//初始化第一个选项得blog信息
				var labelId = $("#blog_type_list li").first().attr("data-id");
				self.getBlogByType(labelId,0,true);
				
			} else {
				var html="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
				$("#blogList").html(html);
			}
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
			
			if(result.length>0){
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
					html += "<li class=\"mdui-list-item mdui-ripple\" onclick=\"setting_config.blogDetailed("+id+")\">";
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
			}else{
				var html="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			
			html += "<div class=\"line\"></div>";
			$("#blogList").html(html);
			
			if(flag){
				self.pageable(id,data.totalPageNumber);
			}
			//动态设置高度
			var m_Iframe = $(window.parent.document).find("#m_Iframe");
			m_Iframe.height($("#settingPage").height()+20);
		});
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
	
	/**
	 * 跳转到blog详情页
	 */
	this.blogDetailed=function(id){
		$(window.parent.document).find("#m_Iframe").attr("src","view/blogDetailPage.html?id="+id).attr("name","blogDetailPage");
	}
	
	/**
	 * 显示用户信息
	 */
	this.settingUserInfo=function(){
		
		user = $.parseJSON($.cookie('geek_home_user'));
		
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
		$("#headImage").val(user.headImgUrl);
		$(".head_img_url").attr("src",IMAGE_URL+user.headImgUrl);
		if($("#personalPoints") == null){
			$("#personalPoints").text(0);
		}else{
			$("#personalPoints").text(user.integral);
		}
		if(user.signUpState == 0){
			$("#signOrNot").text("签到");
		}else{
			$("#signOrNot").text("今日已签到");
		}
		
		
		
		var user_info_html = "";
		
		if(user.company.length != 0){
			user_info_html += "<span>";
				user_info_html += "<button mdui-tooltip=\"{content: '所在公司'}\" class=\"mdui-btn mdui-btn-icon mdui-color-green-900 mdui-ripple\"><i class=\"Hui-iconfont\">&#xe643;</i></button>";
				user_info_html += "<span class=\"mdui-m-l-1\" style=\"font-weight: bold;color: gray;\">"+user.company+"</span>";
			user_info_html += "</span>";
		}
		
		if(user.address.length != 0){
			user_info_html += "<span class=\"mdui-m-l-1\">";
				user_info_html += "<button mdui-tooltip=\"{content: '所在地'}\" class=\"mdui-btn mdui-btn-icon mdui-color-deep-orange mdui-ripple\"><i class=\"Hui-iconfont\">&#xe671;</i></button>";
				user_info_html += "<span class=\"mdui-m-l-1\" style=\"font-weight: bold;color: gray;\">"+user.address+"</span>";
			user_info_html += "</span>";
		}
		
		if(user.gitHubUrl.length != 0){
			user_info_html += "<a class=\"mdui-m-l-1\">";
				user_info_html += "<button mdui-tooltip=\"{content: 'GitHub'}\" class=\"mdui-btn mdui-btn-icon mdui-color-red mdui-ripple\"><i class=\"Hui-iconfont\">&#xe6d1;</i></button>";
				user_info_html += "<span class=\"mdui-m-l-1\" style=\"font-weight: bold;color: gray;\">"+user.gitHubUrl+"</span>";
			user_info_html += "</a>";
		}
		
		if(user.webSiteUrl.length != 0){
			user_info_html += "<a class=\"mdui-m-l-1\">";
				user_info_html += "<button mdui-tooltip=\"{content: '个人网站'}\" class=\"mdui-btn mdui-btn-icon mdui-color-red-800 mdui-ripple\"><i class=\"Hui-iconfont\">&#xe67f;</i></button>";
				user_info_html += "<span class=\"mdui-m-l-1\" style=\"font-weight: bold;color: gray;\">"+user.webSiteUrl+"</span>";
			user_info_html += "</a>";
		}
		
		$(".user_info").html(user_info_html);

	}
	
	/**
	 * 直接修改密码
	 */
	
	this.directModifyPwd = function(){
		var userName = $("#userName").text();
		var oldPassword = $("#oldPassword").val();
		var newPassword = $("#newPassword").val();
		var newPasswordAgain = $("#newPasswordAgain").val();
		if(oldPassword == null || oldPassword == '' || newPassword == null || newPassword == '' || newPasswordAgain == null || newPasswordAgain == '')
    	{
    		layer.msg('验证码和信息不能为空！', {icon: 5});
    		return;
    	}
    	if(newPassword != newPasswordAgain)
    	{
    		layer.msg('两次输入密码不一致！', {icon: 5});
    		return;
    	}
    	verifyMessage = {};
		verifyMessage.userName = userName;
		verifyMessage.password = oldPassword;
		verifyMessage.newPassword = newPassword;
		verifyMessage.flag = 2;
		$.ajax({
			url:HOST_URL+'/user/modifyPersonPwd',  
            type: "POST",
            dataType: "json",//跨域ajax请求,返回数据格式为json
            cache: false,
            timeout: 10000,//请求超时时间,单位为毫秒
            async: true,
            global: false,//禁用Jquery全局事件
            scriptCharset: 'UTF-8',
            //processData : false,         // 告诉jQuery不要去处理发送的数据
            contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
			data:JSON.stringify(verifyMessage),
			xhrFields:{withCredentials:true},
			success:function(responseData, status){
				if(responseData.success){
					layer.msg('密码修改成功', {icon: 7});
				}else{
					layer.msg(responseData.errorMsg, {icon: 5});
				}
			}
		});
	}
	
	
	/**
	 * 修改个人信息
	 */
	this.modifyPersonInfo=function(){
		
		var id = $("#userNum").text();
		var userName = $("#userName").text();
		var email = $.trim($("#email").val());
		var phone = $.trim($("#phone").val());
		var company = $.trim($("#company").val());
		var webSiteUrl = $.trim($("#webSiteUrl").val());
		var address = $.trim($("#address").val());
		var gitHubUrl = $.trim($("#gitHubUrl").val());
		var brief = $.trim($("#my_brief").val());
		
		var user = {};
		user.id = id;
		user.userName = userName;
		user.email = email;
		user.phone = phone;
		user.company = company;
		user.webSiteUrl = webSiteUrl;
		user.address = address;
		user.gitHubUrl = gitHubUrl;
		user.brief = brief;
		user.headImgUrl = $("#headImage").val();;
		
		$.ajax({
			url:HOST_URL+'/user/modifyPersonInfo',  
            type: "POST",
            dataType: "json",//跨域ajax请求,返回数据格式为json
            cache: false,
            timeout: 10000,//请求超时时间,单位为毫秒
            async: true,
            global: false,//禁用Jquery全局事件
            scriptCharset: 'UTF-8',
            //processData : false,         // 告诉jQuery不要去处理发送的数据
            contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
			data:JSON.stringify(user),
			success:function(responseData, status){
				if(responseData.data.id!=null){
					$.cookie('geek_home_user',JSON.stringify(responseData.data), {expires: 7});
					self.settingUserInfo();
					layer.msg('修改成功！');
				}else{
					layer.msg('程序异常！', {icon: 5});
				}
			}
		});
	}
	
	/**
	 * 上传头像
	 */
	this.modifyPersonAvatar=function(){
		modifyPersonAvatar.open();
	}
	
	self.init();
	
}

//获取范围内的随机数
 function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}