<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-left">
        <NuxtLink :to="localePath('/')" class="footer-logo">
          <span class="footer-mark">Z</span>
          <span>Zhou Zhiqi</span>
        </NuxtLink>
        <p>{{ $t('footer.built_with') }}</p>
        <div class="footer-status">
          <span class="status-dot"></span>
          <span>{{ locale === 'zh' ? '学习中' : 'Learning & Building' }}</span>
        </div>
      </div>

      <nav class="footer-nav">
        <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/projects')">{{ $t('nav.projects') }}</NuxtLink>
        <NuxtLink :to="localePath('/blog')">{{ $t('nav.blog') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink>
      </nav>

      <div class="footer-right">
        <a href="mailto:2477664538@qq.com" class="social-link" aria-label="Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
        <a href="https://github.com/ice-kele" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        </a>
        <a href="mailto:Zzqq0326@linux.do" class="social-link" aria-label="Linux.do">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        </a>
      </div>
    </div>

    <div class="container">
      <div class="footer-bottom">
        <span>{{ $t('footer.copyright') }}</span>
        <span class="footer-quote">{{ locale === 'zh' ? '用代码解决真实问题 ✦' : 'Solving real problems with code ✦' }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: 56px 0 32px;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
}

.footer-mark {
  width: 24px;
  height: 24px;
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
}

.footer-left p {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

.footer-status {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.status-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  animation: status-pulse 2s ease-in-out infinite;
}

@keyframes status-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.footer-nav {
  display: flex;
  gap: 20px;
}

.footer-nav a {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-nav a:hover {
  color: var(--color-text);
}

.footer-right {
  display: flex;
  gap: 8px;
}

.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--color-text-secondary);
  border: 1px solid rgba(136, 160, 200, 0.08);
  background: rgba(10, 18, 38, 0.4);
  text-decoration: none;
  transition: all 0.2s;
}

.social-link:hover {
  color: var(--color-primary-light);
  border-color: rgba(14, 165, 233, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom span {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.footer-quote {
  font-style: italic;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    gap: 24px;
  }

  .footer-nav {
    flex-wrap: wrap;
    gap: 12px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
