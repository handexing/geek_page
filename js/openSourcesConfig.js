/**
 * 开源管理
 */
function openSourcesConfig(){
	
	var self=this;
	
	this.init=function(){
//      self.pageable(123);
        
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
				tab = "<a href='#tab_"+id+"' onclick=\"open_sources_config.switchTab("+id+")\" class=\"mdui-ripple\" data-id="+id+">"+name+"</a>";
				$(".mdui-tab").append(tab);
				tabContent = "<div id='tab_"+id+"'><div class=\"crad_title\">本类推荐</div><div class=\"mdui-row-xs-4 mdui-m-t-1\" id='recommend_"+id+"'></div><div class=\"line mdui-m-t-1\"></div><ul class=\"mdui-list\"></ul></div>";
				$("#tab_content").append(tabContent);
				
				if(index == 10){//显示10条
					return false;
				}
				
			});
			
			tab = "<a href='#tab_0' class=\"mdui-ripple\" data-id=0>全部</a>";
			$(".mdui-tab").append(tab);
			
	  		var inst = new mdui.Tab('.mdui-tab');
			inst.show(0);
			
			var labelId = $(".mdui-tab a").first().attr("data-id");
			self.initTabDataList(labelId,0,true);
			
		});
	}
	
	/**
	 * tab切换，重新获取列表数据
	 */
	this.switchTab=function(id){
		self.initTabDataList(id,0,true);
	}
	
	/**
	 * 初始化列表信息
	 */
	this.initTabDataList=function(labelId,pageNum,flag){
		
		$.post(HOST_URL+"/openSource/openSourceList",{"labelId":labelId,"page":pageNum,"rows":10},function(data){
			
			var result = data.data;
			var html="";
			
			if(result.length>0){
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var bannerImg=result[index].bannerImg;
					var browseCount=result[index].browseCount;
					var collectCount=result[index].collectCount;
					var content=result[index].content;
					var createTime=result[index].createTime;
					var labelId=result[index].labelId;
					var subtitle=result[index].subtitle;
					var title=result[index].title;
					var commentCnt=result[index].commentCnt;
					var bannerImg=result[index].bannerImg;
					
					html += "<li class=\"mdui-list-item mdui-ripple\" onclick=\"open_sources_config.openSourceDetail("+id+")\">";
					html += "<div class=\"mdui-list-item-content\">";
      				html += "<div class=\"mdui-list-item-title\">"+title+"</div>";
      				html += "<div class=\"mdui-list-item-text mdui-list-item-one-line\">"+subtitle+"</div>";
        			//html += "<img src=\"../img/tt.png\" width=\"50%\" height=\"50%\"/>";
	      			html += "<div class=\"mdui-card-actions mdui-m-t-1\">";
					html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe725;</i><span style=\"font-size: 12px;color: grey;\">"+browseCount+"</span>&nbsp;&nbsp;&nbsp;";
					html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe69e;</i><span style=\"font-size: 12px;color: grey;\">"+collectCount+"</span>&nbsp;&nbsp;&nbsp;";
					html += "<i class=\"Hui-iconfont\" style=\"color: #3F3F3F;font-size: 25px;\">&#xe622;</i><span style=\"font-size: 12px;color: grey;\">"+commentCnt+"</span>";
					html += "</div></div></li>";
					html += "<div class=\"line\"></div>";
					
				});
			}else{
				var html="<button class=\"mdui-btn mdui-btn-block mdui-color-grey-100 mdui-ripple\">暂无数据！</button>";
			}
			
			$("#tab_"+labelId+" .mdui-list").html(html);
	  
			if(flag){
				self.pageable(labelId,data.totalPageNumber);
			}

			//动态设置高度
			var m_Iframe = $(window.parent.document).find("#m_Iframe");
			m_Iframe.height($("#opensource").height()+20);
		});
		
	}
	
	//开源详情页
	this.openSourceDetail=function(id){
		$(window.parent.document).find("#m_Iframe").attr("src","view/openSourceDetailPage.html?id="+id).attr("name","openSourceDetailPage");
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
					self.initTabDataList(labelId,obj.curr-1,false);
		    	}
		  	});
  
		});
	}
	
	self.init();
	
}
