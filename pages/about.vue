<template>
  <div class="about-page">
    <section class="page-hero">
      <div class="container">
        <h1 class="reveal">{{ $t('about.title') }}</h1>
        <p class="page-subtitle reveal delay-1">{{ $t('about.subtitle') }}</p>
      </div>
    </section>

    <!-- Intro -->
    <section class="about-section">
      <div class="container about-intro">
        <div class="intro-avatar reveal">
          <div class="avatar-block">Z</div>
        </div>
        <div class="intro-text reveal delay-1">
          <h2>{{ $t('about.intro_title') }}</h2>
          <p>{{ $t('about.intro_text') }}</p>
          <p v-if="locale === 'zh'">
            从 AI 心脏健康监测到智能教育平台，从微信小程序到企业管理系统，我在不同领域积累了丰富的实战经验。我相信技术的价值在于解决真实的问题。
          </p>
          <p v-else>
            From AI heart health monitoring to smart education platforms, from WeChat mini-programs to enterprise management — I believe technology's true value lies in solving real problems.
          </p>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="about-section section-alt">
      <div class="container">
        <h2 class="reveal">{{ $t('about.skills_title') }}</h2>
        <div class="skills-cols">
          <div v-for="(cat, idx) in skillCategories" :key="cat.name" class="skill-col reveal" :class="`delay-${idx + 1}`">
            <h3>{{ cat.name }}</h3>
            <ul>
              <li v-for="skill in cat.skills" :key="skill.name">
                <span class="skill-dot"></span>
                <span>{{ skill.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="about-section">
      <div class="container container-sm">
        <h2 class="reveal">{{ $t('about.timeline_title') }}</h2>
        <div class="timeline">
          <div v-for="(ev, idx) in timeline" :key="idx" class="tl-item reveal" :class="`delay-${(idx % 4) + 1}`">
            <div class="tl-year">{{ ev.year }}</div>
            <div class="tl-body">
              <h3>{{ ev.title }}</h3>
              <p>{{ ev.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
useScrollReveal()

useHead({
  title: locale.value === 'zh' ? '关于我 | 周志琪' : 'About | Zhou Zhiqi',
})

const skillCategories = computed(() => [
  {
    name: locale.value === 'zh' ? '前端开发' : 'Frontend',
    skills: [
      { name: 'Vue 3 / Nuxt 3' },
      { name: 'HTML / CSS' },
      { name: 'TypeScript' },
      { name: locale.value === 'zh' ? '微信小程序' : 'WeChat Mini Program' },
    ],
  },
  {
    name: locale.value === 'zh' ? '后端 & AI' : 'Backend & AI',
    skills: [
      { name: 'Python' },
      { name: 'Node.js' },
      { name: 'AI / Machine Learning' },
      { name: 'Supabase / Appwrite' },
    ],
  },
  {
    name: locale.value === 'zh' ? '桌面 & 嵌入式' : 'Desktop & Embedded',
    skills: [
      { name: 'C++ / Qt' },
      { name: 'PyQt5' },
      { name: 'Raspberry Pi' },
      { name: 'Linux' },
    ],
  },
])

const timeline = computed(() => [
  {
    year: '2026',
    title: locale.value === 'zh' ? 'AI 企业管理系统' : 'AI Enterprise Management',
    desc: locale.value === 'zh' ? '开发 AI-Vibot 企业管理系统' : 'Developed AI-Vibot enterprise management system',
  },
  {
    year: '2025–26',
    title: locale.value === 'zh' ? '多项目并行' : 'Multi-project Development',
    desc: locale.value === 'zh' ? '推进 MindGuard、UniSmart 等多个项目' : 'MindGuard, UniSmart and other projects',
  },
  {
    year: '2025',
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh' ? '构建 Web + Qt 桌面双端智能教育平台' : 'Built Web + Qt desktop smart education platform',
  },
  {
    year: '2024',
    title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound Project',
    desc: locale.value === 'zh' ? 'AI 心脏健康监测系统，含树莓派嵌入式 GUI' : 'AI heart health monitoring with Raspberry Pi GUI',
  },
])
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
  left: 30%;
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
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

.about-section {
  padding: 72px 0;
  border-bottom: 1px solid var(--color-border);
}

.about-section:last-child {
  border-bottom: none;
}

.section-alt {
  background: var(--color-bg-secondary);
}

.about-section h2 {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 32px;
}

/* Intro */
.about-intro {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 48px;
  align-items: start;
}

.avatar-block {
  width: 120px;
  height: 120px;
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-primary);
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
}

.intro-text h2 {
  font-size: 1.5rem;
  margin-bottom: 16px;
}

.intro-text p {
  font-size: 16px;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
}

/* Skills */
.skills-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.skill-col h3 {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-tertiary);
  margin-bottom: 16px;
}

.skill-col ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-col li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
}

.skill-dot {
  width: 6px;
  height: 6px;
  background: var(--color-primary-light);
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.3);
  border-radius: 50%;
  flex-shrink: 0;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
}

.tl-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.tl-item:last-child {
  border-bottom: none;
}

.tl-year {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  font-variant-numeric: tabular-nums;
  padding-top: 2px;
}

.tl-body h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.tl-body p {
  font-size: 14px;
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .page-hero { padding: 120px 0 48px; }

  .about-intro {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .skills-cols {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .tl-item {
    grid-template-columns: 72px 1fr;
    gap: 16px;
  }
}
</style>
