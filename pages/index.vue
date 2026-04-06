<template>
  <div class="home">
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-orbit">
        <div class="orbit-ring ring-1"></div>
        <div class="orbit-ring ring-2"></div>
        <div class="orbit-ring ring-3"></div>
      </div>
      <div class="hero-glow-center"></div>

      <div class="container hero-inner">
        <div class="hero-badge anim-in d1">
          <span class="badge-dot"></span>
          {{ $t('hero.role') }}
        </div>

        <h1 class="hero-title anim-in d2">
          <span class="typed-line">{{ greetingText }}<span class="cursor-blink" v-if="!greetingDone">|</span></span>
          <br />
          <span class="hero-name-wrap" :class="{ 'name-visible': greetingDone }">
            <span class="hero-name">{{ $t('hero.name') }}</span>
          </span>
        </h1>

        <p class="hero-desc anim-in d3">{{ $t('hero.description') }}</p>

        <div class="hero-actions anim-in d4">
          <NuxtLink :to="localePath('/projects')" class="btn-primary clickable">
            <span>{{ $t('hero.cta_projects') }}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="btn-outline clickable">{{ $t('hero.cta_contact') }}</NuxtLink>
        </div>
      </div>

      <div class="hero-scroll anim-in d5"><div class="scroll-line"></div></div>
    </section>

    <!-- ===== STATS ===== -->
    <section class="stats-bar">
      <div class="container">
        <div class="stats-row">
          <div v-for="(s, i) in statDefs" :key="s.label" class="stat-cell">
            <span class="stat-num" :ref="el => statRefs[i] = el">{{ statCounts[i] }}{{ s.suffix }}</span>
            <span class="stat-txt">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROJECTS ===== -->
    <section class="home-section">
      <div class="container">
        <div class="sec-head reveal">
          <h2>{{ $t('sections.featured_projects') }}</h2>
          <NuxtLink :to="localePath('/projects')" class="sec-link clickable">{{ $t('sections.view_all') }} →</NuxtLink>
        </div>

        <div class="project-cards">
          <article
            v-for="(p, i) in projects"
            :key="p.slug"
            class="proj-card glass-card reveal"
            :class="`delay-${i+1}`"
            :ref="el => projRefs[i] = el"
            @mousemove="onTilt($event, i)"
            @mouseleave="onTiltLeave(i)"
            :style="projStyles[i]"
          >
            <div class="tilt-glare"></div>
            <div class="proj-index">{{ p.num }}</div>
            <div class="proj-info">
              <div class="proj-top">
                <h3>{{ p.title }}</h3>
                <span class="proj-badge">{{ p.type }}</span>
              </div>
              <p>{{ p.desc }}</p>
              <div class="proj-tech">
                <span v-for="t in p.tags" :key="t">{{ t }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== TECH ===== -->
    <section class="home-section sec-alt">
      <div class="container">
        <h2 class="reveal">{{ $t('sections.tech_stack') }}</h2>
        <p class="sec-sub reveal delay-1">{{ $t('sections.tech_stack_desc') }}</p>
        <div class="tech-wrap reveal delay-2">
          <span v-for="t in techStack" :key="t" class="tech-tag glass-chip">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- ===== POSTS ===== -->
    <section class="home-section">
      <div class="container">
        <div class="sec-head reveal">
          <h2>{{ $t('sections.latest_posts') }}</h2>
          <NuxtLink :to="localePath('/blog')" class="sec-link clickable">{{ $t('sections.view_all') }} →</NuxtLink>
        </div>
        <div class="posts">
          <article v-for="(p, i) in posts" :key="p.slug" class="post-item reveal" :class="`delay-${i+1}`">
            <time>{{ p.date }}</time>
            <h3>{{ p.title }}</h3>
            <p>{{ p.excerpt }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-box glass-card reveal-scale">
          <h2>{{ locale === 'zh' ? '有合作想法？' : "Let's collaborate" }}</h2>
          <p>{{ locale === 'zh' ? '欢迎联系，一起探讨技术与创意' : "Let's discuss technology and creativity" }}</p>
          <NuxtLink :to="localePath('/contact')" class="btn-primary clickable">
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

useHead({ title: locale.value === 'zh' ? '周志琪 | AI & 全栈开发者' : 'Zhou Zhiqi | AI & Full-Stack Developer' })

// ——— 打字机 ———
const greetingRaw = computed(() => locale.value === 'zh' ? '你好，我是' : "Hi, I'm")
const { displayed: greetingText, done: greetingDone } = useTypewriter(greetingRaw.value, 100)

// ——— 计数器 ———
const statDefs = computed(() => [
  { target: 5, suffix: '+', label: locale.value === 'zh' ? '个项目' : 'Projects' },
  { target: 6, suffix: '+', label: locale.value === 'zh' ? '项技术' : 'Tech Stacks' },
  { target: 2, suffix: '+', label: locale.value === 'zh' ? '年经验' : 'Years' },
])

const statRefs = reactive([null, null, null])
const statCounts = reactive([0, 0, 0])
const statAnimated = reactive([false, false, false])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const idx = Array.from(statRefs).findIndex(el => el === entry.target)
        if (idx >= 0 && !statAnimated[idx]) {
          statAnimated[idx] = true
          animateCount(idx, statDefs.value[idx].target)
        }
      })
    },
    { threshold: 0.5 }
  )

  nextTick(() => {
    statRefs.forEach(el => { if (el) observer.observe(el) })
  })
})

