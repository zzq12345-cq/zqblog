<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="container hero-inner">
        <p class="hero-label reveal">{{ $t('hero.role') }}</p>
        <h1 class="hero-title reveal delay-1">
          {{ $t('hero.greeting') }}<br />
          <span class="hero-name">{{ $t('hero.name') }}</span>
        </h1>
        <p class="hero-desc reveal delay-2">{{ $t('hero.description') }}</p>
        <div class="hero-actions reveal delay-3">
          <NuxtLink :to="localePath('/projects')" class="btn-glow">
            {{ $t('hero.cta_projects') }}
            <span class="btn-shine"></span>
          </NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="btn-ghost">{{ $t('hero.cta_contact') }}</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-row">
      <div class="container">
        <div class="stats-grid">
          <div v-for="s in stats" :key="s.label" class="stat reveal-scale">
            <span class="stat-val">{{ s.value }}</span>
            <span class="stat-lbl">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="home-section">
      <div class="container">
        <div class="section-top reveal">
          <h2>{{ $t('sections.featured_projects') }}</h2>
          <NuxtLink :to="localePath('/projects')" class="link-arrow">
            {{ $t('sections.view_all') }} →
          </NuxtLink>
        </div>

        <div class="project-cards">
          <article v-for="(p, i) in featuredProjects" :key="p.slug" class="pj-card reveal" :class="`delay-${i+1}`">
            <div class="pj-card-num">{{ p.num }}</div>
            <div class="pj-card-body">
              <div class="pj-head">
                <h3>{{ p.title }}</h3>
                <span class="pj-type">{{ p.type }}</span>
              </div>
              <p>{{ p.desc }}</p>
              <div class="pj-tags">
                <span v-for="t in p.tags" :key="t">{{ t }}</span>
              </div>
            </div>
            <div class="pj-card-glow"></div>
          </article>
        </div>
      </div>
    </section>

    <!-- Tech -->
    <section class="home-section">
      <div class="container">
        <h2 class="reveal">{{ $t('sections.tech_stack') }}</h2>
        <p class="section-sub reveal delay-1">{{ $t('sections.tech_stack_desc') }}</p>
        <div class="tech-grid reveal delay-2">
          <span v-for="t in techStack" :key="t" class="tech-chip">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- Posts -->
    <section class="home-section">
      <div class="container">
        <div class="section-top reveal">
          <h2>{{ $t('sections.latest_posts') }}</h2>
          <NuxtLink :to="localePath('/blog')" class="link-arrow">{{ $t('sections.view_all') }} →</NuxtLink>
        </div>
        <div class="post-list">
          <article v-for="(post, i) in latestPosts" :key="post.slug" class="post-row reveal" :class="`delay-${i+1}`">
            <time>{{ post.date }}</time>
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container cta-inner reveal-scale">
        <h2>{{ locale === 'zh' ? '有合作想法？一起聊聊' : "Let's work together" }}</h2>
        <NuxtLink :to="localePath('/contact')" class="btn-glow">
          {{ $t('hero.cta_contact') }}
          <span class="btn-shine"></span>
        </NuxtLink>
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
  { value: '6+', label: locale.value === 'zh' ? '项技术' : 'Tech Stacks' },
  { value: '2+', label: locale.value === 'zh' ? '年经验' : 'Years' },
])

const featuredProjects = computed(() => [
  {
    slug: 'heartsound', num: '01',
    title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound Intelligence',
    desc: locale.value === 'zh' ? '基于树莓派的 AI 心脏健康监测系统，深度学习心音分析与嵌入式触摸屏 GUI。' : 'AI heart health monitoring on Raspberry Pi with deep learning signal analysis.',
    type: 'AI + Hardware',
    tags: ['Python', 'AI/ML', 'PyQt5', 'Raspberry Pi'],
  },
  {
    slug: 'wisdom-classroom', num: '02',
    title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom',
    desc: locale.value === 'zh' ? 'Web + Qt 桌面双端智能教育平台，AI 辅助教学与课件生成。' : 'Smart education platform with Web + Qt desktop and AI-assisted teaching.',
    type: 'Full Stack',
    tags: ['Nuxt 3', 'Vue 3', 'C++/Qt', 'Supabase'],
  },
  {
    slug: 'mindguard', num: '03',
    title: 'MindGuard',
    desc: locale.value === 'zh' ? '高校心理健康微信小程序，AI 工作流驱动情绪打卡与社区守护。' : 'Campus mental health WeChat mini-program with AI-driven support.',
    type: locale.value === 'zh' ? '微信小程序' : 'Mini Program',
    tags: [locale.value === 'zh' ? '微信小程序' : 'WeChat MP', 'Dify AI', locale.value === 'zh' ? '云开发' : 'Cloud'],
  },
])

const techStack = ['Vue / Nuxt', 'Python', 'C++ / Qt', 'TypeScript', 'AI / ML', 'Node.js', 'Raspberry Pi', 'Docker', 'Git', 'Linux', 'Supabase', 'Appwrite']

