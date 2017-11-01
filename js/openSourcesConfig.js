/**
 * 开源管理
 */
function openSourcesConfig(){
	
	var self=this;
	
	this.init=function(){
        self.pageable(123);
        
        self.initTab();
	}

	//初始化tab
	this.initTab=function(){
		
		var types = new Array();
		types.push(2);
		
		$.post(HOST_URL+"/openSource/getOpenSourcelabelList",{"types":types},function(data){
			
			var result = data.data;
			var tab="";
			var tabContent="";
			
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].lableName;
				tab = "<a href='#tab_"+id+"' class=\"mdui-ripple\" data-id="+id+">"+name+"</a>";
				$(".mdui-tab").append(tab);
				
				tabContent = "<div id='tab_"+id+"'></div>";
				$("#tab_content").append(tabContent);
				
				if(index == 10){//显示10条
					return false;
				}
				
			});
			
			tab = "<a href='#tab_0' class=\"mdui-ripple\" data-id=0>全部</a>";
			$(".mdui-tab").append(tab);
			
	  		var inst = new mdui.Tab('.mdui-tab');
			inst.show(0);
			
		});
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
