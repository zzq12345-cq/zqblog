<template>
  <div class="project-detail">
    <section class="page-hero">
      <div class="hero-glow" :style="{ background: project?.heroGlow }"></div>
      <div class="container">
        <NuxtLink :to="localePath('/projects')" class="back-link clickable reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          {{ locale === 'zh' ? '返回项目' : 'Back to Projects' }}
        </NuxtLink>

        <div class="hero-layout">
          <div class="hero-text">
            <div class="hero-badge reveal delay-1">
              <span class="badge-dot"></span>
              {{ project?.type }}
            </div>
            <h1 class="reveal delay-1">{{ project?.title }}</h1>
            <p class="page-subtitle reveal delay-2">{{ project?.desc }}</p>
            <div class="project-meta reveal delay-3">
              <span v-for="t in project?.tags" :key="t" class="meta-tag">{{ t }}</span>
            </div>
          </div>

          <!-- Abstract device mockup -->
          <div class="hero-mockup reveal delay-2">
            <div class="mockup-window">
              <div class="mockup-bar">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="mockup-url">{{ project?.mockupUrl }}</span>
              </div>
              <div class="mockup-screen" :style="{ background: project?.screenBg }">
                <div class="mockup-content" v-html="project?.screenContent"></div>
              </div>
            </div>
            <div class="mockup-glow" :style="{ background: project?.heroGlow }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overview -->
    <section class="content-section">
      <div class="container container-sm">
        <div class="section-header reveal">
          <span class="section-label">{{ locale === 'zh' ? '项目概述' : 'Overview' }}</span>
        </div>
        <p class="overview-text reveal delay-1">{{ project?.overview }}</p>
      </div>
    </section>

    <!-- Features Bento Grid -->
    <section class="features-section">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-label">{{ locale === 'zh' ? '核心功能' : 'Key Features' }}</span>
        </div>
        <div class="features-grid">
          <div
            v-for="(f, i) in project?.features"
            :key="i"
            class="feature-card reveal"
            :class="[`delay-${(i % 4) + 1}`, f.span ? `span-${f.span}` : '']"
          >
            <div class="feature-icon" v-html="f.icon"></div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Architecture -->
    <section class="arch-section">
      <div class="container container-sm">
        <div class="section-header reveal">
          <span class="section-label">{{ locale === 'zh' ? '技术架构' : 'Tech Architecture' }}</span>
        </div>
        <p class="arch-desc reveal delay-1">{{ project?.archDesc }}</p>
        <div class="arch-pills reveal delay-2">
          <span v-for="pill in project?.archPills" :key="pill.name" class="arch-pill" :class="pill.type">
            <span class="pill-dot" :class="pill.type"></span>
            {{ pill.name }}
          </span>
        </div>
        <div class="arch-legend reveal delay-3">
          <span><span class="pill-dot frontend"></span> Frontend</span>
          <span><span class="pill-dot backend"></span> Backend</span>
          <span><span class="pill-dot ai"></span> AI / ML</span>
          <span><span class="pill-dot infra"></span> Infra</span>
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

const featureIcons = {
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 3-2 5-4 6v3h-6v-3c-2-1-4-3-4-6a7 7 0 0 1 7-7z"/><path d="M9 18h6"/><path d="M10 21h4"/></svg>',
  wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 12h3l2-5 3 10 3-7 2 2h7"/></svg>',
  screen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>',
  chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M6 9H2M6 15H2M18 9h4M18 15h4M9 6V2M15 6V2M9 22v-4M15 22v-4"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  rss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
}

