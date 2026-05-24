const s=[{label:"TS",raw:`<script setup lang="ts">
import { SankeyChart } from "echarts/charts";
import { useChartsModules } from "@xiaoye/components";

useChartsModules([SankeyChart]);

const option = {
  tooltip: {
    trigger: "item"
  },
  series: [
    {
      type: "sankey",
      left: 24,
      right: 24,
      top: 24,
      bottom: 24,
      emphasis: {
        focus: "adjacency"
      },
      lineStyle: {
        color: "source",
        curveness: 0.5
      },
      data: [
        { name: "新线索" },
        { name: "自动分配" },
        { name: "销售跟进" },
        { name: "方案确认" },
        { name: "成交" },
        { name: "流失" }
      ],
      links: [
        { source: "新线索", target: "自动分配", value: 320 },
        { source: "自动分配", target: "销售跟进", value: 280 },
        { source: "自动分配", target: "流失", value: 40 },
        { source: "销售跟进", target: "方案确认", value: 190 },
        { source: "销售跟进", target: "流失", value: 90 },
        { source: "方案确认", target: "成交", value: 128 },
        { source: "方案确认", target: "流失", value: 62 }
      ]
    }
  ]
};
<\/script>

<template>
  <xy-charts :option="option" :height="340" />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { SankeyChart } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "echarts/charts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { useChartsModules } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "@xiaoye/components"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">useChartsModules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">([SankeyChart]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> option</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  tooltip: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    trigger: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"item"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  series: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"sankey"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      left: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      right: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      top: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      bottom: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      emphasis: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        focus: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"adjacency"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      lineStyle: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"source"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        curveness: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      data: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"新线索"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"自动分配"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"销售跟进"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"方案确认"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成交"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"流失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      links: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"新线索"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"自动分配"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">320</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"自动分配"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"销售跟进"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">280</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"自动分配"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"流失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">40</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"销售跟进"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"方案确认"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">190</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"销售跟进"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"流失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">90</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"方案确认"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成交"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">128</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"方案确认"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"流失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">62</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-charts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">option</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">option</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">340</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<script setup>
import { SankeyChart } from "echarts/charts";
import { useChartsModules } from "@xiaoye/components";

useChartsModules([SankeyChart]);

const option = {
    tooltip: {
        trigger: "item"
    },
    series: [
        {
            type: "sankey",
            left: 24,
            right: 24,
            top: 24,
            bottom: 24,
            emphasis: {
                focus: "adjacency"
            },
            lineStyle: {
                color: "source",
                curveness: 0.5
            },
            data: [
                { name: "新线索" },
                { name: "自动分配" },
                { name: "销售跟进" },
                { name: "方案确认" },
                { name: "成交" },
                { name: "流失" }
            ],
            links: [
                { source: "新线索", target: "自动分配", value: 320 },
                { source: "自动分配", target: "销售跟进", value: 280 },
                { source: "自动分配", target: "流失", value: 40 },
                { source: "销售跟进", target: "方案确认", value: 190 },
                { source: "销售跟进", target: "流失", value: 90 },
                { source: "方案确认", target: "成交", value: 128 },
                { source: "方案确认", target: "流失", value: 62 }
            ]
        }
    ]
};
<\/script>

<template>
  <xy-charts :option="option" :height="340" />
</template>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { SankeyChart } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "echarts/charts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { useChartsModules } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "@xiaoye/components"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">useChartsModules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">([SankeyChart]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> option</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    tooltip: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        trigger: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"item"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    series: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"sankey"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            left: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            right: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            top: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            bottom: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            emphasis: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                focus: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"adjacency"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            lineStyle: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                color: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"source"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                curveness: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0.5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            data: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"新线索"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"自动分配"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"销售跟进"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"方案确认"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成交"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"流失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            links: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"新线索"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"自动分配"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">320</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"自动分配"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"销售跟进"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">280</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"自动分配"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"流失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">40</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"销售跟进"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"方案确认"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">190</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"销售跟进"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"流失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">90</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"方案确认"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"成交"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">128</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">                { source: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"方案确认"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"流失"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">62</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-charts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">option</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">option</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">340</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
