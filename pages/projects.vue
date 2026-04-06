<template>
  <div class="projects-page">
    <section class="page-header">
      <div class="container">
        <h1 class="reveal">{{ $t('projects.title') }}</h1>
        <p class="reveal delay-1">{{ $t('projects.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Filter -->
        <div class="filter-bar reveal">
          <button
            v-for="filter in filters"
            :key="filter.key"
            class="filter-btn"
            :class="{ active: activeFilter === filter.key }"
            @click="activeFilter = filter.key"
          >
            {{ $t(`projects.filter_${filter.key}`) }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.slug"
            class="project-card reveal hover-lift"
            :class="`delay-${(index % 4) + 1}`"
          >
            <div class="project-cover" :style="{ background: project.gradient }">
              <span class="project-emoji">{{ project.icon }}</span>
            </div>
            <div class="project-body">
              <div class="project-type-badge">{{ project.type }}</div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.desc }}</p>
              <div class="project-tech">
                <span class="tech-label">{{ $t('projects.tech_stack') }}:</span>
                <div class="tech-tags">
                  <span v-for="tag in project.tags" :key="tag" class="badge">{{ tag }}</span>
                </div>
              </div>
              <div class="project-links">
                <a v-if="project.github" :href="project.github" target="_blank" class="project-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {{ $t('projects.view_source') }}
                </a>
              </div>
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
  { key: 'all' },
  { key: 'ai' },
  { key: 'web' },
  { key: 'desktop' },
  { key: 'miniprogram' },
]

const allProjects = computed(() => [
  {
    slug: 'heartsound',
    icon: '🫀',
    title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound Intelligence',
    desc: locale.value === 'zh'
      ? 'AI 心脏健康监测系统，通过树莓派设备采集心音信号，利用深度学习算法进行分析和健康评估。包含嵌入式触摸屏 GUI、数据可视化和报告生成功能。'
      : 'AI heart health monitoring system using Raspberry Pi for signal acquisition, deep learning for analysis, and embedded touchscreen GUI for visualization.',
    type: 'AI + Hardware',
    category: 'ai',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    tags: ['Python', 'AI/ML', 'PyQt5', 'Raspberry Pi', 'Signal Processing'],
    github: null,
  },
  {
    slug: 'wisdom-classroom',
    icon: '📚',
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh'
      ? '智能教育平台，包含 Web 端（Nuxt 3）和 Qt 桌面端双平台。支持 AI 辅助教学、智能课件生成（PPT）、教案编辑、新闻资讯聚合和数据分析等功能。'
      : 'Smart education platform with Web (Nuxt 3) and Qt desktop dual-platform. Features AI-assisted teaching, PPT generation, lesson planning, and analytics.',
    type: 'Full Stack',
    category: 'web',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    tags: ['Nuxt 3', 'Vue 3', 'C++', 'Qt', 'Supabase', 'Zhipu AI'],
    github: null,
  },
  {
    slug: 'mindguard',
    icon: '🧠',
    title: 'MindGuard',
    desc: locale.value === 'zh'
      ? '面向高校的心理健康微信小程序。围绕"今天、心情随笔、任务、树洞、我的"五个核心模块，提供情绪打卡、AI 建议生成、社区守护与危机干预等功能，Dify AI 工作流贯穿全程。'
      : 'Campus mental health WeChat mini-program with 5 core modules: Today, Journal, Tasks, TreeHole, and Profile. Features emotional check-in, AI suggestions, community support, and crisis intervention.',
    type: locale.value === 'zh' ? '微信小程序' : 'Mini Program',
    category: 'miniprogram',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    tags: [locale.value === 'zh' ? '微信小程序' : 'WeChat MP', 'Dify AI', locale.value === 'zh' ? '云开发' : 'Cloud Dev', 'TDesign'],
    github: null,
  },
  {
    slug: 'unismart',
    icon: '🎓',
    title: 'UniSmart',
    desc: locale.value === 'zh'
      ? '大学智能信息平台，集成教师数据库、招聘信息管理和用户系统，基于 Appwrite 后端服务构建。'
      : 'University smart information platform with teacher database, job listings, and user management built on Appwrite.',
    type: 'Web App',
    category: 'web',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    tags: ['Appwrite', 'Database', 'REST API'],
    github: null,
  },
  {
    slug: 'ai-vibot',
    icon: '🤖',
    title: 'AI-Vibot',
    desc: locale.value === 'zh'
      ? 'AI 企业管理系统，通过人工智能技术优化企业运营流程，提升管理效率和决策质量。'
      : 'AI enterprise management system optimizing business operations through artificial intelligence.',
    type: 'AI + Web',
    category: 'ai',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
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
.page-header {
  padding: var(--space-32) 0 var(--space-16);
  text-align: center;
  background: var(--gradient-hero);
}

.page-header h1 {
  margin-bottom: var(--space-4);
}

.page-header p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

/* Filter */
.filter-bar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-12);
}

.filter-btn {
  padding: var(--space-2) var(--space-5);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
}

.project-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.project-cover {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-emoji {
  font-size: 5rem;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15));
}

.project-body {
  padding: var(--space-8);
}

.project-type-badge {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-3);
}

.project-body h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-4);
}

.project-body > p {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-6);
}

.project-tech {
  margin-bottom: var(--space-6);
}

.tech-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.project-links {
  display: flex;
  gap: var(--space-3);
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.project-link:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
