import vnode from './vnode'
import patchVnode from './patchVnode'
import createElement from './createElement'
export default function (oldVnode, newVnode) {
  if (oldVnode.sel === undefined) {//如果没有sel 是真实dom 需要变化一个虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], oldVnode.innerText, oldVnode)
  }
  if (oldVnode.sel === newVnode.sel) {//同一个元素
     /**
     * 1. 新的节点没有children 就是文本节点 那直接把旧的文本覆盖就行
     * 2. 新的节点有children  旧的也有children 就是diff算法的核心了
     * 3. 新的有children  旧的没有children 直接创建子元素  把旧的清掉  添加新的
     */
    patchVnode(oldVnode, newVnode)
  } else {//不是一个节点 暴击删除 再新建
    //因为还涉及到要创建子级元素 所以这里还需要递归创建 
    let newVnodeElm = createElement(newVnode) 
    // 删除旧的节点
    let oldVodeElm = oldVnode.elm //旧的真实dom
    if (newVnodeElm) {
      oldVodeElm.parentNode.insertBefore(newVnodeElm, oldVodeElm)
    }
    oldVodeElm.parentNode.removeChild(oldVodeElm)
  }
}