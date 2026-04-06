<template>
  <canvas ref="canvasRef" class="starfield"></canvas>
</template>

<script setup>
const canvasRef = ref(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let w, h, stars, shootingStars, animId

  const resize = () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }

  const createStars = (count) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))
  }

  const createShootingStar = () => ({
    x: Math.random() * w * 0.8,
    y: Math.random() * h * 0.4,
    len: Math.random() * 80 + 40,
    speed: Math.random() * 6 + 4,
    opacity: 1,
    angle: Math.PI / 6 + Math.random() * 0.3,
    active: true,
  })

  const init = () => {
    resize()
    stars = createStars(200)
    shootingStars = []
  }

  let shootTimer = 0

  const draw = (time) => {
    ctx.clearRect(0, 0, w, h)

    // Stars
    for (const s of stars) {
      s.x += s.vx
      s.y += s.vy

      // Wrap around
      if (s.x < 0) s.x = w
      if (s.x > w) s.x = 0
      if (s.y < 0) s.y = h
      if (s.y > h) s.y = 0

      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7
      const alpha = s.opacity * twinkle

      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`
      ctx.fill()

      // Subtle glow for bigger stars
      if (s.r > 1.2) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 210, 255, ${alpha * 0.1})`
        ctx.fill()
      }
    }

    // Shooting stars
    shootTimer++
    if (shootTimer > 300 + Math.random() * 400) {
      shootingStars.push(createShootingStar())
      shootTimer = 0
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i]
      ss.x += Math.cos(ss.angle) * ss.speed
      ss.y += Math.sin(ss.angle) * ss.speed
      ss.opacity -= 0.012

      if (ss.opacity <= 0 || ss.x > w + 100 || ss.y > h + 100) {
        shootingStars.splice(i, 1)
        continue
      }

      const tailX = ss.x - Math.cos(ss.angle) * ss.len
      const tailY = ss.y - Math.sin(ss.angle) * ss.len

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
      grad.addColorStop(0, `rgba(200, 220, 255, 0)`)
      grad.addColorStop(1, `rgba(220, 240, 255, ${ss.opacity})`)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(ss.x, ss.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.5
      ctx.stroke()

      // head glow
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(240, 248, 255, ${ss.opacity})`
      ctx.fill()
    }

    animId = requestAnimationFrame(draw)
  }

  init()
  draw(0)

  window.addEventListener('resize', () => {
    resize()
    stars = createStars(200)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animId)
  })
})
</script>

<style scoped>
.starfield {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
