<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-left">
        <NuxtLink :to="localePath('/')" class="footer-logo">
          <span class="footer-mark">Z</span>
          <span>Zhou Zhiqi</span>
        </NuxtLink>
        <p>{{ $t('footer.built_with') }}</p>
      </div>

      <nav class="footer-nav">
        <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/projects')">{{ $t('nav.projects') }}</NuxtLink>
        <NuxtLink :to="localePath('/blog')">{{ $t('nav.blog') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink>
      </nav>

      <div class="footer-right">
        <a href="mailto:2477664538@qq.com">Email</a>
        <a href="https://github.com/ice-kele" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>

    <div class="container">
      <div class="footer-bottom">
        <span>{{ $t('footer.copyright') }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
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
  gap: 16px;
}

.footer-right a {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-right a:hover {
  color: var(--color-text);
}

.footer-bottom {
  padding-top: 24px;
  border-top: 1px solid var(--color-border-light);
}

.footer-bottom span {
  font-size: 12px;
  color: var(--color-text-tertiary);
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
}
</style>
