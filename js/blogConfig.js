/**
 * blog
 */
function blogConfig(){
	
	var self=this;
	
	this.init=function(){
		
		$.post(HOST_URL+'/blog/getBloglabelList',{"userId":0},function(data){
			var result = data.data;
			var html="";
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
				html = "<div class=\"mdui-col-xs-12 mdui-col-sm-6 system_type\"><i class=\"Hui-iconfont\">&#xe6c1;</i><a href=\"javascript:void()\">"+name+"</a></div>";
				$("#blogType").append(html);
			});
		});
        
        self.pageable(123);
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
