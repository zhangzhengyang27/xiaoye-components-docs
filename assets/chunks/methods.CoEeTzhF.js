const s=[{label:"TS",raw:`<script setup lang="ts">
import { ref } from "vue";
import type { EditorInstance } from "@xiaoye/components";

const editorRef = ref<EditorInstance | null>(null);
const content = ref("## 运营周报\\n\\n点击上方按钮可以快速插入模板内容。");
const latestValue = ref(content.value);

function fillTemplate() {
  const nextValue = \`## 本周复盘

- 新增组件文档完善
- 修复 overlay-form 关闭生命周期
- 准备下一阶段迁移计划\`;

  editorRef.value?.setValue(nextValue, true);
  content.value = nextValue;
  latestValue.value = nextValue;
}

function syncValue() {
  latestValue.value = editorRef.value?.getValue() ?? "";
}
<\/script>

<template>
  <div class="xy-pro-demo-stack">
    <xy-space>
      <xy-button type="primary" @click="fillTemplate">插入模板</xy-button>
      <xy-button plain @click="editorRef?.focus()">聚焦编辑器</xy-button>
      <xy-button plain @click="syncValue">读取当前内容</xy-button>
    </xy-space>

    <xy-editor
      ref="editorRef"
      v-model="content"
      :min-height="300"
      placeholder="请输入公告或文档内容"
    />

    <xy-card header="当前读取到的 Markdown">
      <pre style="white-space: pre-wrap; margin: 0">{{ latestValue }}</pre>
    </xy-card>
  </div>
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { EditorInstance } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "@xiaoye/components"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> editorRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">EditorInstance</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> content</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"## 运营周报</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">点击上方按钮可以快速插入模板内容。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> latestValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(content.value);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> fillTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> nextValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`## 本周复盘</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">- 新增组件文档完善</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">- 修复 overlay-form 关闭生命周期</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">- 准备下一阶段迁移计划\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorRef.value?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">setValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(nextValue, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  content.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> nextValue;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  latestValue.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> nextValue;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> syncValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  latestValue.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorRef.value?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">getValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"xy-pro-demo-stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">fillTemplate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>插入模板&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorRef?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">focus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>聚焦编辑器&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">syncValue</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>读取当前内容&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-editor</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"editorRef"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">content</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">min-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">300</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"请输入公告或文档内容"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    /></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"当前读取到的 Markdown"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">white-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">pre-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ latestValue }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<script setup>
import { ref } from "vue";

const editorRef = ref(null);
const content = ref("## 运营周报\\n\\n点击上方按钮可以快速插入模板内容。");
const latestValue = ref(content.value);

function fillTemplate() {
    const nextValue = \`## 本周复盘

- 新增组件文档完善
- 修复 overlay-form 关闭生命周期
- 准备下一阶段迁移计划\`;
    
    editorRef.value?.setValue(nextValue, true);
    content.value = nextValue;
    latestValue.value = nextValue;
}

function syncValue() {
    latestValue.value = editorRef.value?.getValue() ?? "";
}
<\/script>

<template>
  <div class="xy-pro-demo-stack">
    <xy-space>
      <xy-button type="primary" @click="fillTemplate">插入模板</xy-button>
      <xy-button plain @click="editorRef?.focus()">聚焦编辑器</xy-button>
      <xy-button plain @click="syncValue">读取当前内容</xy-button>
    </xy-space>

    <xy-editor
      ref="editorRef"
      v-model="content"
      :min-height="300"
      placeholder="请输入公告或文档内容"
    />

    <xy-card header="当前读取到的 Markdown">
      <pre style="white-space: pre-wrap; margin: 0">{{ latestValue }}</pre>
    </xy-card>
  </div>
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> editorRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> content</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"## 运营周报</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">\\n\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">点击上方按钮可以快速插入模板内容。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> latestValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(content.value);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> fillTemplate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> nextValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`## 本周复盘</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">- 新增组件文档完善</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">- 修复 overlay-form 关闭生命周期</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">- 准备下一阶段迁移计划\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorRef.value?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">setValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(nextValue, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    content.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> nextValue;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    latestValue.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> nextValue;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> syncValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    latestValue.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorRef.value?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">getValue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"xy-pro-demo-stack"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">fillTemplate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>插入模板&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorRef?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">focus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>聚焦编辑器&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">syncValue</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>读取当前内容&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-editor</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"editorRef"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">content</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">min-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">300</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">      placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"请输入公告或文档内容"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    /></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"当前读取到的 Markdown"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">white-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">pre-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ latestValue }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
