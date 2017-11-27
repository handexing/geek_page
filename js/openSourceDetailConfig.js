/**
 * 开源详情页
 */
function openSourceDetailConfig(){
	
	var self=this;
	var m_Editor;
	var c_Editor;
	var opensourceId;
	
	this.init=function(){
		
		opensourceId = getUrlVars()['id'];
		
		self.initContent(opensourceId);
		self.browseCnt(opensourceId);
		
		self.initCommentContent(opensourceId,0,true);
		
     	$('#commentBtn').bind('click',function(){
          	
			var themeId = $("#title").attr("data-id");
			var content = c_Editor.getMarkdown();
			
			user = $.cookie('geek_home_user'); 
			
			if(user == null || user == "null"){
				layer.msg('请登陆！');
	        	return;
	        }
			
			if(content==null || content==""){
				layer.msg('评论内容不能为空！');
				return;
			}
			
			user = $.parseJSON(user);
			
			var comment={};
			comment.userId = user.id;
			comment.content = content;
			comment.themeId = themeId;
			comment.type = 1;
			
			$.ajax({
				url:HOST_URL+'/comment/saveComment',  
	            type: "POST",
	            dataType: "json",//跨域ajax请求,返回数据格式为json
	            cache: false,
	            timeout: 10000,//请求超时时间,单位为毫秒
	            async: true,
	            global: false,//禁用Jquery全局事件
	            scriptCharset: 'UTF-8',
	            //processData : false,         // 告诉jQuery不要去处理发送的数据
	            contentType: 'application/json;charset=UTF-8',//请求内容的MIMEType
				data:JSON.stringify(comment),
				success:function(responseData, status){
					if(responseData.success){
						self.initCommentContent(opensourceId,0,true);
						c_Editor.setValue("");
					}else{
						layer.msg('操作失败！', {icon: 5});
					}
				}
			});
			
	
        });
        
        c_Editor = editormd("comment_editormd", {
			toolbarIcons : function() {
            	return ["emoji"]
       		},
			width  : "99%",
            height : 200,
            toc : true,
            emoji : true,       
            watch : false,
            lineNumbers : false,
            placeholder: "请尽量让自己的回复能够对别人有帮助回复...",
            path   : '../plugins/editor/lib/'
        });
        
	}

	/**
	 * 初始化页面内容
	 */
	this.initContent=function(opensourceId){
       $.post(HOST_URL+"/openSource/getOpenSourceDetailById",{"id":opensourceId},function(data){
			if(data.success){
				$("#title").text(data.data.title);
				$("#subTitle").text(data.data.subtitle);
				$("#userName").text(data.data.userName);
				$("#createTime").text(data.data.createTime);
				$("#head_img").attr("src",IMAGE_URL+data.data.headImgUrl)
				$("#collectBtn").attr("data-id",data.data.id)
				$("#title").attr("data-id",data.data.id)
				$("#browseCount").text(data.data.browseCount+"次点击");
				$("#content").val(data.data.content);
				$("#typeName").text(data.data.lableName);
				self.initMarkdown();
			}
		});
	}
	
	
	this.selectUser=function(userId,name){
		c_Editor.insertValue(name);
        $("#typeTree").hide();
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
	
	/**
	 * 初始化评论
	 */
	this.initCommentContent=function(opensourceId,pageNum,flag){
		
		$.post(HOST_URL+"/comment/commentList",{"id":opensourceId,"type":1,"page":pageNum,"rows":10},function(data){
			
			var result = data.data;
			var htmlContent = "";
			
			if(result.length>0){
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var headImgUrl=result[index].headImgUrl;
					var userId=result[index].userId;
					var userName=result[index].userName;
					var createTime=result[index].createTime;
					var content=result[index].content;
					var themeId=result[index].themeId;
					
					htmlContent += "<li class=\"mdui-list-item mdui-ripple\">";
						htmlContent += "<div class=\"mdui-img-circle\"><img src='"+IMAGE_URL+headImgUrl+"' width=\"50\" height=\"50\"/></div>";
						    htmlContent += "<div class=\"mdui-list-item-content\">";
						    	htmlContent += "<div class=\"mdui-float-right\">";
						    		htmlContent += "<div class=\"mdui-chip\" style=\"background-color: ghostwhite;\">";
									  	htmlContent += "<span class=\"mdui-chip-title\" style=\"color: #5C5C5C;\">"+(index+1)+"</span>";
									htmlContent += "</div>";
						    	htmlContent += "</div>";
						      	htmlContent += "<div class=\"mdui-list-item-title\">";
						      		htmlContent += "<span class=\"mdui-m-l-1\" style=\"color: #636363;font-weight: bold;\">"+userName+"</span> ";
						      		htmlContent += "<span style=\"color: grey;\">"+createTime+" </span>";
						      	htmlContent += "</div>";
						      	htmlContent += "<div class=\"mdui-list-item-two-line\" style=\"height: auto;\">";
						      			htmlContent += "<div id=\"comment_content_"+id+"\" style=\"padding: 0px;height: 100%;width: 100%;\" class=\"mdui-p-l-1 mdui-m-t-2 comment_editormd\">";           
				        					htmlContent += "<textarea style=\"display:none;font-size: 16px;\">"+content+"</textarea>";
			        					htmlContent += "</div>";
						      	htmlContent += "</div>";
						    htmlContent += "</div>";
						htmlContent += "</li>";
						htmlContent += "<div class=\"line\"></div>";
				});
				
				$("#comment_ul_content").html(htmlContent);
				
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					editormd.markdownToHTML("comment_content_"+id, {
				        htmlDecode      : "style,script,iframe", 
				        emoji           : true,
				        taskList        : true,
				        tex             : true,  // 默认不解析
				        flowChart       : true,  // 默认不解析
				        sequenceDiagram : true,  // 默认不解析
				    });
				});
				
			} else {
				var htmlContent="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无评论数据！</button>";
				$("#comment_ul_content").html(htmlContent);
			}
			
			if(flag){
				self.pageable(opensourceId,data.totalPageNumber);
			}
			
			//动态设置高度
			var m_Iframe = $(window.parent.document).find("#m_Iframe");
			m_Iframe.height($("#openSourceDetailPage").height()+20);
			
		});
		
        
	}
	
	/**
	 * 浏览量+1
	 */
	this.browseCnt=function(opensourceId){
       $.post(HOST_URL+"/openSource/addBrowseCnt",{"id":opensourceId},function(data){
		});
	}
	
	//分页
	this.pageable=function(opensourceId,totalPageNumber){
		layui.use(['laypage', 'layer'], function(){
  			var laypage = layui.laypage;
  			layer = layui.layer;
		  	laypage({
		    	cont: 'paging',
		    	pages: totalPageNumber, //得到总页数
		    	jump: function(obj){
					self.initCommentContent(opensourceId,obj.curr-1,false);
		    	}
		  	});
  
		});
	}
	
	self.init();
	
}
