/**
 * 首页管理
 */
function indexConfig(){
	
	var self=this;
	var fab = new mdui.Fab('#fab');
	var loginDialog = new mdui.Dialog('#loginDialog');
	var accountAndEmail = new mdui.Dialog('#accountAndEmail');
	var verifyEmailCode = new mdui.Dialog("#verifyEmailCode");
	var user = null;

	/**
	 * 登录按钮绑定enter键
	 */
	/*$(document).keypress(function(e){
		var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if(eCode == 13){
			self.userLogin();
		}
	});*/
	
	this.init=function(){
		
		self.checkUser();
		
		$("#m_Iframe").attr("src","view/indexPage.html").attr("name","indexPage");
		
		$('.logoBtn').bind('click',function(){
			$("#m_Iframe").attr("src","view/indexPage.html").attr("name","indexPage");
		});
		
		$('#indexPage').bind('click',function(){
			$("#m_Iframe").attr("src","view/indexPage.html").attr("name","indexPage");
		});
		
		
		$('#lableNodePage').bind('click',function(){
			$("#m_Iframe").attr("src","view/lableNodePage.html").attr("name","lableNodePage");
		});
		
		$('#questionsAnswersPage').bind('click',function(){
			$("#m_Iframe").attr("src","view/questionsAnswersPage.html").attr("name","questionsAnswersPage");
		});
		
		$('#openSourcePage').bind('click',function(){
			$("#m_Iframe").attr("src","view/openSourcePage.html").attr("name","openSourcePage");
		});
		
		$('#blogPage').bind('click',function(){
			$("#m_Iframe").attr("src","view/blogPage.html").attr("name","blogPage");
		});
		
		$('#specialPage').bind('click',function(){
			$("#m_Iframe").attr("src","view/specialPage.html").attr("name","specialPage");
		});
		
		/*$('.registerBtn').bind('click',function(){
        	self.userRegister();
        });*/
        
        $('.userLogin').bind('click',function(){
        	self.userLogin();
        });
        
        $('.headImg').bind('click',function(){
        	if(!self.checkUser()){
        		loginDialog.open();
        		return;
        	}
        });
        
        $('#logout').bind('click',function(){
        	$.cookie('geek_home_user', null);
        	var html = "<i class=\"mdui-icon material-icons\">&#xe853;</i>";
			$(".headImg").html(html);
			$(".user_more").hide();
			location.reload();
        });
        
        $('#add_open_source_btn').bind('click',function(){
        	if(!self.checkUser()){
        		layer.msg("登录后才可以操作！");
        		return;
        	}
        	$("#m_Iframe").attr("src","view/addOpenSource.html").attr("name","addOpenSource");
        });
        
        $('#add_blog_btn').bind('click',function(){
        	if(!self.checkUser()){
        		layer.msg("登录后才可以操作！");
        		return;
        	}
        	$("#m_Iframe").attr("src","view/addBlogPage.html").attr("name","addBlogPage");
        });
        
        $('#questions_answers_btn').bind('click',function(){
        	if(!self.checkUser()){
        		layer.msg("登录后才可以操作！");
        		return;
        	}
        	$("#m_Iframe").attr("src","view/addQuestionsAnswersPage.html").attr("name","addQuestionsAnswersPage");
        });
        
        $('#register').bind('click',function(){
        	document.querySelector('#loginDialog').classList.toggle('hover');
        });
        
        self.startCaptcha();
        
        $('#settingBtn').bind('click',function(){
        	$("#m_Iframe").attr("src","view/settingPage.html").attr("name","settingPage");
        });
        
        $('#forgetPsw').bind('click',function(){
        	accountAndEmail.open();
        });
        $('.sentCodeToEmail').bind('click',function(){
        	self.sendEmail();
        });
        $('.nextReturn').bind('click',function(){
        	accountAndEmail.close();
        	loginDialog.open();
        });
        $('.upStep').bind('click',function(){
        	verifyEmailCode.close();
        	accountAndEmail.open();
        });
        $('.codeNextStep').bind('click',function(){
        	self.modifyPersonPwd();
        });
        
        $('.userName').bind('blur',function(){
        	var userName = $.trim($(".userName").val());
        	if(userName==null || userName==""){
				layer.msg('用户名不能为空！');
				return;
			}
        	$.post(HOST_URL+'/user/checkUserName',{"userName":userName},function(data){
				if(data.success){
					if(data.data.id != null){
						layer.msg('用户名已存在，请修改！', {icon: 7});
					}
				} else{
					layer.msg('程序异常！', {icon: 5});
				}
			});
        });
        
        $('.email').bind('blur',function(){
        	var email = $.trim($(".email").val());
        	if(email==null || email==""){
				layer.msg('邮箱不能为空！');
				return;
			}
        	$.post(HOST_URL+'/user/checkEmail',{"email":email},function(data){
				if(data.success){
					if(data.data.id != null){
						layer.msg('邮箱已存在，请修改！', {icon: 7});
					}
				} else{
					layer.msg('程序异常！', {icon: 5});
				}
			});
        });
        
        $('#aboutMeBtn').bind('click',function(){
        	$(window.parent.document).find("#m_Iframe").attr("src","view/aboutMe.html").attr("name","aboutMe");
        });
        
        $('#missionBtn').bind('click',function(){
        	$(window.parent.document).find("#m_Iframe").attr("src","view/ourMission.html").attr("name","ourMission");
        });
        
        
        
	}
	
	/**
	 * 邮箱修改用户密码
	 */
	this.modifyPersonPwd=function()
	{
		var emailCode = $('.emailCode').val();
    	var emailPassword = $('.emailPassword').val();
    	var againEmailPassword = $('.againEmailPassword').val();
    	if(emailCode == null || emailCode == '' || emailPassword == null || emailPassword == '' || againEmailPassword == null || againEmailPassword == '')
    	{
    		layer.msg('验证码和信息不能为空！', {icon: 5});
    		return;
    	}
    	if(emailPassword != againEmailPassword)
    	{
    		layer.msg('两次输入密码不一致！', {icon: 5});
    		return;
    	}
		
		verifyMessage = {};
		verifyMessage.emailCode = emailCode;
		verifyMessage.password = emailPassword;
		verifyMessage.userName = $(".signName").val();
		verifyMessage.flag = 1;

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
					verifyEmailCode.close();
					loginDialog.open();
				}else{
					layer.msg(responseData.errorMsg, {icon: 5});
				}
			}
		});
	}
	
	
	
	/**
	 * 发送验证码到邮箱
	 */
	this.sendEmail = function()
	{
		var signName = $(".signName").val();
		var signEmail = $(".signEmail").val();
		user = {};
		user.userName = signName;
		user.email = signEmail;
		if(signName == null || signName==undefined || signName== '' || signEmail == null || signEmail==undefined || signEmail =='')
		{
			layer.msg('用户名和邮箱不能为空！', {icon: 5});
			return;
		}
		$.ajax({
			url:HOST_URL+'/user/getEmailCode',  
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
			xhrFields:{withCredentials:true},
			success:function(responseData, status){
				if(responseData.success){
					accountAndEmail.close();
					verifyEmailCode.open();
					layer.msg('验证码已发送到您邮箱，请注意查收！', {icon: 7});
				} else if(responseData.data.id ==null){
					layer.msg('用户名或邮箱错误！', {icon: 7});
				}else{
					layer.msg('操作失败！', {icon: 5});
				}
			}
		});
	}
	
	/**
	 * API1会检查极验云服务器是否能正常连接，将可用状态返回给客户端，并且缓存在session中。
	 */
	this.startCaptcha=function(){
//		$("#captcha").html("");
		$.ajax({
		    url: HOST_URL+"/user/startCaptcha?t=" + (new Date()).getTime(), // 加随机数防止缓存
		    type: "get",
		    dataType: "json",
		    success: function (data) {
		        initGeetest({
		            gt: data.gt,
		            challenge: data.challenge,
		            new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
		            offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
		            product: "float", // 产品形式，包括：float，popup
		            width: "100%"
		        }, registerHandler);
		    }
		});
	}
	
	var registerHandler = function (captchaObj) {
        $(".registerBtn").click(function (e) {
	        var result = captchaObj.getValidate();
	        if (!result) {
	            layer.msg('点击按钮进行验证！');
	            e.preventDefault();
	        }else{
	            self.userRegister();
	            captchaObj.reset(); // 调用该接口进行重置
	        }
            
        });
	    // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
	    captchaObj.appendTo("#captcha");
	    captchaObj.onReady(function () {
	        $("#wait").hide();
	    });
    };
	
	/**
	 * 检查用户是否存在
	 */
	this.checkUser=function(){
		user = $.cookie('geek_home_user'); 
		if(user == null || user == "null"){
        	return false;
        }
		user = $.parseJSON(user);
		$("#userId").val(user.id);
		$("#userName").val(user.userName);
		$("#headImgUrl").val(user.headImgUrl);
		$("#sex").val(user.sex);
		$("#email").val(user.email);
		$("#brief").val(user.brief);
		$("#birthday").val(user.birthday);
		$("#phone").val(user.phone);
		$("#createTime").val(user.createTime);
		
		var html = "<img class=\"mdui-img-circle\" src='"+user.headImgUrl+"' width=\"45\" height=\"45\"/>";
		$(".headImg").html(html);
		$(".user_more").show();
		$(".headImg").unbind("click");
		return true;
	}
	
	/**
	 * 用户注册
	 */
	this.userRegister=function(){

		var userName = $.trim($(".userName").val());
		var password = $.trim($(".password").val());
		var email = $.trim($(".email").val());
		
		if(userName==null || userName==""){
			layer.msg('用户名不能为空！');
			return;
		}
		
		if(email==null || email==""){
			layer.msg('邮箱不能为空！');
			return;
		}
		
		if(password==null || password==""){
			layer.msg('密码不能为空！');
			return;
		}
		
		var user={};
		user.userName = userName;
		user.password = password;
		user.email = email;
		
		$.ajax({
			url:HOST_URL+'/user/userRegister',  
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
				if(responseData.data.id==null){
					layer.msg('用户名已存在,请修改！', {icon: 7});
				} else if(responseData.data.id!=null){
					layer.msg('注册完成请登录！', {icon: 1});
					$(".returnLogin").trigger("click");
					$(".userName").val("");
					$(".password").val("");
				}else{
					layer.msg('操作失败！', {icon: 5});
				}
			}
		});
		
	}
	
	/**
	 * 用户登陆
	 */
	this.userLogin=function(){

		var userName = $.trim($(".name").val());
		var password = $.trim($(".pwd").val());
		
		if(userName==null || userName==""){
			layer.msg('用户名不能为空！');
			return;
		}
		
		if(password==null || password==""){
			layer.msg('密码不能为空！');
			return;
		}
		
		$.post(HOST_URL+'/user/userLogin',{"userName":userName,"password":password},function(data){
			
			if(data.success){
				
				var result = data.data;
					
				var html = "<img class=\"mdui-img-circle\" src='"+result.headImgUrl+"' width=\"40\" height=\"40\" style=\"border: 1px solid ghostwhite;\"/>";
				$(".headImg").html(html);
				$(".user_more").show();
				
				$("#userId").val(result.id);
				$("#userName").val(result.userName);
				$("#headImgUrl").val(result.headImgUrl);
				$("#sex").val(result.sex);
				$("#email").val(result.email);
				$("#brief").val(result.brief);
				$("#birthday").val(result.birthday);
				$("#phone").val(result.phone);
				$("#createTime").val(result.createTime);
				
				$.cookie('geek_home_user',JSON.stringify(result), {expires: 7});
				
				loginDialog.close();
				$(".headImg").unbind("click");
			} else{
				layer.msg(data.errorMsg, {icon: 5});
			}
		});
		
	}
	self.init();
	
}