/**
 * 添加问与答管理
 */
function addQuestionAnswersConfig(){
	
	var self=this;
	
	this.init=function(){
		
		self.initMarkdown();
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
            path   : '../plugins/editor/lib/'
        });
	}
	
	self.init();
	
}
