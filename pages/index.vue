<template>
  <div class="home">
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-orb"></div>
      <div class="hero-orb orb-2"></div>

      <div class="container hero-inner">
        <div class="hero-text">
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

        <!-- 3D Cube -->
        <div class="hero-visual anim-in d4">
          <div class="cube-wrapper">
            <div class="cube-glow"></div>
            <div class="cube" :style="cubeStyle">
              <div class="cube-face front"><span>Vue</span></div>
              <div class="cube-face back"><span>AI</span></div>
              <div class="cube-face right"><span>C++</span></div>
              <div class="cube-face left"><span>Py</span></div>
              <div class="cube-face top"><span>JS</span></div>
              <div class="cube-face bottom"><span>Qt</span></div>
            </div>
            <div class="cube-reflection"></div>
          </div>
          <!-- Orbit rings -->
          <div class="orbit orbit-1"></div>
          <div class="orbit orbit-2"></div>
          <!-- Floating badges -->
          <div class="float-badge badge-1 anim-in d5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>{{ locale === 'zh' ? '全栈' : 'Full Stack' }}</span>
          </div>
          <div class="float-badge badge-2 anim-in d6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>AI/ML</span>
          </div>
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
            <!-- Project cover -->
            <div class="card-cover" :style="{ background: p.gradient }">
              <div class="card-cover-icon" v-html="p.icon"></div>
              <div class="card-cover-pattern"></div>
            </div>
            <div class="card-content">
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
              <span v-for="t in techStackWithIcons" :key="t.name + n" class="tech-pill">
                <span class="tech-icon" v-html="t.icon"></span>
                {{ t.name }}
              </span>
            </span>
          </div>
        </div>
        <div class="tech-track reverse">
          <div class="tech-slide">
            <span v-for="n in 2" :key="n" class="tech-set">
              <span v-for="t in techStack2WithIcons" :key="t.name + n" class="tech-pill">
                <span class="tech-icon" v-html="t.icon"></span>
                {{ t.name }}
              </span>
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
          <article v-for="(p, i) in posts" :key="p.slug" class="post-card glass-surface reveal" :class="`delay-${i + 1}`">
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
          <div class="cta-border-glow"></div>
          <div class="cta-orb"></div>
          <div class="cta-orb cta-orb-2"></div>
          <div class="cta-content">
            <div class="cta-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h2>{{ locale === 'zh' ? '一起创造些有意思的东西？' : "Let's build something amazing" }}</h2>
            <p class="cta-sub">{{ locale === 'zh' ? '无论是项目合作、技术交流还是随便聊聊' : 'Whether collaboration, tech discussion, or just a chat' }}</p>
            <NuxtLink :to="localePath('/contact')" class="btn-main clickable">
              {{ $t('hero.cta_contact') }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </NuxtLink>
          </div>
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

// SVG icons for projects
const projectIcons = {
  heartsound: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 32h8l4-12 6 24 6-18 4 6h20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>',
  classroom: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="14" width="32" height="24" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M14 42h20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="48" cy="22" r="8" stroke="currentColor" stroke-width="2"/><path d="M44 22l3 2 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mindguard: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 56s-20-12-20-28a12 12 0 0 1 20-8.9A12 12 0 0 1 52 28c0 16-20 28-20 28z" stroke="currentColor" stroke-width="2.5"/><path d="M26 28l4 4 8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}

const projects = computed(() => [
  { slug: 'heartsound', title: locale.value === 'zh' ? '心音智鉴' : 'HeartSound', desc: locale.value === 'zh' ? 'AI 心脏健康监测 · 树莓派 + 深度学习' : 'AI heart health · RPi + Deep Learning', type: 'AI + HW', tags: ['Python', 'AI/ML', 'RPi'], gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(14, 165, 233, 0.1) 100%)', icon: projectIcons.heartsound },
  { slug: 'wisdom-classroom', title: locale.value === 'zh' ? 'AI 智慧课堂' : 'AI Classroom', desc: locale.value === 'zh' ? '智能教育平台 · Web + Qt 双端' : 'Smart education · Web + Qt', type: 'Full Stack', tags: ['Nuxt 3', 'C++/Qt'], gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)', icon: projectIcons.classroom },
  { slug: 'mindguard', title: 'MindGuard', desc: locale.value === 'zh' ? '心理健康小程序 · AI 情绪打卡' : 'Mental health · AI mood tracking', type: locale.value === 'zh' ? '小程序' : 'Mini App', tags: ['WeChat', 'Dify AI'], gradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(6, 182, 212, 0.15) 100%)', icon: projectIcons.mindguard },
])

// Tech icons (simplified inline SVGs)
const techIcons = {
  'Vue.js': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h3.5L12 14.5 18.5 3H22L12 21 2 3z"/></svg>',
  'Nuxt 3': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 3L24 21H17l-3.5-6L10 21H3l10.5-18z"/></svg>',
  'TypeScript': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm10.5 11v-1.5h-3V10h-1.5v2.5h-1.5V14h1.5v3.5c0 .8.7 1.5 1.5 1.5h2v-1.5h-1.5a.5.5 0 01-.5-.5V14h2z"/></svg>',
  'Python': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-1.7 0-3.2.2-4.4.6C5.5 3.3 5 4.5 5 6v2h7v1H5c-1.7 0-3 1-3.4 2.8-.5 2-.5 3.3 0 5.4C2 19 3.3 20 5 20h2v-2.5C7 15.5 8.5 14 10.5 14h5c1.4 0 2.5-1.1 2.5-2.5V6c0-1.4-1.3-2.5-2.8-3C14 2.4 13 2 12 2zm-2.5 2.5a1 1 0 110 2 1 1 0 010-2z"/></svg>',
  'C++': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm-1 15.5L5 14V10l6 3.5v4zm1-5.5L6 8.5 12 5l6 3.5L12 12zm5 2l-4 2.5v-4L17 10v4z"/></svg>',
  'Qt Framework': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-5l-2-3h1.5l1.3 2 1.3-2h1.5l-2 3 2 3h-1.5L12 16l-1.3 2H9.2l2-3z"/></svg>',
  'TensorFlow': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 6v6l4 2.3V20l4 2.3V10l4 2.3V6L12 2z"/></svg>',
  'Node.js': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-9 5v10l9 5 9-5V7l-9-5zm0 2.2l6.9 3.8L12 11.8 5.1 8l6.9-3.8z"/></svg>',
  'Docker': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 4h3v3h-3V4zm-4 0h3v3H9V4zM5 4h3v3H5V4zm4 4h3v3H9V8zM5 8h3v3H5V8zm-4 4h3v3H1v-3zm4 0h3v3H5v-3zm4 0h3v3H9v-3zm4 0h3v3h-3v-3zm5-1c-.5-2-2-3.5-4-3.5V7c1.7 0 3 .5 4 1.5V7c0-1-1-3-4-3v-.5c3.5.5 6 3 6 6 0 .5 0 1-.1 1.5H22c-1 3-4 5-7 5-4 0-8-3-10-5h1z"/></svg>',
  'Linux': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 5.5 5 5.5 8c0 2.5 1 4 1 6 0 1-2 3-2 4.5S6 21 8 21c1 0 2-1 4-1s3 1 4 1c2 0 3.5-1 3.5-2.5s-2-3.5-2-4.5c0-2 1-3.5 1-6C18.5 5 16 2 12 2z"/></svg>',
  'Supabase': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21.5c-.4.6-1.4.2-1.4-.5V14h8.3c1 0 1.5-1.2.8-1.9L13.5 2.5c-.4-.6-1.4-.2-1.4.5V10H3.8c-1 0-1.5 1.2-.8 1.9l7.8 9.6z"/></svg>',
  'Appwrite': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2l8 4v8l-8 4-8-4V8l8-4z"/></svg>',
  'Raspberry Pi': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 5 5 5 9c0 2 1 4 2 5v5c0 1.7 2.3 3 5 3s5-1.3 5-3v-5c1-1 2-3 2-5 0-4-3-7-7-7zm-2 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>',
  'Git': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 11.3L12.7.5c-.7-.7-1.7-.7-2.4 0l-2.2 2.2 2.8 2.8c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.7 2.7c.5-.2 1.2-.1 1.6.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.5-.5-.6-1.2-.3-1.7L12 8.1v5.4c.1.1.3.2.4.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.3.6-.4V7.8c-.2-.1-.4-.2-.6-.4-.5-.5-.5-1.2-.3-1.7L7.3 3 .5 9.8c-.7.7-.7 1.7 0 2.4l10.8 10.8c.7.7 1.7.7 2.4 0l10.8-10.8c.6-.6.6-1.7-.1-2.4z"/></svg>',
}

const techStackWithIcons = [
  { name: 'Vue.js', icon: techIcons['Vue.js'] },
  { name: 'Nuxt 3', icon: techIcons['Nuxt 3'] },
  { name: 'TypeScript', icon: techIcons['TypeScript'] },
  { name: 'Python', icon: techIcons['Python'] },
  { name: 'C++', icon: techIcons['C++'] },
  { name: 'Qt Framework', icon: techIcons['Qt Framework'] },
  { name: 'TensorFlow', icon: techIcons['TensorFlow'] },
]

const techStack2WithIcons = [
  { name: 'Node.js', icon: techIcons['Node.js'] },
  { name: 'Docker', icon: techIcons['Docker'] },
  { name: 'Linux', icon: techIcons['Linux'] },
  { name: 'Supabase', icon: techIcons['Supabase'] },
  { name: 'Appwrite', icon: techIcons['Appwrite'] },
  { name: 'Raspberry Pi', icon: techIcons['Raspberry Pi'] },
  { name: 'Git', icon: techIcons['Git'] },
]

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

// 3D Cube rotation
const cubeRotation = reactive({ x: -20, y: 45 })
let cubeAnimId = null

const cubeStyle = computed(() => ({
  transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
}))

onMounted(() => {
  let start = performance.now()
  const animate = (now) => {
    const elapsed = (now - start) / 1000
    cubeRotation.x = -20 + Math.sin(elapsed * 0.3) * 8
    cubeRotation.y = 45 + elapsed * 15
    cubeAnimId = requestAnimationFrame(animate)
  }
  cubeAnimId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (cubeAnimId) cancelAnimationFrame(cubeAnimId)
})
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

/* Two-column hero layout */
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  max-width: var(--container-xl);
}

.hero-text { max-width: 560px; }

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
.hero-headline { margin-bottom: 28px; }
.hero-headline .line { overflow: hidden; }

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

.name-gradient.show { opacity: 1; transform: translateY(0); }

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

/* ===== 3D CUBE VISUAL ===== */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 360px;
}

