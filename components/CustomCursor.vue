<template>
  <div class="custom-cursor" v-if="visible">
    <div class="cursor-dot" :style="dotStyle"></div>
    <div class="cursor-ring" :style="ringStyle"></div>
  </div>
</template>

<script setup>
const visible = ref(false)
const dot = reactive({ x: 0, y: 0 })
const ring = reactive({ x: 0, y: 0 })
const isHover = ref(false)

const dotStyle = computed(() => ({
  transform: `translate(${dot.x}px, ${dot.y}px) scale(${isHover.value ? 0.5 : 1})`,
}))

const ringStyle = computed(() => ({
  transform: `translate(${ring.x}px, ${ring.y}px) scale(${isHover.value ? 1.8 : 1})`,
  borderColor: isHover.value ? 'rgba(14, 165, 233, 0.6)' : 'rgba(14, 165, 233, 0.25)',
}))

onMounted(() => {
  visible.value = !('ontouchstart' in window)
  if (!visible.value) return

  document.body.style.cursor = 'none'

  const onMove = (e) => {
    dot.x = e.clientX
    dot.y = e.clientY
    requestAnimationFrame(() => {
      ring.x += (dot.x - ring.x) * 0.15
      ring.y += (dot.y - ring.y) * 0.15
    })
  }

  const trackRing = () => {
    ring.x += (dot.x - ring.x) * 0.12
    ring.y += (dot.y - ring.y) * 0.12
    requestAnimationFrame(trackRing)
  }

  const onEnter = (e) => {
    const tag = e.target.tagName
    const clickable = e.target.closest('a, button, [role="button"], input, textarea, select, .clickable')
    isHover.value = !!clickable
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onEnter)
  trackRing()

  onUnmounted(() => {
    document.body.style.cursor = ''
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseover', onEnter)
  })
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  pointer-events: none;
  mix-blend-mode: screen;
}

.cursor-dot {
  position: fixed;
  top: -4px;
  left: -4px;
  width: 8px;
  height: 8px;
  background: rgba(14, 165, 233, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(14, 165, 233, 0.6), 0 0 4px rgba(255, 255, 255, 0.8);
  transition: transform 0.1s ease;
  will-change: transform;
}

.cursor-ring {
  position: fixed;
  top: -18px;
  left: -18px;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(14, 165, 233, 0.25);
  border-radius: 50%;
  transition: transform 0.3s ease, border-color 0.3s ease;
  will-change: transform;
}

@media (max-width: 768px) {
  .custom-cursor { display: none; }
}
</style>
