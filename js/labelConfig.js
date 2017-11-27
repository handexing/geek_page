/**
 * 标签管理
 */
function labelConfig(){
	
	var self=this;
	
	this.init=function(){
		
        self.initLabelList();
		
	}
	
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
						htmlContent="<div id='typeList-"+id+"' style=\"height: 45px;\" class=\"mdui-m-t-2 mdui-m-l-1\" data-id="+id+"><span style=\"color: #636363;font-size:18px;float: left;line-height: 45px;\">"+name+"：</span></div>";
						$("#lable").append(htmlContent);
						
						ulHtml="<ul class=\"mdui-float-left\" style=\"margin-top: 4px;\" id='ul-"+id+"'></ul>";
						$("#typeList-"+id).append(ulHtml);
						
						var childs=result[index].childs;
						$.each(childs, function(index, itemobj) {
							var c_id=childs[index].id;  
							name=childs[index].lableName;
							var liHtml = "<li data-id="+c_id+">"+name+"</li>";
							$("#ul-"+id).append(liHtml);
						});
						$("#lable").append("<div class='line' style='padding-bottom: 15px;'></div>");
					}
					
				});
				
			}
			
			//动态设置高度
			var m_Iframe = $(window.parent.document).find("#m_Iframe");
			m_Iframe.height($("#lablePage").height()+20);
		});
	}
	
	self.init();
	
}
