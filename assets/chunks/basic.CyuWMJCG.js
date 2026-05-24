const s=[{label:"TS",raw:`<script setup lang="ts">
import type { ProTableColumn } from "@xiaoye/pro-components";

interface ImportRow {
  id: number;
  name: string;
  status: "成功" | "失败";
  reason: string;
}

const rows: ImportRow[] = [
  { id: 1, name: "杭州分部", status: "成功", reason: "-" },
  { id: 2, name: "上海分部", status: "失败", reason: "负责人字段缺失" }
];

const columns: ProTableColumn<ImportRow>[] = [
  { prop: "name", label: "记录名称", minWidth: 180 },
  { prop: "status", label: "结果", slot: "status", minWidth: 120 },
  { prop: "reason", label: "说明", minWidth: 200 }
];
<\/script>

<template>
  <xy-import-result-table
    :data="rows"
    :columns="columns"
    :summary="{ total: 2, success: 1, failed: 1 }"
  >
    <template #status="{ row }">
      <xy-tag :status="row.status === '成功' ? 'success' : 'danger'">
        {{ row.status }}
      </xy-tag>
    </template>
  </xy-import-result-table>
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ProTableColumn } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "@xiaoye/pro-components"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ImportRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  status</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "成功"</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "失败"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  reason</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ImportRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"杭州分部"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成功"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, reason: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"-"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"上海分部"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"失败"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, reason: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"负责人字段缺失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ProTableColumn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">ImportRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"name"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"记录名称"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, minWidth: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">180</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"status"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"结果"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, slot: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"status"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, minWidth: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">120</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  { prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"reason"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"说明"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, minWidth: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-import-result-table</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"rows"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"columns"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :summary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"{ total: 2, success: 1, failed: 1 }"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{ row }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> :status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"row.status === '成功' ? 'success' : 'danger'"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {{ row.status }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-import-result-table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<script setup>
const rows = [
    { id: 1, name: "杭州分部", status: "成功", reason: "-" },
    { id: 2, name: "上海分部", status: "失败", reason: "负责人字段缺失" }
];

const columns = [
    { prop: "name", label: "记录名称", minWidth: 180 },
    { prop: "status", label: "结果", slot: "status", minWidth: 120 },
    { prop: "reason", label: "说明", minWidth: 200 }
];
<\/script>

<template>
  <xy-import-result-table
    :data="rows"
    :columns="columns"
    :summary="{ total: 2, success: 1, failed: 1 }"
  >
    <template #status="{ row }">
      <xy-tag :status="row.status === '成功' ? 'success' : 'danger'">
        {{ row.status }}
      </xy-tag>
    </template>
  </xy-import-result-table>
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    { id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"杭州分部"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成功"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, reason: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"-"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    { id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"上海分部"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"失败"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, reason: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"负责人字段缺失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    { prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"name"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"记录名称"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, minWidth: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">180</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    { prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"status"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"结果"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, slot: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"status"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, minWidth: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">120</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    { prop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"reason"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"说明"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, minWidth: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-import-result-table</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"rows"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :columns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"columns"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :summary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"{ total: 2, success: 1, failed: 1 }"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  ></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">{ row }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> :status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"row.status === '成功' ? 'success' : 'danger'"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {{ row.status }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-import-result-table</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
