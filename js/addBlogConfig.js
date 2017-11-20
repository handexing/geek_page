/**
 * 添加bloh
 */
function addBlogConfig(){
	
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
        	self.saveBlog(2);
        });
        
        /**
         * 发布
         */
        $('#saveQaBtn').bind('click',function(){
        	self.saveBlog(3);
        });
        
        user = $.cookie('geek_home_user'); 
        user = $.parseJSON(user);
        
        $.post(HOST_URL+'/blog/getBloglabelList',{"userId":user.id},function(data){
			var result = data.data;
			var html="";
			
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
				html = "<li onclick=\"add_blog_config.selectType("+id+",'"+name+"')\" data-id=\""+id+"\" class=\"mdui-menu-item\"><a href=\"javascript:;\" class=\"mdui-ripple\">"+name+"</a></li>";
				$("#menu").append(html);
			});
			
		});
		
		
		$.post(HOST_URL+'/blog/getBloglabelList',{"userId":0},function(data){
			var result = data.data;
			var html="";
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
				html = "<li onclick=\"add_blog_config.selectSystemType("+id+",'"+name+"')\" data-id=\""+id+"\" class=\"mdui-menu-item\"><a href=\"javascript:;\" class=\"mdui-ripple\">"+name+"</a></li>";
				$("#system_type").append(html);
			});
		});
        
        
	}
	
	this.selectSystemType=function(id,name){
		$("#systemTypeName").text(name);
		$("#systemTypeName").attr("data-id",id);
	}
	
	this.selectType=function(id,name){
		$("#typeName").text(name);
		$("#typeName").attr("data-id",id);
	}
	
	/**
	 * 保存blog信息
	 */
	this.saveBlog=function(status){
		
		var systemTypeId = $("#systemTypeName").attr("data-id");
		var typeId = $("#typeName").attr("data-id");
		var title = $.trim($("#title").val());
		var subTitle = $.trim($("#subTitle").val());
		var content = m_Editor.getMarkdown();
		
		if(systemTypeId==null || systemTypeId==""){
			layer.msg('请选择所属大类型！');
			return;
		}
		
		if(typeId==null || typeId==""){
			layer.msg('请选择所属类型！');
			return;
		}
		
		if(title==null || title==""){
			layer.msg('标题不能为空！');
			return;
		}
		
		if(subTitle==null || subTitle==""){
			layer.msg('副标题不能为空！');
			return;
		}
		
		if(content==null || content==""){
			layer.msg('内容不能为空！');
			return;
		}
		
		
		var blog={};
		blog.typeId = typeId;
		blog.title = title;
		blog.subtitle = subTitle;
		blog.content = content;
		blog.status = status;
		blog.systemTypeId = systemTypeId;
		blog.userId = user.id;
		
		$.ajax({
			url:HOST_URL+'/blog/saveBlog',  
            type: "POST",
            dataType: "json",//跨域ajax请求,返回数据格式为json
            cache: false,
            timeout: 10000,//请求超时时间,单位为毫秒
            async: true,
            global: false,//禁用Jquery全局事件
            scriptCharset: 'UTF-8',
            //processData : false,         // 告诉jQuery不要去处理发送的数据
            contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
			data:JSON.stringify(blog),
			success:function(responseData, status){
				if(responseData.success){
					layer.msg('(●ˇ∀ˇ●)再来一篇！');
					$(window.parent.document).find("#m_Iframe").attr("src","view/addBlogPage.html").attr("name","addBlogPage");
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
            height : 650,
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
