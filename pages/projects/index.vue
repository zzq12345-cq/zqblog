<template>
  <div class="projects-page">
    <section class="page-hero">
      <div class="container">
        <h1 class="reveal">{{ $t('projects.title') }}</h1>
        <p class="page-subtitle reveal delay-1">{{ $t('projects.subtitle') }}</p>
      </div>
    </section>

    <section class="projects-section">
      <div class="container">
        <!-- Filter -->
        <div class="filter-row reveal">
          <button
            v-for="f in filters"
            :key="f.key"
            class="filter-chip"
            :class="{ active: activeFilter === f.key }"
            @click="activeFilter = f.key"
          >{{ $t(`projects.filter_${f.key}`) }}</button>
        </div>

        <!-- List -->
        <div class="projects-list">
          <NuxtLink
            v-for="(project, idx) in filteredProjects"
            :key="project.slug"
            :to="localePath(`/projects/${project.slug}`)"
            class="pj-card glass-card clickable reveal"
            :class="`delay-${(idx % 3) + 1}`"
          >
            <div class="pj-card-top" :style="{ background: project.gradient }">
              <div class="pj-cover-icon" v-html="project.icon"></div>
              <span class="pj-num">{{ project.num }}</span>
              <div class="pj-cover-dots"></div>
            </div>
            <div class="pj-card-body">
              <span class="pj-type">{{ project.type }}</span>
              <h3>{{ project.title }}</h3>
              <p>{{ project.desc }}</p>
              <div class="pj-highlights" v-if="project.highlightLine">
                <span class="pj-hl-icon" v-html="project.hlIcon"></span>
                <span>{{ project.highlightLine }}</span>
              </div>
              <div class="pj-tags">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
              <span class="pj-view">{{ locale === 'zh' ? '查看详情 →' : 'View Details →' }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()
useScrollReveal()

useHead({
  title: locale.value === 'zh' ? '项目作品 - 周志琪 | AI·全栈·嵌入式' : 'Projects - Zhou Zhiqi | AI · Full-Stack · Embedded',
  meta: [
    { name: 'description', content: locale.value === 'zh' ? '周志琪的项目作品集：心音智鉴、AI智慧课堂、MindGuard、UniSmart等AI与全栈项目' : 'Zhou Zhiqi project portfolio: HeartSound, AI Classroom, MindGuard, UniSmart and more' },
  ],
})

const activeFilter = ref('all')

const filters = [
  { key: 'all' }, { key: 'ai' }, { key: 'web' },
  { key: 'desktop' }, { key: 'miniprogram' },
]

// SVG icons for highlights
const hlSvg = {
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M17 4H7l1 8a4 4 0 0 0 8 0l1-8z"/><path d="M7 4H5a1 1 0 0 0-1 1v1a3 3 0 0 0 3 3"/><path d="M17 4h2a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3"/></svg>',
  graduation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/><path d="M22 10v6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>',
  dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5L17.5 17.5"/><path d="M3.5 9.5l3-3M14.5 20.5l3-3"/><path d="M6.5 3.5l3 3M20.5 14.5l-3 3"/><path d="M2 11l2-2M13 22l2-2"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
}

const allProjects = computed(() => [
  {
    slug: 'heartsound', num: '01', category: 'ai',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.1) 100%)',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 24h6l3-9 5 18 5-13 3 4h14"/></svg>',
    title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound Intelligence',
    desc: locale.value === 'zh'
      ? 'AI 心脏健康监测系统，通过树莓派采集心音信号，利用深度学习算法分析，含嵌入式触摸屏 GUI 和数据可视化。'
      : 'AI heart health monitoring system using Raspberry Pi for signal acquisition and deep learning analysis.',
    type: 'AI + Hardware',
    tags: ['Python', 'AI/ML', 'PyQt5', 'Raspberry Pi', 'Signal Processing'],
    hlIcon: hlSvg.trophy, highlightLine: locale.value === 'zh' ? '独立开发 · 省赛三等奖 · 2项软件著作权' : 'Solo Dev · Provincial 3rd Prize · 2 Software Copyrights',
  },
  {
    slug: 'wisdom-classroom', num: '02', category: 'web',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.08) 100%)',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="6" y="10" width="26" height="20" rx="3"/><path d="M10 34h18"/><circle cx="38" cy="18" r="6"/><path d="M34 18l3 2 5-5"/></svg>',
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh'
      ? '智能教育平台，Web（Nuxt 3）+ Qt 桌面端双平台，支持 AI 辅助教学、PPT 生成、教案编辑和数据分析。'
      : 'Smart education platform with Web (Nuxt 3) and Qt desktop, AI-assisted teaching and PPT generation.',
    type: 'Full Stack',
    tags: ['Nuxt 3', 'Vue 3', 'C++', 'Qt', 'Supabase', 'Zhipu AI'],
    hlIcon: hlSvg.graduation, highlightLine: locale.value === 'zh' ? '核心开发者 · 校级大创立项 · Web+Qt双端' : 'Core Dev · University Innovation Project · Dual Platform',
  },
  {
    slug: 'mindguard', num: '03', category: 'miniprogram',
    gradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.14) 0%, rgba(245, 158, 11, 0.08) 100%)',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 42s-16-10-16-22a10 10 0 0 1 16-7.5A10 10 0 0 1 40 20c0 12-16 22-16 22z"/><path d="M19 22l4 4 7-7"/></svg>',
    title: 'MindGuard',
    desc: locale.value === 'zh'
      ? '高校心理健康微信小程序，围绕五大核心模块提供情绪打卡、AI 建议、社区守护与危机干预功能。'
      : 'Campus mental health WeChat mini-program with 5 core modules for emotional support and crisis intervention.',
    type: locale.value === 'zh' ? '微信小程序' : 'Mini Program',
    tags: [locale.value === 'zh' ? '微信小程序' : 'WeChat MP', 'Dify AI', locale.value === 'zh' ? '云开发' : 'Cloud Dev', 'TDesign'],
    hlIcon: hlSvg.check, highlightLine: locale.value === 'zh' ? '合作开发 · 5大核心模块 · 已上线运行' : 'Team Dev · 5 Core Modules · Live in Production',
  },
  {
    slug: 'fitlog', num: '04', category: 'miniprogram',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(16, 185, 129, 0.08) 100%)',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 5"/><path d="M16 32l-4 6M32 32l4 6"/></svg>',
    title: locale.value === 'zh' ? '健记Log' : 'FitLog',
    desc: locale.value === 'zh'
      ? '以训练记录为核心的健身微信小程序，支持 AI 教练、食物拍照识别、训练计划管理与多维度数据记录。'
      : 'Fitness WeChat mini-program with AI coach, food photo recognition, training plans, and multi-dimensional data tracking.',
    type: locale.value === 'zh' ? '微信小程序' : 'Mini Program',
    tags: [locale.value === 'zh' ? '微信小程序' : 'WeChat MP', 'AI', locale.value === 'zh' ? '云开发' : 'Cloud Dev', locale.value === 'zh' ? '数据可视化' : 'Data Viz'],
    hlIcon: hlSvg.dumbbell, highlightLine: locale.value === 'zh' ? '独立开发 · 18000+行代码 · 9大功能模块 · 已上线' : 'Solo Dev · 18K+ Lines · 9 Modules · Live',
  },
  {
    slug: 'unismart', num: '05', category: 'web',
    gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.14) 0%, rgba(6, 182, 212, 0.1) 100%)',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="8" y="8" width="32" height="32" rx="4"/><path d="M16 20h16M16 28h10"/><circle cx="36" cy="12" r="4"/></svg>',
    title: 'UniSmart',
    desc: locale.value === 'zh'
      ? '大学智能信息平台，集成教师数据库、招聘信息和用户系统，基于 Appwrite 构建。'
      : 'University smart info platform with teacher database and job listings on Appwrite.',
    type: 'Web App',
    tags: ['Appwrite', 'Database', 'REST API'],
    hlIcon: hlSvg.rocket, highlightLine: locale.value === 'zh' ? '全栈开发 · 跨端运行(H5/小程序/App) · 7+子模块' : 'Full Stack · Cross-platform (H5/MP/App) · 7+ Modules',
  },
  {
    slug: 'ai-vibot', num: '06', category: 'ai',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(244, 63, 94, 0.08) 100%)',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="24" cy="24" r="14"/><path d="M18 20h2M28 20h2"/><path d="M18 28c2 3 8 3 12 0"/></svg>',
    title: 'AI-Vibot',
    desc: locale.value === 'zh'
      ? 'AI 企业管理系统，利用人工智能技术优化企业运营流程。'
      : 'AI enterprise management system optimizing business operations.',
    type: 'AI + Web',
    tags: ['AI', locale.value === 'zh' ? '企业管理' : 'Enterprise'],
    hlIcon: hlSvg.users, highlightLine: locale.value === 'zh' ? '合作开发者 · AI+业务流程融合' : 'Co-developer · AI + Business Process Integration',
  },
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return allProjects.value
  return allProjects.value.filter((p) => p.category === activeFilter.value)
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
  background: radial-gradient(ellipse, rgba(6, 182, 212, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 17px;
  color: var(--color-text-secondary);
}

.projects-section {
  padding: 56px 0 96px;
}

/* Filter */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 40px;
}