const projectsData = computed(() => ({
  heartsound: {
    title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound Intelligence',
    desc: locale.value === 'zh' ? 'AI 心脏健康监测系统 · 树莓派 + 深度学习' : 'AI Heart Health Monitoring · RPi + Deep Learning',
    type: 'AI + Hardware',
    tags: ['Python', 'AI/ML', 'PyQt5', 'Raspberry Pi'],
    heroGlow: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
    mockupUrl: 'heartsound.local:5000',
    screenBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(14, 165, 233, 0.05))',
    screenContent: '<div style="padding:16px;font-family:monospace;font-size:11px;color:rgba(148,163,184,0.7);line-height:1.8"><span style="color:#818cf8">class</span> <span style="color:#38bdf8">HeartClassifier</span>:<br>&nbsp;&nbsp;<span style="color:#818cf8">def</span> <span style="color:#22d3ee">predict</span>(self, audio):<br>&nbsp;&nbsp;&nbsp;&nbsp;feat = self.extract(audio)<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#818cf8">return</span> self.model(feat)<br><br><span style="color:#4ade80">▶ Normal sinus rhythm</span><br><span style="color:rgba(148,163,184,0.4)">confidence: 94.7%</span></div>',
    overview: locale.value === 'zh'
      ? '心音智鉴是一款基于树莓派的 AI 心脏健康监测设备。通过电子听诊器采集心音信号，利用深度学习模型进行实时分析，在 5 英寸触摸屏上展示直观的诊断结果。'
      : 'HeartSound Intelligence is an AI-powered heart health monitoring device built on Raspberry Pi. It captures heart sounds through electronic stethoscope and performs real-time analysis using deep learning models.',
    features: locale.value === 'zh' ? [
      { icon: featureIcons.brain, title: '深度学习分类', desc: '基于 CNN 的心音分类模型，准确识别多种心音异常', span: 2 },
      { icon: featureIcons.wave, title: '实时信号采集', desc: '通过 USB 音频接口连接电子听诊器，实时采集预处理' },
      { icon: featureIcons.screen, title: '触摸屏 GUI', desc: '5 英寸触摸屏 PyQt5 界面，支持多页面路由交互' },
      { icon: featureIcons.chart, title: '趋势分析', desc: '历史数据管理与健康趋势可视化' },
      { icon: featureIcons.chip, title: '嵌入式方案', desc: '便携式树莓派硬件，GPIO/USB 外设控制' },
    ] : [
      { icon: featureIcons.brain, title: 'Deep Learning Classification', desc: 'CNN-based heart sound classifier for multi-class anomaly detection', span: 2 },
      { icon: featureIcons.wave, title: 'Real-time Signal Capture', desc: 'USB audio interface with electronic stethoscope integration' },
      { icon: featureIcons.screen, title: 'Touchscreen GUI', desc: '5-inch PyQt5 multi-page interface with QStackedWidget routing' },
      { icon: featureIcons.chart, title: 'Trend Analysis', desc: 'Historical data management and health trend visualization' },
      { icon: featureIcons.chip, title: 'Embedded Solution', desc: 'Portable Raspberry Pi hardware with GPIO/USB control' },
    ],
    archDesc: locale.value === 'zh'
      ? '采用分层解耦架构，前端 GUI 与后端推理引擎独立通信，硬件层通过标准接口抽象。'
      : 'Layered decoupled architecture with independent GUI and inference engine communication, hardware abstracted through standard interfaces.',
    archPills: [
      { name: 'PyQt5', type: 'frontend' }, { name: 'QStackedWidget', type: 'frontend' },
      { name: 'Python', type: 'backend' }, { name: 'NumPy/SciPy', type: 'backend' },
      { name: 'TensorFlow', type: 'ai' }, { name: 'PyTorch', type: 'ai' },
      { name: 'Raspberry Pi', type: 'infra' }, { name: 'GPIO', type: 'infra' }, { name: 'USB Audio', type: 'infra' },
    ],
  },
  'wisdom-classroom': {
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh' ? '智能教育平台 · Web + Qt 双端' : 'Smart Education Platform · Web + Qt',
    type: 'Full Stack',
    tags: ['Nuxt 3', 'Vue 3', 'C++/Qt', 'Supabase'],
    heroGlow: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
    mockupUrl: 'wisdom-classroom.app',
    screenBg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(16, 185, 129, 0.04))',
    screenContent: '<div style="padding:16px;font-family:monospace;font-size:11px;color:rgba(148,163,184,0.7);line-height:1.8"><span style="color:#22d3ee">POST</span> /api/ai/chat<br><span style="color:rgba(148,163,184,0.4)">{model: "glm-4-flash"}</span><br><br><span style="color:#4ade80">▶ SSE streaming...</span><br><span style="color:#818cf8">思政教育融入</span><span class="blink">|</span></div>',
    overview: locale.value === 'zh'
      ? '一个 Web + Qt 桌面双端的智能教育平台，集成大语言模型辅助备课、AI 生成课件与教学案例、新闻资讯聚合等功能。'
      : 'A dual-platform smart education system (Web + Qt Desktop) integrating LLM-assisted lesson planning, AI-generated courseware, and news aggregation.',
    features: locale.value === 'zh' ? [
      { icon: featureIcons.chat, title: 'SSE 流式 AI 对话', desc: '基于智谱 GLM 的实时流式 AI 助教对话', span: 2 },
      { icon: featureIcons.file, title: 'PPT 自动生成', desc: '一键生成课件 PPT，支持自定义模板' },
      { icon: featureIcons.brain, title: 'AI 辅助备课', desc: '智能教案生成与教学案例推荐' },
      { icon: featureIcons.rss, title: '新闻集成', desc: 'BBC RSS 实时新闻聚合与教学素材' },
      { icon: featureIcons.lock, title: '权限管理', desc: 'Supabase 用户认证与角色权限' },
    ] : [
      { icon: featureIcons.chat, title: 'SSE Streaming Chat', desc: 'Real-time streaming AI assistant powered by Zhipu GLM', span: 2 },
      { icon: featureIcons.file, title: 'Auto PPT Generation', desc: 'One-click courseware generation with custom templates' },
      { icon: featureIcons.brain, title: 'AI Lesson Planning', desc: 'Smart lesson plan generation and teaching case recommendations' },
      { icon: featureIcons.rss, title: 'News Integration', desc: 'BBC RSS real-time news aggregation for teaching materials' },
      { icon: featureIcons.lock, title: 'Auth & Permissions', desc: 'Supabase user authentication and role-based access' },
    ],
    archDesc: locale.value === 'zh'
      ? 'Web 端与桌面端共享业务逻辑层，通过统一的 API 接口与 AI 服务和数据层通信。'
      : 'Web and desktop clients share business logic layer, communicating with AI services and data through unified API interfaces.',
    archPills: [
      { name: 'Nuxt 3', type: 'frontend' }, { name: 'Vue 3', type: 'frontend' }, { name: 'C++/Qt', type: 'frontend' },
      { name: 'Supabase', type: 'backend' }, { name: 'Nitro', type: 'backend' },
      { name: 'Zhipu GLM', type: 'ai' }, { name: 'SSE', type: 'ai' },
      { name: 'PostgreSQL', type: 'infra' }, { name: 'Vercel', type: 'infra' },
    ],
  },
  mindguard: {
    title: 'MindGuard',
    desc: locale.value === 'zh' ? '高校心理健康小程序 · AI 情绪守护' : 'Campus Mental Health · AI Mood Guardian',
    type: locale.value === 'zh' ? '微信小程序' : 'WeChat Mini Program',
    tags: ['WeChat MP', 'Dify AI', 'Cloud Dev'],
    heroGlow: 'radial-gradient(ellipse, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
    mockupUrl: 'mindguard.wechat',
    screenBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.06), rgba(6, 182, 212, 0.08))',
    screenContent: '<div style="padding:16px;font-family:monospace;font-size:11px;color:rgba(148,163,184,0.7);line-height:1.8"><span style="color:#22d3ee">mood.check()</span><br><span style="color:rgba(148,163,184,0.4)">analyzing emotions...</span><br><br><span style="color:#4ade80">✨ 今日情绪：积极 (87%)</span><br><span style="color:#818cf8">建议：保持运动习惯</span></div>',
    overview: locale.value === 'zh'
      ? 'MindGuard 是一款面向高校学生的心理健康微信小程序，通过 AI 工作流驱动情绪打卡、心理测评与社区守护功能。'
      : 'MindGuard is a WeChat mini-program for campus mental health, featuring AI-driven mood tracking, psychological assessment, and community support.',
    features: locale.value === 'zh' ? [
      { icon: featureIcons.heart, title: 'AI 情绪打卡', desc: '基于 Dify 工作流的智能情绪分析与每日记录', span: 2 },
      { icon: featureIcons.shield, title: '心理测评', desc: '标准化心理健康量表，SDS/SAS 自评' },
      { icon: featureIcons.users, title: '匿名社区', desc: '安全的匿名互助社区与社群守护' },
      { icon: featureIcons.brain, title: 'AI 建议', desc: '个性化心理健康建议与危机干预' },
      { icon: featureIcons.cloud, title: '云开发', desc: '微信云函数 + 云数据库无服务器架构' },
    ] : [
      { icon: featureIcons.heart, title: 'AI Mood Check-in', desc: 'Intelligent emotion analysis and daily recording powered by Dify workflows', span: 2 },
      { icon: featureIcons.shield, title: 'Assessments', desc: 'Standardized mental health scales including SDS/SAS self-rating' },
      { icon: featureIcons.users, title: 'Anonymous Community', desc: 'Safe anonymous mutual support community and peer guardianship' },
      { icon: featureIcons.brain, title: 'AI Suggestions', desc: 'Personalized mental health recommendations and crisis intervention' },
      { icon: featureIcons.cloud, title: 'Cloud Native', desc: 'WeChat Cloud Functions + Cloud DB serverless architecture' },
    ],
    archDesc: locale.value === 'zh'
      ? '基于微信小程序原生框架构建，后端完全采用微信云开发的无服务器架构。'
      : 'Built on native WeChat Mini Program framework with fully serverless backend on WeChat Cloud.',
    archPills: [
      { name: 'WeChat MP', type: 'frontend' }, { name: 'TDesign', type: 'frontend' },
      { name: 'Cloud Functions', type: 'backend' }, { name: 'Cloud DB', type: 'backend' },
      { name: 'Dify AI', type: 'ai' }, { name: 'Workflow', type: 'ai' },
      { name: 'WeChat Cloud', type: 'infra' },
    ],
  },
}))