const latestPosts = computed(() => [
  { slug: 'hello-world', title: locale.value === 'zh' ? '你好，世界 — 博客启航' : 'Hello World — Blog Launch', excerpt: locale.value === 'zh' ? '搭建博客的初衷、技术选型与设计思路。' : 'Motivation, tech choices and design philosophy.', date: '2026-04-06' },
  { slug: 'nuxt3', title: locale.value === 'zh' ? 'Nuxt 3 全栈最佳实践' : 'Nuxt 3 Best Practices', excerpt: locale.value === 'zh' ? '从项目结构到部署上线的实战经验。' : 'From project structure to deployment tips.', date: '2026-04-05' },
  { slug: 'ai-edu', title: locale.value === 'zh' ? 'AI 赋能教育探索' : 'AI in Education', excerpt: locale.value === 'zh' ? '从智慧思政课堂探讨 AI 教育应用。' : 'How AI empowers education.', date: '2026-04-03' },
])
</script>

<style scoped>
/* ——— Hero ——— */
.hero {
  position: relative;
  padding: 180px 0 100px;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.12) 0%, rgba(6, 182, 212, 0.06) 40%, transparent 70%);
  pointer-events: none;
}

.hero-inner {
  max-width: 700px;
}

.hero-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary-light);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(2.5rem, 5.5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 24px;
}

.hero-name {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

/* ——— Buttons ——— */
.btn-glow {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.2s;
  box-shadow: var(--shadow-primary);
}

.btn-glow:hover {
  box-shadow: var(--glow-primary);
  transform: translateY(-2px);
  color: #fff;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0% { left: -100%; }
  60% { left: 100%; }
  100% { left: 100%; }
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 13px 28px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-ghost:hover {
  color: var(--color-text);
  border-color: var(--color-text-tertiary);
}

/* ——— Stats ——— */
.stats-row {
  padding: 48px 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stats-grid {
  display: flex;
  justify-content: flex-start;
  gap: 64px;
}

.stat-val {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-lbl {
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 4px;
  display: block;
}

/* ——— Sections ——— */
.home-section {
  padding: 80px 0;
  border-bottom: 1px solid var(--color-border);
}

.home-section:last-of-type {
  border-bottom: none;
}

.section-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 40px;
}

.section-top h2,
.home-section > .container > h2 {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-sub {
  font-size: 15px;
  color: var(--color-text-secondary);
  margin-top: 8px;
  margin-bottom: 28px;
}

.link-arrow {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-decoration: none;
  transition: color 0.2s;
}

.link-arrow:hover {
  color: var(--color-primary-light);
}

/* ——— Project Cards ——— */
.project-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pj-card {
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.pj-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.06);
}

.pj-card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background: radial-gradient(ellipse at right center, rgba(14, 165, 233, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.pj-card-num {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text-tertiary);
  opacity: 0.3;
  border-right: 1px solid var(--color-border);
  font-variant-numeric: tabular-nums;
}

.pj-card-body {
  padding: 24px 28px;
}

.pj-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 8px;
}

.pj-head h3 {
  font-size: 1.1rem;
  font-weight: 650;
}

.pj-type {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.pj-card-body > p {
  font-size: 14px;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin-bottom: 14px;
}

.pj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pj-tags span {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text-tertiary);
}

/* ——— Tech ——— */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-chip {
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: all 0.2s;
}

.tech-chip:hover {
  color: var(--color-primary-light);
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 0 16px rgba(14, 165, 233, 0.06);
}

/* ——— Posts ——— */
.post-list {
  display: flex;
  flex-direction: column;
}

.post-row {
  padding: 24px 0;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: padding-left 0.2s;
}

.post-row:last-child { border-bottom: none; }
.post-row:hover { padding-left: 8px; }
.post-row:hover h3 { color: var(--color-primary-light); }

.post-row time {
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-variant-numeric: tabular-nums;
}

.post-row h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 6px 0 4px;
  transition: color 0.2s;
}

.post-row p {
  font-size: 14px;
  color: var(--color-text-tertiary);
}

/* ——— CTA ——— */
.cta-section {
  padding: 80px 0 120px;
}

.cta-inner {
  text-align: center;
  padding: 64px 40px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  position: relative;
  overflow: hidden;
}

.cta-inner::before {
  content: '';
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.cta-inner h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
  position: relative;
}

.cta-inner .btn-glow {
  position: relative;
}

/* ——— Responsive ——— */
@media (max-width: 768px) {
  .hero { padding: 140px 0 72px; }
  .hero-actions { flex-direction: column; width: fit-content; }
  .stats-grid { gap: 32px; }

  .pj-card { grid-template-columns: 1fr; }
  .pj-card-num { display: none; }

  .section-top { flex-direction: column; gap: 8px; margin-bottom: 28px; }
  .post-row { padding: 20px 0; }
}
</style>
