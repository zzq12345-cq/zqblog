<template>
  <div class="progress-bar" :style="{ width: progress + '%' }" :class="{ visible: progress > 0 && progress < 100 }"></div>
</template>

<script setup>
const progress = ref(0)
const route = useRoute()

const update = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', update))
})

watch(() => route.path, () => { progress.value = 0 })
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--gradient-primary);
  z-index: 9999;
  transition: width 0.1s linear;
  opacity: 0;
  box-shadow: 0 0 8px rgba(14, 165, 233, 0.4);
}

.progress-bar.visible {
  opacity: 1;
}
</style>
