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
        	self.saveQuestionAnswers(2);
        });
        
        /**
         * 发布
         */
        $('#saveQaBtn').bind('click',function(){
        	self.saveQuestionAnswers(3);
        });
        
        self.initSelect();
        
	}
	
	this.initSelect=function(){
		$.post(HOST_URL+"/openSource/getOpenSourcelabelList",{"size":100000},function(data){
			var result = data.data;
			var html="";
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
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
