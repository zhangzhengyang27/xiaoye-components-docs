const s=[{label:"TS",raw:`<template>
  <xy-notice-center
    :tabs="[
      {
        key: 'todo',
        label: '待处理',
        items: [
          {
            key: 'approve-1',
            title: '审批提醒',
            content: '有新的采购审批等待处理',
            time: '刚刚',
            tag: '紧急',
            tagStatus: 'warning'
          }
        ]
      },
      {
        key: 'notice',
        label: '公告',
        items: []
      }
    ]"
    :actions="[
      { key: 'read-all', label: '全部已读', icon: 'mdi:check' },
      { key: 'open-center', label: '进入消息中心', icon: 'mdi:arrow-right' }
    ]"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-notice-center</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :tabs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"[</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        key: 'todo',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        label: '待处理',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        items: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">          {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            key: 'approve-1',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            title: '审批提醒',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            content: '有新的采购审批等待处理',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            time: '刚刚',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            tag: '紧急',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            tagStatus: 'warning'</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">          }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        ]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        key: 'notice',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        label: '公告',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        items: []</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">    ]"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :actions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"[</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      { key: 'read-all', label: '全部已读', icon: 'mdi:check' },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      { key: 'open-center', label: '进入消息中心', icon: 'mdi:arrow-right' }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">    ]"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<template>
  <xy-notice-center
    :tabs="[
      {
        key: 'todo',
        label: '待处理',
        items: [
          {
            key: 'approve-1',
            title: '审批提醒',
            content: '有新的采购审批等待处理',
            time: '刚刚',
            tag: '紧急',
            tagStatus: 'warning'
          }
        ]
      },
      {
        key: 'notice',
        label: '公告',
        items: []
      }
    ]"
    :actions="[
      { key: 'read-all', label: '全部已读', icon: 'mdi:check' },
      { key: 'open-center', label: '进入消息中心', icon: 'mdi:arrow-right' }
    ]"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-notice-center</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :tabs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"[</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        key: 'todo',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        label: '待处理',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        items: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">          {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            key: 'approve-1',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            title: '审批提醒',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            content: '有新的采购审批等待处理',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            time: '刚刚',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            tag: '紧急',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">            tagStatus: 'warning'</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">          }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        ]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        key: 'notice',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        label: '公告',</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">        items: []</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">    ]"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    :actions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"[</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      { key: 'read-all', label: '全部已读', icon: 'mdi:check' },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">      { key: 'open-center', label: '进入消息中心', icon: 'mdi:arrow-right' }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">    ]"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
