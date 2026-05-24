import{d as s,J as n,o as r,D as a,g as c}from"./vendor-scheduler.BuXoCeGx.js";const u=s({__name:"picture",setup(p){const l=`data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
  <rect width="320" height="200" rx="24" fill="#e7edf6"/>
  <rect x="18" y="18" width="284" height="164" rx="18" fill="#d3deec"/>
  <circle cx="96" cy="90" r="28" fill="#f8fafd"/>
  <path d="M42 154L112 96L164 136L214 86L278 154Z" fill="#8ea7cb"/>
  <text x="24" y="38" font-size="18" fill="#667b99" font-family="Arial">Cover</text>
</svg>
`)}`,e=c([{uid:"cover",name:"活动封面.png",size:123456,status:"success",url:l}]);return(f,t)=>{const i=n("xy-upload");return r(),a(i,{"file-list":e.value,"onUpdate:fileList":t[0]||(t[0]=o=>e.value=o),"list-type":"picture",accept:".png,.jpg,.jpeg",tip:"图片列表适合头像、封面和设计稿回显。"},null,8,["file-list"])}}});export{u as default};