.filter-chip {
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-chip:hover {
  border-color: var(--color-text-secondary);
}

.filter-chip.active {
  background: var(--gradient-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-primary);
}

/* Cards */
.projects-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.pj-card {
  background: rgba(10, 18, 38, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.25s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.pj-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.06);
  transform: translateY(-4px);
}

.pj-card:hover .pj-view {
  color: var(--color-primary-light);
}

.pj-card-top {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.pj-cover-icon {
  position: relative;
  z-index: 2;
  width: 56px;
  height: 56px;
  color: var(--color-primary-light);
  opacity: 0.75;
  transition: all 0.4s;
  filter: drop-shadow(0 0 16px rgba(14, 165, 233, 0.15));
}

.pj-cover-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.pj-card:hover .pj-cover-icon {
  opacity: 1;
  transform: scale(1.15);
  filter: drop-shadow(0 0 24px rgba(14, 165, 233, 0.25));
}



.pj-num {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 2.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.05);
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  z-index: 1;
}

.pj-cover-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(136, 160, 200, 0.05) 1px, transparent 1px);
  background-size: 16px 16px;
  pointer-events: none;
}

/* 封面底部光弧 */
.pj-card-top::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.2) 50%, transparent 100%);
}

.pj-card-body {
  padding: 24px 28px 28px;
}

.pj-type {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  display: block;
}

.pj-card-body h3 {
  font-size: 1.15rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}

.pj-card-body > p {
  font-size: 14px;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.pj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.pj-tags span {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text-secondary);
}

/* 成就汇总行 */
.pj-highlights {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  padding: 8px 14px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.06), rgba(6, 182, 212, 0.03));
  border: 1px solid rgba(14, 165, 233, 0.12);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary-light);
  letter-spacing: 0.02em;
}

.pj-hl-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: var(--color-primary-light);
}

.pj-hl-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.pj-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
}

.pj-link:hover {
  text-decoration: underline;
}

.pj-view {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  transition: color 0.2s;
}

@media (max-width: 768px) {
  .page-hero { padding: 120px 0 48px; }
  .projects-section { padding: 40px 0 64px; }
  .projects-list { grid-template-columns: 1fr; gap: 16px; }
  .pj-card-top { height: 120px; }
  .pj-card-body { padding: 16px 20px 20px; }
  .pj-card-body h2 { font-size: 1.1rem; }
  .pj-card-body p { font-size: 13px; }
  .pj-tags { gap: 4px; }
  .pj-tags span { font-size: 10px; padding: 2px 8px; }
}
</style>
