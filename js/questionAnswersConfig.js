/**
 * 问与答管理
 */
function questionAnswersConfig(){
	
	var self=this;
	
	this.init=function(){
		
		self.initTab();

	}
	
	/**
	 * 初始化列表信息
	 */
	this.initTabDataList=function(labelId,pageNum,flag){
		$.post(HOST_URL+"/questionAnswers/questionAnswersList",{"labelId":labelId,"page":pageNum},function(data){
			
			console.log(data);
			var result = data.data;
			var tabContent="";
			
			if(result.length>0){
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
				
						tabContent += "<ul class=\"mdui-list mdui-list-dense\">";
						  	tabContent += "<li class=\"mdui-list-item mdui-ripple\">";
						    	tabContent += "<div class=\"mdui-list-item-avatar\"><img src=\"../"+headImgUrl+"\"/></div>";
						    	tabContent += "<div class=\"mdui-list-item-content\" style=\"padding-bottom: 20px;padding-top: 15px;\">";
						    		tabContent += "<div class=\"mdui-float-right\"><a href=\"javascript:;\" class=\"mdui-btn mdui-btn-icon\"><i class=\"Hui-iconfont\">&#xe622;</i></a><span style=\"font-size: 12px;\">33</span></div>";
						      		tabContent += "<div class=\"mdui-list-item-title questions_title\">"+title+"</div>";
						      		tabContent += "<div class=\"mdui-list-item-text\">";
						      			tabContent += "<div class=\"subtitle\">";
						      				tabContent += "<span class=\"lable\">"+labelName+"</span>";
						      				tabContent += "•  <b>"+userName+"</b>  •  2 分钟前 ";
						      			tabContent += "</div>";
						      		tabContent += "</div>";
						    	tabContent += "</div>";
						  	tabContent += "</li>";
	  						tabContent += "<li class=\"mdui-divider-inset mdui-m-y-0\"></li>";
						tabContent += "</ul>";
						
				
			});
				
			}else{
				var tabContent="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			$("#q_a_list_"+labelId).html(tabContent);
			
	  
			if(flag){
				self.pageable(labelId,data.totalPageNumber);
			}
		});
	}
	
	//分页
	this.pageable=function(labelId,totalPageNumber){
		layui.use(['laypage', 'layer'], function(){
  			var laypage = layui.laypage;
  			layer = layui.layer;
  			
		  	laypage({
		    	cont: 'paging'
		    	,pages: totalPageNumber //得到总页数
		    	,jump: function(obj){
		    		console.log(obj.curr);
		    		self.initTabDataList(labelId,obj.curr,false);
		    	}
		  	});
  
		});
	}
	
	/**
	 * tab切换，重新获取列表数据
	 */
	this.switchTab=function(id){
		self.initTabDataList(id,1,true);
	}
	
	this.initTab=function(){
		
		$.post(HOST_URL+"/label/labelList",{"type":3},function(data){
			if(data.success){
				
				var result = data.data;
				var htmlContent="";
				var tabContent="";
				
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var name=result[index].lableName;
					var type=result[index].type;
					var createTime=result[index].createTime;
					var parentId=result[index].parentId;
					var sort=result[index].sort;
					
					if(parentId == 0){
						
						htmlContent = "<a href='#tab_"+id+"' onclick=\"question_answers_config.switchTab("+id+")\" class=\"mdui-ripple\" data-id="+id+">"+name+"</a>";
						$(".mdui-tab").append(htmlContent);
						
						tabContent = "<div id='tab_"+id+"'></div>";
						$("#tab_content").append(tabContent);
						
						tabContent = "<div class=\"crad_title\"><ul id='tab_title_"+id+"'></ul></div>";
						$("#tab_"+id).append(tabContent);
						
						var childs=result[index].childs;
						$.each(childs, function(index, itemobj) {
							var c_id=childs[index].id;  
							name=childs[index].lableName;
							
							var li = "<li data-id="+c_id+">"+name+"</li>";
							$("#tab_title_"+id).append(li);
							
						});
						
						tabContent="<div id=\"q_a_list_"+id+"\"></div>";
						$("#tab_"+id).append(tabContent);
						
					}
					
				});
				
				htmlContent = "<a href='#tab_all' class=\"mdui-ripple\" data-id=all>全部</a>";
				$(".mdui-tab").append(htmlContent);
				tabContent = "<div id='tab_all'></div>";
				$("#tab_content").append(tabContent);
				tabContent = "<div class=\"crad_title\"><ul id='tab_title_all'></ul></div>";
				$("#tab_all").append(tabContent);
				$("#tab_title_all").append("<li>全部节点</li>");
				
				var inst = new mdui.Tab('#q_a_tab');
				inst.show(0);
				
				var labelId = $("#q_a_tab a").first().attr("data-id");
				self.initTabDataList(labelId,1,true);
			}
		});
	}
	
	self.init();
	
}
