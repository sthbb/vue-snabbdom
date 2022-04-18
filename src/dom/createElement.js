// vnode 是新的节点
export default function createElement(vnode){
  let domNode = document.createElement(vnode.sel);
  // 这里需要判断的内容有没有子节点  是不是文本节点 
  if(vnode.children === undefined){//文本节点
    domNode.innerText = vnode.text
  }else if(Array.isArray(vnode.children)){ // 递归遍历创建子级节点
    for(let child of vnode.children){
      let childDom = createElement(child)
      domNode.appendChild(childDom)
    }
  }
  vnode.elm = domNode  // 创建的真实dom还需要挂载到对应的虚拟dom上
  return domNode
}