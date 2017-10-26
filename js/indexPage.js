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
						    	tabContent += "<div class=\"mdui-img-circle\"><img src=\"../"+headImgUrl+"\" width=\"50\" height=\"50\"/></div>";
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
