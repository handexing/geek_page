/**
 * 首页管理
 */
function indexPage(){
	
	var self=this;
	
	this.init=function(){
		
		$('.more_blog').bind('click',function(){
			$(window.parent.document).find("#m_Iframe").attr("src","view/blogPage.html").attr("name","blogPage");
		});
		
		$('.more_q_a').bind('click',function(){
			$(window.parent.document).find("#m_Iframe").attr("src","view/questionsAnswersPage.html").attr("name","questionsAnswersPage");
		});
		
		$('.more_special').bind('click',function(){
			$(window.parent.document).find("#m_Iframe").attr("src","view/specialPage.html").attr("name","specialPage");
		});
		
		
		self.initQuestionAnswersList();
		self.initLabelList();
		self.initBlogData();
		self.initSpeicalList();
	}
	
	/**
	 * 初始化blog
	 */
	this.initBlogData=function(){
		
		$.post(HOST_URL+"/blog/getAllBlogList",{"page":0,"rows":12,"systemTypeId":0},function(data){
			
			var result = data.data;
			var html="";
			
			if(result.length>0){
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var browseCount=result[index].browseCount;
					var collectCount=result[index].collectCount;
					var headImgUrl=result[index].headImgUrl;
					var content=result[index].content;
					var subtitle=result[index].subtitle;
					var title=result[index].title;
					var userId=result[index].userId;
					var typeId=result[index].typeId;
					var typeName=result[index].typeName;
					var systemTypeName=result[index].systemTypeName;
					var systemTypeId=result[index].systemTypeId;
					var userName=result[index].userName;
					var labelName=result[index].labelName;
					var createTime=result[index].createTime;
					var commentCnt=result[index].commentCnt;
					createTime = createTime.replace(/ /,"T");
					
					html += "<div class=\"mdui-col mdui-m-t-2\" style=\"cursor: pointer;\" onclick=\"index_config.blogDetailed("+id+")\">";
				  		html += "<div class=\"mdui-card mdui-hoverable\">";
						  	html += "<div class=\"mdui-card-media\">";
						  		html += "<img src=\"http://fakeimg.pl/350x225/?text=geekHome&font=lobster\" />";
							    html += "<div class=\"mdui-card-media-covered mdui-card-media-covered-top\">";
							      	html += "<div class=\"mdui-card-primary\">";
							        	html += "<div class=\"mdui-card-primary-title\">"+title+"</div>";
							        	html += "<div class=\"mdui-card-primary-subtitle\">"+subtitle+"</div>";
							      	html += "</div>";
							    html += "</div>";
						  	html += "</div>";
						  	html += "<div class=\"mdui-card-actions mdui-float-right\">";
						    	html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe725;</i><span style=\"font-size: 12px;color: grey;\">"+browseCount+"</span>&nbsp;&nbsp;&nbsp;";
						    	html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe69e;</i><span style=\"font-size: 12px;color: grey;\">"+collectCount+"</span>&nbsp;&nbsp;&nbsp;";
						    	html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe622;</i><span style=\"font-size: 12px;color: grey;\">"+commentCnt+"</span>";
						  	html += "</div>";
						html += "</div>";
				  	html += "</div>";
				
				});
			}else{
				var html="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			
			$("#blogList").html(html);
			
		});
	}
	
	/**
	 * 跳转到blog详情页
	 */
	this.blogDetailed=function(id){
		$(window.parent.document).find("#m_Iframe").attr("src","view/blogDetailPage.html?id="+id).attr("name","blogDetailPage");
	}
	
	/**
	 * 初始化标签
	 */
	this.initLabelList=function(){
		
		var types = new Array();
		types.push(1);
		types.push(3);
	
		$.post(HOST_URL+"/label/getAllLabel",{"types":types},function(data){
			if(data.success){
				
				var result = data.data;
				var htmlContent="";
				var ulHtml="";
				
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var name=result[index].lableName;
					var type=result[index].type;
					var createTime=result[index].createTime;
					var parentId=result[index].parentId;
					var sort=result[index].sort;
					
					if(parentId == 0){
						htmlContent += "<a href=\"#\" title="+name+">"+name+"</a>";

						var childs=result[index].childs;
						$.each(childs, function(index, itemobj) {
							var c_id=childs[index].id;  
							name=childs[index].lableName;
							htmlContent += "<a href=\"#\" title="+name+">"+name+"</a>";
						});
					}
					
				});
				$("#tagsList").html(htmlContent);
				
			}
		});
	}
	
	/**
	 * 初始化专题
	 */
	this.initSpeicalList=function(){
		
		var types = new Array();
		types.push(1);
		types.push(3);
	
		$.post(HOST_URL+"/special/getSpecialList",{"page":0,"rows":12},function(data){
			
			var result = data.data;
			var htmlContent="";
			
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
				var subtitle=result[index].subtitle;
				var imgPath=result[index].imgPath;
				
				htmlContent += "<div class=\"mdui-col mdui-m-t-1 mdui-hoverable\" style=\"cursor: pointer;padding:0px;padding-left: 5px;\">";
				htmlContent += "<div class=\"mdui-grid-tile\">";
				htmlContent += "<img src=\"http://fakeimg.pl/350x255/?text=geekHome&font=lobster\" />";
				htmlContent += "<div class=\"mdui-grid-tile-actions\">";
				htmlContent += "<div class=\"mdui-grid-tile-text\">";
				htmlContent += "<div class=\"mdui-grid-tile-title\">"+name+"</div>";
				htmlContent += "<div class=\"mdui-grid-tile-subtitle\">"+subtitle+"</div>";
				htmlContent += "</div></div></div></div>";
			});
			
			$("#specialList").html(htmlContent);
				
		});
	}
	
	/**
	 * 初始化问与答列表
	 */
	this.initQuestionAnswersList=function(){
		$.post(HOST_URL+"/questionAnswers/questionAnswersList",{"labelId":0,"page":0,"rows":8},function(data){
			
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
				
						tabContent += "<ul class=\"mdui-list mdui-list-dense\" onclick=\"index_config.questionAnswersDetailed("+id+")\">";
						  	tabContent += "<li class=\"mdui-list-item mdui-ripple\">";
						    	tabContent += "<div class=\"mdui-img-circle\"><img src='"+IMAGE_URL+headImgUrl+"' width=\"50\" height=\"50\"/></div>";
						    	tabContent += "<div class=\"mdui-list-item-content mdui-m-l-2\" style=\"padding-bottom: 20px;padding-top: 15px;\">";
						    		tabContent += "<div class=\"mdui-float-right\"><a href=\"javascript:;\" class=\"mdui-btn mdui-btn-icon\"><i class=\"Hui-iconfont\">&#xe622;</i></a><span style=\"font-size: 12px;\">"+commentCnt+"</span></div>";
						      		tabContent += "<div class=\"mdui-list-item-title questions_title\">"+title+"</div>";
						      		tabContent += "<div class=\"mdui-list-item-text\">";
						      			tabContent += "<div class=\"subtitle mdui-m-t-1\">";
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
			
			$("#questionAnswers_ul").html(tabContent);
	  
			$(".timeago").timeago();
		});
	}
	
	/**
	 * 跳转到问与答详情页
	 */
	this.questionAnswersDetailed=function(id){
		$(window.parent.document).find("#m_Iframe").attr("src","view/questionsAnswersDetailPage.html?id="+id).attr("name","questionsAnswersDetailPage");
	}
	self.init();
	
}
