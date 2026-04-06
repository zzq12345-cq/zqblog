<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar-inner">
      <NuxtLink :to="localePath('/')" class="logo" @click="menuOpen = false">
        <span class="logo-mark">Z</span>
        <span class="logo-name">Zhou Zhiqi</span>
      </NuxtLink>

      <nav class="nav-links">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="localePath(item.path)"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >{{ $t(`nav.${item.key}`) }}</NuxtLink>
      </nav>

      <div class="nav-actions">
        <button class="action-btn" @click="toggleLocale">
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>
        <button class="menu-btn" @click="menuOpen = !menuOpen" aria-label="Menu">
          <span :class="{ open: menuOpen }">
            <i></i><i></i>
          </span>
        </button>
      </div>
    </div>

    <Transition name="slide">
      <nav v-if="menuOpen" class="mobile-nav">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="localePath(item.path)"
          class="mobile-link"
          @click="menuOpen = false"
        >{{ $t(`nav.${item.key}`) }}</NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

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

const toggleLocale = () => setLocale(locale.value === 'zh' ? 'en' : 'zh')

onMounted(() => {
  const onScroll = () => { isScrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

watch(() => route.path, () => { menuOpen.value = false })
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-navbar);
  padding: 16px 0;
  transition: all 0.2s;
  background: rgba(5, 10, 20, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.navbar.scrolled {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--color-border-light);
  padding: 12px 0;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  font-size: 15px;
}

.logo-mark {
  width: 30px;
  height: 30px;
  background: var(--gradient-primary);
  color: #fff;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
}

/* Nav links */
.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link.active {
  color: var(--color-primary-light);
  background: rgba(14, 165, 233, 0.08);
  box-shadow: 0 0 12px rgba(14, 165, 233, 0.08), inset 0 0 0 1px rgba(14, 165, 233, 0.12);
}

/* Actions */
.nav-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
}

.action-btn:hover {
  color: var(--color-text);
  background: var(--color-bg-secondary);
}

/* Hamburger */
.menu-btn {
  display: none;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
}

.menu-btn span {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 16px;
}

.menu-btn i {
  display: block;
  height: 1.5px;
  background: var(--color-text);
  border-radius: 1px;
  transition: all 0.2s;
}

.menu-btn span.open i:first-child {
  transform: translateY(3.25px) rotate(45deg);
}

.menu-btn span.open i:last-child {
  transform: translateY(-3.25px) rotate(-45deg);
}

/* Mobile nav */
.mobile-nav {
  padding: 8px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--color-border-light);
}

.mobile-link {
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 6px;
}

.mobile-link:hover {
  color: var(--color-text);
}

.slide-enter-active, .slide-leave-active { transition: all 0.2s; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .menu-btn { display: flex; }
  .logo-name { display: none; }
}
</style>
