const s=[{label:"TS",raw:`<script setup lang="ts">
import { h } from "vue";

const rows = [
  {
    id: 1,
    name: "成员工作台",
    status: "enabled",
    tags: ["core", "urgent"],
    progress: 78,
    budget: 128000.5,
    homepage: "https://xiaoye.dev/workbench",
    token: "workspace-token-2026",
    updatedAt: "2026-04-18T14:30:00+08:00",
    badge: "稳定",
    htmlNote: "已接入 <strong>值类型显示协议</strong>"
  }
];

const columns = [
  {
    prop: "name",
    label: "名称"
  },
  {
    prop: "status",
    label: "状态映射",
    valueType: "select",
    options: [
      { label: "启用", value: "enabled", status: "success" },
      { label: "停用", value: "disabled", status: "danger" }
    ]
  },
  {
    prop: "tags",
    label: "标签组",
    valueType: "tag",
    options: [
      { label: "核心项目", value: "core", status: "primary" },
      { label: "加急", value: "urgent", status: "warning" }
    ]
  },
  {
    prop: "progress",
    label: "进度",
    valueType: "progress",
    formatter: (_row: unknown, _column: unknown, value: unknown) => \`\${value ?? 0}%\`
  },
  {
    prop: "budget",
    label: "预算",
    valueType: "money"
  },
  {
    prop: "updatedAt",
    label: "更新时间",
    valueType: "datetime"
  },
  {
    prop: "homepage",
    label: "链接",
    valueType: "link",
    formatter: () => "打开工作台"
  },
  {
    prop: "token",
    label: "复制值",
    valueType: "copy"
  },
  {
    prop: "badge",
    label: "render",
    render: (value: unknown) =>
      h(
        "strong",
        {
          style: {
            color: "var(--xy-color-primary)"
          }
        },
        \`自定义渲染：\${value ?? "-"}\`
      )
  },
  {
    prop: "htmlNote",
    label: "renderHTML",
    renderHTML: (value: unknown) => \`<span>\${String(value ?? "-")}</span>\`
  }
];
<\/script>

<template>
  <xy-pro-table
    title="显示协议示例"
    description="当前除了 valueType / formatter / render / renderHTML，还补上了 copy 和状态点式回显，继续沿显示协议收口。"
    :data="rows"
    :columns="columns"
    :pagination="false"
    :table-props="{ rowKey: 'id' }"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { h } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成员工作台"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"enabled"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    tags: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"core"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"urgent"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    progress: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">78</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    budget: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">128000.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    homepage: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"https://xiaoye.dev/workbench"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    token: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"workspace-token-2026"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    updatedAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-04-18T14:30:00+08:00"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    badge: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"稳定"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    htmlNote: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"已接入 &#x3C;strong>值类型显示协议&#x3C;/strong>"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"name"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"名称"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"status"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"状态映射"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"select"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    options: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"启用"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"enabled"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"停用"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"disabled"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"danger"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tags"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"标签组"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tag"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    options: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"核心项目"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"core"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"加急"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"urgent"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"warning"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"progress"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"进度"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"progress"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    formatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">_row</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">_column</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ??</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}%\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"budget"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"预算"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"money"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"updatedAt"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"更新时间"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"datetime"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"homepage"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"链接"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"link"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    formatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "打开工作台"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"token"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"复制值"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"copy"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"badge"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"render"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      h</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        "strong"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          style: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"var(--xy-color-primary)"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        \`自定义渲染：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "-"}\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"htmlNote"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"renderHTML"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    renderHTML</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> unknown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`&#x3C;span>\${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">String</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "-"</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}&#x3C;/span>\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-pro-table</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"显示协议示例"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"当前除了 valueType / formatter / render / renderHTML，还补上了 copy 和状态点式回显，继续沿显示协议收口。"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"rows"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"columns"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :pagination</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"false"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :table-props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"{ rowKey: 'id' }"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<script setup>
import { h } from "vue";

const rows = [
    {
        id: 1,
        name: "成员工作台",
        status: "enabled",
        tags: ["core", "urgent"],
        progress: 78,
        budget: 128000.5,
        homepage: "https://xiaoye.dev/workbench",
        token: "workspace-token-2026",
        updatedAt: "2026-04-18T14:30:00+08:00",
        badge: "稳定",
        htmlNote: "已接入 <strong>值类型显示协议</strong>"
    }
];

const columns = [
    {
        prop: "name",
        label: "名称"
    },
    {
        prop: "status",
        label: "状态映射",
        valueType: "select",
        options: [
            { label: "启用", value: "enabled", status: "success" },
            { label: "停用", value: "disabled", status: "danger" }
        ]
    },
    {
        prop: "tags",
        label: "标签组",
        valueType: "tag",
        options: [
            { label: "核心项目", value: "core", status: "primary" },
            { label: "加急", value: "urgent", status: "warning" }
        ]
    },
    {
        prop: "progress",
        label: "进度",
        valueType: "progress",
        formatter: (_row, _column, value) => \`\${value ?? 0}%\`
    },
    {
        prop: "budget",
        label: "预算",
        valueType: "money"
    },
    {
        prop: "updatedAt",
        label: "更新时间",
        valueType: "datetime"
    },
    {
        prop: "homepage",
        label: "链接",
        valueType: "link",
        formatter: () => "打开工作台"
    },
    {
        prop: "token",
        label: "复制值",
        valueType: "copy"
    },
    {
        prop: "badge",
        label: "render",
        render: (value) => h("strong", {
            style: {
                color: "var(--xy-color-primary)"
            }
        }, \`自定义渲染：\${value ?? "-"}\`)
    },
    {
        prop: "htmlNote",
        label: "renderHTML",
        renderHTML: (value) => \`<span>\${String(value ?? "-")}</span>\`
    }
];
<\/script>

<template>
  <xy-pro-table
    title="显示协议示例"
    description="当前除了 valueType / formatter / render / renderHTML，还补上了 copy 和状态点式回显，继续沿显示协议收口。"
    :data="rows"
    :columns="columns"
    :pagination="false"
    :table-props="{ rowKey: 'id' }"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { h } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成员工作台"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"enabled"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        tags: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"core"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"urgent"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        progress: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">78</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        budget: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">128000.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        homepage: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"https://xiaoye.dev/workbench"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        token: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"workspace-token-2026"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        updatedAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-04-18T14:30:00+08:00"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        badge: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"稳定"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        htmlNote: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"已接入 &#x3C;strong>值类型显示协议&#x3C;/strong>"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"name"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"名称"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"status"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"状态映射"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"select"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        options: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"启用"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"enabled"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"停用"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"disabled"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"danger"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tags"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"标签组"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tag"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        options: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"核心项目"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"core"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"加急"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"urgent"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"warning"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"progress"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"进度"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"progress"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        formatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">_row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">_column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ??</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}%\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"budget"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"预算"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"money"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"updatedAt"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"更新时间"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"datetime"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"homepage"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"链接"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"link"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        formatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "打开工作台"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"token"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"复制值"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        valueType: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"copy"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"badge"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"render"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> h</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"strong"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            style: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"var(--xy-color-primary)"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        }, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`自定义渲染：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "-"}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"htmlNote"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"renderHTML"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        renderHTML</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`&#x3C;span>\${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">String</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "-"</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}&#x3C;/span>\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-pro-table</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"显示协议示例"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"当前除了 valueType / formatter / render / renderHTML，还补上了 copy 和状态点式回显，继续沿显示协议收口。"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"rows"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"columns"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :pagination</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"false"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :table-props</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"{ rowKey: 'id' }"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
