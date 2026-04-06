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
          <div class="avatar-block">
            <svg class="avatar-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Background gradient -->
              <defs>
                <linearGradient id="avatar-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#0ea5e9"/>
                  <stop offset="100%" stop-color="#06b6d4"/>
                </linearGradient>
                <linearGradient id="screen-glow" x1="40" y1="52" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="rgba(56,189,248,0.3)"/>
                  <stop offset="100%" stop-color="rgba(34,211,238,0.1)"/>
                </linearGradient>
              </defs>
              <rect width="120" height="120" rx="20" fill="url(#avatar-bg)"/>
              <!-- Head -->
              <circle cx="60" cy="36" r="16" fill="white" opacity="0.95"/>
              <!-- Body -->
              <path d="M35 95 C35 72 45 62 60 62 C75 62 85 72 85 95" fill="white" opacity="0.9"/>
              <!-- Headphones -->
              <path d="M38 36 C38 22 48 14 60 14 C72 14 82 22 82 36" stroke="white" stroke-width="4" fill="none" opacity="0.5"/>
              <rect x="32" y="30" width="8" height="14" rx="4" fill="white" opacity="0.5"/>
              <rect x="80" y="30" width="8" height="14" rx="4" fill="white" opacity="0.5"/>
              <!-- Laptop glow -->
              <rect x="40" y="75" width="40" height="25" rx="3" fill="url(#screen-glow)" opacity="0.6"/>
              <!-- Code lines on laptop -->
              <rect x="45" y="80" width="18" height="2" rx="1" fill="rgba(56,189,248,0.8)"/>
              <rect x="45" y="85" width="12" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
              <rect x="45" y="90" width="24" height="2" rx="1" fill="rgba(34,211,238,0.6)"/>
            </svg>
          </div>
        </div>
        <div class="intro-text reveal delay-1">
          <h2>{{ intro.name }}</h2>
          <div class="intro-meta">
            <span class="meta-tag">{{ intro.school }}</span>
            <span class="meta-tag">{{ intro.major }}</span>
          </div>
          <p v-for="(para, i) in intro.paras" :key="i">{{ para }}</p>
        </div>
      </div>
    </section>

    <!-- Awards -->
    <section class="about-section sec-alt">
      <div class="container">
        <h2 class="reveal">{{ locale === 'zh' ? '荣誉奖项' : 'Awards & Honors' }}</h2>
        <div class="awards-grid">
          <div
            v-for="(award, i) in awards"
            :key="i"
            class="award-item glass-card reveal"
            :class="`delay-${(i % 4) + 1}`"
          >
            <div class="award-icon" :class="award.tier">{{ award.icon }}</div>
            <div class="award-body">
              <h3>{{ award.title }}</h3>
              <p>{{ award.org }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="about-section">
      <div class="container">
        <h2 class="reveal">{{ locale === 'zh' ? '技术能力' : 'Technical Skills' }}</h2>
        <div class="skills-cols">
          <div v-for="(cat, idx) in skillCategories" :key="cat.name" class="skill-col reveal" :class="`delay-${idx + 1}`">
            <h3>{{ cat.name }}</h3>
            <ul>
              <li v-for="skill in cat.skills" :key="skill">
                <span class="skill-dot"></span>
                <span>{{ skill }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="about-section sec-alt">
      <div class="container container-sm">
        <h2 class="reveal">{{ locale === 'zh' ? '经历' : 'Timeline' }}</h2>
        <div class="timeline">
          <div class="tl-axis"></div>
          <div v-for="(ev, idx) in timeline" :key="idx" class="tl-item reveal" :class="`delay-${(idx % 4) + 1}`">
            <div class="tl-node">
              <span class="tl-pulse"></span>
            </div>
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

const intro = computed(() => ({
  name: locale.value === 'zh' ? '周志琪' : 'Zhou Zhiqi',
  school: locale.value === 'zh' ? '厦门大学嘉庚学院' : 'Xiamen University Tan Kah Kee College',
  major: locale.value === 'zh' ? '软件工程' : 'Software Engineering',
  paras: locale.value === 'zh'
    ? [
        '一名热爱技术与创新的全栈开发者，专注于 AI 应用、Web 开发与嵌入式系统。',
        '从 AI 心脏健康监测到智能教育平台，从微信小程序到企业管理系统，在不同领域积累了丰富的实战经验。我相信技术的价值在于解决真实的问题。',
      ]
    : [
        'A full-stack developer passionate about technology and innovation, focused on AI applications, Web development, and embedded systems.',
        "From AI heart health monitoring to smart education platforms, from WeChat mini-programs to enterprise management — I believe technology's true value lies in solving real problems.",
      ],
}))

const awards = computed(() => locale.value === 'zh' ? [
  { icon: '🥇', tier: 'gold', title: '第十一届"东方财富杯"全国大学生金融挑战赛 一等奖', org: '全国赛' },
  { icon: '🥇', tier: 'gold', title: '全国大学生数学建模竞赛 福建赛区本科组一等奖', org: '2025 · 福建赛区' },
  { icon: '🥈', tier: 'silver', title: '全国高校商业精英挑战赛 创新创业竞赛 全国总决赛二等奖', org: '2025 · 营销模拟决策赛道' },
  { icon: '🥈', tier: 'silver', title: 'iCAN 大学生创新创业大赛 福建赛区二等奖', org: '2025 · 福建赛区' },
  { icon: '🥉', tier: 'bronze', title: '第十七届"挑战杯"福建省大学生课外学术科技作品竞赛 三等奖', org: '"人工智能+"专项赛' },
  { icon: '🥉', tier: 'bronze', title: '第八届"挑战杯"嘉庚学院大学生创业计划竞赛 铜奖', org: '厦门大学嘉庚学院' },
  { icon: '🏅', tier: 'honor', title: '优秀学生奖学金（二等 & 三等）', org: '2024-2025 学年 · 厦门大学嘉庚学院' },
  { icon: '⭐', tier: 'honor', title: '管理学院团委"优秀干事"', org: '2024-2025 学年' },
  { icon: '⭐', tier: 'honor', title: '2024级"军训优秀学员"', org: '厦门大学嘉庚学院' },
  { icon: '📖', tier: 'honor', title: '管理学院读书分享会 优秀奖', org: '厦门大学嘉庚学院' },
] : [
  { icon: '🥇', tier: 'gold', title: '11th "East Money Cup" National Finance Challenge — 1st Prize', org: 'National' },
  { icon: '🥇', tier: 'gold', title: 'National Math Modeling Contest — Fujian 1st Prize', org: '2025 · Fujian' },
  { icon: '🥈', tier: 'silver', title: 'National Business Elite Innovation & Entrepreneurship — 2nd Prize', org: '2025 · National Finals' },
  { icon: '🥈', tier: 'silver', title: 'iCAN Innovation & Entrepreneurship — Fujian 2nd Prize', org: '2025 · Fujian' },
  { icon: '🥉', tier: 'bronze', title: '17th "Challenge Cup" Fujian Academic Science — 3rd Prize', org: 'AI+ Special Track' },
  { icon: '🥉', tier: 'bronze', title: '8th "Challenge Cup" TKK Entrepreneurship Plan — Bronze', org: 'Xiamen Univ. TKK' },
  { icon: '🏅', tier: 'honor', title: 'Academic Scholarship (2nd & 3rd Class)', org: '2024-2025 · XMU TKK' },
  { icon: '⭐', tier: 'honor', title: 'Outstanding Student Cadre', org: '2024-2025' },
  { icon: '⭐', tier: 'honor', title: 'Excellent Military Training Trainee', org: 'Class of 2024' },
  { icon: '📖', tier: 'honor', title: 'Book Sharing Excellence Award', org: 'School of Management' },
])

const skillCategories = computed(() => [
  {
    name: locale.value === 'zh' ? '前端开发' : 'Frontend',
    skills: ['Vue 3 / Nuxt 3', 'HTML / CSS', 'TypeScript', locale.value === 'zh' ? '微信小程序' : 'WeChat Mini Program'],
  },
  {
    name: locale.value === 'zh' ? '后端 & AI' : 'Backend & AI',
    skills: ['Python', 'Node.js', 'AI / Machine Learning', 'Supabase / Appwrite'],
  },
  {
    name: locale.value === 'zh' ? '桌面 & 嵌入式' : 'Desktop & Embedded',
    skills: ['C++ / Qt', 'PyQt5', 'Raspberry Pi', 'Linux'],
  },
])

const timeline = computed(() => locale.value === 'zh' ? [
  { year: '2025–26', title: '多项目并行 & 竞赛获奖', desc: '推进 MindGuard、UniSmart、AI-Vibot 等项目，斩获数学建模、创新创业等多项省级/国家级奖项' },
  { year: '2025', title: 'AI 智慧思政课堂', desc: '构建 Web + Qt 桌面双端智能教育平台，集成大语言模型辅助教学' },
  { year: '2024', title: '心音智鉴项目启动', desc: 'AI 心脏健康监测系统，含树莓派嵌入式 GUI 开发' },
  { year: '2024', title: '入学厦门大学嘉庚学院', desc: '软件工程专业，加入管理学院团委，获军训优秀学员' },
] : [
  { year: '2025–26', title: 'Multi-project & Competition Awards', desc: 'MindGuard, UniSmart, AI-Vibot projects + multiple provincial/national awards' },
  { year: '2025', title: 'AI Wisdom Classroom', desc: 'Built Web + Qt desktop smart education platform with LLM integration' },
  { year: '2024', title: 'HeartSound Project', desc: 'AI heart health monitoring with Raspberry Pi embedded GUI' },
  { year: '2024', title: 'Enrolled at XMU TKK', desc: 'Software Engineering major, Student Union, Military Training Excellence' },
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

.page-hero::after {
  content: '';
  position: absolute;
  top: 20px;
  right: 15%;
  width: 300px;
  height: 200px;
  background: radial-gradient(ellipse, rgba(6, 182, 212, 0.06) 0%, transparent 70%);
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

.sec-alt {
  background: rgba(10, 17, 34, 0.4);
  backdrop-filter: blur(4px);
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
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(14, 165, 233, 0.25);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
}

.avatar-block:hover {
  transform: scale(1.05) rotate(-2deg);
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.35);
}

.avatar-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.intro-text h2 {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.intro-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.meta-tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary-light);
  padding: 4px 12px;
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: var(--radius-full);
  background: rgba(14, 165, 233, 0.06);
}

.intro-text p {
  font-size: 16px;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
}

/* Awards */
.awards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.award-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 12px;
  background: rgba(10, 18, 38, 0.5) !important;
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border) !important;
  transition: all 0.25s;
}

.award-item:hover {
  border-color: rgba(14, 165, 233, 0.2) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.06);
}

