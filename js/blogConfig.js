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
        
        
        self.initBlogData(0,true);
        
	}
	
	this.initBlogData=function(pageNum,flag){
		
		$.post(HOST_URL+"/blog/getAllBlogList",{"page":pageNum,"rows":10},function(data){
			
			var result = data.data;
			var html="";
			
			if(result.length>0){
				console.log(data);
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var browseCount=result[index].browseCount;
					var collectCount=result[index].collectCount;
					var headImgUrl=result[index].headImgUrl;
					var labelId=result[index].labelId;
					var title=result[index].title;
					var userId=result[index].userId;
					var userName=result[index].userName;
					var labelName=result[index].labelName;
					var createTime=result[index].createTime;
					var commentCnt=result[index].commentCnt;
					
					createTime = createTime.replace(/ /,"T");
				
				});
			}else{
				var html="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			
//			$("#q_a_list_"+labelId).html(html);
	  
			if(flag){
				self.pageable(data.totalPageNumber);
			}
			
			$(".timeago").timeago();
		});
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
					self.initBlogData(obj.curr-1,false);
		    	}
		  	});
  
		});
	}
	
	self.init();
	
}
