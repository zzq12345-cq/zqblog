<template>
  <Transition name="loading">
    <div v-if="isLoading" class="page-loading">
      <div class="loading-inner">
        <div class="loading-pulse"></div>
        <div class="loading-bars">
          <div class="bar" v-for="i in 4" :key="i" :style="{ animationDelay: `${i * 0.15}s` }"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const isLoading = ref(false)

nuxtApp.hook('page:start', () => {
  isLoading.value = true
})

nuxtApp.hook('page:finish', () => {
  setTimeout(() => {
    isLoading.value = false
  }, 200)
})
</script>

<style scoped>
.page-loading {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 10, 20, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.loading-pulse {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%);
  animation: pulse-glow 1.5s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 1; }
}

.loading-bars {
  display: flex;
  gap: 4px;
  align-items: end;
}

.bar {
  width: 3px;
  height: 20px;
  background: linear-gradient(to top, #0ea5e9, #22d3ee);
  border-radius: 3px;
  animation: bar-dance 0.8s ease-in-out infinite alternate;
}

@keyframes bar-dance {
  0% { height: 8px; opacity: 0.4; }
  100% { height: 24px; opacity: 1; }
}

/* 过渡动画 */
.loading-enter-active { transition: opacity 0.2s ease; }
.loading-leave-active { transition: opacity 0.4s ease; }
.loading-enter-from,
.loading-leave-to { opacity: 0; }
</style>
