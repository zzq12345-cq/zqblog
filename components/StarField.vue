<template>
  <div class="starfield-wrapper">
    <div ref="bgRef" class="space-bg"></div>
    <canvas ref="canvasRef" class="starfield-canvas" @mousemove="onMouse" @mouseleave="onLeave"></canvas>
  </div>
</template>

<script setup>
const canvasRef = ref(null)
const bgRef = ref(null)
const mouse = reactive({ x: 0, y: 0, active: false })

const onMouse = (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
  mouse.active = true
}
const onLeave = () => { mouse.active = false }

const mousePixel = reactive({ x: 0, y: 0, prevX: 0, prevY: 0 })
const cometTrail = []

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, animId

  // Comet trail on mouse move
  window.addEventListener('mousemove', (e) => {
    mousePixel.prevX = mousePixel.x
    mousePixel.prevY = mousePixel.y
    mousePixel.x = e.clientX
    mousePixel.y = e.clientY
    const dx = mousePixel.x - mousePixel.prevX
    const dy = mousePixel.y - mousePixel.prevY
    const speed = Math.sqrt(dx * dx + dy * dy)
    if (speed > 3 && mouse.active) {
      const count = Math.min(Math.floor(speed / 8), 4)
      for (let i = 0; i < count; i++) {
        cometTrail.push({
          x: mousePixel.x + (Math.random() - 0.5) * 4,
          y: mousePixel.y + (Math.random() - 0.5) * 4,
          r: Math.random() * 2 + 1,
          life: 1,
          decay: Math.random() * 0.02 + 0.015,
          vx: dx * 0.05 * (Math.random() * 0.5 + 0.5),
          vy: dy * 0.05 * (Math.random() * 0.5 + 0.5),
        })
      }
    }
  })

  const shootingStars = []
  const twinklingStars = []

  const resize = () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }

  const starColors = [
    [255, 255, 255],
    [200, 220, 255],
    [180, 210, 255],
    [255, 240, 220],
    [160, 200, 255],
    [255, 220, 180],
    [120, 200, 255],
    [200, 180, 255],
  ]

  // Twinkling overlay stars (on top of photo bg)
  const initTwinklingStars = () => {
    twinklingStars.length = 0
    // Bright twinkling stars scattered on top
    for (let i = 0; i < 80; i++) {
      twinklingStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.8,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        opacity: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        parallax: Math.random() * 0.6 + 0.4,
      })
    }
  }

  // Shooting stars
  const spawnShootingStar = () => {
    const dir = Math.random() > 0.5 ? 1 : -1
    shootingStars.push({
      x: dir > 0 ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6,
      y: Math.random() * h * 0.5,
      len: Math.random() * 140 + 70,
      speed: Math.random() * 9 + 5,
      angle: dir > 0 ? Math.PI / 5 + Math.random() * 0.4 : Math.PI - Math.PI / 5 - Math.random() * 0.4,
      life: 1,
      color: Math.random() > 0.7 ? [200, 220, 255] : [255, 240, 220],
    })
  }

  let shootTimer = 0
  let targetMx = 0, targetMy = 0, smoothMx = 0, smoothMy = 0

  const draw = (time) => {
    ctx.clearRect(0, 0, w, h)

    // Parallax
    if (mouse.active) { targetMx = mouse.x; targetMy = mouse.y }
    else { targetMx *= 0.98; targetMy *= 0.98 }
    smoothMx += (targetMx - smoothMx) * 0.04
    smoothMy += (targetMy - smoothMy) * 0.04

    // Background image parallax
    if (bgRef.value) {
      const tx = smoothMx * -8
      const ty = smoothMy * -6
      bgRef.value.style.transform = `translate(${tx}px, ${ty}px)`
    }

    // 1. Twinkling overlay stars
    for (const s of twinklingStars) {
      const px = s.x + smoothMx * 12 * s.parallax
      const py = s.y + smoothMy * 10 * s.parallax
      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset)
      const alpha = s.opacity * (twinkle * 0.4 + 0.6)
      const [r, g, b] = s.color

      // Soft glow
      if (s.r > 1.2) {
        const glowR = s.r * 5
        const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR)
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`)
        glow.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.04})`)
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(px, py, glowR, 0, Math.PI * 2)
        ctx.fill()
      }

      // 6-point star spikes
      if (s.r > 1.5) {
        const spikeLen = s.r * 7 * (twinkle * 0.3 + 0.7)
        const short = spikeLen * 0.55
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(px - spikeLen, py); ctx.lineTo(px + spikeLen, py)
        ctx.moveTo(px, py - spikeLen); ctx.lineTo(px, py + spikeLen)
        ctx.moveTo(px - short * 0.7, py - short * 0.7); ctx.lineTo(px + short * 0.7, py + short * 0.7)
        ctx.moveTo(px + short * 0.7, py - short * 0.7); ctx.lineTo(px - short * 0.7, py + short * 0.7)
        ctx.stroke()
      }

      // Star core
      ctx.beginPath()
      ctx.arc(px, py, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
      ctx.fill()
    }

    // 2. Shooting stars
    shootTimer++
    if (shootTimer > 100 + Math.random() * 160) {
      spawnShootingStar()
      shootTimer = 0
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i]
      ss.x += Math.cos(ss.angle) * ss.speed
      ss.y += Math.sin(ss.angle) * ss.speed
      ss.life -= 0.008

      if (ss.life <= 0) { shootingStars.splice(i, 1); continue }

      const op = Math.max(0, ss.life)
      const tailX = ss.x - Math.cos(ss.angle) * ss.len * op
      const tailY = ss.y - Math.sin(ss.angle) * ss.len * op
      const [cr, cg, cb] = ss.color

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
      grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0)`)
      grad.addColorStop(0.6, `rgba(${cr}, ${cg}, ${cb}, ${op * 0.4})`)
      grad.addColorStop(1, `rgba(255, 255, 255, ${op * 0.9})`)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(ss.x, ss.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = 2
      ctx.stroke()

      // Head
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${op})`
      ctx.fill()

      const hg = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 14)
      hg.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${op * 0.35})`)
      hg.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`)
      ctx.fillStyle = hg
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 14, 0, Math.PI * 2)
      ctx.fill()
    }

    // 3. Mouse comet trail
    for (let i = cometTrail.length - 1; i >= 0; i--) {
      const p = cometTrail[i]
      p.x += p.vx
      p.y += p.vy
      p.life -= p.decay
      p.vx *= 0.96
      p.vy *= 0.96

      if (p.life <= 0) { cometTrail.splice(i, 1); continue }

      const alpha = p.life * 0.6
      const r = p.r * p.life

      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3)
      glow.addColorStop(0, `rgba(14, 165, 233, ${alpha * 0.5})`)
      glow.addColorStop(0.5, `rgba(100, 200, 255, ${alpha * 0.15})`)
      glow.addColorStop(1, 'rgba(14, 165, 233, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200, 240, 255, ${alpha})`
      ctx.fill()
    }

    animId = requestAnimationFrame(draw)
  }

  const init = () => {
    resize()
    initTwinklingStars()
    draw(0)
  }

  init()

  window.addEventListener('resize', () => {
    resize()
    initTwinklingStars()
  })

  onUnmounted(() => cancelAnimationFrame(animId))
})
</script>

<style scoped>
.starfield-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.space-bg {
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background-image: url('/images/space-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* Tuned for clean dark background */
  filter: brightness(0.7) saturate(1.1);
  transition: transform 0.3s ease-out;
}

.starfield-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}
</style>
