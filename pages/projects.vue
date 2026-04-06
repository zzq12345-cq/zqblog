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
          <article
            v-for="(project, idx) in filteredProjects"
            :key="project.slug"
            class="pj-card reveal"
            :class="`delay-${(idx % 3) + 1}`"
          >
            <div class="pj-card-top" :style="{ backgroundColor: project.color }">
              <span class="pj-num">{{ project.num }}</span>
            </div>
            <div class="pj-card-body">
              <span class="pj-type">{{ project.type }}</span>
              <h3>{{ project.title }}</h3>
              <p>{{ project.desc }}</p>
              <div class="pj-tags">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
              <a v-if="project.github" :href="project.github" target="_blank" class="pj-link">
                GitHub →
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
useScrollReveal()

useHead({
  title: locale.value === 'zh' ? '项目作品 | 周志琪' : 'Projects | Zhou Zhiqi',
})

const activeFilter = ref('all')

const filters = [
  { key: 'all' }, { key: 'ai' }, { key: 'web' },
  { key: 'desktop' }, { key: 'miniprogram' },
]

const allProjects = computed(() => [
  {
    slug: 'heartsound', num: '01', category: 'ai', color: '#1a1a2e',
    title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound Intelligence',
    desc: locale.value === 'zh'
      ? 'AI 心脏健康监测系统，通过树莓派采集心音信号，利用深度学习算法分析，含嵌入式触摸屏 GUI 和数据可视化。'
      : 'AI heart health monitoring system using Raspberry Pi for signal acquisition and deep learning analysis.',
    type: 'AI + Hardware',
    tags: ['Python', 'AI/ML', 'PyQt5', 'Raspberry Pi', 'Signal Processing'],
    github: null,
  },
  {
    slug: 'wisdom-classroom', num: '02', category: 'web', color: '#0f172a',
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh'
      ? '智能教育平台，Web（Nuxt 3）+ Qt 桌面端双平台，支持 AI 辅助教学、PPT 生成、教案编辑和数据分析。'
      : 'Smart education platform with Web (Nuxt 3) and Qt desktop, AI-assisted teaching and PPT generation.',
    type: 'Full Stack',
    tags: ['Nuxt 3', 'Vue 3', 'C++', 'Qt', 'Supabase', 'Zhipu AI'],
    github: null,
  },
  {
    slug: 'mindguard', num: '03', category: 'miniprogram', color: '#0c1222',
    title: 'MindGuard',
    desc: locale.value === 'zh'
      ? '高校心理健康微信小程序，围绕五大核心模块提供情绪打卡、AI 建议、社区守护与危机干预功能。'
      : 'Campus mental health WeChat mini-program with 5 core modules for emotional support and crisis intervention.',
    type: locale.value === 'zh' ? '微信小程序' : 'Mini Program',
    tags: [locale.value === 'zh' ? '微信小程序' : 'WeChat MP', 'Dify AI', locale.value === 'zh' ? '云开发' : 'Cloud Dev', 'TDesign'],
    github: null,
  },
  {
    slug: 'unismart', num: '04', category: 'web', color: '#141520',
    title: 'UniSmart',
    desc: locale.value === 'zh'
      ? '大学智能信息平台，集成教师数据库、招聘信息和用户系统，基于 Appwrite 构建。'
      : 'University smart info platform with teacher database and job listings on Appwrite.',
    type: 'Web App',
    tags: ['Appwrite', 'Database', 'REST API'],
    github: null,
  },
  {
    slug: 'ai-vibot', num: '05', category: 'ai', color: '#18122b',
    title: 'AI-Vibot',
    desc: locale.value === 'zh'
      ? 'AI 企业管理系统，利用人工智能技术优化企业运营流程。'
      : 'AI enterprise management system optimizing business operations.',
    type: 'AI + Web',
    tags: ['AI', locale.value === 'zh' ? '企业管理' : 'Enterprise'],
    github: null,
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
  background: radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
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
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.pj-card:hover {
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.06);
}

.pj-card-top {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pj-num {
  font-size: 3rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.08);
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
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

.pj-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
}

.pj-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .page-hero { padding: 120px 0 48px; }

  .projects-list {
    grid-template-columns: 1fr;
  }
}
</style>
