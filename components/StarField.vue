<template>
  <canvas ref="canvasRef" class="starfield" @mousemove="onMouse" @mouseleave="onLeave"></canvas>
</template>

<script setup>
const canvasRef = ref(null)
const mouse = reactive({ x: 0, y: 0, active: false })

const onMouse = (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
  mouse.active = true
}
const onLeave = () => { mouse.active = false }

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, animId

  // 三层星空（远/中/近）+ 星云
  const layers = []
  const shootingStars = []
  const nebulae = []

  const resize = () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
    initNebulae()
  }

  const initNebulae = () => {
    nebulae.length = 0
    // 2-3 个柔和的星云色块
    nebulae.push(
      { x: w * 0.15, y: h * 0.3, rx: w * 0.35, ry: h * 0.3, color: [20, 80, 160], opacity: 0.04 },
      { x: w * 0.75, y: h * 0.2, rx: w * 0.25, ry: h * 0.25, color: [6, 140, 180], opacity: 0.03 },
      { x: w * 0.5, y: h * 0.8, rx: w * 0.4, ry: h * 0.3, color: [10, 60, 120], opacity: 0.035 },
    )
  }

  const starColors = [
    [255, 255, 255],     // 白
    [200, 220, 255],     // 冷白
    [180, 210, 255],     // 淡蓝
    [255, 240, 220],     // 暖白
    [160, 200, 255],     // 蓝
    [255, 220, 180],     // 暖黄
    [120, 200, 255],     // 天蓝
  ]

  const createLayer = (count, speedMul, sizeRange) => {
    return Array.from({ length: count }, () => {
      const color = starColors[Math.floor(Math.random() * starColors.length)]
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
        baseX: 0, baseY: 0,
        vx: (Math.random() - 0.5) * 0.08 * speedMul,
        vy: (Math.random() - 0.3) * 0.05 * speedMul,
        color,
        opacity: Math.random() * 0.5 + 0.4,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        parallax: speedMul,
      }
    })
  }

  const initStars = () => {
    layers.length = 0
    layers.push(createLayer(300, 0.3, [0.2, 0.7]))   // 远景：小而密
    layers.push(createLayer(150, 0.6, [0.5, 1.2]))    // 中景
    layers.push(createLayer(60, 1.0, [1.0, 2.2]))     // 近景：大而亮
  }

  const spawnShootingStar = () => {
    const dir = Math.random() > 0.5 ? 1 : -1
    shootingStars.push({
      x: dir > 0 ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6,
      y: Math.random() * h * 0.5,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 8 + 5,
      opacity: 1,
      angle: dir > 0 ? Math.PI / 5 + Math.random() * 0.4 : Math.PI - Math.PI / 5 - Math.random() * 0.4,
      life: 1,
    })
  }

  let shootTimer = 0
  let targetMx = 0, targetMy = 0, smoothMx = 0, smoothMy = 0

  const draw = (time) => {
    ctx.clearRect(0, 0, w, h)

    // 鼠标视差平滑
    if (mouse.active) {
      targetMx = mouse.x
      targetMy = mouse.y
    } else {
      targetMx *= 0.98
      targetMy *= 0.98
    }
    smoothMx += (targetMx - smoothMx) * 0.05
    smoothMy += (targetMy - smoothMy) * 0.05

    // 画星云
    for (const n of nebulae) {
      const grad = ctx.createRadialGradient(
        n.x + smoothMx * 10, n.y + smoothMy * 8, 0,
        n.x + smoothMx * 10, n.y + smoothMy * 8, Math.max(n.rx, n.ry)
      )
      const pulse = Math.sin(time * 0.0003) * 0.3 + 0.7
      const a = n.opacity * pulse
      grad.addColorStop(0, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${a})`)
      grad.addColorStop(0.5, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${a * 0.4})`)
      grad.addColorStop(1, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(n.x + smoothMx * 10, n.y + smoothMy * 8, n.rx, n.ry, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    // 画三层星星
    for (const layer of layers) {
      for (const s of layer) {
        s.x += s.vx
        s.y += s.vy

        if (s.x < -10) s.x = w + 10
        if (s.x > w + 10) s.x = -10
        if (s.y < -10) s.y = h + 10
        if (s.y > h + 10) s.y = -10

        // 视差偏移
        const px = s.x + smoothMx * 15 * s.parallax
        const py = s.y + smoothMy * 12 * s.parallax

        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset)
        const alpha = s.opacity * (twinkle * 0.35 + 0.65)
        const [r, g, b] = s.color

        // 大星发光晕
        if (s.r > 1.2) {
          const glowR = s.r * 4
          const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR)
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.25})`)
          glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.06})`)
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(px, py, glowR, 0, Math.PI * 2)
          ctx.fill()
        }

        // 星体十字光芒（最大的星）
        if (s.r > 1.8) {
          const spikeLen = s.r * 5 * (twinkle * 0.3 + 0.7)
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(px - spikeLen, py)
          ctx.lineTo(px + spikeLen, py)
          ctx.moveTo(px, py - spikeLen)
          ctx.lineTo(px, py + spikeLen)
          ctx.stroke()
        }

        // 星点
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.fill()
      }
    }

    // 流星
    shootTimer++
    if (shootTimer > 120 + Math.random() * 200) {
      spawnShootingStar()
      shootTimer = 0
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i]
      ss.x += Math.cos(ss.angle) * ss.speed
      ss.y += Math.sin(ss.angle) * ss.speed
      ss.life -= 0.008
      ss.opacity = Math.max(0, ss.life)

      if (ss.life <= 0) { shootingStars.splice(i, 1); continue }

      const tailX = ss.x - Math.cos(ss.angle) * ss.len * ss.opacity
      const tailY = ss.y - Math.sin(ss.angle) * ss.len * ss.opacity

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
      grad.addColorStop(0, `rgba(180, 220, 255, 0)`)
      grad.addColorStop(0.7, `rgba(200, 230, 255, ${ss.opacity * 0.5})`)
      grad.addColorStop(1, `rgba(240, 250, 255, ${ss.opacity})`)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(ss.x, ss.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = 2
      ctx.stroke()

      // 头部亮点
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`
      ctx.fill()

      // 头部光晕
      const hg = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 8)
      hg.addColorStop(0, `rgba(180, 220, 255, ${ss.opacity * 0.4})`)
      hg.addColorStop(1, `rgba(180, 220, 255, 0)`)
      ctx.fillStyle = hg
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 8, 0, Math.PI * 2)
      ctx.fill()
    }

    animId = requestAnimationFrame(draw)
  }

  init()
  function init() {
    resize()
    initStars()
    draw(0)
  }

  window.addEventListener('resize', () => { resize(); initStars() })
  onUnmounted(() => cancelAnimationFrame(animId))
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
  pointer-events: all;
}
</style>
