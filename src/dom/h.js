import vnode from './vnode'

export default function(sel,data,params){
  if(typeof params === 'string'){// 没有子级元素
    return vnode(sel, data,undefined,params,undefined)
  }else if(Array.isArray(params)){ //有子元素
    let children = []
    for(let item of params){
      children.push(item)
    }
    return vnode(sel, data,children,params,undefined)
  }
}