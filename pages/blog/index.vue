<template>
  <div class="blog-page">
    <section class="page-header">
      <div class="container">
        <h1 class="reveal">{{ $t('blog.title') }}</h1>
        <p class="reveal delay-1">{{ $t('blog.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Search -->
        <div class="blog-search reveal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('blog.search_placeholder')"
          />
        </div>

        <!-- Posts -->
        <div class="blog-grid">
          <article
            v-for="(post, index) in filteredPosts"
            :key="post.slug"
            class="blog-card reveal hover-lift"
            :class="`delay-${(index % 3) + 1}`"
          >
            <div class="blog-card-header" :style="{ background: post.gradient }">
              <span class="blog-emoji">{{ post.icon }}</span>
            </div>
            <div class="blog-card-body">
              <div class="blog-meta">
                <time>{{ post.date }}</time>
                <span class="blog-tag">{{ post.tag }}</span>
                <span class="blog-read-time">{{ post.readTime }} {{ $t('blog.min_read') }}</span>
              </div>
              <h2>{{ post.title }}</h2>
              <p>{{ post.excerpt }}</p>
              <span class="blog-read-more">
                {{ $t('blog.read_more') }}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </article>
        </div>

        <div v-if="filteredPosts.length === 0" class="no-results reveal">
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
    icon: '🚀',
    title: locale.value === 'zh' ? '你好，世界 — 博客启航' : 'Hello World — Blog Launch',
    excerpt: locale.value === 'zh'
      ? '搭建个人博客的初衷与思考 — 为什么选择 Nuxt 3、如何规划内容、设计理念分享。这是我个人博客的第一篇文章，记录从零开始搭建个人品牌主页的全过程。'
      : 'The motivation behind building this personal blog — why Nuxt 3, content planning, and design philosophy. This is the first post documenting the journey of creating a personal brand homepage from scratch.',
    date: '2026-04-06',
    tag: locale.value === 'zh' ? '随笔' : 'Essay',
    readTime: 5,
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  },
  {
    slug: 'nuxt3-best-practices',
    icon: '💚',
    title: locale.value === 'zh' ? 'Nuxt 3 全栈开发最佳实践' : 'Nuxt 3 Full-Stack Best Practices',
    excerpt: locale.value === 'zh'
      ? '从智慧思政课堂和个人博客项目中总结的 Nuxt 3 实战经验，包括目录结构规范、SSR/SSG 选择、状态管理、API 集成和部署优化等方面的心得。'
      : 'Practical Nuxt 3 experience from the Wisdom Classroom and personal blog projects, covering directory structure, SSR/SSG decisions, state management, and deployment optimization.',
    date: '2026-04-05',
    tag: 'Nuxt',
    readTime: 8,
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  },
  {
    slug: 'ai-in-education',
    icon: '🤖',
    title: locale.value === 'zh' ? 'AI 在教育领域的应用探索' : 'Exploring AI in Education',
    excerpt: locale.value === 'zh'
      ? '从智慧思政课堂项目出发，探讨大语言模型如何赋能教育 — AI 辅助课件生成、个性化教学建议、新闻资讯智能聚合等实际应用案例分析。'
      : 'Exploring how LLMs empower education through the Wisdom Classroom project — AI-assisted courseware generation, personalized teaching suggestions, and intelligent news aggregation.',
    date: '2026-04-03',
    tag: 'AI',
    readTime: 10,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  },
])

const filteredPosts = computed(() => {
  if (!searchQuery.value) return allPosts.value
  const q = searchQuery.value.toLowerCase()
  return allPosts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tag.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.page-header {
  padding: var(--space-32) 0 var(--space-16);
  text-align: center;
  background: var(--gradient-hero);
}

.page-header h1 { margin-bottom: var(--space-4); }
.page-header p { font-size: var(--font-size-lg); color: var(--color-text-secondary); }

/* Search */
.blog-search {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  max-width: 500px;
  margin: 0 auto var(--space-12);
  padding: var(--space-3) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  transition: all var(--transition-fast);
}

.blog-search:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-bg);
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
  font-size: var(--font-size-sm);
}

/* Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
}

.blog-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
}

.blog-card-header {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-emoji {
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

.blog-card-body {
  padding: var(--space-6) var(--space-8);
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}

.blog-meta time {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.blog-tag {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: var(--space-1) var(--space-2);
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
}

.blog-read-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.blog-card-body h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-3);
  transition: color var(--transition-fast);
}

.blog-card:hover h2 {
  color: var(--color-primary);
}

.blog-card-body > p {
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-4);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.no-results {
  text-align: center;
  padding: var(--space-16);
  color: var(--color-text-tertiary);
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
