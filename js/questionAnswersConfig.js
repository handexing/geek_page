/**
 * 问与答管理
 */
function questionAnswersConfig(){
	
	var self=this;
	
	this.init=function(){
		
		self.initTab();

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
		    		self.initTabDataList(labelId,null,obj.curr-1,false);
		    	}
		  	});
  
		});
	}
	
	/**
	 * 初始化列表信息
	 */
	this.initTabDataList=function(labelId,childId,pageNum,flag){
		
		if(childId != null){
			self.getQuestionAnswersData(labelId,childId,pageNum,flag);
		} else {
			self.getQuestionAnswersData(labelId,null,pageNum,flag);
		}
		
	}
	
	//根据labelID查询问与答
	this.getQuestionAnswersData=function(labelId,childId,pageNum,flag){
		
		var num = childId == null?labelId:childId;
		
		$.post(HOST_URL+"/questionAnswers/questionAnswersList",{"labelId":num,"page":pageNum,"rows":10},function(data){
			
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
					var commentCnt=result[index].commentCnt;
					
					createTime = createTime.replace(/ /,"T");
				
						tabContent += "<ul class=\"mdui-list mdui-list-dense\" onclick=\"question_answers_config.questionAnswersDetailed("+id+")\">";
						  	tabContent += "<li class=\"mdui-list-item mdui-ripple\">";
						    	tabContent += "<div class=\"mdui-img-circle\"><img src='"+IMAGE_URL+headImgUrl+"' width=\"50\" height=\"50\"/></div>";
						    	tabContent += "<div class=\"mdui-list-item-content mdui-m-l-2\" style=\"padding-bottom: 20px;padding-top: 15px;\">";
						    		tabContent += "<div class=\"mdui-float-right\"><a href=\"javascript:;\" class=\"mdui-btn mdui-btn-icon\"><i class=\"Hui-iconfont\">&#xe622;</i></a><span style=\"font-size: 12px;\">"+commentCnt+"</span></div>";
						      		tabContent += "<div class=\"mdui-list-item-title questions_title\">"+title+"</div>";
						      		tabContent += "<div class=\"mdui-list-item-text\">";
						      			tabContent += "<div class=\"subtitle\">";
						      				tabContent += "<span class=\"lable\">"+labelName+"</span>";
						      				tabContent += "•  <b>"+userName+"</b>  •  <time class=timeago datetime=\""+createTime+"Z+08:00\"></time>";
						      			tabContent += "</div>";
						      		tabContent += "</div>";
						    	tabContent += "</div>";
						  	tabContent += "</li>";
	  						tabContent += "<div class=\"line\"></div>";
						tabContent += "</ul>";
						
				
				});
			}else{
				var tabContent="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			
			$("#q_a_list_"+labelId).html(tabContent);
	  
			if(flag){
				self.pageable(num,data.totalPageNumber);
			}
			
			$(".timeago").timeago();
		});
	}
	
	/**
	 * tab切换，重新获取列表数据
	 */
	this.switchTab=function(id){
		self.initTabDataList(id,null,0,true);
	}
	
	/**
	 * 选择label查询
	 */
	this.switchLabel=function(labelId,childId){
		self.initTabDataList(labelId,childId,0,true);
	}
	
	/**
	 * 跳转到问与答详情页
	 */
	this.questionAnswersDetailed=function(id){
		$(window.parent.document).find("#m_Iframe").attr("src","view/questionsAnswersDetailPage.html?id="+id).attr("name","questionsAnswersDetailPage");
	}
	
	this.initTab=function(){
		
		var types = new Array();
		types.push(3);
		
		$.post(HOST_URL+"/label/labelList",{"types":types},function(data){
			if(data.success){
				
				var result = data.data;
				var htmlContent="";
				var tabContent="";
				
				htmlContent = "<a href='#tab_0' class=\"mdui-ripple\" onclick=\"question_answers_config.switchTab(0)\" data-id=0>最热</a>";
				$(".mdui-tab").append(htmlContent);
				tabContent = "<div id='tab_0'></div>";
				$("#tab_content").append(tabContent);
				tabContent = "<div class=\"crad_title\"><ul id='tab_title_0'></ul></div>";
				$("#tab_0").append(tabContent);
				$("#tab_title_0").append("<li>最热话题排行</li>");
				tabContent="<div id=\"q_a_list_0\"></div>";
				$("#tab_0").append(tabContent);
				
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
							
							var li = "<li onclick=\"question_answers_config.switchLabel("+id+","+c_id+")\" data-id="+c_id+">"+name+"</li>";
							$("#tab_title_"+id).append(li);
							
						});
						tabContent="<div id=\"q_a_list_"+id+"\"></div>";
						$("#tab_"+id).append(tabContent);
					}
					
				});
				
				var inst = new mdui.Tab('#q_a_tab');
				inst.show(0);
				
				var labelId = $("#q_a_tab a").first().attr("data-id");
				self.initTabDataList(labelId,null,0,true);
			}
		});
	}
	
	self.init();
	
}