const project = computed(() => projectsData.value[slug.value] || projectsData.value['heartsound'])

useHead({
  title: computed(() => project.value ? `${project.value.title} | Zhou Zhiqi` : '项目'),
})
</script>

<style scoped>
.page-hero {
  padding: 160px 0 80px;
  border-bottom: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -50px;
  right: 10%;
  width: 600px;
  height: 400px;
  pointer-events: none;
  filter: blur(40px);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-decoration: none;
  margin-bottom: 32px;
  transition: color 0.2s;
}

.back-link:hover { color: var(--color-primary-light); }

.hero-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(14, 165, 233, 0.06);
  border: 1px solid rgba(14, 165, 233, 0.15);
  border-radius: var(--radius-full);
  margin-bottom: 20px;
}

.badge-dot {
  width: 6px; height: 6px;
  background: var(--color-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-primary-light);
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.page-subtitle { font-size: 16px; color: var(--color-text-secondary); margin-bottom: 20px; line-height: 1.6; }

.project-meta { display: flex; flex-wrap: wrap; gap: 6px; }

.meta-tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  padding: 4px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  transition: all 0.2s;
}

.meta-tag:hover {
  color: var(--color-primary-light);
  border-color: rgba(14, 165, 233, 0.2);
}

/* MOCKUP */
.hero-mockup { position: relative; }

