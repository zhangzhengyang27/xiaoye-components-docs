const s=[{label:"TS",raw:`<script setup lang="ts">
import { computed, ref } from "vue";

const active = ref(0);

const panels = [
  {
    title: "基础信息",
    hint: "先把租户名、环境和可见范围这些不会频繁变的字段确认下来。",
    bullets: ["租户简称与标识符", "部署环境与地域", "默认负责人和通知组"]
  },
  {
    title: "成员与权限",
    hint: "再把访问角色、审批链路和告警订阅补齐，避免发布后临时补权限。",
    bullets: ["管理员与只读角色", "审批人和抄送对象", "告警渠道与接收范围"]
  },
  {
    title: "确认发布",
    hint: "最后统一检查风险提示、变更摘要和回滚策略，再进入正式发布。",
    bullets: ["环境差异检查", "回滚预案与责任人", "最终确认与提交"]
  }
] as const;

const currentPanel = computed(() => panels[active.value]);
const isLast = computed(() => active.value === panels.length - 1);
<\/script>

<template>
  <div class="demo-steps-wizard">
    <xy-steps :active="active" align-center finish-status="success">
      <xy-step
        v-for="panel in panels"
        :key="panel.title"
        :title="panel.title"
        :description="panel.hint"
      />
    </xy-steps>

    <xy-card class="demo-steps-wizard__panel" shadow="always">
      <template #header>
        <div class="demo-steps-wizard__header">
          <div>
            <strong>{{ currentPanel.title }}</strong>
            <p class="demo-steps-wizard__header-description">{{ currentPanel.hint }}</p>
          </div>
          <xy-tag status="primary" round>第 {{ active + 1 }} / {{ panels.length }} 步</xy-tag>
        </div>
      </template>

      <ul class="demo-steps-wizard__list">
        <li v-for="item in currentPanel.bullets" :key="item" class="demo-steps-wizard__item">{{ item }}</li>
      </ul>

      <template #footer>
        <div class="demo-steps-wizard__actions">
          <xy-button plain @click="active = Math.max(active - 1, 0)">上一步</xy-button>
          <xy-button plain>保存草稿</xy-button>
          <xy-button type="primary" @click="active = isLast ? 0 : active + 1">
            {{ isLast ? "重新开始" : "下一步" }}
          </xy-button>
        </div>
      </template>
    </xy-card>
  </div>
</template>

<style scoped>
.demo-steps-wizard {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.demo-steps-wizard__panel {
  max-width: 820px;
}

.demo-steps-wizard__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.demo-steps-wizard__header-description {
  margin: 6px 0 0;
  color: var(--xy-text-color-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.demo-steps-wizard__list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 20px;
  color: var(--xy-text-color);
}

.demo-steps-wizard__item {
  line-height: 1.7;
}

.demo-steps-wizard__actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 640px) {
  .demo-steps-wizard__header {
    flex-direction: column;
  }

  .demo-steps-wizard__actions {
    justify-content: stretch;
  }
}
</style>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { computed, ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> active</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> panels</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"基础信息"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    hint: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"先把租户名、环境和可见范围这些不会频繁变的字段确认下来。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    bullets: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"租户简称与标识符"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"部署环境与地域"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"默认负责人和通知组"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成员与权限"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    hint: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"再把访问角色、审批链路和告警订阅补齐，避免发布后临时补权限。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    bullets: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"管理员与只读角色"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"审批人和抄送对象"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"告警渠道与接收范围"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"确认发布"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    hint: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"最后统一检查风险提示、变更摘要和回滚策略，再进入正式发布。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    bullets: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"环境差异检查"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"回滚预案与责任人"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"最终确认与提交"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">as</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> currentPanel</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> panels[active.value]);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> isLast</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> active.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> panels.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">active</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">active</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> align-center</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> finish-status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-step</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        v-for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">panel </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> panels</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">panel.title</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">panel.title</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">panel.hint</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__panel"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"always"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">strong</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ currentPanel.title }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">strong</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__header-description"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ currentPanel.hint }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> round</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>第 {{ active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }} / {{ panels.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }} 步&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">ul</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__list"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">li</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> v-for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">item </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> currentPanel.bullets</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">item</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__item"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ item }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">li</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">ul</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">footer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__actions"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>上一步&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>保存草稿&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> isLast </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            {{ isLast </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "重新开始"</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "下一步"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">style</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> scoped</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">18</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__panel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  max-width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">820</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  align-items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex-start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  justify-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">space-between</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__header-description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">6</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color-secondary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  font-size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">13</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  line-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1.7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding-left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">20</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  line-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1.7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__actions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  justify-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex-end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">@media</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">max-width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">640</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  .demo-steps-wizard__header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">    flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  .demo-steps-wizard__actions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">    justify-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">stretch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<script setup>
import { computed, ref } from "vue";

const active = ref(0);

const panels = [
    {
        title: "基础信息",
        hint: "先把租户名、环境和可见范围这些不会频繁变的字段确认下来。",
        bullets: ["租户简称与标识符", "部署环境与地域", "默认负责人和通知组"]
    },
    {
        title: "成员与权限",
        hint: "再把访问角色、审批链路和告警订阅补齐，避免发布后临时补权限。",
        bullets: ["管理员与只读角色", "审批人和抄送对象", "告警渠道与接收范围"]
    },
    {
        title: "确认发布",
        hint: "最后统一检查风险提示、变更摘要和回滚策略，再进入正式发布。",
        bullets: ["环境差异检查", "回滚预案与责任人", "最终确认与提交"]
    }
];

const currentPanel = computed(() => panels[active.value]);
const isLast = computed(() => active.value === panels.length - 1);
<\/script>

<template>
  <div class="demo-steps-wizard">
    <xy-steps :active="active" align-center finish-status="success">
      <xy-step
        v-for="panel in panels"
        :key="panel.title"
        :title="panel.title"
        :description="panel.hint"
      />
    </xy-steps>

    <xy-card class="demo-steps-wizard__panel" shadow="always">
      <template #header>
        <div class="demo-steps-wizard__header">
          <div>
            <strong>{{ currentPanel.title }}</strong>
            <p class="demo-steps-wizard__header-description">{{ currentPanel.hint }}</p>
          </div>
          <xy-tag status="primary" round>第 {{ active + 1 }} / {{ panels.length }} 步</xy-tag>
        </div>
      </template>

      <ul class="demo-steps-wizard__list">
        <li v-for="item in currentPanel.bullets" :key="item" class="demo-steps-wizard__item">{{ item }}</li>
      </ul>

      <template #footer>
        <div class="demo-steps-wizard__actions">
          <xy-button plain @click="active = Math.max(active - 1, 0)">上一步</xy-button>
          <xy-button plain>保存草稿</xy-button>
          <xy-button type="primary" @click="active = isLast ? 0 : active + 1">
            {{ isLast ? "重新开始" : "下一步" }}
          </xy-button>
        </div>
      </template>
    </xy-card>
  </div>
</template>

<style scoped>
.demo-steps-wizard {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.demo-steps-wizard__panel {
  max-width: 820px;
}

.demo-steps-wizard__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.demo-steps-wizard__header-description {
  margin: 6px 0 0;
  color: var(--xy-text-color-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.demo-steps-wizard__list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding-left: 20px;
  color: var(--xy-text-color);
}

.demo-steps-wizard__item {
  line-height: 1.7;
}

.demo-steps-wizard__actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 640px) {
  .demo-steps-wizard__header {
    flex-direction: column;
  }

  .demo-steps-wizard__actions {
    justify-content: stretch;
  }
}
</style>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { computed, ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> active</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> panels</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"基础信息"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        hint: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"先把租户名、环境和可见范围这些不会频繁变的字段确认下来。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        bullets: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"租户简称与标识符"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"部署环境与地域"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"默认负责人和通知组"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成员与权限"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        hint: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"再把访问角色、审批链路和告警订阅补齐，避免发布后临时补权限。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        bullets: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"管理员与只读角色"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"审批人和抄送对象"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"告警渠道与接收范围"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"确认发布"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        hint: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"最后统一检查风险提示、变更摘要和回滚策略，再进入正式发布。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        bullets: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"环境差异检查"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"回滚预案与责任人"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"最终确认与提交"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> currentPanel</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> panels[active.value]);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> isLast</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> active.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> panels.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">active</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">active</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> align-center</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> finish-status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-step</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        v-for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">panel </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> panels</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">panel.title</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">panel.title</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">panel.hint</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-card</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__panel"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"always"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__header"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">strong</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ currentPanel.title }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">strong</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__header-description"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ currentPanel.hint }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> round</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>第 {{ active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }} / {{ panels.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }} 步&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">ul</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__list"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">li</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> v-for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">item </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> currentPanel.bullets</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">item</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__item"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ item }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">li</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">ul</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">footer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"demo-steps-wizard__actions"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>上一步&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>保存草稿&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> isLast </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> active </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            {{ isLast </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "重新开始"</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "下一步"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-card</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">style</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> scoped</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">18</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__panel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  max-width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">820</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  align-items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex-start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  justify-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">space-between</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__header-description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">6</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color-secondary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  font-size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">13</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  line-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1.7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding-left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">20</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__item</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  line-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1.7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.demo-steps-wizard__actions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  justify-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex-end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">@media</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">max-width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">640</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  .demo-steps-wizard__header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">    flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  .demo-steps-wizard__actions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">    justify-content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">stretch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
