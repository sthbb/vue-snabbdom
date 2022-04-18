import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function patchVnode(oldVnode,newVnode){
  // 初次渲染 如果跟节点和新节点 类型一致  需要将新节点挂载真实dom
  if(newVnode.elm === undefined){
    newVnode.elm = oldVnode.elm
  }
  if(newVnode.children === undefined){//新的没有children 
    //新旧节点内容是不是一样
    if(newVnode.text !== oldVnode.text){
      oldVnode.elm.innerText = newVnode.text
    }
  }else{//新的有子节点
    if(oldVnode.children !== undefined && oldVnode.children.length> 0){// 新旧节点都有children 
      // diff算法的核心了
      /**
       * 1 旧前 新前
       * 匹配 旧的指针++  新的指针++ 
       * 2 旧后 新后
       * 匹配 旧的指针--  新的指针-- 
       * 3 旧前 新后
       * 匹配 旧的指针++  新的指针-- 
       * 4 旧后 新前
       * 匹配 旧的指针--  新的指针++ 
       * 5 以上都不满足 就是一一查找
       * 6 创建后删除
       */
      // 这里新前和旧前比较的其实是指针  新的指针和旧的指针
      updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
    }else{// 新的有 旧的没有 
      // 删除旧的节点内容
      oldVnode.elm.innerText = ''
      // 遍历新的子节点 生成dom
      for(let child of newVnode.children){
        let childDom = createElement(child)
        oldVnode.elm.appendChild(childDom)
      }
    }
  }
}