.mockup-window {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(136, 160, 200, 0.1);
  background: rgba(5, 10, 20, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(14, 165, 233, 0.05);
}

.mockup-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(15, 23, 42, 0.8);
  border-bottom: 1px solid rgba(136, 160, 200, 0.06);
}

.mockup-bar .dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.red { background: #ef4444; opacity: 0.7; }
.dot.yellow { background: #f59e0b; opacity: 0.7; }
.dot.green { background: #22c55e; opacity: 0.7; }

.mockup-url {
  margin-left: 10px;
  font-size: 10px;
  font-family: monospace;
  color: rgba(148, 163, 184, 0.4);
  background: rgba(15, 23, 42, 0.6);
  padding: 2px 10px;
  border-radius: 4px;
}

.mockup-screen {
  min-height: 180px;
}

.mockup-glow {
  position: absolute;
  bottom: -30px;
  left: 20%;
  width: 60%;
  height: 60px;
  filter: blur(30px);
  opacity: 0.5;
}

/* SECTIONS */
.section-header { margin-bottom: 28px; }

.section-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary-light);
  position: relative;
  padding-left: 16px;
}

.section-label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--color-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-primary-light);
}

.content-section {
  padding: 64px 0;
  border-bottom: 1px solid var(--color-border);
}

.overview-text {
  font-size: 17px;
  line-height: 1.85;
  color: var(--color-text-secondary);
}