.cube-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  perspective: 600px;
}

.cube-glow {
  position: absolute;
  inset: -40px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%);
  border-radius: 50%;
  animation: cube-glow-pulse 4s ease-in-out infinite;
}

@keyframes cube-glow-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
}

.cube-face {
  position: absolute;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(14, 165, 233, 0.2);
  background: rgba(5, 10, 20, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  font-size: 28px;
  font-weight: 800;
  color: var(--color-primary-light);
  letter-spacing: -0.02em;
}

.cube-face.front  { transform: rotateY(0deg) translateZ(80px); }
.cube-face.back   { transform: rotateY(180deg) translateZ(80px); }
.cube-face.right  { transform: rotateY(90deg) translateZ(80px); }
.cube-face.left   { transform: rotateY(-90deg) translateZ(80px); }
.cube-face.top    { transform: rotateX(90deg) translateZ(80px); }
.cube-face.bottom { transform: rotateX(-90deg) translateZ(80px); }

.cube-reflection {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 40px;
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
  filter: blur(6px);
}

/* Orbit rings */
.orbit {
  position: absolute;
  border: 1px solid rgba(14, 165, 233, 0.08);
  border-radius: 50%;
  animation: orbit-spin 20s linear infinite;
}

.orbit-1 {
  width: 300px; height: 300px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotateX(70deg);
}

.orbit-2 {
  width: 260px; height: 260px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotateX(70deg) rotateZ(60deg);
  animation-duration: 25s;
  animation-direction: reverse;
  border-color: rgba(6, 182, 212, 0.06);
}

@keyframes orbit-spin {
  from { transform: translate(-50%, -50%) rotateX(70deg) rotateZ(0deg); }
  to { transform: translate(-50%, -50%) rotateX(70deg) rotateZ(360deg); }
}

/* Floating badges */
.float-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(5, 10, 20, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(14, 165, 233, 0.15);
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.float-badge svg { color: var(--color-primary-light); }

.badge-1 {
  bottom: 20%;
  left: 5%;
  animation: float-badge 6s ease-in-out infinite;
}

.badge-2 {
  top: 15%;
  right: 5%;
  animation: float-badge 7s ease-in-out infinite;
  animation-delay: -3s;
}

@keyframes float-badge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

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
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99);
  will-change: transform;
}

