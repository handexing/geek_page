/**
 * 问与答管理
 */
function questionAnswersConfig(){
	
	var self=this;
	
	this.init=function(){
		
		self.initTab();
		
 		$('.mdui-tab a').bind('click',function(){
        	alert("123");
        });
		
		layui.use(['laypage', 'layer'], function(){
	  		var laypage = layui.laypage;
	  		layer = layui.layer;
			laypage({
			    cont: 'paging',
			    pages: 100 ,//得到总页数
			    jump: function(obj){
	//		    	self.attachList(obj.curr-1,false);
					console.log(obj);
			    }
			});
	  
		});
	}
	
	this.initTab=function(){
		
		$.post(HOST_URL+"/label/labelList",{"type":3},function(data){
			if(data.success){
				
				var result = data.data;
				var htmlContent="";
				var tabContent="";
				console.log(result);
				var flag = 0;
				
				$.each(result, function(index, itemobj) {
					var id=result[index].id;  
					var name=result[index].lableName;
					var type=result[index].type;
					var createTime=result[index].createTime;
					var parentId=result[index].parentId;
					var sort=result[index].sort;
					
					if(parentId == 0){
						
						htmlContent = "<a href='#tab_"+id+"' class=\"mdui-ripple\" data-id="+id+">"+name+"</a>";
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
						tabContent="";
						tabContent += "<ul class=\"mdui-list mdui-list-dense\">";
						  	tabContent += "<li class=\"mdui-list-item mdui-ripple\">";
						    	tabContent += "<div class=\"mdui-list-item-avatar\"><img src=\"../img/logo.png\"/></div>";
						    	tabContent += "<div class=\"mdui-list-item-content\" style=\"padding-bottom: 20px;padding-top: 15px;\">";
						    		tabContent += "<div class=\"mdui-float-right\"><a href=\"javascript:;\" class=\"mdui-btn mdui-btn-icon\"><i class=\"mdui-icon material-icons\">&#xe0c9;</i></a><span style=\"font-size: 12px;\">33</span></div>";
						      		tabContent += "<div class=\"mdui-list-item-title questions_title\">mysql 数据库同步有什么好多方案吗？</div>";
						      		tabContent += "<div class=\"mdui-list-item-text\">";
						      			tabContent += "<div class=\"subtitle\">";
						      				tabContent += "<span class=\"lable\">mysql</span>";
						      				tabContent += "•  <b>handx</b>  •  2 分钟前  •  最后回复来自 <b>jack</b>";
						      			tabContent += "</div>";
						      		tabContent += "</div>";
						    	tabContent += "</div>";
						  	tabContent += "</li>";
	  						tabContent += "<li class=\"mdui-divider-inset mdui-m-y-0\"></li>";
						tabContent += "</ul>";
						
						$("#tab_"+id).append(tabContent);
						tabContent="";
					}
					
				});
				var inst = new mdui.Tab('#q_a_tab');
				inst.show(0);
			}
		});
	}
	
	self.init();
	
}
