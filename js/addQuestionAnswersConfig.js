/**
 * 添加问与答管理
 */
function addQuestionAnswersConfig(){
	
	var self=this;
	var m_Editor;
	var user;
	
	this.init=function(){
		
		self.initMarkdown();
		
		$('#addLabelNodeBtn').bind('click',function(){
        	layer.open({
	            type: 2,
	            title: '选择标签节点',
	            offset: ['100px', '30%'],
	            shadeClose: true,
	            shade: false,
	            maxmin: true, //开启最大化最小化按钮
	            area: ['400px', '600px'],
	            content: 'labelDialogPage.html'
        	});
        });
        
        /**
         * 存为草稿
         */
        $('#saveDraftBtn').bind('click',function(){
        	self.saveQuestionAnswers(2);
        });
        
        /**
         * 发布
         */
        $('#saveQaBtn').bind('click',function(){
        	self.saveQuestionAnswers(3);
        });
        
        
	}
	
	/**
	 * 保存问与答信息
	 */
	this.saveQuestionAnswers=function(status){
		var labelId = $("#labelName").attr("data-id");
		var title = $.trim($("#title").val());
		var content = m_Editor.getMarkdown();
		
		user = $.cookie('geek_home_user'); 
		   
		if(labelId==null || labelId==""){
			layer.msg('请选择所属标签节点！', {icon: 7});
			return;
		}
		
		if(title==null || title==""){
			layer.msg('标题不能为空！', {icon: 7});
			return;
		}
		
		if(content==null || content==""){
			layer.msg('问与答内容不能为空！', {icon: 7});
			return;
		}
		
		if(user == null || user == "null"){
			layer.msg('请登录！', {icon: 7});
        	return;
        }
		user = $.parseJSON(user);
		
		var questionAnswers={};
		questionAnswers.userId = user.id;
		questionAnswers.labelId = labelId;
		questionAnswers.title = title;
		questionAnswers.content = content;
		questionAnswers.status = status;
		
		$.ajax({
			url:HOST_URL+'/questionAnswers/saveQuestionAnswers',  
            type: "POST",
            dataType: "json",//跨域ajax请求,返回数据格式为json
            cache: false,
            timeout: 10000,//请求超时时间,单位为毫秒
            async: true,
            global: false,//禁用Jquery全局事件
            scriptCharset: 'UTF-8',
            //processData : false,         // 告诉jQuery不要去处理发送的数据
            contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
			data:JSON.stringify(questionAnswers),
			success:function(responseData, status){
				if(responseData.success){
					$(window.parent.document).find("#m_Iframe").attr("src","view/questionsAnswersPage.html").attr("name","questionsAnswersPage");
				}else{
					layer.msg('操作失败！', {icon: 5});
				}
			}
		});
		
	}
	
	/**
	 * 初始化markdown编辑器
	 */
	this.initMarkdown=function(){
		editormd.emoji = {
            path  : "https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/",
            ext   : ".png"
        };
    
        editormd.twemoji = {
            path : "http://twemoji.maxcdn.com/72x72/",
            ext  : ".png"
        };
                
        m_Editor = editormd("editormd", {
			toolbarIcons : function() {
            	return ["undo", "redo", "|", "bold","del","italic" ,"quote","ucwords","uppercase","lowercase","|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","hr", "|","link"/*,"reference-link"*/,"image",
            			"code",/*"preformatted-text",*/"code-block","table","datetime", "emoji"/*,"html-entities"*/,"|",/*"goto-line",*/"search","preview", "watch",/* "|", "fullscreen",*/ "file", "faicon"]
       		},
			width  : "100%",
            height : 700,
            toc : true,
            emoji : true,       
            taskList : true,
            lineNumbers : false,
            placeholder: "输入您要问得内容...",
            path   : '../plugins/editor/lib/',
            imageUpload       : true,
		    imageFormats      : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
		    imageUploadURL 	  : HOST_URL+"/questionAnswers/uploadImage"
        });
	}
	
	self.init();
	
}
