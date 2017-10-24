/**
 * 问与答详情页
 */
function questionAnswersDetailConfig(){
	
	var self=this;
	var m_Editor;
	var questionId;
	
	this.init=function(){
		
		questionId = getUrlVars()['id'];
		
		self.initContent(questionId);
		
		self.browseCnt(questionId);
		self.pageable(1,123);
		
		 /**
         * 存为草稿
         */
        $('#collectBtn').bind('click',function(){
          	var id = $('#collectBtn').attr("data-id");
          	/*<i class="mdui-icon material-icons">&#xe87e;</i>    空心
          	<i class="mdui-icon material-icons">&#xe87d;</i>*/
          	
          	$('#collectBtn').html("<i class=\"mdui-icon material-icons\">&#xe87d;</i>");
        });
        
        $('#commentContent').bind('keyup',function(event){
          	if (event.shiftKey &&event.keyCode == 50){ 
	          	alert('你按下了@'); 
	        } 
        });
        
        
        
	}

	/**
	 * 初始化页面内容
	 */
	this.initContent=function(questionId){
       $.post(HOST_URL+"/questionAnswers/getQuestionAnswersById",{"id":questionId},function(data){
			if(data.success){
				$("#title").text(data.data.title);
				$("#userName").text(data.data.userName);
				$("#createTime").text(data.data.createTime);
				$("#head_img").attr("src","../"+data.data.headImgUrl)
				$("#collectBtn").attr("data-id",data.data.id)
				$("#browseCount").text(data.data.browseCount+"次点击");
				$("#content").val(data.data.content);
				$("#labelName").text(data.data.labelName);
				self.initMarkdown();
				
			}
		});
	}
	
	/**
	 * 初始化markdown编辑器
	 */
	this.initMarkdown=function(){
		
       m_Editor = editormd.markdownToHTML("editormd", {
            htmlDecode      : "style,script,iframe", 
            emoji           : true,
            taskList        : true,
            tex             : true,  // 默认不解析
            flowChart       : true,  // 默认不解析
            sequenceDiagram : true,  // 默认不解析
        });
	}
	
	/**
	 * 浏览量+1
	 */
	this.browseCnt=function(questionId){
       $.post(HOST_URL+"/questionAnswers/addQuestionAnswersBrowseCnt",{"id":questionId},function(data){
			
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
		    		//self.initTabDataList(labelId,obj.curr-1,false);
		    	}
		  	});
  
		});
	}
	
	self.init();
	
}