.card-1 { grid-column: span 2; }
.card-2 { grid-column: span 1; }
.card-3 { grid-column: span 3; }

.bento-card:hover {
  border-color: rgba(14, 165, 233, 0.2);
  box-shadow: 0 0 60px rgba(14, 165, 233, 0.06);
}

.bento-card:hover .card-arrow { transform: translate(4px, -4px); color: var(--color-primary-light); }

.card-glare { position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 1; }

/* Project cover area */
.card-cover {
  position: relative;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-1 .card-cover { height: 180px; }
.card-3 .card-cover { height: 120px; }

.card-cover-icon {
  position: relative;
  z-index: 2;
  width: 56px;
  height: 56px;
  color: var(--color-primary-light);
  opacity: 0.7;
  transition: all 0.4s;
}

.card-cover-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.bento-card:hover .card-cover-icon {
  opacity: 1;
  transform: scale(1.1);
}

.card-cover-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(136, 160, 200, 0.06) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.card-content { position: relative; z-index: 2; flex: 1; padding: 24px 28px 28px; }

.card-type {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
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
  display: inline-flex;
  align-items: center;
  gap: 10px;
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

.tech-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-primary-light);
  opacity: 0.7;
  display: flex;
}

.tech-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.tech-pill:hover {
  color: var(--color-primary-light);
  border-color: rgba(14, 165, 233, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.08);
}

