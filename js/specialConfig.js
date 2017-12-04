/**
 * 专题管理
 */
function specialConfig(){
	
	var self=this;
	
	this.init=function(){
		
		self.initSpeicalList();
	}

	/**
	 * 初始化专题
	 */
	this.initSpeicalList=function(){
		
		var types = new Array();
		types.push(1);
		types.push(3);
	
		$.post(HOST_URL+"/special/getSpecialList",{"page":0,"rows":100000},function(data){
			
			var result = data.data;
			var htmlContent="";
			
			$.each(result, function(index, itemobj) {
				var id=result[index].id;  
				var name=result[index].name;
				var subtitle=result[index].subtitle;
				var imgPath=result[index].imgPath;
				
				htmlContent += "<div class=\"mdui-col mdui-m-t-1 mdui-hoverable\" style=\"cursor: pointer;padding:0px;padding-left: 5px ;\">";
				htmlContent += "<div class=\"mdui-grid-tile\">";
				htmlContent += "<img src=\"http://fakeimg.pl/350x255/?text=geekHome&font=lobster\" />";
				htmlContent += "<div class=\"mdui-grid-tile-actions\">";
				htmlContent += "<div class=\"mdui-grid-tile-text\">";
				htmlContent += "<div class=\"mdui-grid-tile-title\">"+name+"</div>";
				htmlContent += "<div class=\"mdui-grid-tile-subtitle\">"+subtitle+"</div>";
				htmlContent += "</div></div></div></div>";
			});
			
			$("#specialList").html(htmlContent);
			
			//动态设置高度
			var m_Iframe = $(window.parent.document).find("#m_Iframe");
			m_Iframe.height($("#specialPage").height()+20);
		});
	}
	
	self.init();
	
}
