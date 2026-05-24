const s=[{label:"TS",raw:`<template>
  <xy-breadcrumb
    separator-icon="mdi:chevron-right"
    :items="[
      { label: '结算中心', href: '/' },
      { label: '对账任务', href: '/components/statistic' },
      { label: '工单详情' }
    ]"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-breadcrumb</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    separator-icon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"mdi:chevron-right"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'结算中心'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'/'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'对账任务'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'/components/statistic'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'工单详情'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<template>
  <xy-breadcrumb
    separator-icon="mdi:chevron-right"
    :items="[
      { label: '结算中心', href: '/' },
      { label: '对账任务', href: '/components/statistic' },
      { label: '工单详情' }
    ]"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-breadcrumb</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    separator-icon</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"mdi:chevron-right"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'结算中心'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'/'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'对账任务'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, href: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'/components/statistic'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'工单详情'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
