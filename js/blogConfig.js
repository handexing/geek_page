/**
 * blog
 */
function blogConfig(){
	
	var self=this;
	
	this.init=function(){
		
		/*$.post(HOST_URL+'/blog/getBloglabelList',{"userId":0},function(data){
			var result = data.data;
			var html="";
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
				html = "<li onclick=\"add_blog_config.selectSystemType("+id+",'"+name+"')\" data-id=\""+id+"\" class=\"mdui-menu-item\"><a href=\"javascript:;\" class=\"mdui-ripple\">"+name+"</a></li>";
				$("#system_type").append(html);
			});
		});*/
        
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
