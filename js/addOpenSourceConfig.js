/**
 * 添加open source
 */
function addOpenSourceConfig(){
	
	var self=this;
	var m_Editor;
	var user;
	
	var inst = new mdui.Menu('#addTypeBtn', '#menu');
	
	this.init=function(){
		
		self.initMarkdown();
		
		$('#addTypeBtn').bind('click',function(){
        	 inst.open();
        });
        
        /**
         * 存为草稿
         */
        $('#saveDraftBtn').bind('click',function(){
        	self.saveOpenSource(2);
        });
        
        /**
         * 发布
         */
        $('#saveQaBtn').bind('click',function(){
        	self.saveOpenSource(3);
        });
        
        self.initSelect();
        
	}
	
	/**
	 * 保存saveOpenSource信息
	 */
	this.saveOpenSource=function(status){
		
		var labelId = $("#typeName").attr("data-id");
		var title = $.trim($("#title").val());
		var subTitle = $.trim($("#subTitle").val());
		var content = m_Editor.getMarkdown();
		
		if(labelId==null || labelId==""){
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
		
		var openSource={};
		openSource.labelId = labelId;
		openSource.title = title;
		openSource.subtitle = subTitle;
		openSource.content = content;
		openSource.status = status;
		
		$.ajax({
			url:HOST_URL+'/openSource/saveOpenSource',  
            type: "POST",
            dataType: "json",//跨域ajax请求,返回数据格式为json
            cache: false,
            timeout: 10000,//请求超时时间,单位为毫秒
            async: true,
            global: false,//禁用Jquery全局事件
            scriptCharset: 'UTF-8',
            //processData : false,         // 告诉jQuery不要去处理发送的数据
            contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
			data:JSON.stringify(openSource),
			success:function(responseData, status){
				if(responseData.success){
					layer.msg('(●ˇ∀ˇ●)再来一篇！');
					$(window.parent.document).find("#m_Iframe").attr("src","view/addOpenSource.html").attr("name","addOpenSource");
				}else{
					layer.msg('操作失败！', {icon: 5});
				}
			}
		});
		
	}
	
	this.initSelect=function(){
		var types = new Array();
		types.push(2);
		$.post(HOST_URL+"/openSource/getOpenSourcelabelList",{"types":types},function(data){
			var result = data.data;
			var html="";
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].lableName;
				html = "<li onclick=\"add_open_source_config.selectOpenSourceType("+id+",'"+name+"')\" data-id=\""+id+"\" class=\"mdui-menu-item\"><a href=\"javascript:;\" class=\"mdui-ripple\">"+name+"</a></li>";
				$("#menu").append(html);
			});
		});
	}
	
	this.selectOpenSourceType=function(id,name){
		$("#typeName").text(name);
		$("#typeName").attr("data-id",id);
		
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