.award-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(14, 165, 233, 0.08);
}

.award-icon.gold { background: rgba(245, 158, 11, 0.1); }
.award-icon.silver { background: rgba(148, 163, 184, 0.1); }
.award-icon.bronze { background: rgba(180, 120, 60, 0.1); }

.award-body h3 {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 4px;
}

.award-body p {
  font-size: 12px;
  color: var(--color-text-tertiary);
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
  box-shadow: 0 0 8px rgba(14, 165, 233, 0.3);
  border-radius: 50%;
  flex-shrink: 0;
}

/* ===== CYBERPUNK TIMELINE ===== */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 40px;
}

/* Glowing vertical axis */
.tl-axis {
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    transparent 0%,
    rgba(14, 165, 233, 0.4) 10%,
    rgba(14, 165, 233, 0.2) 50%,
    rgba(6, 182, 212, 0.4) 90%,
    transparent 100%
  );
  box-shadow: 0 0 8px rgba(14, 165, 233, 0.15), 0 0 20px rgba(14, 165, 233, 0.05);
}

.tl-item {
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(136, 160, 200, 0.04);
  transition: all 0.3s;
}

.tl-item:last-child { border-bottom: none; }

.tl-item:hover {
  padding-left: 6px;
}

.tl-item:hover .tl-node::after {
  transform: scale(1.8);
  opacity: 0.4;
}

