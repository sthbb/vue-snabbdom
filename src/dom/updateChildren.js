function sameVnode(newVnode, oldVnode) {
  return newVnode.key == oldVnode.key;
}
import createElement from './createElement';
import patchVnode from './patchVnode'
//参数1:旧的根节点
//参数2:旧的子节点[旧虚拟节点的children]
//参数3:新的子节点[新虚拟节点的children]
export default (parentElm, oldCh, newCh) => {

  let oldStartIndex = 0;				//旧前的指针
  let oldEndIndex = oldCh.length - 1;		//旧后的指针
  let newStartIndex = 0;				//新前的指针
  let newEndIndex = newCh.length - 1;		//新后的指针

  let oldStartVnode = oldCh[0];		//旧前的虚拟节点
  let oldEndVnode = oldCh[oldEndIndex];	//旧后的虚拟节点
  let newStartVnode = newCh[0];		//新前的虚拟节点
  let newEndVnode = newCh[newEndIndex];	//新后的虚拟节点

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartVnode === undefined) {
      oldStartVnode = oldCh[++oldStartIndex]
    } else if (oldEndVnode === undefined) {
      oldEndVnode = oldCh[--oldEndIndex]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      //第一种情况：旧前和新前
      console.log(1);
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIndex];
      newStartVnode = newCh[++newStartIndex];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      //第二种情况：旧后和新后
      console.log(2);
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      //第三种情况：旧前和新后
      console.log(3);
      patchVnode(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      //第四种情况：旧后和新前
      console.log(4);
      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIndex];
      newStartVnode = newCh[++newStartIndex];
    } else {
      console.log(5);
      //第五种情况：以上都不满足 ==》查找遍历
      const keymap = {}
      for (let i = oldStartIndex; i <= oldEndIndex; i++) {
        const key = oldCh[i]?.key;
        if (key) {
          keymap[key] = i
        }
      }
      // 在旧的节点中 寻找新前指向的节点
      let indexInOld = keymap[newStartVnode.key];
      if (indexInOld) {//找到
        const elmMove = oldCh[indexInOld]
        patchVnode(elmMove, newStartVnode)
        //处理过的节点  在旧的虚拟节点中设置为undefined
        oldCh[indexInOld] = undefined;
        parentElm.insertBefore(elmMove.elm, oldStartVnode.elm)
      } else {//没有找到 就创建新的
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      // 新数据指针加1
      newStartVnode = newCh[++newStartIndex]
    }
  }
  // while循环结束  就是新增或者删除了
  // 1. oldStartIndex > oldEndIndex
  // 2. newStartIndex > newEndIndex
  if(oldStartIndex > oldEndIndex){///
    const before = newCh[newEndIndex + 1] ?.elm || null
    for(let i = newStartIndex ; i<= newEndIndex;i++){
      parentElm.insertBefore(createElement(newCh[i]),before)
    }
  }else{//删除
    for(let i = oldStartIndex; i<= oldEndIndex;i++){
      oldCh[i] && parentElm.removeChild(oldCh[i].elm)
    }
  }
}	