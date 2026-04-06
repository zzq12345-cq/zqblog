<template>
  <div class="home">
    <!-- ========== HERO ========== -->
    <section class="hero">
      <div class="hero-bg">
        <img src="/images/hero-bg.png" alt="" class="hero-bg-image" />
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-content">
        <div class="hero-badge reveal">
          <span class="badge-pulse"></span>
          <span>{{ $t('hero.role') }}</span>
        </div>

        <h1 class="hero-title reveal delay-1">
          {{ $t('hero.greeting') }}<br />
          <span class="hero-name">{{ $t('hero.name') }}</span>
        </h1>

        <p class="hero-desc reveal delay-2">
          {{ $t('hero.description') }}
        </p>

        <div class="hero-actions reveal delay-3">
          <NuxtLink :to="localePath('/projects')" class="btn-hero-primary">
            <span>{{ $t('hero.cta_projects') }}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="btn-hero-ghost">
            {{ $t('hero.cta_contact') }}
          </NuxtLink>
        </div>

        <!-- Scroll indicator -->
        <div class="scroll-hint reveal delay-5">
          <div class="scroll-mouse">
            <div class="scroll-dot"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== STATS BAR ========== -->
    <section class="stats-bar">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item reveal-scale">
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== FEATURED PROJECTS ========== -->
    <section class="section section-projects">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">PORTFOLIO</span>
          <h2>{{ $t('sections.featured_projects') }}</h2>
          <p>{{ $t('sections.featured_projects_desc') }}</p>
        </div>

        <div class="featured-grid">
          <article
            v-for="(project, index) in featuredProjects"
            :key="project.slug"
            class="featured-card reveal"
            :class="[`delay-${index + 1}`, index === 0 ? 'featured-large' : '']"
          >
            <div class="featured-visual" :style="{ background: project.gradient }">
              <div class="featured-icon-wrap">
                <span class="featured-icon">{{ project.icon }}</span>
              </div>
              <div class="featured-visual-mesh"></div>
            </div>
            <div class="featured-body">
              <span class="featured-type">{{ project.type }}</span>
              <h3>{{ project.title }}</h3>
              <p>{{ project.desc }}</p>
              <div class="featured-tags">
                <span v-for="tag in project.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </article>
        </div>

        <div class="section-cta reveal">
          <NuxtLink :to="localePath('/projects')" class="btn-outline-dark">
            {{ $t('sections.view_all_projects') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ========== TECH STACK ========== -->
    <section class="section section-tech">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">SKILLS</span>
          <h2>{{ $t('sections.tech_stack') }}</h2>
          <p>{{ $t('sections.tech_stack_desc') }}</p>
        </div>

        <div class="tech-marquee">
          <div class="tech-track">
            <div v-for="tech in [...techStack, ...techStack]" :key="tech.name + Math.random()" class="tech-chip">
              <span class="tech-chip-icon">{{ tech.icon }}</span>
              <span class="tech-chip-name">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== LATEST POSTS ========== -->
    <section class="section section-posts">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-tag">BLOG</span>
          <h2>{{ $t('sections.latest_posts') }}</h2>
          <p>{{ $t('sections.latest_posts_desc') }}</p>
        </div>

        <div class="posts-list">
          <article
            v-for="(post, index) in latestPosts"
            :key="post.slug"
            class="post-row reveal"
            :class="`delay-${index + 1}`"
          >
            <div class="post-row-left">
              <time>{{ post.date }}</time>
              <span class="post-dot"></span>
              <span class="post-tag-inline">{{ post.tag }}</span>
            </div>
            <div class="post-row-center">
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
            </div>
            <div class="post-row-right">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          </article>
        </div>

        <div class="section-cta reveal">
          <NuxtLink :to="localePath('/blog')" class="btn-outline-dark">
            {{ $t('sections.view_all_posts') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ========== CTA ========== -->
    <section class="section-cta-banner">
      <div class="container">
        <div class="cta-banner reveal-scale">
          <div class="cta-glow"></div>
          <h2>{{ locale === 'zh' ? '有合作想法？' : 'Have an idea?' }}</h2>
          <p>{{ locale === 'zh' ? '欢迎联系我，一起探讨技术与创意' : "Let's discuss technology and creativity together" }}</p>
          <NuxtLink :to="localePath('/contact')" class="btn-hero-primary">
            <span>{{ $t('hero.cta_contact') }}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()
useScrollReveal()

useHead({
  title: locale.value === 'zh' ? '周志琪 | AI & 全栈开发者' : 'Zhou Zhiqi | AI & Full-Stack Developer',
})

const stats = computed(() => [
  { value: '5+', label: locale.value === 'zh' ? '个项目' : 'Projects' },
  { value: '6+', label: locale.value === 'zh' ? '项技术栈' : 'Tech Stacks' },
  { value: '2+', label: locale.value === 'zh' ? '年经验' : 'Years Exp.' },
  { value: '∞', label: locale.value === 'zh' ? '热情' : 'Passion' },
])

const featuredProjects = computed(() => [
  {
    slug: 'heartsound',
    icon: '🫀',
    title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound Intelligence',
    desc: locale.value === 'zh'
      ? 'AI 心脏健康监测系统，通过树莓派设备采集心音信号，利用深度学习算法进行分析和健康评估'
      : 'AI heart health monitoring system with Raspberry Pi for signal acquisition and deep learning analysis',
    type: 'AI + Hardware',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    tags: ['Python', 'AI/ML', 'PyQt5', 'Raspberry Pi'],
  },
  {
    slug: 'wisdom-classroom',
    icon: '📚',
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh'
      ? '智能教育平台，Web + Qt 桌面双端，AI 辅助教学与智能课件生成'
      : 'Smart education platform with Web + Qt desktop, AI-assisted teaching',
    type: 'Full Stack',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    tags: ['Nuxt 3', 'Vue 3', 'C++/Qt', 'Supabase'],
  },
  {
    slug: 'mindguard',
    icon: '🧠',
    title: 'MindGuard',
    desc: locale.value === 'zh'
      ? '高校心理健康微信小程序，AI 工作流驱动的情绪打卡与社区守护'
      : 'Campus mental health WeChat mini-program with AI-driven emotional support',
    type: locale.value === 'zh' ? '微信小程序' : 'Mini Program',
    gradient: 'linear-gradient(135deg, #059669 0%, #06b6d4 100%)',
    tags: [locale.value === 'zh' ? '微信小程序' : 'WeChat', 'Dify AI', locale.value === 'zh' ? '云开发' : 'Cloud'],
  },
])

const techStack = [
  { name: 'Vue / Nuxt', icon: '💚' },
  { name: 'Python', icon: '🐍' },
  { name: 'C++ / Qt', icon: '⚡' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'AI / ML', icon: '🤖' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Raspberry Pi', icon: '🍓' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📦' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'Appwrite', icon: '🔥' },
]

const latestPosts = computed(() => [
  {
    slug: 'hello-world',
    title: locale.value === 'zh' ? '你好，世界 — 博客启航' : 'Hello World — Blog Launch',
    excerpt: locale.value === 'zh'
      ? '搭建个人博客的初衷、技术选型与设计思路分享'
      : 'The motivation, tech choices, and design philosophy behind this blog',
    date: '2026-04-06',
    tag: locale.value === 'zh' ? '随笔' : 'Essay',
  },
  {
    slug: 'nuxt3-best-practices',
    title: locale.value === 'zh' ? 'Nuxt 3 全栈开发最佳实践' : 'Nuxt 3 Full-Stack Best Practices',
    excerpt: locale.value === 'zh'
      ? '从项目结构到部署上线，分享 Nuxt 3 实战中的经验与技巧'
      : 'From project structure to deployment — practical tips for Nuxt 3',
    date: '2026-04-05',
    tag: 'Nuxt',
  },
  {
    slug: 'ai-in-education',
    title: locale.value === 'zh' ? 'AI 在教育领域的应用探索' : 'Exploring AI in Education',
    excerpt: locale.value === 'zh'
      ? '从智慧思政课堂项目出发，探讨 AI 如何赋能教育'
      : 'How AI empowers education — insights from the Wisdom Classroom project',
    date: '2026-04-03',
    tag: 'AI',
  },
])
</script>

<style scoped>
/* ==================== HERO ==================== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(11, 17, 32, 0.3) 0%,
    rgba(11, 17, 32, 0.6) 60%,
    rgba(11, 17, 32, 0.95) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: var(--space-32) 0 var(--space-20);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  backdrop-filter: blur(12px);
}

.badge-pulse {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
}

.hero-title {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 28px;
  color: #fff;
}

.hero-name {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 40%, #22d3ee 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: rgba(255, 255, 255, 0.6);
  max-width: 560px;
  margin: 0 auto 48px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 80px;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.35);
}

.btn-hero-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(37, 99, 235, 0.45);
  color: #fff;
}

.btn-hero-ghost {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  font-weight: 600;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
}

.btn-hero-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  transform: translateY(-2px);
}

/* Scroll indicator */
.scroll-hint {
  display: flex;
  justify-content: center;
}

.scroll-mouse {
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.scroll-dot {
  width: 4px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  animation: scrollDown 2s ease-in-out infinite;
}

@keyframes scrollDown {
  0% { opacity: 1; transform: translateY(0); }
  60% { opacity: 0.3; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* ==================== STATS BAR ==================== */
.stats-bar {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 48px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  display: block;
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-weight: 500;
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ==================== SECTIONS COMMON ==================== */
.section {
  padding: 120px 0;
}

.section-projects {
  background: var(--color-bg);
}

.section-tech {
  background: var(--color-bg-secondary);
  overflow: hidden;
}

.section-posts {
  background: var(--color-bg);
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: clamp(2rem, 3vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.section-header p {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 460px;
  margin: 0 auto;
}

.section-cta {
  text-align: center;
  margin-top: 56px;
}

.btn-outline-dark {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s;
}

.btn-outline-dark:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}

/* ==================== FEATURED PROJECTS ==================== */
.featured-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
}

.featured-large {
  grid-column: span 2;
}

.featured-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.featured-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  transform: translateY(-6px);
}

.featured-large {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}

.featured-large .featured-visual {
  border-radius: 0;
  min-height: 320px;
}

.featured-card:not(.featured-large) .featured-visual {
  height: 200px;
}

.featured-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.featured-visual-mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.featured-icon-wrap {
  position: relative;
  z-index: 1;
  width: 88px;
  height: 88px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.featured-icon {
  font-size: 2.5rem;
}

.featured-body {
  padding: 36px;
}

.featured-type {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: block;
}

.featured-body h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.featured-body p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
}

.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.featured-tags span {
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-primary-bg);
  border-radius: 100px;
}

/* ==================== TECH MARQUEE ==================== */
.tech-marquee {
  overflow: hidden;
  padding: 20px 0;
}

.tech-track {
  display: flex;
  gap: 16px;
  animation: marquee 30s linear infinite;
  width: max-content;
}

.tech-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  white-space: nowrap;
  transition: all 0.2s;
}

.tech-chip:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}

.tech-chip-icon {
  font-size: 1.2rem;
}

.tech-chip-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ==================== POSTS LIST ==================== */
.posts-list {
  max-width: 900px;
  margin: 0 auto;
}

.post-row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px 0;
  border-bottom: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: all 0.2s;
}

.post-row:hover {
  padding-left: 12px;
}

.post-row:hover h3 {
  color: var(--color-primary);
}

.post-row-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  min-width: 180px;
}

.post-row-left time {
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.post-dot {
  width: 4px;
  height: 4px;
  background: var(--color-text-tertiary);
  border-radius: 50%;
}

.post-tag-inline {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  padding: 2px 10px;
  background: var(--color-primary-bg);
  border-radius: 100px;
}

.post-row-center {
  flex: 1;
}

.post-row-center h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.2s;
  letter-spacing: -0.01em;
}

.post-row-center p {
  font-size: 14px;
  color: var(--color-text-tertiary);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-row-right {
  flex-shrink: 0;
  color: var(--color-text-tertiary);
  transition: all 0.2s;
}

.post-row:hover .post-row-right {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* ==================== CTA BANNER ==================== */
.section-cta-banner {
  padding: 80px 0 120px;
  background: var(--color-bg);
}

.cta-banner {
  position: relative;
  text-align: center;
  padding: 80px 40px;
  background: linear-gradient(135deg, #0b1120 0%, #1a1040 50%, #0b2030 100%);
  border-radius: 28px;
  overflow: hidden;
  color: #fff;
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.cta-banner h2 {
  position: relative;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: #fff;
  letter-spacing: -0.03em;
}

.cta-banner p {
  position: relative;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 36px;
}

.cta-banner .btn-hero-primary {
  position: relative;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 1024px) {
  .featured-large {
    grid-column: span 2;
    grid-template-columns: 1fr;
  }

  .featured-large .featured-visual {
    min-height: 240px;
  }
}

@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .section {
    padding: 80px 0;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .featured-large {
    grid-column: span 1;
    grid-template-columns: 1fr;
  }

  .post-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .post-row-left {
    min-width: unset;
  }

  .post-row-right {
    display: none;
  }
}
</style>
