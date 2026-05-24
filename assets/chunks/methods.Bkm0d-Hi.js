import{d as x,g as d,J as s,o as V,c as k,M as o,E as n,a as p,G as C,t as g}from"./vendor-scheduler.BuXoCeGx.js";const w={class:"xy-pro-demo-stack"},B={style:{"white-space":"pre-wrap",margin:"0"}},E=x({__name:"methods",setup(N){const a=d(null),l=d(`## 运营周报

点击上方按钮可以快速插入模板内容。`),r=d(l.value);function m(){var e;const t=`## 本周复盘

- 新增组件文档完善
- 修复 overlay-form 关闭生命周期
- 准备下一阶段迁移计划`;(e=a.value)==null||e.setValue(t,!0),l.value=t,r.value=t}function _(){var t;r.value=((t=a.value)==null?void 0:t.getValue())??""}return(t,e)=>{const u=s("xy-button"),f=s("xy-space"),y=s("xy-editor"),v=s("xy-card");return V(),k("div",w,[o(f,null,{default:n(()=>[o(u,{type:"primary",onClick:m},{default:n(()=>[...e[2]||(e[2]=[p("插入模板",-1)])]),_:1}),o(u,{plain:"",onClick:e[0]||(e[0]=i=>{var c;return(c=a.value)==null?void 0:c.focus()})},{default:n(()=>[...e[3]||(e[3]=[p("聚焦编辑器",-1)])]),_:1}),o(u,{plain:"",onClick:_},{default:n(()=>[...e[4]||(e[4]=[p("读取当前内容",-1)])]),_:1})]),_:1}),o(y,{ref_key:"editorRef",ref:a,modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=i=>l.value=i),"min-height":300,placeholder:"请输入公告或文档内容"},null,8,["modelValue"]),o(v,{header:"当前读取到的 Markdown"},{default:n(()=>[C("pre",B,g(r.value),1)]),_:1})])}}});export{E as default};
