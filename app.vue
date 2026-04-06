<template>
  <div id="app" :data-theme="theme">
    <TheNavbar />
    <main>
      <NuxtPage />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
const theme = useState('theme', () => 'light')

// 初始化主题
onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    theme.value = saved
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
})
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
