/**
 * 首页管理
 */
function indexConfig(){
	
	var self=this;
	var userId;
	
	var fab = new mdui.Fab('#fab');
	
	this.init=function(){
		
		$("#m_Iframe").attr("src","view/indexPage.html").attr("name","welcome");
		
	}
	
	self.init();
	
}
