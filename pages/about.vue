<template>
  <div class="about-page">
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="reveal">{{ $t('about.title') }}</h1>
        <p class="reveal delay-1">{{ $t('about.subtitle') }}</p>
      </div>
    </section>

    <!-- Intro -->
    <section class="section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-avatar reveal-left">
            <div class="avatar-wrapper">
              <div class="avatar-shape">
                <span class="avatar-letter">Z</span>
              </div>
              <div class="avatar-ring"></div>
            </div>
          </div>
          <div class="intro-text reveal-right">
            <h2>{{ $t('about.intro_title') }}</h2>
            <p>{{ $t('about.intro_text') }}</p>
            <p v-if="locale === 'zh'">
              从 AI 心脏健康监测到智能教育平台，从微信小程序到企业管理系统，我在不同领域的项目中积累了丰富的实战经验。我相信技术的价值在于解决真实的问题。
            </p>
            <p v-else>
              From AI heart health monitoring to smart education platforms, from WeChat mini-programs to enterprise management systems — I've gained rich hands-on experience across diverse domains. I believe technology's true value lies in solving real problems.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="section skills-section">
      <div class="container">
        <div class="section-header reveal">
          <h2>{{ $t('about.skills_title') }}</h2>
        </div>
        <div class="skills-grid">
          <div
            v-for="(category, index) in skillCategories"
            :key="category.name"
            class="skill-category reveal"
            :class="`delay-${index + 1}`"
          >
            <div class="skill-icon" :style="{ background: category.gradient }">
              {{ category.icon }}
            </div>
            <h3>{{ category.name }}</h3>
            <div class="skill-items">
              <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="skill-bar">
                  <div class="skill-fill" :style="{ width: skill.level + '%', background: category.gradient }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section timeline-section">
      <div class="container container-sm">
        <div class="section-header reveal">
          <h2>{{ $t('about.timeline_title') }}</h2>
        </div>
        <div class="timeline">
          <div
            v-for="(event, index) in timeline"
            :key="index"
            class="timeline-item reveal"
            :class="`delay-${(index % 4) + 1}`"
          >
            <div class="timeline-dot" :style="{ background: event.color }"></div>
            <div class="timeline-content">
              <time>{{ event.year }}</time>
              <h3>{{ event.title }}</h3>
              <p>{{ event.desc }}</p>
            </div>
          </div>
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
  title: locale.value === 'zh' ? '关于我 | 周志琪' : 'About | Zhou Zhiqi',
})

const skillCategories = computed(() => [
  {
    name: locale.value === 'zh' ? '前端开发' : 'Frontend',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)',
    skills: [
      { name: 'Vue 3 / Nuxt 3', level: 90 },
      { name: 'HTML / CSS', level: 92 },
      { name: 'TypeScript', level: 80 },
      { name: locale.value === 'zh' ? '微信小程序' : 'WeChat Mini Program', level: 82 },
    ],
  },
  {
    name: locale.value === 'zh' ? '后端 & AI' : 'Backend & AI',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    skills: [
      { name: 'Python', level: 88 },
      { name: 'Node.js', level: 78 },
      { name: 'AI / Machine Learning', level: 82 },
      { name: 'Supabase / Appwrite', level: 80 },
    ],
  },
  {
    name: locale.value === 'zh' ? '桌面 & 嵌入式' : 'Desktop & Embedded',
    icon: '💻',
    gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    skills: [
      { name: 'C++ / Qt', level: 85 },
      { name: 'PyQt5', level: 82 },
      { name: 'Raspberry Pi', level: 78 },
      { name: 'Linux', level: 80 },
    ],
  },
])

const timeline = computed(() => [
  {
    year: '2026',
    title: locale.value === 'zh' ? 'AI 企业管理系统' : 'AI Enterprise Management',
    desc: locale.value === 'zh'
      ? '开发 AI-Vibot 企业管理系统，探索 AI 在企业运营中的应用'
      : 'Developed AI-Vibot enterprise management system',
    color: '#2563eb',
  },
  {
    year: '2025-2026',
    title: locale.value === 'zh' ? '多项目并行开发' : 'Parallel Project Development',
    desc: locale.value === 'zh'
      ? '同时推进 MindGuard 心理健康小程序、UniSmart 大学平台等多个项目'
      : 'Simultaneously developed MindGuard, UniSmart and other projects',
    color: '#7c3aed',
  },
  {
    year: '2025',
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh'
      ? '构建智能教育平台，实现 Web 端 + Qt 桌面端双平台，AI 辅助教学'
      : 'Built smart education platform with Web + Qt desktop dual-platform',
    color: '#06b6d4',
  },
  {
    year: '2024',
    title: locale.value === 'zh' ? '心音智鉴项目启动' : 'HeartSound Project Launch',
    desc: locale.value === 'zh'
      ? '开始 AI 心脏健康监测系统研发，含树莓派嵌入式 GUI 开发'
      : 'Started AI heart health monitoring system with Raspberry Pi GUI',
    color: '#ef4444',
  },
])
</script>

<style scoped>
/* Page Header */
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

/* Intro */
.intro-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-16);
  align-items: center;
}

.avatar-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}

.avatar-shape {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-2xl);
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.avatar-letter {
  font-size: 5rem;
  font-weight: var(--font-weight-extrabold);
  color: white;
}

.avatar-ring {
  position: absolute;
  inset: -12px;
  border-radius: var(--radius-2xl);
  border: 2px dashed var(--color-primary-light);
  animation: spin 20s linear infinite;
  opacity: 0.3;
}

.intro-text h2 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-6);
}

.intro-text p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-4);
}

/* Skills */
.skills-section {
  background: var(--color-bg-secondary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

.skill-category {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
}

.skill-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: var(--space-4);
}

.skill-category h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-6);
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.skill-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.skill-bar {
  height: 6px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: var(--space-10);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  padding-bottom: var(--space-10);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: calc(-1 * var(--space-10) + 2px);
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 3px solid var(--color-bg);
  box-shadow: 0 0 0 2px var(--color-border);
}

.timeline-content time {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--space-2);
}

.timeline-content h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-2);
}

.timeline-content p {
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .intro-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
