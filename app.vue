<template>
  <div id="app" :data-theme="theme">
    <SplashScreen />
    <CustomCursor />
    <StarField />
    <ScrollProgress />
    <TheNavbar />
    <main>
      <NuxtPage />
    </main>
    <TheFooter />
    <BackToTop />
    <EasterEgg />
    <MusicPlayer />
  </div>
</template>

<script setup>
const theme = useState('theme', () => 'dark')

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
</style>
