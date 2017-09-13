/**
 * 首页管理
 */
function indexConfig(){
	
	var self=this;
	
	var fab = new mdui.Fab('#fab');
	
	this.init=function(){
		
		$("#m_Iframe").attr("src","view/indexPage.html").attr("name","indexPage");
		
		$('#indexPage').bind('click',function(){
			$("#m_Iframe").attr("src","view/indexPage.html").attr("name","lableNodePage");
		});
		
		$('#lableNodePage').bind('click',function(){
			$("#m_Iframe").attr("src","view/lableNodePage.html").attr("name","lableNodePage");
		});
		
		$('#questionsAnswersPage').bind('click',function(){
			$("#m_Iframe").attr("src","view/questionsAnswersPage.html").attr("name","questionsAnswersPage");
		});
		
		$('#openSourcePage').bind('click',function(){
			$("#m_Iframe").attr("src","view/openSourcePage.html").attr("name","openSourcePage");
		});
		
	}
	
	self.init();
	
}
