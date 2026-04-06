<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <!-- Brand -->
        <div class="footer-brand">
          <NuxtLink :to="localePath('/')" class="footer-logo">
            <span class="logo-icon">Z</span>
            <span>Zhou Zhiqi</span>
          </NuxtLink>
          <p class="footer-tagline">AI & Full-Stack Developer</p>
        </div>

        <!-- Links -->
        <div class="footer-links">
          <h4>{{ $t('nav.home') }}</h4>
          <nav>
            <NuxtLink :to="localePath('/')">{{ $t('nav.home') }}</NuxtLink>
            <NuxtLink :to="localePath('/about')">{{ $t('nav.about') }}</NuxtLink>
            <NuxtLink :to="localePath('/projects')">{{ $t('nav.projects') }}</NuxtLink>
            <NuxtLink :to="localePath('/blog')">{{ $t('nav.blog') }}</NuxtLink>
            <NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink>
          </nav>
        </div>

        <!-- Contact -->
        <div class="footer-contact">
          <h4>{{ $t('contact.info_title') }}</h4>
          <nav>
            <a href="mailto:2477664538@qq.com">2477664538@qq.com</a>
            <a href="https://github.com/ice-kele" target="_blank" rel="noopener">GitHub</a>
          </nav>
        </div>
      </div>

      <!-- Bottom -->
      <div class="footer-bottom">
        <p>{{ $t('footer.copyright') }}</p>
        <p class="built-with">{{ $t('footer.built_with') }} ❤️</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const localePath = useLocalePath()
</script>

<style scoped>
.footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: var(--space-16) 0 var(--space-8);
  margin-top: auto;
}

.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-3);
}

.footer-logo .logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--gradient-primary);
  color: white;
  font-weight: var(--font-weight-extrabold);
  font-size: var(--font-size-sm);
}

.footer-tagline {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.footer-links h4,
.footer-contact h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-links nav,
.footer-contact nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer-links nav a,
.footer-contact nav a {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-links nav a:hover,
.footer-contact nav a:hover {
  color: var(--color-primary);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border);
}

.footer-bottom p {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.built-with {
  font-size: var(--font-size-xs);
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>
