export function useCounter(target, duration = 1500) {
  const count = ref(0)
  const el = ref(null)

  onMounted(() => {
    if (!el.value) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el.value)
  })

  function animate() {
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      count.value = Math.floor(ease * target)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return { count, el }
}