function animateCount(idx, target) {
  const start = performance.now()
  const duration = 1200
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    statCounts[idx] = Math.floor(ease * target)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// ——— 3D 倾斜 ———
const projRefs = reactive([null, null, null])
const projStyles = reactive([{}, {}, {}])

function onTilt(e, i) {
  const el = projRefs[i]
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  const rX = (0.5 - y) * 12
  const rY = (x - 0.5) * 12

  projStyles[i] = {
    transform: `perspective(800px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`,
    transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
  }

  // 光泽
  const glare = el.querySelector('.tilt-glare')
  if (glare) {
    const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90
    glare.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.08) 0%, transparent 60%)`
    glare.style.opacity = Math.max(x, y) * 0.6
  }
}

function onTiltLeave(i) {
  projStyles[i] = {
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.6s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
  }
  const el = projRefs[i]
  if (el) {
    const glare = el.querySelector('.tilt-glare')
    if (glare) glare.style.opacity = 0
  }
}

// ——— Data ———
const projects = computed(() => [
  { slug: 'heartsound', num: '01', title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound', desc: locale.value === 'zh' ? '基于树莓派的 AI 心脏健康监测系统，深度学习心音分析与嵌入式 GUI。' : 'AI heart health monitoring on Raspberry Pi with deep learning.', type: 'AI + HW', tags: ['Python', 'AI/ML', 'PyQt5', 'RPi'] },
  { slug: 'wisdom', num: '02', title: locale.value === 'zh' ? 'AI 智慧思政课堂' : 'AI Wisdom Classroom', desc: locale.value === 'zh' ? 'Web + Qt 桌面双端智能教育平台，AI 辅助教学与课件生成。' : 'Smart education platform with AI-assisted teaching.', type: 'Full Stack', tags: ['Nuxt 3', 'C++/Qt', 'Supabase'] },
  { slug: 'mindguard', num: '03', title: 'MindGuard', desc: locale.value === 'zh' ? '高校心理健康微信小程序，AI 驱动情绪打卡与社区守护。' : 'Campus mental health mini-program with AI support.', type: locale.value === 'zh' ? '小程序' : 'Mini App', tags: ['WeChat', 'Dify AI', 'Cloud'] },
])

const techStack = ['Vue / Nuxt', 'Python', 'C++ / Qt', 'TypeScript', 'AI / ML', 'Node.js', 'Raspberry Pi', 'Docker', 'Git', 'Linux', 'Supabase', 'Appwrite']

const posts = computed(() => [
  { slug: 'hello', title: locale.value === 'zh' ? '你好，世界 — 博客启航' : 'Hello World — Blog Launch', excerpt: locale.value === 'zh' ? '搭建博客的初衷与设计思路。' : 'Motivation and design philosophy.', date: '2026-04-06' },
  { slug: 'nuxt3', title: locale.value === 'zh' ? 'Nuxt 3 全栈最佳实践' : 'Nuxt 3 Best Practices', excerpt: locale.value === 'zh' ? '从项目结构到部署。' : 'From structure to deployment.', date: '2026-04-05' },
  { slug: 'ai-edu', title: locale.value === 'zh' ? 'AI 赋能教育探索' : 'AI in Education', excerpt: locale.value === 'zh' ? '探讨 AI 教育应用。' : 'How AI empowers education.', date: '2026-04-03' },
])
</script>

<style scoped>
/* === HERO === */
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; }

.hero-orbit { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
.orbit-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(14, 165, 233, 0.06); top: 50%; left: 50%; transform: translate(-50%, -50%); animation: orbit-spin 60s linear infinite; }
.ring-1 { width: 500px; height: 500px; }
.ring-2 { width: 700px; height: 700px; border-color: rgba(6, 182, 212, 0.04); animation-duration: 80s; animation-direction: reverse; }
.ring-3 { width: 900px; height: 900px; border-color: rgba(14, 165, 233, 0.03); animation-duration: 100s; }
@keyframes orbit-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }

.hero-glow-center { position: absolute; top: 45%; left: 35%; width: 600px; height: 400px; background: radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.04) 40%, transparent 70%); transform: translate(-50%, -50%); pointer-events: none; animation: glow-pulse 8s ease-in-out infinite; }
@keyframes glow-pulse { 0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); } }

.anim-in { opacity: 0; transform: translateY(30px); animation: anim-up 0.8s ease forwards; }
.d1 { animation-delay: 0.3s; } .d2 { animation-delay: 0.5s; } .d3 { animation-delay: 0.7s; } .d4 { animation-delay: 0.9s; } .d5 { animation-delay: 1.3s; }
@keyframes anim-up { to { opacity: 1; transform: translateY(0); } }

.hero-inner { max-width: 760px; }

.hero-badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; font-size: 13px; font-weight: 600; color: var(--color-primary-light); background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(14, 165, 233, 0.15); border-radius: var(--radius-full); margin-bottom: 32px; letter-spacing: 0.04em; text-transform: uppercase; }
.badge-dot { width: 6px; height: 6px; background: var(--color-primary-light); border-radius: 50%; box-shadow: 0 0 10px var(--color-primary-light); animation: dot-blink 2s ease-in-out infinite; }
@keyframes dot-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.hero-title { font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.04em; margin-bottom: 28px; }

.typed-line { display: inline; }
.cursor-blink { display: inline-block; animation: blink 0.8s step-end infinite; color: var(--color-primary-light); font-weight: 300; }
@keyframes blink { 50% { opacity: 0; } }

.hero-name-wrap { display: inline-block; opacity: 0; transform: translateY(15px); transition: all 0.6s ease; }
.hero-name-wrap.name-visible { opacity: 1; transform: translateY(0); }
.hero-name { background: var(--gradient-text); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; position: relative; }
.hero-name::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 3px; background: var(--gradient-text); border-radius: 2px; opacity: 0.5; }

.hero-desc { font-size: 18px; line-height: 1.75; color: var(--color-text-secondary); max-width: 520px; margin-bottom: 44px; }
.hero-actions { display: flex; gap: 14px; }

.btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; background: var(--gradient-primary); color: #fff; font-size: 14px; font-weight: 600; border-radius: 12px; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 24px rgba(14, 165, 233, 0.25); }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(14, 165, 233, 0.35); color: #fff; }

.btn-outline { display: inline-flex; align-items: center; padding: 14px 30px; font-size: 14px; font-weight: 600; color: var(--color-text-secondary); border: 1px solid var(--color-border); border-radius: 12px; text-decoration: none; transition: all 0.25s; background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(4px); }
.btn-outline:hover { color: var(--color-text); border-color: var(--color-text-tertiary); transform: translateY(-2px); }

.hero-scroll { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); }
.scroll-line { width: 1px; height: 48px; background: linear-gradient(to bottom, var(--color-primary-light), transparent); animation: scroll-fade 2s ease-in-out infinite; }
@keyframes scroll-fade { 0%, 100% { opacity: 0.8; height: 48px; } 50% { opacity: 0.2; height: 32px; } }

/* === STATS === */
.stats-bar { padding: 40px 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); background: rgba(5, 10, 20, 0.5); backdrop-filter: blur(8px); }
.stats-row { display: flex; gap: 56px; }
.stat-num { display: block; font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; background: var(--gradient-text); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.stat-txt { font-size: 12px; color: var(--color-text-tertiary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; display: block; }

/* === GLASS CARDS === */
.glass-card { background: rgba(10, 18, 38, 0.6) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(136, 160, 200, 0.1) !important; position: relative; overflow: hidden; }
.tilt-glare { position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 2; }

.glass-chip { background: rgba(10, 18, 38, 0.5) !important; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }

/* === SECTIONS === */
.home-section { padding: 80px 0; border-bottom: 1px solid var(--color-border); }
.home-section:last-of-type { border-bottom: none; }
.sec-alt { background: rgba(10, 17, 34, 0.4); backdrop-filter: blur(4px); }
.sec-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 36px; }
.sec-head h2, .home-section > .container > h2 { font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em; }
.sec-sub { font-size: 15px; color: var(--color-text-secondary); margin: 8px 0 28px; }
.sec-link { font-size: 14px; font-weight: 500; color: var(--color-text-tertiary); text-decoration: none; transition: color 0.2s; }
.sec-link:hover { color: var(--color-primary-light); }

/* PROJECTS */
.project-cards { display: flex; flex-direction: column; gap: 12px; }
.proj-card { display: grid; grid-template-columns: 72px 1fr; border-radius: 14px; will-change: transform; }
.proj-card:hover { border-color: rgba(14, 165, 233, 0.2) !important; box-shadow: 0 0 40px rgba(14, 165, 233, 0.05); }
.proj-index { display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 800; color: var(--color-text-tertiary); opacity: 0.25; border-right: 1px solid var(--color-border); font-variant-numeric: tabular-nums; }
.proj-info { padding: 24px 28px; position: relative; z-index: 1; }
.proj-top { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-bottom: 8px; }
.proj-top h3 { font-size: 1.1rem; font-weight: 650; }
.proj-badge { font-size: 11px; font-weight: 600; color: var(--color-primary-light); text-transform: uppercase; letter-spacing: 0.06em; flex-shrink: 0; padding: 2px 10px; border: 1px solid rgba(14, 165, 233, 0.15); border-radius: var(--radius-full); }
.proj-info > p { font-size: 14px; line-height: 1.65; color: var(--color-text-secondary); margin-bottom: 14px; }
.proj-tech { display: flex; flex-wrap: wrap; gap: 6px; }
.proj-tech span { font-size: 11px; font-weight: 600; padding: 3px 10px; border: 1px solid var(--color-border); border-radius: 6px; color: var(--color-text-tertiary); }

/* TECH */
.tech-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
.tech-tag { padding: 10px 18px; font-size: 14px; font-weight: 500; color: var(--color-text-secondary); border: 1px solid var(--color-border); border-radius: 8px; transition: all 0.25s; }
.tech-tag:hover { color: var(--color-primary-light); border-color: rgba(14, 165, 233, 0.25); box-shadow: 0 0 20px rgba(14, 165, 233, 0.06); transform: translateY(-2px); }

/* POSTS */
.posts { display: flex; flex-direction: column; }
.post-item { padding: 24px 0; border-bottom: 1px solid var(--color-border); cursor: pointer; transition: padding-left 0.2s; }
.post-item:last-child { border-bottom: none; }
.post-item:hover { padding-left: 8px; }
.post-item:hover h3 { color: var(--color-primary-light); }
.post-item time { font-size: 13px; color: var(--color-text-tertiary); font-variant-numeric: tabular-nums; }
.post-item h3 { font-size: 1.05rem; font-weight: 600; margin: 6px 0 4px; transition: color 0.2s; }
.post-item p { font-size: 14px; color: var(--color-text-tertiary); }

/* CTA */
.cta-section { padding: 80px 0 120px; }
.cta-box { text-align: center; padding: 72px 40px; border-radius: 20px; }
.cta-box::before { content: ''; position: absolute; top: -80px; left: 50%; transform: translateX(-50%); width: 300px; height: 200px; background: radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%); pointer-events: none; }
.cta-box h2 { font-size: 2rem; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.03em; position: relative; }
.cta-box p { font-size: 16px; color: var(--color-text-secondary); margin-bottom: 28px; position: relative; }
.cta-box .btn-primary { position: relative; }

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero-title { font-size: clamp(2.2rem, 8vw, 3rem); }
  .hero-actions { flex-direction: column; width: fit-content; }
  .hero-scroll, .orbit-ring { display: none; }
  .stats-row { flex-wrap: wrap; gap: 24px; }
  .proj-card { grid-template-columns: 1fr; }
  .proj-index { display: none; }
  .sec-head { flex-direction: column; gap: 8px; margin-bottom: 28px; }
}
</style>
