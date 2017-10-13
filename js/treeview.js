var nodeCheckedSilent = false;
function nodeChecked (event, node){
    if(nodeCheckedSilent){
        return;
    }
    nodeCheckedSilent = true;
    checkAllParent(node);
    checkAllSon(node);
    nodeCheckedSilent = false;
}

var nodeUncheckedSilent = false;
function nodeUnchecked  (event, node){
    if(nodeUncheckedSilent)
        return;
    nodeUncheckedSilent = true;
    uncheckAllParent(node);
    uncheckAllSon(node);
    nodeUncheckedSilent = false;
}

//选中全部父节点
function checkAllParent(node){
    $('#labelTree').treeview('checkNode',node.nodeId,{silent:true});
    var parentNode = $('#labelTree').treeview('getParent', node.nodeId);
    if(!("id" in parentNode)){
        return;
    }else{
        checkAllParent(parentNode);
    }
}
//取消全部父节点
function uncheckAllParent(node){
    $('#labelTree').treeview('uncheckNode',node.nodeId,{silent:true});
    var siblings = $('#labelTree').treeview('getSiblings', node.nodeId);
    var parentNode = $('#labelTree').treeview('getParent',node.nodeId);
    if(!("id" in parentNode)) {
        return;
    }
    var isAllUnchecked = true;  //是否全部没选中
    for(var i in siblings){
        if(siblings[i].state.checked){
            isAllUnchecked=false;
            break;
        }
    }
    if(isAllUnchecked){
        uncheckAllParent(parentNode);
    }

}

//级联选中所有子节点
function checkAllSon(node){
    $('#labelTree').treeview('checkNode',node.nodeId,{silent:true});
    if(node.nodes != null && node.nodes.length>0){
        for(var i in node.nodes){
            checkAllSon(node.nodes[i]);
        }
    }
}
//级联取消所有子节点
function uncheckAllSon(node){
    $('#labelTree').treeview('uncheckNode',node.nodeId,{silent:true});
    if(node.nodes!=null&&node.nodes.length>0){
        for(var i in node.nodes){
            uncheckAllSon(node.nodes[i]);
        }
    }
}