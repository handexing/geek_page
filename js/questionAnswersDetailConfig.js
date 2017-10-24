/**
 * 问与答详情页
 */
function questionAnswersDetailConfig(){
	
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
        
        self.pageable(1,12);
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