.tech-pill:hover .tech-icon { opacity: 1; }

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

.cta-border-glow {
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  padding: 1px;
  background: conic-gradient(from 0deg, transparent 0%, rgba(14, 165, 233, 0.3) 25%, transparent 50%, rgba(6, 182, 212, 0.2) 75%, transparent 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: border-rotate 6s linear infinite;
  pointer-events: none;
}

@keyframes border-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cta-orb {
  position: absolute;
  width: 400px; height: 300px;
  top: -100px; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.cta-orb-2 {
  width: 300px; height: 200px;
  top: auto; bottom: -80px;
  background: radial-gradient(ellipse, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
}

.cta-content { position: relative; z-index: 1; }

.cta-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 165, 233, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.15);
  border-radius: 14px;
  color: var(--color-primary-light);
}

.cta-card h2 {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 12px;
  letter-spacing: -0.03em;
}

.cta-sub {
  font-size: 15px;
  color: var(--color-text-tertiary);
  margin-bottom: 28px;
}

.cta-card .btn-main { position: relative; }

/* ANIM */
.anim-in { opacity: 0; transform: translateY(28px); animation: up 0.7s ease forwards; }
.d1 { animation-delay: 0.15s; } .d2 { animation-delay: 0.3s; } .d3 { animation-delay: 0.45s; }
.d4 { animation-delay: 0.6s; } .d5 { animation-delay: 0.75s; } .d6 { animation-delay: 1.2s; }
@keyframes up { to { opacity: 1; transform: translateY(0); } }

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero { padding-bottom: 40px; min-height: auto; }
  .hero-inner { grid-template-columns: 1fr; gap: 20px; text-align: center; }
  .hero-text { align-items: center; }
  .hero-visual { min-height: 220px; order: -1; }
  .cube-wrapper { width: 100px; height: 100px; }
  .cube-face { width: 100px; height: 100px; font-size: 18px; }
  .cube-face.front  { transform: rotateY(0deg) translateZ(50px); }
  .cube-face.back   { transform: rotateY(180deg) translateZ(50px); }
  .cube-face.right  { transform: rotateY(90deg) translateZ(50px); }
  .cube-face.left   { transform: rotateY(-90deg) translateZ(50px); }
  .cube-face.top    { transform: rotateX(90deg) translateZ(50px); }
  .cube-face.bottom { transform: rotateX(-90deg) translateZ(50px); }
  .orbit-1 { width: 180px; height: 180px; }
  .orbit-2 { width: 150px; height: 150px; }
  .float-badge { display: none; }
  .hero-btns { flex-direction: column; width: 100%; align-items: center; }
  .hero-btns .btn-main, .hero-btns .btn-ghost { width: 100%; max-width: 260px; justify-content: center; }
  .hero-orb { width: 250px; height: 250px; right: -60px; top: -40px; }
  .hero-orb.orb-2 { display: none; }
  .scroll-hint { display: none; }
  .hero-label { font-size: 11px; }
  .hero-sub { font-size: 14px; text-align: center; }

  .marquee-bar { padding: 10px 0; }
  .m-item { font-size: 12px; gap: 3px; }

  .sec-label { font-size: 11px; }
  .sec-title { font-size: 1.3rem; margin-bottom: 24px; }

  .bento-grid { grid-template-columns: 1fr; }
  .card-1, .card-2, .card-3 { grid-column: span 1; }
  .card-cover { height: 100px !important; }
  .card-body { padding: 16px 20px 20px; }

  .tech-section { padding: 48px 0; }
  .tech-grid { gap: 6px; }
  .tech-item { padding: 8px 14px; font-size: 12px; }
  .tech-icon { width: 14px; height: 14px; }

  .posts-grid { grid-template-columns: 1fr; }

  .cta-section { padding: 32px 0 80px; }
  .cta-card { padding: 48px 24px; border-radius: 16px; }
  .cta-card h2 { font-size: 1.3rem; }
  .cta-sub { font-size: 13px; }
}
</style>
