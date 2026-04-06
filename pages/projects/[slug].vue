<template>
  <div class="project-detail">
    <section class="page-hero">
      <div class="container">
        <NuxtLink :to="localePath('/projects')" class="back-link clickable reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          {{ locale === 'zh' ? '返回项目' : 'Back to Projects' }}
        </NuxtLink>
        <h1 class="reveal delay-1">{{ project?.title }}</h1>
        <p class="page-subtitle reveal delay-2">{{ project?.desc }}</p>
        <div class="project-meta reveal delay-3">
          <span class="meta-badge">{{ project?.type }}</span>
          <span v-for="t in project?.tags" :key="t" class="meta-tag">{{ t }}</span>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="container container-sm">
        <div class="content-body reveal">
          <h2>{{ locale === 'zh' ? '项目概述' : 'Overview' }}</h2>
          <p>{{ project?.overview }}</p>

          <h2>{{ locale === 'zh' ? '核心功能' : 'Key Features' }}</h2>
          <ul>
            <li v-for="f in project?.features" :key="f">{{ f }}</li>
          </ul>

          <h2>{{ locale === 'zh' ? '技术架构' : 'Tech Architecture' }}</h2>
          <p>{{ project?.architecture }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
useScrollReveal()

const slug = computed(() => route.params.slug)

const projectsData = computed(() => ({
  heartsound: {
    title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound Intelligence',
    desc: locale.value === 'zh' ? 'AI 心脏健康监测系统' : 'AI Heart Health Monitoring System',
    type: 'AI + Hardware',
    tags: ['Python', 'AI/ML', 'PyQt5', 'Raspberry Pi'],
    overview: locale.value === 'zh'
      ? '心音智鉴是一款基于树莓派的 AI 心脏健康监测设备。通过电子听诊器采集心音信号，利用深度学习模型进行实时分析，在 5 英寸触摸屏上展示直观的诊断结果。'
      : 'HeartSound Intelligence is an AI-powered heart health monitoring device built on Raspberry Pi. It captures heart sounds through electronic stethoscope and performs real-time analysis using deep learning models.',
    features: locale.value === 'zh'
      ? ['深度学习心音分类模型', '实时信号采集与预处理', '5 英寸触摸屏 PyQt5 GUI', '历史数据管理与趋势分析', '便携式嵌入式硬件方案']
      : ['Deep learning heart sound classification', 'Real-time signal acquisition', '5-inch touchscreen PyQt5 GUI', 'Historical data management', 'Portable embedded hardware'],
    architecture: locale.value === 'zh'
      ? '前端采用 PyQt5 构建多页面 GUI，使用 QStackedWidget 实现路由。后端基于 Python，集成 TensorFlow/PyTorch 模型推理引擎。硬件层通过 GPIO 和 USB 音频接口连接电子听诊器与树莓派。'
      : 'Frontend uses PyQt5 for multi-page GUI with QStackedWidget routing. Backend is Python-based with TensorFlow/PyTorch inference engine. Hardware connects via GPIO and USB audio interface.',
  },
  'wisdom-classroom': {
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh' ? '智能教育平台' : 'Smart Education Platform',
    type: 'Full Stack',
    tags: ['Nuxt 3', 'Vue 3', 'C++/Qt', 'Supabase'],
    overview: locale.value === 'zh'
      ? '一个 Web + Qt 桌面双端的智能教育平台，集成大语言模型辅助备课、AI 生成课件与教学案例、新闻资讯聚合等功能。'
      : 'A dual-platform smart education system (Web + Qt Desktop) integrating LLM-assisted lesson planning, AI-generated courseware, and news aggregation.',
    features: locale.value === 'zh'
      ? ['AI 辅助备课与教案生成', 'SSE 流式 AI 对话', 'PPT 自动生成', 'BBC RSS 新闻集成', '用户认证与权限管理']
      : ['AI-assisted lesson planning', 'SSE streaming AI chat', 'Auto PPT generation', 'BBC RSS news integration', 'User auth & permissions'],
    architecture: locale.value === 'zh'
      ? 'Web 端基于 Nuxt 3 + Supabase，Qt 桌面端使用 C++ 构建。AI 能力通过智谱 GLM API 接入，支持多模型选择与 SSE 流式输出。'
      : 'Web built on Nuxt 3 + Supabase, Desktop on C++/Qt. AI powered by Zhipu GLM API with multi-model support and SSE streaming.',
  },
  mindguard: {
    title: 'MindGuard',
    desc: locale.value === 'zh' ? '高校心理健康小程序' : 'Campus Mental Health Mini-Program',
    type: locale.value === 'zh' ? '微信小程序' : 'WeChat Mini Program',
    tags: ['WeChat MP', 'Dify AI', 'Cloud Dev'],
    overview: locale.value === 'zh'
      ? 'MindGuard 是一款面向高校学生的心理健康微信小程序，通过 AI 工作流驱动情绪打卡、心理测评与社区守护功能。'
      : 'MindGuard is a WeChat mini-program for campus mental health, featuring AI-driven mood tracking, psychological assessment, and community support.',
    features: locale.value === 'zh'
      ? ['AI 情绪分析与打卡', '标准化心理测评量表', '匿名社区互助', 'Dify AI 工作流集成', '微信云开发后端']
      : ['AI mood analysis & check-in', 'Standardized assessments', 'Anonymous community support', 'Dify AI workflow integration', 'WeChat Cloud backend'],
    architecture: locale.value === 'zh'
      ? '前端使用微信小程序原生框架，后端采用微信云开发（云函数 + 云数据库）。AI 能力通过 Dify 平台接入，实现情绪分析与个性化建议工作流。'
      : 'Frontend uses native WeChat framework. Backend on WeChat Cloud (Cloud Functions + Cloud DB). AI via Dify platform for mood analysis and personalized recommendation workflows.',
  },
}))

const project = computed(() => projectsData.value[slug.value] || projectsData.value['heartsound'])

useHead({
  title: computed(() => project.value ? `${project.value.title} | Zhou Zhiqi` : '项目'),
})
</script>

<style scoped>
.page-hero {
  padding: 160px 0 60px;
  border-bottom: 1px solid var(--color-border);
  position: relative;
}

.page-hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 20%;
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-decoration: none;
  margin-bottom: 24px;
  transition: color 0.2s;
}

.back-link:hover { color: var(--color-primary-light); }

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.page-subtitle { font-size: 17px; color: var(--color-text-secondary); margin-bottom: 20px; }

.project-meta { display: flex; flex-wrap: wrap; gap: 8px; }

.meta-badge {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary-light);
  padding: 4px 14px;
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: var(--radius-full);
  background: rgba(14, 165, 233, 0.06);
}

.meta-tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  padding: 4px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
}

.content-section { padding: 64px 0 120px; }

.content-body h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 36px 0 16px;
  letter-spacing: -0.02em;
}

.content-body h2:first-child { margin-top: 0; }

.content-body p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.content-body ul {
  margin-bottom: 16px;
}

.content-body li {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  padding: 6px 0 6px 20px;
  position: relative;
}

.content-body li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 14px;
  width: 6px;
  height: 6px;
  background: var(--color-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(14, 165, 233, 0.3);
}

@media (max-width: 768px) {
  .page-hero { padding: 120px 0 48px; }
}
</style>
