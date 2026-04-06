<template>
  <div id="app" :data-theme="theme">
    <SplashScreen />
    <CustomCursor />
    <StarField ref="starfieldRef" />
    <TheNavbar />
    <main>
      <NuxtPage />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
const theme = useState('theme', () => 'dark')
const starfieldRef = ref(null)
const router = useRouter()

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) theme.value = saved
})
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

main { flex: 1; }

/* 全局隐藏默认光标（桌面端） */
@media (hover: hover) {
  *, *::before, *::after {
    cursor: none !important;
  }
}
</style>
