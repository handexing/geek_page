/**
 * 公用js
 */

/**
 * 服务器地址
 */

//var HOST_URL = "http://39.106.56.107:8888";

var HOST_URL = "http://127.0.0.1:8888";
var IMAGE_URL = "http://39.106.56.107/images/";


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


/**
 * 访问用户首页
 */
function accessUser(userName){
	$(window.parent.document).find("#m_Iframe").attr("src","view/userPage.html").attr("name","userPage");
}
