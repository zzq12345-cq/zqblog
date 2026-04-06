<template>
  <header class="navbar" :class="{ scrolled: isScrolled, 'menu-open': menuOpen }">
    <div class="container navbar-inner">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="navbar-logo" @click="menuOpen = false">
        <span class="logo-icon">Z</span>
        <span class="logo-text">Zhou Zhiqi</span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="navbar-links">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="localePath(item.path)"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          {{ $t(`nav.${item.key}`) }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="navbar-actions">
        <!-- Language Toggle -->
        <button class="action-btn lang-toggle" @click="toggleLocale" :title="locale === 'zh' ? 'English' : '中文'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span class="lang-label">{{ locale === 'zh' ? 'EN' : '中' }}</span>
        </button>

        <!-- Theme Toggle -->
        <button class="action-btn theme-toggle" @click="toggleTheme" :title="isDark ? $t('theme.light') : $t('theme.dark')">
          <svg v-if="!isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="action-btn menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span class="hamburger" :class="{ open: menuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="menuOpen" class="mobile-menu">
        <nav class="mobile-nav">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="localePath(item.path)"
            class="mobile-link"
            @click="menuOpen = false"
          >
            {{ $t(`nav.${item.key}`) }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const menuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'projects', path: '/projects' },
  { key: 'blog', path: '/blog' },
  { key: 'contact', path: '/contact' },
]

const isActive = (path) => {
  if (path === '/') return route.path === '/' || route.path === '/en'
  return route.path.includes(path)
}

const toggleLocale = () => {
  setLocale(locale.value === 'zh' ? 'en' : 'zh')
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

// 路由变化关闭菜单
watch(() => route.path, () => {
  menuOpen.value = false
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-navbar);
  padding: var(--space-4) 0;
  transition: all var(--transition-base);
}

.navbar.scrolled {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-3) 0;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--gradient-primary);
  color: white;
  font-weight: var(--font-weight-extrabold);
  font-size: var(--font-size-lg);
}

.logo-text {
  letter-spacing: -0.02em;
}

/* Desktop Links */
.navbar-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.nav-link {
  padding: var(--space-2) var(--space-4);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-bg-secondary);
}

.nav-link.active {
  color: var(--color-primary);
  background: var(--color-primary-bg);
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.action-btn:hover {
  color: var(--color-text);
  background: var(--color-bg-secondary);
}

.lang-toggle {
  width: auto;
  padding: 0 var(--space-2);
  gap: var(--space-1);
}

.lang-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

/* Hamburger */
.menu-toggle {
  display: none;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 18px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.hamburger.open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--color-border-light);
  padding: var(--space-4) var(--space-6);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.mobile-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.mobile-link:hover {
  color: var(--color-text);
  background: var(--color-bg-secondary);
}

/* Slide transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 250ms ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .logo-text {
    display: none;
  }
}
</style>
