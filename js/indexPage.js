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
		
	}
	
	self.init();
	
}
