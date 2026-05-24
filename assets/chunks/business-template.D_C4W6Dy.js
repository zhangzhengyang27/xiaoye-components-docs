const s=[{label:"TS",raw:`<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type {
  SchedulerDateSelectPayload,
  SchedulerEvent,
  SchedulerEventChangePayload,
  SchedulerEventClickPayload
} from "xiaoye-components";

type RepeatRule = {
  freq: "weekly";
  byweekday: string[];
  dtstart: string;
};

interface ScheduleApiRow {
  id: string;
  subject: string;
  startAt: string;
  endAt?: string;
  isAllDay: boolean;
  owner: string;
  category: "meeting" | "delivery" | "support";
  repeat?: RepeatRule;
}

const rows = ref<ScheduleApiRow[]>([
  {
    id: "api-kickoff",
    subject: "项目 Kickoff",
    startAt: "2026-03-24T10:00:00",
    endAt: "2026-03-24T11:00:00",
    isAllDay: false,
    owner: "Xiaoye",
    category: "meeting"
  },
  {
    id: "api-handover",
    subject: "交付排期",
    startAt: "2026-03-25",
    endAt: "2026-03-27",
    isAllDay: true,
    owner: "Alice",
    category: "delivery"
  },
  {
    id: "api-standup",
    subject: "工作日站会",
    startAt: "2026-03-23T09:30:00",
    isAllDay: false,
    owner: "Team A",
    category: "meeting",
    repeat: {
      freq: "weekly",
      byweekday: ["mo", "tu", "we", "th", "fr"],
      dtstart: "2026-03-23T09:30:00"
    }
  }
]);

const focusDate = ref("2026-03-24");
const latestAction = ref("这里会显示最近一次映射、创建或改期操作。");
const lastPersistPayload = ref("{}");
const editorOpen = ref(false);
const editorDraft = reactive({
  id: "",
  subject: "",
  owner: "",
  category: "meeting" as ScheduleApiRow["category"],
  isAllDay: false,
  startAt: "",
  endAt: ""
});

const schedulerEvents = computed<SchedulerEvent[]>(() =>
  rows.value.map((row) => {
    const event: SchedulerEvent = {
      id: row.id,
      title: row.subject,
      start: row.startAt,
      end: row.endAt,
      allDay: row.isAllDay,
      editable: !row.repeat,
      extendedProps: {
        owner: row.owner,
        category: row.category
      }
    };

    if (row.repeat) {
      event.rrule = row.repeat;
      event.duration = "00:30";
    }

    return event;
  })
);

const rowPreview = computed(() => JSON.stringify(rows.value, null, 2));
const eventPreview = computed(() => JSON.stringify(schedulerEvents.value, null, 2));
const canSaveDraft = computed(() => Boolean(editorDraft.subject.trim() && editorDraft.startAt));

function formatDateOnly(value: string) {
  return value.slice(0, 10);
}

function formatDateTimeLocal(value?: string) {
  return value ? value.slice(0, 16) : "";
}

function normalizeDraftDateTime(value: string, allDay: boolean) {
  if (!value) {
    return "";
  }

  if (allDay) {
    return formatDateOnly(value);
  }

  return value.length === 16 ? \`\${value}:00\` : value;
}

function openEditor(payload?: Partial<ScheduleApiRow>) {
  editorDraft.id = payload?.id ?? "";
  editorDraft.subject = payload?.subject ?? "";
  editorDraft.owner = payload?.owner ?? "当前值班人";
  editorDraft.category = payload?.category ?? "meeting";
  editorDraft.isAllDay = payload?.isAllDay ?? false;
  editorDraft.startAt = editorDraft.isAllDay
    ? formatDateOnly(payload?.startAt ?? "")
    : formatDateTimeLocal(payload?.startAt);
  editorDraft.endAt = editorDraft.isAllDay
    ? formatDateOnly(payload?.endAt ?? "")
    : formatDateTimeLocal(payload?.endAt);
  editorOpen.value = true;
}

function handleDateSelect(payload: SchedulerDateSelectPayload) {
  openEditor({
    isAllDay: payload.allDay,
    startAt: payload.allDay ? formatDateOnly(payload.start) : payload.start,
    endAt: payload.allDay ? formatDateOnly(payload.end) : payload.end
  });
  latestAction.value = \`已根据 date-select 打开编辑面板：\${payload.start} -> \${payload.end}\`;
}

function handleEventClick(payload: SchedulerEventClickPayload) {
  const sourceId = payload.event.sourceId ?? payload.event.id;
  const matched = rows.value.find((row) => row.id === sourceId);

  if (!matched) {
    return;
  }

  openEditor(matched);
  latestAction.value = \`已读取源数据并打开编辑面板：\${matched.subject}\`;
}

function syncPayloadPreview() {
  lastPersistPayload.value = JSON.stringify(
    {
      id: editorDraft.id || "new-row",
      subject: editorDraft.subject.trim(),
      startAt: editorDraft.startAt,
      endAt: editorDraft.endAt || undefined,
      isAllDay: editorDraft.isAllDay,
      owner: editorDraft.owner,
      category: editorDraft.category
    },
    null,
    2
  );
}

function saveDraft() {
  if (!canSaveDraft.value) {
    return;
  }

  const nextRow: ScheduleApiRow = {
    id: editorDraft.id || \`api-\${Date.now()}\`,
    subject: editorDraft.subject.trim(),
    startAt: normalizeDraftDateTime(editorDraft.startAt, editorDraft.isAllDay),
    endAt: editorDraft.endAt
      ? normalizeDraftDateTime(editorDraft.endAt, editorDraft.isAllDay)
      : undefined,
    isAllDay: editorDraft.isAllDay,
    owner: editorDraft.owner,
    category: editorDraft.category
  };

  if (editorDraft.id) {
    rows.value = rows.value.map((row) => (row.id === editorDraft.id ? nextRow : row));
    latestAction.value = \`已按业务模型更新：\${nextRow.subject}\`;
  } else {
    rows.value = [...rows.value, nextRow];
    latestAction.value = \`已按业务模型创建：\${nextRow.subject}\`;
  }

  syncPayloadPreview();
  editorOpen.value = false;
}

function handleEventChange(payload: SchedulerEventChangePayload) {
  const sourceId = payload.event.sourceId ?? payload.event.id;

  rows.value = rows.value.map((row) =>
    row.id === sourceId
      ? {
          ...row,
          startAt: String(payload.event.start),
          endAt: payload.event.end ? String(payload.event.end) : undefined,
          isAllDay: Boolean(payload.event.allDay)
        }
      : row
  );

  lastPersistPayload.value = JSON.stringify(payload.event, null, 2);
  latestAction.value = \`已根据 event-change 回写源数据：\${payload.event.title}\`;
}
<\/script>

<template>
  <div class="scheduler-template">
    <div class="scheduler-template__panel">
      <xy-tag status="primary">接口数据</xy-tag>
      <p class="scheduler-template__panel-description">
        左侧保留业务原始行数据，右侧 \`xy-scheduler\` 只消费映射后的 \`events\`。
      </p>
      <pre class="scheduler-template__panel-preview">{{ rowPreview }}</pre>
    </div>

    <div class="scheduler-template__calendar">
      <xy-scheduler
        v-model="focusDate"
        :events="schedulerEvents"
        selectable
        editable
        @date-select="handleDateSelect"
        @event-click="handleEventClick"
        @event-change="handleEventChange"
      />
    </div>

    <div class="scheduler-template__panel">
      <xy-tag status="success">映射后 events</xy-tag>
      <p class="scheduler-template__panel-description">
        这里展示传给 \`xy-scheduler\` 的事件数组，以及最近一次准备提交的 payload。
      </p>
      <pre class="scheduler-template__panel-preview">{{ eventPreview }}</pre>
      <xy-tag status="warning">{{ latestAction }}</xy-tag>
      <pre class="scheduler-template__panel-preview">{{ lastPersistPayload }}</pre>
    </div>

    <xy-drawer v-model="editorOpen" title="业务编辑面板" placement="right" :size="420">
      <div class="scheduler-template__drawer">
        <xy-input v-model="editorDraft.subject" placeholder="事件标题 / 业务主题" />
        <xy-input v-model="editorDraft.owner" placeholder="负责人 / 值班人" />
        <xy-select
          v-model="editorDraft.category"
          :options="[
            { label: '会议', value: 'meeting' },
            { label: '交付', value: 'delivery' },
            { label: '支持', value: 'support' }
          ]"
          placeholder="事件分类"
        />
        <div class="scheduler-template__switch-row">
          <strong class="scheduler-template__switch-title">全天事件</strong>
          <xy-switch v-model="editorDraft.isAllDay" />
        </div>
        <label class="scheduler-template__field">
          <span>开始时间</span>
          <input
            v-model="editorDraft.startAt"
            class="scheduler-template__field-input"
            :type="editorDraft.isAllDay ? 'date' : 'datetime-local'"
          />
        </label>
        <label class="scheduler-template__field">
          <span>结束时间</span>
          <input
            v-model="editorDraft.endAt"
            class="scheduler-template__field-input"
            :type="editorDraft.isAllDay ? 'date' : 'datetime-local'"
          />
        </label>
      </div>

      <template #footer>
        <xy-space>
          <xy-button plain @click="editorOpen = false">取消</xy-button>
          <xy-button type="primary" :disabled="!canSaveDraft" @click="saveDraft">
            保存到业务模型
          </xy-button>
        </xy-space>
      </template>
    </xy-drawer>
  </div>
</template>

<style scoped>
.scheduler-template {
  display: grid;
  gap: 16px;
}

.scheduler-template__panel,
.scheduler-template__calendar {
  padding: 16px;
  border: 1px solid var(--xy-border-color-subtle);
  border-radius: var(--xy-radius-lg);
  background: var(--xy-surface-raised);
  box-shadow: var(--xy-shadow-xs);
}

.scheduler-template__panel-description {
  margin: 8px 0 12px;
  color: var(--xy-text-color-secondary);
}

.scheduler-template__panel-preview {
  overflow: auto;
  margin: 12px 0 0;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid var(--xy-border-color-subtle);
  background: color-mix(in srgb, var(--xy-bg-color-subtle) 92%, white);
  color: var(--xy-text-color);
  font-size: 12px;
  line-height: 1.5;
}

.scheduler-template__drawer {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.scheduler-template__switch-row,
.scheduler-template__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.scheduler-template__field span,
.scheduler-template__switch-title {
  color: var(--xy-text-color-heading);
  font-weight: 600;
}

.scheduler-template__field-input {
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--xy-border-color-subtle);
  border-radius: 12px;
  background: var(--xy-surface-raised);
  color: var(--xy-text-color);
}
</style>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"ts"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { computed, reactive, ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SchedulerDateSelectPayload,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SchedulerEvent,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SchedulerEventChangePayload,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  SchedulerEventClickPayload</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "xiaoye-components"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> RepeatRule</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  freq</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "weekly"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  byweekday</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[];</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  dtstart</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ScheduleApiRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  subject</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  startAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  endAt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  isAllDay</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  owner</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  category</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "meeting"</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "delivery"</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "support"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">  repeat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> RepeatRule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">ScheduleApiRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[]>([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"api-kickoff"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"项目 Kickoff"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    startAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-24T10:00:00"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    endAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-24T11:00:00"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    isAllDay: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    owner: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Xiaoye"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    category: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meeting"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"api-handover"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"交付排期"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    startAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-25"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    endAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-27"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    isAllDay: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    owner: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Alice"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    category: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"delivery"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"api-standup"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"工作日站会"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    startAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-23T09:30:00"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    isAllDay: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    owner: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Team A"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    category: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meeting"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    repeat: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      freq: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"weekly"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      byweekday: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"mo"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tu"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"we"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"th"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fr"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      dtstart: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-23T09:30:00"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> focusDate</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-24"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> latestAction</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"这里会显示最近一次映射、创建或改期操作。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> lastPersistPayload</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"{}"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> editorOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> editorDraft</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> reactive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  owner: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  category: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meeting"</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> as</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ScheduleApiRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"category"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  isAllDay: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  startAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  endAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> schedulerEvents</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">SchedulerEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[]>(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  rows.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> event</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> SchedulerEvent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      id: row.id,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      title: row.subject,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      start: row.startAt,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      end: row.endAt,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      allDay: row.isAllDay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      editable: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">row.repeat,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      extendedProps: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        owner: row.owner,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        category: row.category</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (row.repeat) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      event.rrule </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row.repeat;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      event.duration </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "00:30"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> event;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rowPreview</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(rows.value, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> eventPreview</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(schedulerEvents.value, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> canSaveDraft</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(editorDraft.subject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorDraft.startAt));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateTimeLocal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> normalizeDraftDateTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">allDay</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (allDay) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 16</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}:00\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> openEditor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">payload</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Partial</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">ScheduleApiRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorDraft.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorDraft.subject </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.subject </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorDraft.owner </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.owner </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "当前值班人"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorDraft.category </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.category </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "meeting"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorDraft.isAllDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.isAllDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorDraft.startAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorDraft.isAllDay</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload?.startAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateTimeLocal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload?.startAt);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorDraft.endAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorDraft.isAllDay</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload?.endAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateTimeLocal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload?.endAt);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorOpen.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> handleDateSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">payload</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> SchedulerDateSelectPayload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  openEditor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    isAllDay: payload.allDay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    startAt: payload.allDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.start) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.start,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    endAt: payload.allDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.end) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已根据 date-select 打开编辑面板：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">payload</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} -> \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">payload</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">end</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> handleEventClick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">payload</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> SchedulerEventClickPayload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> sourceId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.event.sourceId </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.event.id;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> matched</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> rows.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> sourceId);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">matched) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  openEditor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(matched);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已读取源数据并打开编辑面板：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">matched</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> syncPayloadPreview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  lastPersistPayload.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      id: editorDraft.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">||</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "new-row"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      subject: editorDraft.subject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      startAt: editorDraft.startAt,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      endAt: editorDraft.endAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      isAllDay: editorDraft.isAllDay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      owner: editorDraft.owner,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      category: editorDraft.category</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">    null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">    2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> saveDraft</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">canSaveDraft.value) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> nextRow</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ScheduleApiRow</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    id: editorDraft.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">||</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`api-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">Date</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">now</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    subject: editorDraft.subject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    startAt: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">normalizeDraftDateTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(editorDraft.startAt, editorDraft.isAllDay),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    endAt: editorDraft.endAt</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">      ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> normalizeDraftDateTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(editorDraft.endAt, editorDraft.isAllDay)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">      :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    isAllDay: editorDraft.isAllDay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    owner: editorDraft.owner,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    category: editorDraft.category</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (editorDraft.id) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    rows.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> rows.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (row.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorDraft.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> nextRow </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已按业务模型更新：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">nextRow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    rows.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">rows.value, nextRow];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已按业务模型创建：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">nextRow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">  syncPayloadPreview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  editorOpen.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> handleEventChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">payload</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> SchedulerEventChangePayload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> sourceId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.event.sourceId </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.event.id;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  rows.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> rows.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    row.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> sourceId</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">      ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">          ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">row,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          startAt: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.event.start),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          endAt: payload.event.end </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.event.end) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          isAllDay: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.event.allDay)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">      :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  );</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  lastPersistPayload.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.event, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已根据 event-change 回写源数据：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">payload</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">event</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">title</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>接口数据&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-description"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        左侧保留业务原始行数据，右侧 \`xy-scheduler\` 只消费映射后的 \`events\`。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-preview"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ rowPreview }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__calendar"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-scheduler</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">focusDate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">events</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">schedulerEvents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        selectable</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        editable</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">date-select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">handleDateSelect</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">event-click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">handleEventClick</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">event-change</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">handleEventChange</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>映射后 events&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-description"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        这里展示传给 \`xy-scheduler\` 的事件数组，以及最近一次准备提交的 payload。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-preview"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ eventPreview }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"warning"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ latestAction }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-preview"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ lastPersistPayload }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-drawer</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorOpen</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"业务编辑面板"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> placement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"right"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">420</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__drawer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-input</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"事件标题 / 业务主题"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-input</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.owner</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"负责人 / 值班人"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-select</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.category</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">options</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'会议'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'meeting'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'交付'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'delivery'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'支持'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'support'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          ]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"事件分类"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__switch-row"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">strong</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__switch-title"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>全天事件&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">strong</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-switch</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.isAllDay</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">label</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__field"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>开始时间&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">input</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.startAt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__field-input"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.isAllDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'date'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'datetime-local'"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">label</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__field"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>结束时间&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">input</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.endAt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__field-input"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.isAllDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'date'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'datetime-local'"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">footer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorOpen </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> false</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>取消&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">disabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">canSaveDraft</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">saveDraft</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            保存到业务模型</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-drawer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">style</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> scoped</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__panel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__calendar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> solid</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-border-color-subtle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border-radius</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-radius-lg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-surface-raised</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  box-shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-shadow-xs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__panel-description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">8</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color-secondary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__panel-preview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">auto</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border-radius</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">14</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> solid</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-border-color-subtle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">color-mix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> srgb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-bg-color-subtle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">92</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">white</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  font-size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  line-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__drawer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">14</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__switch-row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__field</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">6</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__field</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D"> span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__switch-title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color-heading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  font-weight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">600</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__field-input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  min-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">40</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> solid</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-border-color-subtle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border-radius</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-surface-raised</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`},{label:"JS",raw:`<script setup>
import { computed, reactive, ref } from "vue";

const rows = ref([
    {
        id: "api-kickoff",
        subject: "项目 Kickoff",
        startAt: "2026-03-24T10:00:00",
        endAt: "2026-03-24T11:00:00",
        isAllDay: false,
        owner: "Xiaoye",
        category: "meeting"
    },
    {
        id: "api-handover",
        subject: "交付排期",
        startAt: "2026-03-25",
        endAt: "2026-03-27",
        isAllDay: true,
        owner: "Alice",
        category: "delivery"
    },
    {
        id: "api-standup",
        subject: "工作日站会",
        startAt: "2026-03-23T09:30:00",
        isAllDay: false,
        owner: "Team A",
        category: "meeting",
        repeat: {
            freq: "weekly",
            byweekday: ["mo", "tu", "we", "th", "fr"],
            dtstart: "2026-03-23T09:30:00"
        }
    }
]);

const focusDate = ref("2026-03-24");
const latestAction = ref("这里会显示最近一次映射、创建或改期操作。");
const lastPersistPayload = ref("{}");
const editorOpen = ref(false);
const editorDraft = reactive({
    id: "",
    subject: "",
    owner: "",
    category: "meeting",
    isAllDay: false,
    startAt: "",
    endAt: ""
});

const schedulerEvents = computed(() => rows.value.map((row) => {
    const event = {
        id: row.id,
        title: row.subject,
        start: row.startAt,
        end: row.endAt,
        allDay: row.isAllDay,
        editable: !row.repeat,
        extendedProps: {
            owner: row.owner,
            category: row.category
        }
    };
    
    if (row.repeat) {
        event.rrule = row.repeat;
        event.duration = "00:30";
    }
    
    return event;
}));

const rowPreview = computed(() => JSON.stringify(rows.value, null, 2));
const eventPreview = computed(() => JSON.stringify(schedulerEvents.value, null, 2));
const canSaveDraft = computed(() => Boolean(editorDraft.subject.trim() && editorDraft.startAt));

function formatDateOnly(value) {
    return value.slice(0, 10);
}

function formatDateTimeLocal(value) {
    return value ? value.slice(0, 16) : "";
}

function normalizeDraftDateTime(value, allDay) {
    if (!value) {
        return "";
    }
    
    if (allDay) {
        return formatDateOnly(value);
    }
    
    return value.length === 16 ? \`\${value}:00\` : value;
}

function openEditor(payload) {
    editorDraft.id = payload?.id ?? "";
    editorDraft.subject = payload?.subject ?? "";
    editorDraft.owner = payload?.owner ?? "当前值班人";
    editorDraft.category = payload?.category ?? "meeting";
    editorDraft.isAllDay = payload?.isAllDay ?? false;
    editorDraft.startAt = editorDraft.isAllDay
        ? formatDateOnly(payload?.startAt ?? "")
        : formatDateTimeLocal(payload?.startAt);
    editorDraft.endAt = editorDraft.isAllDay
        ? formatDateOnly(payload?.endAt ?? "")
        : formatDateTimeLocal(payload?.endAt);
    editorOpen.value = true;
}

function handleDateSelect(payload) {
    openEditor({
        isAllDay: payload.allDay,
        startAt: payload.allDay ? formatDateOnly(payload.start) : payload.start,
        endAt: payload.allDay ? formatDateOnly(payload.end) : payload.end
    });
    latestAction.value = \`已根据 date-select 打开编辑面板：\${payload.start} -> \${payload.end}\`;
}

function handleEventClick(payload) {
    const sourceId = payload.event.sourceId ?? payload.event.id;
    const matched = rows.value.find((row) => row.id === sourceId);
    
    if (!matched) {
        return;
    }
    
    openEditor(matched);
    latestAction.value = \`已读取源数据并打开编辑面板：\${matched.subject}\`;
}

function syncPayloadPreview() {
    lastPersistPayload.value = JSON.stringify({
        id: editorDraft.id || "new-row",
        subject: editorDraft.subject.trim(),
        startAt: editorDraft.startAt,
        endAt: editorDraft.endAt || undefined,
        isAllDay: editorDraft.isAllDay,
        owner: editorDraft.owner,
        category: editorDraft.category
    }, null, 2);
}

function saveDraft() {
    if (!canSaveDraft.value) {
        return;
    }
    
    const nextRow = {
        id: editorDraft.id || \`api-\${Date.now()}\`,
        subject: editorDraft.subject.trim(),
        startAt: normalizeDraftDateTime(editorDraft.startAt, editorDraft.isAllDay),
        endAt: editorDraft.endAt
            ? normalizeDraftDateTime(editorDraft.endAt, editorDraft.isAllDay)
            : undefined,
        isAllDay: editorDraft.isAllDay,
        owner: editorDraft.owner,
        category: editorDraft.category
    };
    
    if (editorDraft.id) {
        rows.value = rows.value.map((row) => (row.id === editorDraft.id ? nextRow : row));
        latestAction.value = \`已按业务模型更新：\${nextRow.subject}\`;
    }
    else {
        rows.value = [...rows.value, nextRow];
        latestAction.value = \`已按业务模型创建：\${nextRow.subject}\`;
    }
    
    syncPayloadPreview();
    editorOpen.value = false;
}

function handleEventChange(payload) {
    const sourceId = payload.event.sourceId ?? payload.event.id;
    
    rows.value = rows.value.map((row) => row.id === sourceId
        ? {
            ...row,
            startAt: String(payload.event.start),
            endAt: payload.event.end ? String(payload.event.end) : undefined,
            isAllDay: Boolean(payload.event.allDay)
        }
        : row);
    
    lastPersistPayload.value = JSON.stringify(payload.event, null, 2);
    latestAction.value = \`已根据 event-change 回写源数据：\${payload.event.title}\`;
}
<\/script>

<template>
  <div class="scheduler-template">
    <div class="scheduler-template__panel">
      <xy-tag status="primary">接口数据</xy-tag>
      <p class="scheduler-template__panel-description">
        左侧保留业务原始行数据，右侧 \`xy-scheduler\` 只消费映射后的 \`events\`。
      </p>
      <pre class="scheduler-template__panel-preview">{{ rowPreview }}</pre>
    </div>

    <div class="scheduler-template__calendar">
      <xy-scheduler
        v-model="focusDate"
        :events="schedulerEvents"
        selectable
        editable
        @date-select="handleDateSelect"
        @event-click="handleEventClick"
        @event-change="handleEventChange"
      />
    </div>

    <div class="scheduler-template__panel">
      <xy-tag status="success">映射后 events</xy-tag>
      <p class="scheduler-template__panel-description">
        这里展示传给 \`xy-scheduler\` 的事件数组，以及最近一次准备提交的 payload。
      </p>
      <pre class="scheduler-template__panel-preview">{{ eventPreview }}</pre>
      <xy-tag status="warning">{{ latestAction }}</xy-tag>
      <pre class="scheduler-template__panel-preview">{{ lastPersistPayload }}</pre>
    </div>

    <xy-drawer v-model="editorOpen" title="业务编辑面板" placement="right" :size="420">
      <div class="scheduler-template__drawer">
        <xy-input v-model="editorDraft.subject" placeholder="事件标题 / 业务主题" />
        <xy-input v-model="editorDraft.owner" placeholder="负责人 / 值班人" />
        <xy-select
          v-model="editorDraft.category"
          :options="[
            { label: '会议', value: 'meeting' },
            { label: '交付', value: 'delivery' },
            { label: '支持', value: 'support' }
          ]"
          placeholder="事件分类"
        />
        <div class="scheduler-template__switch-row">
          <strong class="scheduler-template__switch-title">全天事件</strong>
          <xy-switch v-model="editorDraft.isAllDay" />
        </div>
        <label class="scheduler-template__field">
          <span>开始时间</span>
          <input
            v-model="editorDraft.startAt"
            class="scheduler-template__field-input"
            :type="editorDraft.isAllDay ? 'date' : 'datetime-local'"
          />
        </label>
        <label class="scheduler-template__field">
          <span>结束时间</span>
          <input
            v-model="editorDraft.endAt"
            class="scheduler-template__field-input"
            :type="editorDraft.isAllDay ? 'date' : 'datetime-local'"
          />
        </label>
      </div>

      <template #footer>
        <xy-space>
          <xy-button plain @click="editorOpen = false">取消</xy-button>
          <xy-button type="primary" :disabled="!canSaveDraft" @click="saveDraft">
            保存到业务模型
          </xy-button>
        </xy-space>
      </template>
    </xy-drawer>
  </div>
</template>

<style scoped>
.scheduler-template {
  display: grid;
  gap: 16px;
}

.scheduler-template__panel,
.scheduler-template__calendar {
  padding: 16px;
  border: 1px solid var(--xy-border-color-subtle);
  border-radius: var(--xy-radius-lg);
  background: var(--xy-surface-raised);
  box-shadow: var(--xy-shadow-xs);
}

.scheduler-template__panel-description {
  margin: 8px 0 12px;
  color: var(--xy-text-color-secondary);
}

.scheduler-template__panel-preview {
  overflow: auto;
  margin: 12px 0 0;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid var(--xy-border-color-subtle);
  background: color-mix(in srgb, var(--xy-bg-color-subtle) 92%, white);
  color: var(--xy-text-color);
  font-size: 12px;
  line-height: 1.5;
}

.scheduler-template__drawer {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.scheduler-template__switch-row,
.scheduler-template__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.scheduler-template__field span,
.scheduler-template__switch-title {
  color: var(--xy-text-color-heading);
  font-weight: 600;
}

.scheduler-template__field-input {
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--xy-border-color-subtle);
  border-radius: 12px;
  background: var(--xy-surface-raised);
  color: var(--xy-text-color);
}
</style>
`,rendered:`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0" v-pre=""><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> { computed, reactive, ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "vue"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rows</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"api-kickoff"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"项目 Kickoff"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        startAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-24T10:00:00"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        endAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-24T11:00:00"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        isAllDay: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        owner: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Xiaoye"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        category: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meeting"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"api-handover"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"交付排期"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        startAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-25"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        endAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-27"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        isAllDay: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        owner: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Alice"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        category: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"delivery"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"api-standup"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"工作日站会"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        startAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-23T09:30:00"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        isAllDay: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        owner: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"Team A"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        category: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meeting"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        repeat: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            freq: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"weekly"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            byweekday: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"mo"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"tu"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"we"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"th"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"fr"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            dtstart: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-23T09:30:00"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> focusDate</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"2026-03-24"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> latestAction</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"这里会显示最近一次映射、创建或改期操作。"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> lastPersistPayload</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"{}"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> editorOpen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> editorDraft</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> reactive</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    subject: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    owner: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    category: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"meeting"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    isAllDay: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    startAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    endAt: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">""</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> schedulerEvents</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> rows.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> event</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        id: row.id,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        title: row.subject,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        start: row.startAt,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        end: row.endAt,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        allDay: row.isAllDay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        editable: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">row.repeat,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        extendedProps: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            owner: row.owner,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            category: row.category</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (row.repeat) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        event.rrule </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row.repeat;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        event.duration </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "00:30"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> event;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> rowPreview</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(rows.value, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> eventPreview</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(schedulerEvents.value, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> canSaveDraft</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(editorDraft.subject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">&#x26;&#x26;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorDraft.startAt));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateTimeLocal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">slice</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> normalizeDraftDateTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">allDay</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (allDay) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 16</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}:00\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> openEditor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorDraft.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorDraft.subject </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.subject </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorDraft.owner </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.owner </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "当前值班人"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorDraft.category </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.category </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "meeting"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorDraft.isAllDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload?.isAllDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorDraft.startAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorDraft.isAllDay</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload?.startAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateTimeLocal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload?.startAt);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorDraft.endAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorDraft.isAllDay</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload?.endAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateTimeLocal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload?.endAt);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorOpen.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> handleDateSelect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    openEditor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        isAllDay: payload.allDay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        startAt: payload.allDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.start) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.start,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        endAt: payload.allDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> formatDateOnly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.end) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已根据 date-select 打开编辑面板：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">payload</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">} -> \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">payload</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">end</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> handleEventClick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> sourceId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.event.sourceId </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.event.id;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> matched</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> rows.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> sourceId);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">matched) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    openEditor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(matched);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已读取源数据并打开编辑面板：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">matched</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> syncPayloadPreview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    lastPersistPayload.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        id: editorDraft.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">||</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> "new-row"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        subject: editorDraft.subject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        startAt: editorDraft.startAt,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        endAt: editorDraft.endAt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        isAllDay: editorDraft.isAllDay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        owner: editorDraft.owner,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        category: editorDraft.category</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> saveDraft</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">canSaveDraft.value) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> nextRow</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        id: editorDraft.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">||</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`api-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">Date</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">now</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">()</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        subject: editorDraft.subject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        startAt: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">normalizeDraftDateTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(editorDraft.startAt, editorDraft.isAllDay),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        endAt: editorDraft.endAt</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">            ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> normalizeDraftDateTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(editorDraft.endAt, editorDraft.isAllDay)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">            :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        isAllDay: editorDraft.isAllDay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        owner: editorDraft.owner,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        category: editorDraft.category</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (editorDraft.id) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        rows.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> rows.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> (row.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> editorDraft.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> nextRow </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已按业务模型更新：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">nextRow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        rows.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">rows.value, nextRow];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已按业务模型创建：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">nextRow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">    syncPayloadPreview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    editorOpen.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> handleEventChange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">payload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> sourceId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.event.sourceId </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">??</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> payload.event.id;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    rows.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> rows.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=></span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row.id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> sourceId</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        ?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">            ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">row,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            startAt: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.event.start),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            endAt: payload.event.end </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.event.end) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            isAllDay: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.event.allDay)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">        :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> row);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    lastPersistPayload.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">stringify</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(payload.event, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    latestAction.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> \`已根据 event-change 回写源数据：\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">payload</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">event</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">title</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>接口数据&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-description"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        左侧保留业务原始行数据，右侧 \`xy-scheduler\` 只消费映射后的 \`events\`。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-preview"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ rowPreview }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__calendar"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-scheduler</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">focusDate</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">events</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">schedulerEvents</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        selectable</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">        editable</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">date-select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">handleDateSelect</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">event-click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">handleEventClick</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">event-change</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">handleEventChange</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"success"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>映射后 events&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-description"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        这里展示传给 \`xy-scheduler\` 的事件数组，以及最近一次准备提交的 payload。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-preview"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ eventPreview }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"warning"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ latestAction }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-tag</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__panel-preview"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>{{ lastPersistPayload }}&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-drawer</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorOpen</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"业务编辑面板"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> placement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"right"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">420</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__drawer"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-input</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.subject</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"事件标题 / 业务主题"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-input</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.owner</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"负责人 / 值班人"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-select</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.category</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">options</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">[</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'会议'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'meeting'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'交付'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'delivery'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            { label: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'支持'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">'support'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          ]</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">          placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"事件分类"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__switch-row"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">strong</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__switch-title"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>全天事件&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">strong</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-switch</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.isAllDay</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">label</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__field"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>开始时间&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">input</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.startAt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__field-input"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.isAllDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'date'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'datetime-local'"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">label</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__field"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>结束时间&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">input</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.endAt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">            class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"scheduler-template__field-input"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorDraft.isAllDay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'date'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF"> 'datetime-local'"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          /></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">label</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> #</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">footer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> plain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">editorOpen </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> false</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">>取消&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"primary"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">disabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">canSaveDraft</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> @</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">saveDraft</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF">"</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">            保存到业务模型</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">          &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">        &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-space</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">      &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">    &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">xy-drawer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">  &#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">style</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0"> scoped</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">grid</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__panel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__calendar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> solid</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-border-color-subtle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border-radius</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-radius-lg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-surface-raised</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  box-shadow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-shadow-xs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__panel-description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">8</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color-secondary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__panel-preview</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">auto</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  margin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border-radius</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">14</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> solid</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-border-color-subtle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">color-mix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> srgb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-bg-color-subtle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">92</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">white</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  font-size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  line-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__drawer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">14</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__switch-row</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__field</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">flex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  flex-direction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">column</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  gap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">6</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__field</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D"> span</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__switch-title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color-heading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  font-weight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">600</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0">.scheduler-template__field-input</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  min-height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">40</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  padding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> 12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> solid</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF"> var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-border-color-subtle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  border-radius</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-surface-raised</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70">--xy-text-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8">></span></span></code></pre>
</div>`}];export{s as default};
