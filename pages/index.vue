<template>
  <div class="home">
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-orb"></div>
      <div class="hero-orb orb-2"></div>

      <div class="container hero-inner">
        <div class="hero-label anim-in d1">
          <span class="label-dot"></span>
          <span>{{ locale === 'zh' ? '厦门大学嘉庚学院 · 软件工程' : 'XMU TKK · Software Engineering' }}</span>
        </div>

        <div class="hero-headline">
          <div class="line anim-in d2">
            <span class="typed-text">{{ greetingText }}<span class="caret" v-if="!greetingDone">|</span></span>
          </div>
          <div class="line anim-in d3">
            <span class="name-gradient" :class="{ show: greetingDone }">{{ $t('hero.name') }}</span>
          </div>
        </div>

        <p class="hero-sub anim-in d4">{{ $t('hero.description') }}</p>

        <div class="hero-btns anim-in d5">
          <NuxtLink :to="localePath('/projects')" class="btn-main clickable">
            {{ $t('hero.cta_projects') }}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </NuxtLink>
          <NuxtLink :to="localePath('/about')" class="btn-ghost clickable">{{ locale === 'zh' ? '了解更多' : 'Learn More' }}</NuxtLink>
        </div>
      </div>

      <div class="scroll-hint anim-in d6">
        <div class="scroll-dot"></div>
      </div>
    </section>

    <!-- ===== MARQUEE STATS ===== -->
    <section class="marquee-bar">
      <div class="marquee-track">
        <div class="marquee-content">
          <span v-for="n in 3" :key="n" class="marquee-set">
            <span class="m-item" v-for="s in statItems" :key="s.t + n">
              <strong>{{ s.v }}</strong> {{ s.t }}
            </span>
            <span class="m-divider">✦</span>
          </span>
        </div>
      </div>
    </section>

    <!-- ===== BENTO PROJECTS ===== -->
    <section class="bento-section">
      <div class="container">
        <div class="sec-label reveal">{{ $t('sections.featured_projects') }}</div>
        <h2 class="sec-title reveal delay-1">
          {{ locale === 'zh' ? '用技术解决真实问题' : 'Solving real problems with code' }}
        </h2>

        <div class="bento-grid">
          <NuxtLink
            v-for="(p, i) in projects"
            :key="p.slug"
            :to="localePath(`/projects/${p.slug}`)"
            class="bento-card clickable reveal"
            :class="[`card-${i + 1}`, `delay-${i + 1}`]"
            :ref="el => cardRefs[i] = el"
            @mousemove="tiltCard($event, i)"
            @mouseleave="resetCard(i)"
            :style="cardStyles[i]"
          >
            <div class="card-glare"></div>
            <div class="card-content">
              <span class="card-num">{{ p.num }}</span>
              <span class="card-type">{{ p.type }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.desc }}</p>
              <div class="card-tags">
                <span v-for="t in p.tags" :key="t">{{ t }}</span>
              </div>
            </div>
            <div class="card-arrow">→</div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== TECH MARQUEE ===== -->
    <section class="tech-section">
      <div class="container">
        <div class="sec-label reveal">{{ $t('sections.tech_stack') }}</div>
        <h2 class="sec-title reveal delay-1">
          {{ locale === 'zh' ? '日常使用的工具与技术' : 'Tools & technologies I use daily' }}
        </h2>
      </div>
      <div class="tech-marquee">
        <div class="tech-track">
          <div class="tech-slide">
            <span v-for="n in 2" :key="n" class="tech-set">
              <span v-for="t in techStack" :key="t + n" class="tech-pill">{{ t }}</span>
            </span>
          </div>
        </div>
        <div class="tech-track reverse">
          <div class="tech-slide">
            <span v-for="n in 2" :key="n" class="tech-set">
              <span v-for="t in techStack2" :key="t + n" class="tech-pill">{{ t }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== POSTS ===== -->
    <section class="posts-section">
      <div class="container">
        <div class="sec-label reveal">{{ $t('sections.latest_posts') }}</div>
        <h2 class="sec-title reveal delay-1">
          {{ locale === 'zh' ? '最新文章与思考' : 'Latest writings' }}
        </h2>

        <div class="posts-grid">
          <article v-for="(p, i) in posts" :key="p.slug" class="post-card glass-surface reveal clickable" :class="`delay-${i + 1}`">
            <time>{{ p.date }}</time>
            <h3>{{ p.title }}</h3>
            <p>{{ p.excerpt }}</p>
            <span class="post-link">{{ locale === 'zh' ? '阅读更多' : 'Read more' }} →</span>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card glass-surface reveal-scale">
          <div class="cta-orb"></div>
          <h2>{{ locale === 'zh' ? '一起创造些有意思的东西？' : "Let's build something amazing" }}</h2>
          <NuxtLink :to="localePath('/contact')" class="btn-main clickable">
            {{ $t('hero.cta_contact') }}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

useHead({ title: locale.value === 'zh' ? '周志琪 | AI & 全栈开发者' : 'Zhou Zhiqi | AI & Full-Stack Developer' })

const { displayed: greetingText, done: greetingDone } = useTypewriter(
  locale.value === 'zh' ? '你好，我是' : "Hi, I'm", 100
)

const statItems = computed(() => locale.value === 'zh'
  ? [{ v: '5+', t: '个项目' }, { v: '10+', t: '项技能' }, { v: '10+', t: '项荣誉' }, { v: '2+', t: '年经验' }]
  : [{ v: '5+', t: 'Projects' }, { v: '10+', t: 'Skills' }, { v: '10+', t: 'Awards' }, { v: '2+', t: 'Years' }]
)

const projects = computed(() => [
  { slug: 'heartsound', num: '01', title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound', desc: locale.value === 'zh' ? 'AI 心脏健康监测 · 树莓派 + 深度学习' : 'AI heart health · RPi + Deep Learning', type: 'AI + HW', tags: ['Python', 'AI/ML', 'RPi'] },
  { slug: 'wisdom-classroom', num: '02', title: locale.value === 'zh' ? 'AI 智慧课堂' : 'AI Classroom', desc: locale.value === 'zh' ? '智能教育平台 · Web + Qt 双端' : 'Smart education · Web + Qt', type: 'Full Stack', tags: ['Nuxt 3', 'C++/Qt'] },
  { slug: 'mindguard', num: '03', title: 'MindGuard', desc: locale.value === 'zh' ? '心理健康小程序 · AI 情绪打卡' : 'Mental health · AI mood tracking', type: locale.value === 'zh' ? '小程序' : 'Mini App', tags: ['WeChat', 'Dify AI'] },
])

const techStack = ['Vue.js', 'Nuxt 3', 'TypeScript', 'Python', 'C++', 'Qt Framework', 'TensorFlow']
const techStack2 = ['Node.js', 'Docker', 'Linux', 'Supabase', 'Appwrite', 'Raspberry Pi', 'Git']

const posts = computed(() => [
  { slug: 'hello', title: locale.value === 'zh' ? '你好世界 — 博客启航' : 'Hello World', excerpt: locale.value === 'zh' ? '搭建博客的初衷与技术选型' : 'Building this blog from scratch', date: '2026-04' },
  { slug: 'nuxt3', title: locale.value === 'zh' ? 'Nuxt 3 实战' : 'Nuxt 3 in Practice', excerpt: locale.value === 'zh' ? '从零到上线的全栈经验' : 'Full-stack tips from zero to deploy', date: '2026-04' },
  { slug: 'ai', title: locale.value === 'zh' ? 'AI 赋能教育' : 'AI × Education', excerpt: locale.value === 'zh' ? '探索 AI 在教育领域的应用' : 'How AI transforms learning', date: '2026-04' },
])

// 3D tilt
const cardRefs = reactive([null, null, null])
const cardStyles = reactive([{}, {}, {}])

function tiltCard(e, i) {
  const el = cardRefs[i]
  if (!el?.$el) return
  const rect = (el.$el || el).getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  cardStyles[i] = {
    transform: `perspective(600px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) scale3d(1.02,1.02,1.02)`,
    transition: 'transform 0.4s cubic-bezier(0.03,0.98,0.52,0.99)',
  }
  const glare = (el.$el || el).querySelector('.card-glare')
  if (glare) {
    const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90
    glare.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.06) 0%, transparent 60%)`
    glare.style.opacity = Math.max(x, y) * 0.7
  }
}

function resetCard(i) {
  cardStyles[i] = { transform: 'perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)', transition: 'transform 0.6s ease' }
  const el = cardRefs[i]
  if (el?.$el) {
    const glare = (el.$el || el).querySelector('.card-glare')
    if (glare) glare.style.opacity = 0
  }
}
</script>

<style scoped>
/* ===== HERO ===== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-bottom: 60px;
}

.hero-orb {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(6, 182, 212, 0.04) 50%, transparent 70%);
  top: 20%;
  right: 5%;
  filter: blur(60px);
  pointer-events: none;
  animation: orb-float 12s ease-in-out infinite;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%);
  top: 60%;
  left: 10%;
  animation-delay: -6s;
  animation-duration: 15s;
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.95); }
}

.hero-inner { max-width: 800px; }

.hero-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary-light);
  background: rgba(14, 165, 233, 0.06);
  border: 1px solid rgba(14, 165, 233, 0.12);
  border-radius: var(--radius-full);
  margin-bottom: 40px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.label-dot {
  width: 6px; height: 6px;
  background: var(--color-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-primary-light);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse { 50% { opacity: 0.3; } }

/* HEADLINE */
.hero-headline {
  margin-bottom: 28px;
}

.hero-headline .line {
  overflow: hidden;
}

.hero-headline .line:first-child {
  font-size: clamp(2.5rem, 5.5vw, 4rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-text-secondary);
}

.typed-text { display: inline; }
.caret { color: var(--color-primary-light); font-weight: 300; animation: blink 0.8s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

.hero-headline .line:nth-child(2) {
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-top: 4px;
}

.name-gradient {
  background: linear-gradient(135deg, #38bdf8 0%, #22d3ee 40%, #a5f3fc 70%, #f0f9ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
}

.name-gradient.show {
  opacity: 1;
  transform: translateY(0);
}

.hero-sub {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-text-tertiary);
  max-width: 480px;
  margin-bottom: 40px;
}

/* BUTTONS */
.hero-btns { display: flex; gap: 12px; }

.btn-main {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.25), inset 0 1px 0 rgba(255,255,255,0.1);
}

.btn-main:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  color: #fff;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s;
  background: rgba(255,255,255,0.02);
}

.btn-ghost:hover { color: var(--color-text); border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }

/* SCROLL HINT */
.scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 32px;
  border: 1.5px solid rgba(255,255,255,0.15);
  border-radius: 11px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-dot {
  width: 3px;
  height: 8px;
  background: var(--color-primary-light);
  border-radius: 2px;
  animation: scroll-bob 2s ease-in-out infinite;
}

@keyframes scroll-bob {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.3; }
}

/* ===== MARQUEE ===== */
.marquee-bar {
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 20px 0;
  overflow: hidden;
  background: rgba(5, 10, 20, 0.5);
  backdrop-filter: blur(8px);
}

.marquee-track { overflow: hidden; }

.marquee-content {
  display: flex;
  white-space: nowrap;
  animation: marquee 30s linear infinite;
}

.marquee-set { display: flex; align-items: center; gap: 24px; padding-right: 24px; }
.m-item { font-size: 14px; color: var(--color-text-tertiary); }
.m-item strong { color: var(--color-text); font-weight: 700; margin-right: 4px; }
.m-divider { color: var(--color-primary-light); opacity: 0.4; font-size: 10px; }

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.33%); }
}

/* ===== SECTIONS ===== */
.sec-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-primary-light);
  margin-bottom: 12px;
}

.sec-title {
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 48px;
  max-width: 500px;
}

/* ===== BENTO GRID ===== */
.bento-section { padding: 96px 0; }

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 16px;
}

.bento-card {
  position: relative;
  overflow: hidden;
  background: rgba(10, 18, 38, 0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(136, 160, 200, 0.08);
  border-radius: 18px;
  padding: 32px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 260px;
  transition: all 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99);
  will-change: transform;
}

.card-1 { grid-column: span 2; min-height: 300px; }
.card-2 { grid-column: span 1; }
.card-3 { grid-column: span 3; min-height: 200px; }

.bento-card:hover {
  border-color: rgba(14, 165, 233, 0.2);
  box-shadow: 0 0 60px rgba(14, 165, 233, 0.06);
}

.bento-card:hover .card-arrow { transform: translate(4px, -4px); color: var(--color-primary-light); }

.card-glare { position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 1; }

.card-content { position: relative; z-index: 2; flex: 1; }

.card-num {
  font-size: 4rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  position: absolute;
  top: -8px;
  right: 0;
  line-height: 1;
  pointer-events: none;
}

.card-type {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
  display: block;
}

.card-content h3 {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.card-content p {
  font-size: 14px;
  color: var(--color-text-tertiary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.card-tags span {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border: 1px solid rgba(136, 160, 200, 0.1);
  border-radius: 6px;
  color: var(--color-text-tertiary);
}

.card-arrow {
  position: absolute;
  bottom: 28px;
  right: 28px;
  font-size: 1.2rem;
  color: var(--color-text-tertiary);
  opacity: 0.5;
  transition: all 0.3s;
  z-index: 2;
}

/* ===== TECH MARQUEE ===== */
.tech-section { padding: 96px 0; border-top: 1px solid var(--color-border); }

.tech-marquee { margin-top: 16px; overflow: hidden; }
.tech-track { overflow: hidden; padding: 8px 0; }
.tech-track.reverse .tech-slide { animation-direction: reverse; }

.tech-slide {
  display: flex;
  white-space: nowrap;
  animation: marquee 40s linear infinite;
}

.tech-set { display: flex; gap: 12px; padding-right: 12px; }

.tech-pill {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: rgba(10, 18, 38, 0.5);
  border: 1px solid rgba(136, 160, 200, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(6px);
  white-space: nowrap;
  transition: all 0.25s;
}

.tech-pill:hover {
  color: var(--color-primary-light);
  border-color: rgba(14, 165, 233, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.08);
}

/* ===== POSTS ===== */
.posts-section { padding: 96px 0; border-top: 1px solid var(--color-border); }

.posts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

.post-card {
  padding: 28px;
  border-radius: 16px;
  background: rgba(10, 18, 38, 0.45);
  border: 1px solid rgba(136, 160, 200, 0.08);
  backdrop-filter: blur(8px);
  transition: all 0.3s;
  cursor: pointer;
}

.post-card:hover {
  border-color: rgba(14, 165, 233, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.post-card:hover .post-link { color: var(--color-primary-light); }

.post-card time { font-size: 12px; color: var(--color-text-tertiary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
.post-card h3 { font-size: 1.1rem; font-weight: 650; margin: 12px 0 8px; letter-spacing: -0.01em; transition: color 0.2s; }
.post-card:hover h3 { color: var(--color-primary-light); }
.post-card p { font-size: 14px; color: var(--color-text-tertiary); line-height: 1.6; margin-bottom: 16px; }
.post-link { font-size: 13px; font-weight: 600; color: var(--color-text-tertiary); transition: color 0.2s; }

/* ===== CTA ===== */
.cta-section { padding: 48px 0 120px; }

.cta-card {
  text-align: center;
  padding: 80px 40px;
  background: rgba(10, 18, 38, 0.5);
  border: 1px solid rgba(136, 160, 200, 0.08);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(12px);
}

.cta-orb {
  position: absolute;
  width: 400px; height: 300px;
  top: -100px; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.cta-card h2 {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 28px;
  letter-spacing: -0.03em;
  position: relative;
}

.cta-card .btn-main { position: relative; }

/* ANIM */
.anim-in { opacity: 0; transform: translateY(28px); animation: up 0.7s ease forwards; }
.d1 { animation-delay: 0.15s; } .d2 { animation-delay: 0.3s; } .d3 { animation-delay: 0.45s; }
.d4 { animation-delay: 0.6s; } .d5 { animation-delay: 0.75s; } .d6 { animation-delay: 1.2s; }
@keyframes up { to { opacity: 1; transform: translateY(0); } }

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero { padding-bottom: 40px; }
  .hero-btns { flex-direction: column; width: fit-content; }
  .hero-orb { width: 300px; height: 300px; right: -50px; }
  .scroll-hint { display: none; }
  .bento-grid { grid-template-columns: 1fr; }
  .card-1, .card-2, .card-3 { grid-column: span 1; min-height: auto; }
  .posts-grid { grid-template-columns: 1fr; }
  .sec-title { margin-bottom: 32px; }
}
</style>
