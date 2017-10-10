/**
 * 标签管理
 */
function labelConfig(){
	
	var self=this;
	
	this.init=function(){
		
        self.initLabelList();
		
	}
	
	this.initLabelList=function(){
		
		$.post(HOST_URL+"/label/labelList",{},function(data){
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
						htmlContent = "<div class=\"crad_title mdui-m-t-2\" data-id="+id+">"+name+"</div>";
						$("#lable").append(htmlContent);
						ulHtml += "<div>";
							ulHtml += "<ul class=\"mdui-m-t-2\" id='ul-"+id+"'>";
							ulHtml += "</ul>";
						ulHtml += "</div>";
						ulHtml += "<div class=\"mdui-clearfix\"></div>";
						$("#lable").append(ulHtml);
						var childs=result[index].childs;
						$.each(childs, function(index, itemobj) {
							var c_id=childs[index].id;  
							name=childs[index].lableName;
							var liHtml = "<li data-id="+c_id+">"+name+"</li>";
							$("#ul-"+id).append(liHtml);
							
						});
					}
					
				});
				
			}
		});
	}
	
	self.init();
	
}
