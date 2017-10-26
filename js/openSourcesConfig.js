/**
 * 开源管理
 */
function openSourcesConfig(){
	
	var self=this;
	
	this.init=function(){
        self.pageable(123);
	}

	//开源详情页
	this.openSourceDetail=function(){
		$(window.parent.document).find("#m_Iframe").attr("src","view/openSourceDetailPage.html").attr("name","openSourceDetailPage");
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
