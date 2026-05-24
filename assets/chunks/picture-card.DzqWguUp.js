const s=[{label:"TS",raw:`<script setup lang="ts">
import { ref } from "vue";
import type { UploadFileItem } from "xiaoye-components";

const avatarUrl = \`data:image/svg+xml;utf8,\${encodeURIComponent(\`
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="28" fill="#f3e7e1"/>
  <circle cx="100" cy="74" r="34" fill="#ebd4c7"/>
  <path d="M42 172C52 134 76 116 100 116C124 116 148 134 158 172Z" fill="#b88f7c"/>
  <text x="24" y="34" font-size="18" fill="#8b6a59" font-family="Arial">Avatar</text>
</svg>
\`)}\`;

const files = ref<UploadFileItem[]>([
  {
    uid: "avatar",
    name: "头像.png",
    size: 88_888,
    status: "success",
    url: avatarUrl
  }
]);
<\/script>

<template>
  <xy-upload v-model:file-list="files" list-type="picture-card" accept=".png,.jpg,.jpeg" />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { UploadFileItem } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "xiaoye-components"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> avatarUrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`data:image/svg+xml;utf8,\${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">encodeURIComponent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">&#x3C;svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;rect width="200" height="200" rx="28" fill="#f3e7e1"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;circle cx="100" cy="74" r="34" fill="#ebd4c7"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;path d="M42 172C52 134 76 116 100 116C124 116 148 134 158 172Z" fill="#b88f7c"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;text x="24" y="34" font-size="18" fill="#8b6a59" font-family="Arial">Avatar&#x3C;/text></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">&#x3C;/svg></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> files</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">UploadFileItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[]>([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    uid: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"avatar"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"头像.png"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    size: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">88_888</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    url: avatarUrl</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-upload</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">file-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> list-type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"picture-card"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> accept</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">".png,.jpg,.jpeg"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<script setup>
import { ref } from "vue";

const avatarUrl = \`data:image/svg+xml;utf8,\${encodeURIComponent(\`
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="28" fill="#f3e7e1"/>
  <circle cx="100" cy="74" r="34" fill="#ebd4c7"/>
  <path d="M42 172C52 134 76 116 100 116C124 116 148 134 158 172Z" fill="#b88f7c"/>
  <text x="24" y="34" font-size="18" fill="#8b6a59" font-family="Arial">Avatar</text>
</svg>
\`)}\`;

const files = ref([
    {
        uid: "avatar",
        name: "头像.png",
        size: 88_888,
        status: "success",
        url: avatarUrl
    }
]);
<\/script>

<template>
  <xy-upload v-model:file-list="files" list-type="picture-card" accept=".png,.jpg,.jpeg" />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> avatarUrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`data:image/svg+xml;utf8,\${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">encodeURIComponent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">&#x3C;svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;rect width="200" height="200" rx="28" fill="#f3e7e1"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;circle cx="100" cy="74" r="34" fill="#ebd4c7"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;path d="M42 172C52 134 76 116 100 116C124 116 148 134 158 172Z" fill="#b88f7c"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;text x="24" y="34" font-size="18" fill="#8b6a59" font-family="Arial">Avatar&#x3C;/text></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">&#x3C;/svg></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> files</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        uid: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"avatar"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"头像.png"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        size: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">88_888</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        url: avatarUrl</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-upload</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">file-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> list-type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"picture-card"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> accept</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">".png,.jpg,.jpeg"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