.tl-item:hover .tl-pulse {
  animation-duration: 1s;
}

/* Pulsing energy node */
.tl-node {
  position: absolute;
  left: -40px;
  top: 30px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tl-node::before {
  content: '';
  width: 8px;
  height: 8px;
  background: var(--color-primary-light);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.6), 0 0 20px rgba(14, 165, 233, 0.2);
  position: relative;
  z-index: 2;
}

.tl-node::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(14, 165, 233, 0.3);
  transition: all 0.3s;
}

.tl-pulse {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(14, 165, 233, 0.2);
  animation: timeline-pulse 3s ease-in-out infinite;
}

@keyframes timeline-pulse {
  0%, 100% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.5); opacity: 0.3; }
}

.tl-year {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary-light);
  font-variant-numeric: tabular-nums;
  padding-top: 2px;
  text-shadow: 0 0 12px rgba(14, 165, 233, 0.3);
}

.tl-body h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.2s;
}

.tl-item:hover .tl-body h3 {
  color: var(--color-primary-light);
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

  .awards-grid {
    grid-template-columns: 1fr;
  }

  .skills-cols {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .timeline { padding-left: 32px; }
  .tl-node { left: -32px; }

  .tl-item {
    grid-template-columns: 60px 1fr;
    gap: 12px;
  }
}
</style>
