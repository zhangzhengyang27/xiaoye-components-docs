const s=[{label:"TS",raw:`<script setup lang="ts">
import { ref } from "vue";
import type { UploadFileItem } from "xiaoye-components";

const coverUrl = \`data:image/svg+xml;utf8,\${encodeURIComponent(\`
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
  <rect width="320" height="200" rx="24" fill="#e7edf6"/>
  <rect x="18" y="18" width="284" height="164" rx="18" fill="#d3deec"/>
  <circle cx="96" cy="90" r="28" fill="#f8fafd"/>
  <path d="M42 154L112 96L164 136L214 86L278 154Z" fill="#8ea7cb"/>
  <text x="24" y="38" font-size="18" fill="#667b99" font-family="Arial">Cover</text>
</svg>
\`)}\`;

const files = ref<UploadFileItem[]>([
  {
    uid: "cover",
    name: "活动封面.png",
    size: 123_456,
    status: "success",
    url: coverUrl
  }
]);
<\/script>

<template>
  <xy-upload
    v-model:file-list="files"
    list-type="picture"
    accept=".png,.jpg,.jpeg"
    tip="图片列表适合头像、封面和设计稿回显。"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { UploadFileItem } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "xiaoye-components"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> coverUrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`data:image/svg+xml;utf8,\${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">encodeURIComponent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">&#x3C;svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200"></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;rect width="320" height="200" rx="24" fill="#e7edf6"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;rect x="18" y="18" width="284" height="164" rx="18" fill="#d3deec"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;circle cx="96" cy="90" r="28" fill="#f8fafd"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;path d="M42 154L112 96L164 136L214 86L278 154Z" fill="#8ea7cb"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;text x="24" y="38" font-size="18" fill="#667b99" font-family="Arial">Cover&#x3C;/text></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">&#x3C;/svg></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> files</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">UploadFileItem</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[]>([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    uid: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"cover"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"活动封面.png"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    size: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">123_456</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    url: coverUrl</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-upload</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">file-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    list-type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"picture"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    accept</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">".png,.jpg,.jpeg"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    tip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"图片列表适合头像、封面和设计稿回显。"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<script setup>
import { ref } from "vue";

const coverUrl = \`data:image/svg+xml;utf8,\${encodeURIComponent(\`
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
  <rect width="320" height="200" rx="24" fill="#e7edf6"/>
  <rect x="18" y="18" width="284" height="164" rx="18" fill="#d3deec"/>
  <circle cx="96" cy="90" r="28" fill="#f8fafd"/>
  <path d="M42 154L112 96L164 136L214 86L278 154Z" fill="#8ea7cb"/>
  <text x="24" y="38" font-size="18" fill="#667b99" font-family="Arial">Cover</text>
</svg>
\`)}\`;

const files = ref([
    {
        uid: "cover",
        name: "活动封面.png",
        size: 123_456,
        status: "success",
        url: coverUrl
    }
]);
<\/script>

<template>
  <xy-upload
    v-model:file-list="files"
    list-type="picture"
    accept=".png,.jpg,.jpeg"
    tip="图片列表适合头像、封面和设计稿回显。"
  />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> coverUrl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`data:image/svg+xml;utf8,\${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">encodeURIComponent</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">&#x3C;svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200"></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;rect width="320" height="200" rx="24" fill="#e7edf6"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;rect x="18" y="18" width="284" height="164" rx="18" fill="#d3deec"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;circle cx="96" cy="90" r="28" fill="#f8fafd"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;path d="M42 154L112 96L164 136L214 86L278 154Z" fill="#8ea7cb"/></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">  &#x3C;text x="24" y="38" font-size="18" fill="#667b99" font-family="Arial">Cover&#x3C;/text></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">&#x3C;/svg></span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">\`</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> files</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        uid: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"cover"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"活动封面.png"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        size: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">123_456</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        status: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        url: coverUrl</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-upload</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">file-list</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">files</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    list-type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"picture"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    accept</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">".png,.jpg,.jpeg"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    tip</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"图片列表适合头像、封面和设计稿回显。"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