/* FEATURES BENTO */
.features-section {
  padding: 64px 0;
  border-bottom: 1px solid var(--color-border);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.feature-card {
  padding: 28px;
  background: rgba(10, 18, 38, 0.5);
  border: 1px solid rgba(136, 160, 200, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: rgba(14, 165, 233, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.06), 0 0 0 1px rgba(14, 165, 233, 0.08);
}

.span-2 { grid-column: span 2; }

.feature-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-light);
  background: rgba(14, 165, 233, 0.06);
  border: 1px solid rgba(14, 165, 233, 0.12);
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 7px;
}

.feature-icon :deep(svg) { width: 100%; height: 100%; }

.feature-card h3 {
  font-size: 15px;
  font-weight: 650;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}

.feature-card p {
  font-size: 13px;
  color: var(--color-text-tertiary);
  line-height: 1.6;
}

/* ARCHITECTURE */
.arch-section {
  padding: 64px 0 120px;
}

.arch-desc {
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 28px;
}

.arch-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.arch-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: rgba(10, 18, 38, 0.5);
  border: 1px solid rgba(136, 160, 200, 0.08);
  border-radius: 10px;
  transition: all 0.2s;
}

.arch-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.arch-pill.frontend:hover { border-color: rgba(56, 189, 248, 0.3); }
.arch-pill.backend:hover { border-color: rgba(16, 185, 129, 0.3); }
.arch-pill.ai:hover { border-color: rgba(139, 92, 246, 0.3); }
.arch-pill.infra:hover { border-color: rgba(245, 158, 11, 0.3); }

.pill-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.pill-dot.frontend { background: #38bdf8; box-shadow: 0 0 6px rgba(56, 189, 248, 0.4); }
.pill-dot.backend { background: #10b981; box-shadow: 0 0 6px rgba(16, 185, 129, 0.4); }
.pill-dot.ai { background: #8b5cf6; box-shadow: 0 0 6px rgba(139, 92, 246, 0.4); }
.pill-dot.infra { background: #f59e0b; box-shadow: 0 0 6px rgba(245, 158, 11, 0.4); }

.arch-legend {
  display: flex;
  gap: 20px;
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.arch-legend span {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .page-hero { padding: 120px 0 48px; }
  .hero-layout { grid-template-columns: 1fr; gap: 24px; }
  .hero-mockup { order: -1; }
  .hero-text { text-align: center; }
  .hero-badge { margin: 0 auto 16px; }
  .project-meta { justify-content: center; }
  .page-subtitle { text-align: center; }
  .mockup-screen { min-height: 140px; }
  .mockup-screen div { font-size: 10px !important; }

  .features-section { padding: 48px 0; }
  .features-grid { grid-template-columns: 1fr; gap: 10px; }
  .span-2 { grid-column: span 1; }
  .feature-card { padding: 20px; }
  .feature-card h3 { font-size: 14px; }
  .feature-card p { font-size: 12px; }

  .arch-section { padding: 48px 0 80px; }
  .arch-pills { gap: 6px; }
  .arch-pill { padding: 6px 14px; font-size: 12px; }
  .arch-legend { flex-wrap: wrap; gap: 10px; font-size: 10px; }

  .content-section { padding: 48px 0; }
  .overview-text { font-size: 15px; }
}

/* Reveal animations */
.reveal { opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal.revealed { opacity: 1; transform: none; }
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }
.delay-4 { transition-delay: 0.4s; }
</style>
