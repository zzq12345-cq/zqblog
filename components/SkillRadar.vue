<template>
  <div class="radar-wrapper reveal" ref="wrapperRef">
    <canvas ref="canvasRef" class="radar-canvas"></canvas>
  </div>
</template>

<script setup>
const props = defineProps({
  skills: { type: Array, default: () => [] },
  // Each skill: { name: string, level: number (0-100), color?: string }
})

const canvasRef = ref(null)
const wrapperRef = ref(null)
const animated = ref(false)
const progress = ref(0)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let animId

  const resize = () => {
    const rect = wrapperRef.value.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const size = Math.min(rect.width, 400)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = size + 'px'
    canvas.style.height = size + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  resize()

  const skills = props.skills
  const n = skills.length
  if (n < 3) return

  const draw = () => {
    const w = parseInt(canvas.style.width)
    const h = parseInt(canvas.style.height)
    const cx = w / 2
    const cy = h / 2
    const maxR = Math.min(cx, cy) * 0.7
    const angleStep = (Math.PI * 2) / n

    ctx.clearRect(0, 0, w, h)

    // Grid rings (5 levels)
    for (let ring = 1; ring <= 5; ring++) {
      const r = maxR * (ring / 5)
      ctx.beginPath()
      for (let i = 0; i <= n; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(100, 160, 220, ${0.06 + ring * 0.02})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Axis lines
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR)
      ctx.strokeStyle = 'rgba(100, 160, 220, 0.08)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Data polygon (animated)
    const p = progress.value
    ctx.beginPath()
    for (let i = 0; i <= n; i++) {
      const idx = i % n
      const angle = idx * angleStep - Math.PI / 2
      const val = (skills[idx].level / 100) * maxR * p
      const x = cx + Math.cos(angle) * val
      const y = cy + Math.sin(angle) * val
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()

    // Fill
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
    grad.addColorStop(0, 'rgba(14, 165, 233, 0.15)')
    grad.addColorStop(1, 'rgba(6, 182, 212, 0.05)')
    ctx.fillStyle = grad
    ctx.fill()

    // Stroke
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.6)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Data points + labels
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2
      const val = (skills[i].level / 100) * maxR * p
      const x = cx + Math.cos(angle) * val
      const y = cy + Math.sin(angle) * val

      // Point glow
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.15)'
      ctx.fill()

      // Point core
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.9)'
      ctx.fill()

      // Labels
      const labelR = maxR + 24
      const lx = cx + Math.cos(angle) * labelR
      const ly = cy + Math.sin(angle) * labelR

      ctx.font = '500 11px Inter, sans-serif'
      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Adjust label position to avoid overlap
      let labelX = lx
      let labelY = ly
      if (Math.abs(angle + Math.PI / 2) < 0.1) labelY -= 4
      if (Math.abs(angle - Math.PI / 2) < 0.1) labelY += 4

      ctx.fillText(skills[i].name, labelX, labelY)

      // Level percentage
      ctx.font = '700 10px JetBrains Mono, monospace'
      ctx.fillStyle = 'rgba(14, 165, 233, 0.6)'
      ctx.fillText(`${Math.round(skills[i].level * p)}%`, labelX, labelY + 14)
    }

    // Center decorative circle
    ctx.beginPath()
    ctx.arc(cx, cy, 4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(14, 165, 233, 0.3)'
    ctx.fill()
  }

  // Intersection observer for scroll-triggered animation
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated.value) {
      animated.value = true
      let start = null
      const duration = 1200
      const animate = (ts) => {
        if (!start) start = ts
        const elapsed = ts - start
        progress.value = Math.min(elapsed / duration, 1)
        // Ease out cubic
        progress.value = 1 - Math.pow(1 - progress.value, 3)
        draw()
        if (elapsed < duration) {
          animId = requestAnimationFrame(animate)
        }
      }
      animId = requestAnimationFrame(animate)
    }
  }, { threshold: 0.3 })

  if (wrapperRef.value) observer.observe(wrapperRef.value)

  window.addEventListener('resize', () => { resize(); draw() })
  onUnmounted(() => { cancelAnimationFrame(animId); observer.disconnect() })
})
</script>

<style scoped>
.radar-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  aspect-ratio: 1;
}

.radar-canvas {
  display: block;
}
</style>
