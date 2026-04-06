<template>
  <Transition name="rocket">
    <button v-show="visible" class="back-to-top clickable" @click="goTop" aria-label="Back to top">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
      <div class="rocket-glow"></div>
    </button>
  </Transition>
</template>

<script setup>
const visible = ref(false)

const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const onScroll = () => { visible.value = window.scrollY > 400 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 400;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 18, 38, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 12px;
  color: var(--color-primary-light);
  transition: all 0.25s;
  overflow: hidden;
}

.back-to-top:hover {
  transform: translateY(-4px);
  border-color: rgba(14, 165, 233, 0.4);
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.2);
  color: #fff;
}

.back-to-top:hover .rocket-glow {
  opacity: 1;
}

.rocket-glow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 16px;
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.6) 0%, transparent 80%);
  opacity: 0;
  transition: opacity 0.3s;
}

.rocket-enter-active { transition: all 0.3s ease; }
.rocket-leave-active { transition: all 0.2s ease; }
.rocket-enter-from { opacity: 0; transform: translateY(20px) scale(0.8); }
.rocket-leave-to { opacity: 0; transform: translateY(-20px) scale(0.8); }
</style>
