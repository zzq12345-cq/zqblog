<template>
  <div class="blog-page">
    <section class="page-hero">
      <div class="container">
        <h1 class="reveal">{{ $t('blog.title') }}</h1>
        <p class="page-subtitle reveal delay-1">{{ $t('blog.subtitle') }}</p>
      </div>
    </section>

    <section class="blog-section">
      <div class="container">
        <div class="blog-search reveal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input v-model="searchQuery" type="text" :placeholder="$t('blog.search_placeholder')" />
        </div>

        <div class="blog-list">
          <article v-for="post in filteredPosts" :key="post.slug" class="blog-item reveal">
            <div class="blog-item-meta">
              <time>{{ post.date }}</time>
              <span class="blog-item-tag">{{ post.tag }}</span>
              <span class="blog-item-time">{{ post.readTime }} {{ $t('blog.min_read') }}</span>
              <span class="blog-item-soon">{{ locale === 'zh' ? '即将发布' : 'Coming Soon' }}</span>
            </div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.excerpt }}</p>
          </article>
        </div>

        <div v-if="filteredPosts.length === 0" class="empty-state">
          <p>{{ $t('blog.no_results') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()
useScrollReveal()

useHead({
  title: locale.value === 'zh' ? '博客 | 周志琪' : 'Blog | Zhou Zhiqi',
})

const searchQuery = ref('')

const allPosts = computed(() => [
  {
    slug: 'hello-world',
    title: locale.value === 'zh' ? '你好，世界 — 博客启航' : 'Hello World — Blog Launch',
    excerpt: locale.value === 'zh'
      ? '搭建个人博客的初衷与思考 — 为什么选择 Nuxt 3、如何规划内容、设计理念分享。'
      : 'The motivation behind this blog — why Nuxt 3, content planning, and design philosophy.',
    date: '2026-04-06', tag: locale.value === 'zh' ? '随笔' : 'Essay', readTime: 5,
  },
  {
    slug: 'nuxt3-best-practices',
    title: locale.value === 'zh' ? 'Nuxt 3 全栈开发最佳实践' : 'Nuxt 3 Full-Stack Best Practices',
    excerpt: locale.value === 'zh'
      ? '从项目结构到部署上线，分享 Nuxt 3 实战中的经验与技巧。'
      : 'From project structure to deployment — practical tips for Nuxt 3 development.',
    date: '2026-04-05', tag: 'Nuxt', readTime: 8,
  },
  {
    slug: 'ai-in-education',
    title: locale.value === 'zh' ? 'AI 在教育领域的应用探索' : 'Exploring AI in Education',
    excerpt: locale.value === 'zh'
      ? '从智慧思政课堂出发，探讨大语言模型如何赋能教育。'
      : 'How LLMs empower education — insights from the Wisdom Classroom project.',
    date: '2026-04-03', tag: 'AI', readTime: 10,
  },
])

const filteredPosts = computed(() => {
  if (!searchQuery.value) return allPosts.value
  const q = searchQuery.value.toLowerCase()
  return allPosts.value.filter(
    (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
  )
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
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
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

.blog-section {
  padding: 56px 0 96px;
}

/* Search */
.blog-search {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 400px;
  padding: 10px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 40px;
  transition: border-color 0.15s;
}

.blog-search:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.blog-search svg {
  color: var(--color-text-tertiary);
  flex-shrink: 0;
}

.blog-search input {
  flex: 1;
  border: none;
  background: none;
  color: var(--color-text);
  outline: none;
  font-size: 14px;
}

/* List */
.blog-list {
  max-width: 720px;
}

.blog-item {
  padding: 32px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.blog-item-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.blog-item-meta time {
  font-size: 13px;
  color: var(--color-text-tertiary);
  font-variant-numeric: tabular-nums;
}

.blog-item-tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.blog-item-time {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.blog-item-soon {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  background: rgba(14, 165, 233, 0.08);
  color: var(--color-primary-light);
  border-radius: 4px;
  border: 1px solid rgba(14, 165, 233, 0.15);
}

.blog-item h2 {
  font-size: 1.2rem;
  font-weight: 650;
  margin-bottom: 6px;
  transition: color 0.2s;
  letter-spacing: -0.01em;
}

.blog-item p {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.empty-state {
  text-align: center;
  padding: 64px 0;
  color: var(--color-text-tertiary);
}

@media (max-width: 768px) {
  .page-hero { padding: 120px 0 48px; }
}
</style>
