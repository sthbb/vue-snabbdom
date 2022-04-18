import patch from './dom/patch'
import h from './dom/h'
const container = document.getElementById("container");

let vnode1 = h('ul',{},[
  h('li',{key:'a'},'a'),
  h('li',{key:'b'},'b'),
  h('li',{key:'c'},'c'),
  h('li',{key:'d'},'d'),
])
patch(container,vnode1)
// 第一种
// let vnode2 = h('ul',{},[
//   h('li',{key:'a'},'a'),
//   h('li',{key:'b'},'b'),
//   h('li',{key:'c'},'c'),
//   h('li',{key:'d'},'d'),
//   h('li',{key:'e'},'e'),
// ])
// 第二种
// let vnode2 = h('ul',{},[
//   h('li',{key:'e'},'e'),
//   h('li',{key:'a'},'a'),
//   h('li',{key:'b'},'b'),
//   h('li',{key:'c'},'c'),
//   h('li',{key:'d'},'d'),
// ])
//第三种
// let vnode2 = h('ul',{},[
//   h('li',{key:'c'},'c'),
//   h('li',{key:'d'},'d'),
//   h('li',{key:'b'},'b'),
//   h('li',{key:'a'},'a'),
// ])
// 第四种
// let vnode2 = h('ul',{},[
//   h('li',{key:'d'},'d'),
//   h('li',{key:'b'},'b'),
//   h('li',{key:'a'},'a'),
//   h('li',{key:'c'},'c'),
// ])
// 第五种
// let vnode2 = h('ul',{},[
//   h('li',{key:'b'},'b'),
//   h('li',{key:'a'},'a'),
//   h('li',{key:'d'},'d'),
//   h('li',{key:'c'},'c'),
// ])
// 随意一种
let vnode2 = h('ul',{},[
  h('li',{key:'e'},'e'),
  h('li',{key:'d'},'d'),
  h('li',{key:'g'},'g'),
  h('li',{key:'c'},'c'),
  h('li',{key:'f'},'f'),
])
const btn = document.getElementById("btn");
btn.onclick = function(){
  patch(vnode1,vnode2);
}

