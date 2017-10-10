/**
 * 首页管理
 */
function indexPage(){
	
	var self=this;
	
	this.init=function(){
		
		/*$.ajax({  
            type:'post',  
            url:'http://127.0.0.1:8888/index/test',  
            dataType:'jsonp',  
            jsonp:"callback",  
            success:function (data) {  
                console.log(data);
            },  
            error:function (err) {  
                alert('出现错误了!!!');  
            }  
        });*/
		
			/*$.ajax({
				type : "POST",
				url : "http://127.0.0.1:8888/index/test",
				async:true,
				dataType : "jsonp",
				timeout: 10000,
				cache: false,
				scriptCharset: 'UTF-8',
				contentType: 'application/json;charset=UTF-8',
				jsonp: "callback",//服务端用于接收callback调用的function名的参数
				jsonpCallback:"success_jsonpCallback",//callback的function名称
				success : function(data){
					alert(data);
				},
				error:function(){
					alert('fail');
				}
			});
		*/
	}
	
	self.init();
	
}


function success_jsonpCallback(data){
    //处理data数据
    alert(data);
}