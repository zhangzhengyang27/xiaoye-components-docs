const s=[{label:"TS",raw:`<template>
  <xy-avatar-group
    size="lg"
    :items="[
      { key: 'xiaoye', text: '叶' },
      { key: 'mavis', icon: 'mdi:account-outline' },
      { key: 'abby', text: 'AB' },
      { key: 'luna', text: '露' },
      { key: 'kai', icon: 'mdi:briefcase-account-outline' }
    ]"
    collapse-avatars
    collapse-avatars-tooltip
    :max-collapse-avatars="2"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-avatar-group</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"lg"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'xiaoye'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'叶'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'mavis'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, icon: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'mdi:account-outline'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'abby'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'AB'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'luna'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'露'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'kai'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, icon: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'mdi:briefcase-account-outline'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    collapse-avatars</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    collapse-avatars-tooltip</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max-collapse-avatars</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<template>
  <xy-avatar-group
    size="lg"
    :items="[
      { key: 'xiaoye', text: '叶' },
      { key: 'mavis', icon: 'mdi:account-outline' },
      { key: 'abby', text: 'AB' },
      { key: 'luna', text: '露' },
      { key: 'kai', icon: 'mdi:briefcase-account-outline' }
    ]"
    collapse-avatars
    collapse-avatars-tooltip
    :max-collapse-avatars="2"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-avatar-group</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"lg"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">items</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'xiaoye'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'叶'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'mavis'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, icon: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'mdi:account-outline'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'abby'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'AB'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'luna'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'露'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      { key: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'kai'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, icon: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'mdi:briefcase-account-outline'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    collapse-avatars</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    collapse-avatars-tooltip</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">max-collapse-avatars</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
