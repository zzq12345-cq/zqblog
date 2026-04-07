<template>
  <div class="project-detail">
    <section class="page-hero">
      <div v-if="project?.coverImage" class="hero-bg-image" :style="{ backgroundImage: `url(${project.coverImage})` }"></div>
      <div class="hero-bg-overlay"></div>
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
            <div class="project-actions reveal delay-3" v-if="project?.github || project?.demo">
              <a v-if="project?.github" :href="project.github" target="_blank" rel="noopener" class="btn-github clickable">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>{{ locale === 'zh' ? '查看源码' : 'View Source' }}</span>
              </a>
              <a v-if="project?.demo" :href="project.demo" target="_blank" rel="noopener" class="btn-demo clickable">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                <span>{{ locale === 'zh' ? '在线体验' : 'Live Demo' }}</span>
              </a>
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
    github: 'https://github.com/zzq12345-cq/HeartSound',
    coverImage: '/images/projects/heartsound.png',
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
    github: 'https://github.com/zzq12345-cq/wisdom-classroom',
    coverImage: '/images/projects/wisdom-classroom.jpg',
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
    github: 'https://github.com/zzq12345-cq/MindGuard',
    coverImage: '',
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
  unismart: {
    title: 'UniSmart',
    desc: locale.value === 'zh' ? '校园综合服务应用 · uni-app + Appwrite' : 'Campus Service App · uni-app + Appwrite',
    type: 'Web App',
    tags: ['uni-app', 'Vue 3', 'TypeScript', 'Appwrite', 'Pinia'],
    github: 'https://github.com/zzq12345-cq/unismart',
    coverImage: '/images/projects/unismart.png',
    heroGlow: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
    mockupUrl: 'unismart.app',
    screenBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(14, 165, 233, 0.05))',
    screenContent: '<div style="padding:16px;font-family:monospace;font-size:11px;color:rgba(148,163,184,0.7);line-height:1.8"><span style="color:#f59e0b">uni-app</span> + <span style="color:#38bdf8">Appwrite</span><br><br><span style="color:#4ade80">▶ 社区动态加载中...</span><br><span style="color:#818cf8">📝 新帖子: 期末复习攻略</span><br><span style="color:rgba(148,163,184,0.4)">💬 12条评论 · ❤️ 45赞</span></div>',
    overview: locale.value === 'zh'
      ? 'UniSmart 是一个基于 uni-app + Vue 3 + TypeScript + Appwrite 的校园综合服务应用。包含社区互动、个人中心、私信聊天、关注通知、搜索与心理模块在内的多模块校园服务平台，支持 H5、微信小程序和 App 多端运行。'
      : 'UniSmart is a campus service app built with uni-app + Vue 3 + TypeScript + Appwrite. It includes community interaction, personal center, private messaging, follow/notification system, and multi-platform support.',
    features: locale.value === 'zh' ? [
      { icon: featureIcons.chat, title: '社区互动系统', desc: '支持分区浏览、发帖、评论、点赞、收藏等完整社区功能', span: 2 },
      { icon: featureIcons.users, title: '私信与关注', desc: '私信聊天、消息中心、关注/取关、未读计数轮询' },
      { icon: featureIcons.shield, title: '用户中心', desc: '个人资料、头像上传、我的帖子、收藏管理' },
      { icon: featureIcons.rss, title: '通知系统', desc: '点赞、评论、关注等多种通知场景与未读标记' },
      { icon: featureIcons.cloud, title: '云函数后端', desc: 'Appwrite 云函数处理私信、关注、教务等业务逻辑' },
    ] : [
      { icon: featureIcons.chat, title: 'Community System', desc: 'Full community features: posts, comments, likes, bookmarks across sections', span: 2 },
      { icon: featureIcons.users, title: 'Messaging & Follows', desc: 'Private chat, message center, follow/unfollow, unread polling' },
      { icon: featureIcons.shield, title: 'User Center', desc: 'Profile management, avatar upload, my posts, bookmarks' },
      { icon: featureIcons.rss, title: 'Notifications', desc: 'Multi-scenario notifications with unread badges' },
      { icon: featureIcons.cloud, title: 'Cloud Functions', desc: 'Appwrite functions for messaging, follows, and education services' },
    ],
    archDesc: locale.value === 'zh'
      ? '基于 uni-app 跨端框架构建，Pinia 状态管理，后端完全依托 Appwrite BaaS 平台，支持 H5/小程序/App 多端部署。'
      : 'Built on uni-app cross-platform framework with Pinia state management, fully powered by Appwrite BaaS for multi-platform deployment.',
    archPills: [
      { name: 'uni-app', type: 'frontend' }, { name: 'Vue 3', type: 'frontend' }, { name: 'Pinia', type: 'frontend' }, { name: 'TDesign', type: 'frontend' },
      { name: 'Appwrite', type: 'backend' }, { name: 'Cloud Functions', type: 'backend' },
      { name: 'TypeScript', type: 'infra' }, { name: 'Vitest', type: 'infra' }, { name: 'Playwright', type: 'infra' },
    ],
  },
  'ai-vibot': {
    title: 'AI-Vibot',
    desc: locale.value === 'zh' ? 'AI 企业管理系统 · 智能运营优化' : 'AI Enterprise Management · Smart Operations',
    type: 'AI + Web',
    tags: ['AI', 'Python', 'Web', 'Enterprise'],
    github: 'https://github.com/zzq12345-cq/ai-vibot',
    coverImage: '/images/projects/ai-vibot.png',
    heroGlow: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
    mockupUrl: 'ai-vibot.app',
    screenBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(14, 165, 233, 0.05))',
    screenContent: '<div style="padding:16px;font-family:monospace;font-size:11px;color:rgba(148,163,184,0.7);line-height:1.8"><span style="color:#8b5cf6">AI-Vibot</span> Enterprise<br><br><span style="color:#4ade80">▶ 运营数据分析中...</span><br><span style="color:#818cf8">📊 效率提升 23.5%</span><br><span style="color:rgba(148,163,184,0.4)">🤖 AI 建议: 3条待处理</span></div>',
    overview: locale.value === 'zh'
      ? 'AI-Vibot 是一款 AI 驱动的企业管理系统，利用人工智能技术优化企业运营流程，提供智能数据分析、流程自动化和决策辅助功能。'
      : 'AI-Vibot is an AI-driven enterprise management system that leverages artificial intelligence to optimize business operations, providing smart analytics, process automation, and decision support.',
    features: locale.value === 'zh' ? [
      { icon: featureIcons.brain, title: 'AI 智能分析', desc: '基于 AI 的企业运营数据分析与趋势预测', span: 2 },
      { icon: featureIcons.chart, title: '数据可视化', desc: '多维度运营数据看板与可视化报表' },
      { icon: featureIcons.chip, title: '流程自动化', desc: '智能工作流引擎，自动化处理日常运营任务' },
      { icon: featureIcons.lock, title: '权限管理', desc: '多角色权限体系，保障企业数据安全' },
      { icon: featureIcons.users, title: '团队协作', desc: '团队任务管理与协作沟通平台' },
    ] : [
      { icon: featureIcons.brain, title: 'AI Analytics', desc: 'AI-powered business data analysis and trend forecasting', span: 2 },
      { icon: featureIcons.chart, title: 'Data Visualization', desc: 'Multi-dimensional dashboards and visual reports' },
      { icon: featureIcons.chip, title: 'Process Automation', desc: 'Smart workflow engine for operational task automation' },
      { icon: featureIcons.lock, title: 'Access Control', desc: 'Multi-role permission system for data security' },
      { icon: featureIcons.users, title: 'Team Collaboration', desc: 'Team task management and communication platform' },
    ],
    archDesc: locale.value === 'zh'
      ? '前后端分离架构，AI 分析模块独立部署，通过 RESTful API 与前端交互。'
      : 'Separated frontend/backend architecture with independently deployed AI analytics module communicating via RESTful API.',
    archPills: [
      { name: 'Vue', type: 'frontend' },
      { name: 'Python', type: 'backend' }, { name: 'REST API', type: 'backend' },
      { name: 'AI/ML', type: 'ai' }, { name: 'NLP', type: 'ai' },
      { name: 'Docker', type: 'infra' },
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

/* 若隐若现的背景图 */
.hero-bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.35;
  filter: saturate(0.7);
  z-index: 0;
  transform: scale(1.05);
  animation: bg-fade-in 1.2s ease;
}

@keyframes bg-fade-in {
  from { opacity: 0; transform: scale(1.1); }
}

.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(5, 10, 20, 0.5) 0%,
    rgba(5, 10, 20, 0.2) 30%,
    rgba(5, 10, 20, 0.3) 60%,
    rgba(5, 10, 20, 0.85) 100%
  );
  z-index: 1;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  top: -50px;
  right: 10%;
  width: 600px;
  height: 400px;
  pointer-events: none;
  filter: blur(40px);
  z-index: 2;
}

.page-hero > .container {
  position: relative;
  z-index: 3;
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

.project-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-github {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e7ef;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-github:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  color: #fff;
}

.btn-demo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: var(--gradient-primary);
  border: none;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.25);
}

.btn-demo:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(14, 165, 233, 0.35);
  color: #fff;
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
  .hero-bg-image { opacity: 0.25; background-position: top center; }
  .project-actions { justify-content: center; }
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
