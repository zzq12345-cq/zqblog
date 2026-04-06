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

// 鼠标真实像素位置（用于彗星拖尾）
const mousePixel = reactive({ x: 0, y: 0, prevX: 0, prevY: 0 })
const cometTrail = []

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, animId

  // 捕获原始鼠标像素位置
  window.addEventListener('mousemove', (e) => {
    mousePixel.prevX = mousePixel.x
    mousePixel.prevY = mousePixel.y
    mousePixel.x = e.clientX
    mousePixel.y = e.clientY

    // 鼠标移动速度
    const dx = mousePixel.x - mousePixel.prevX
    const dy = mousePixel.y - mousePixel.prevY
    const speed = Math.sqrt(dx * dx + dy * dy)

    // 速度越快生成越多粒子
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

  const layers = []
  const milkyWayStars = []
  const shootingStars = []
  const nebulae = []

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
  ]

  // ——— 银河带 ———
  const initMilkyWay = () => {
    milkyWayStars.length = 0
    // 银河从左下到右上的对角线带
    const angle = -Math.PI / 6 // 倾斜角度
    const bandWidth = Math.max(w, h) * 0.28 // 银河带宽度
    const bandLen = Math.sqrt(w * w + h * h) * 1.3
    const cx = w * 0.5
    const cy = h * 0.5

    // 密集的银河星群
    for (let i = 0; i < 800; i++) {
      // 沿银河带分布（高斯分布，中间密两侧稀）
      const along = (Math.random() - 0.5) * bandLen
      const gaussian = () => {
        let u = 0, v = 0
        while (u === 0) u = Math.random()
        while (v === 0) v = Math.random()
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
      }
      const across = gaussian() * bandWidth * 0.22

      const x = cx + along * Math.cos(angle) - across * Math.sin(angle)
      const y = cy + along * Math.sin(angle) + across * Math.cos(angle)

      const distFromCenter = Math.abs(across) / (bandWidth * 0.3)
      const brightness = Math.max(0, 1 - distFromCenter) * (Math.random() * 0.4 + 0.3)

      milkyWayStars.push({
        x, y,
        r: Math.random() * 0.8 + 0.15,
        opacity: brightness,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.01 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
      })
    }

    // 银河中的星团亮块（20个小集群）
    for (let c = 0; c < 20; c++) {
      const along = (Math.random() - 0.5) * bandLen * 0.8
      const across = (Math.random() - 0.5) * bandWidth * 0.15
      const clusterX = cx + along * Math.cos(angle) - across * Math.sin(angle)
      const clusterY = cy + along * Math.sin(angle) + across * Math.cos(angle)

      for (let s = 0; s < 15; s++) {
        const dx = (Math.random() - 0.5) * 30
        const dy = (Math.random() - 0.5) * 30
        milkyWayStars.push({
          x: clusterX + dx,
          y: clusterY + dy,
          r: Math.random() * 0.6 + 0.2,
          opacity: Math.random() * 0.5 + 0.4,
          color: starColors[Math.floor(Math.random() * 3)], // 偏白蓝
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }
  }

  // 画银河漫射光带
  const drawMilkyWayGlow = (time) => {
    const angle = -Math.PI / 6
    const bandWidth = Math.max(w, h) * 0.28
    const bandLen = Math.sqrt(w * w + h * h) * 1.2
    const cx = w * 0.5
    const cy = h * 0.5

    ctx.save()
    ctx.translate(cx + smoothMx * 5, cy + smoothMy * 4)
    ctx.rotate(angle)

    // 主漫射光
    const grad = ctx.createLinearGradient(0, -bandWidth * 0.6, 0, bandWidth * 0.6)
    const pulse = Math.sin(time * 0.0002) * 0.15 + 0.85
    grad.addColorStop(0, `rgba(100, 140, 200, 0)`)
    grad.addColorStop(0.25, `rgba(80, 120, 180, ${0.015 * pulse})`)
    grad.addColorStop(0.4, `rgba(100, 150, 210, ${0.035 * pulse})`)
    grad.addColorStop(0.5, `rgba(120, 160, 220, ${0.045 * pulse})`)
    grad.addColorStop(0.6, `rgba(100, 150, 210, ${0.035 * pulse})`)
    grad.addColorStop(0.75, `rgba(80, 120, 180, ${0.015 * pulse})`)
    grad.addColorStop(1, `rgba(100, 140, 200, 0)`)

    ctx.fillStyle = grad
    ctx.fillRect(-bandLen * 0.6, -bandWidth * 0.6, bandLen * 1.2, bandWidth * 1.2)

    // 核心更亮的窄带
    const core = ctx.createLinearGradient(0, -bandWidth * 0.15, 0, bandWidth * 0.15)
    core.addColorStop(0, `rgba(140, 170, 220, 0)`)
    core.addColorStop(0.3, `rgba(150, 180, 230, ${0.02 * pulse})`)
    core.addColorStop(0.5, `rgba(170, 195, 240, ${0.03 * pulse})`)
    core.addColorStop(0.7, `rgba(150, 180, 230, ${0.02 * pulse})`)
    core.addColorStop(1, `rgba(140, 170, 220, 0)`)
    ctx.fillStyle = core
    ctx.fillRect(-bandLen * 0.5, -bandWidth * 0.15, bandLen, bandWidth * 0.3)

    ctx.restore()
  }

  // ——— 普通星层 ———
  const createLayer = (count, speedMul, sizeRange) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      vx: (Math.random() - 0.5) * 0.08 * speedMul,
      vy: (Math.random() - 0.3) * 0.05 * speedMul,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      opacity: Math.random() * 0.5 + 0.4,
      twinkleSpeed: Math.random() * 0.015 + 0.003,
      twinkleOffset: Math.random() * Math.PI * 2,
      parallax: speedMul,
    }))
  }

  const initStars = () => {
    layers.length = 0
    layers.push(createLayer(250, 0.3, [0.2, 0.6]))
    layers.push(createLayer(120, 0.6, [0.5, 1.2]))
    layers.push(createLayer(50, 1.0, [1.0, 2.2]))
  }

  // 星云
  const initNebulae = () => {
    nebulae.length = 0
    nebulae.push(
      { x: w * 0.15, y: h * 0.35, rx: w * 0.22, ry: h * 0.2, color: [15, 60, 130], opacity: 0.03 },
      { x: w * 0.8, y: h * 0.25, rx: w * 0.18, ry: h * 0.18, color: [6, 100, 140], opacity: 0.025 },
    )
  }

  // 流星
  const spawnShootingStar = () => {
    const dir = Math.random() > 0.5 ? 1 : -1
    shootingStars.push({
      x: dir > 0 ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6,
      y: Math.random() * h * 0.5,
      len: Math.random() * 120 + 60,
      speed: Math.random() * 8 + 5,
      angle: dir > 0 ? Math.PI / 5 + Math.random() * 0.4 : Math.PI - Math.PI / 5 - Math.random() * 0.4,
      life: 1,
    })
  }

  let shootTimer = 0
  let targetMx = 0, targetMy = 0, smoothMx = 0, smoothMy = 0

  const draw = (time) => {
    ctx.clearRect(0, 0, w, h)

    // 鼠标视差
    if (mouse.active) { targetMx = mouse.x; targetMy = mouse.y }
    else { targetMx *= 0.98; targetMy *= 0.98 }
    smoothMx += (targetMx - smoothMx) * 0.04
    smoothMy += (targetMy - smoothMy) * 0.04

    // 1. 银河漫射光带
    drawMilkyWayGlow(time)

    // 2. 星云
    for (const n of nebulae) {
      const grad = ctx.createRadialGradient(
        n.x + smoothMx * 8, n.y + smoothMy * 6, 0,
        n.x + smoothMx * 8, n.y + smoothMy * 6, Math.max(n.rx, n.ry)
      )
      const pulse = Math.sin(time * 0.0003) * 0.3 + 0.7
      grad.addColorStop(0, `rgba(${n.color.join(',')}, ${n.opacity * pulse})`)
      grad.addColorStop(0.6, `rgba(${n.color.join(',')}, ${n.opacity * pulse * 0.3})`)
      grad.addColorStop(1, `rgba(${n.color.join(',')}, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(n.x + smoothMx * 8, n.y + smoothMy * 6, n.rx, n.ry, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    // 3. 银河密集星群
    for (const s of milkyWayStars) {
      const px = s.x + smoothMx * 5
      const py = s.y + smoothMy * 4
      const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7
      const alpha = s.opacity * twinkle
      const [r, g, b] = s.color

      ctx.beginPath()
      ctx.arc(px, py, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
      ctx.fill()
    }

    // 4. 三层散布星
    for (const layer of layers) {
      for (const s of layer) {
        s.x += s.vx
        s.y += s.vy
        if (s.x < -10) s.x = w + 10
        if (s.x > w + 10) s.x = -10
        if (s.y < -10) s.y = h + 10
        if (s.y > h + 10) s.y = -10

        const px = s.x + smoothMx * 15 * s.parallax
        const py = s.y + smoothMy * 12 * s.parallax
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset)
        const alpha = s.opacity * (twinkle * 0.35 + 0.65)
        const [r, g, b] = s.color

        // 大星光晕
        if (s.r > 1.2) {
          const glowR = s.r * 4
          const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR)
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`)
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(px, py, glowR, 0, Math.PI * 2)
          ctx.fill()
        }

        // 十字光芒
        if (s.r > 1.8) {
          const spikeLen = s.r * 5 * (twinkle * 0.3 + 0.7)
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.25})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(px - spikeLen, py)
          ctx.lineTo(px + spikeLen, py)
          ctx.moveTo(px, py - spikeLen)
          ctx.lineTo(px, py + spikeLen)
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.fill()
      }
    }

    // 5. 流星
    shootTimer++
    if (shootTimer > 120 + Math.random() * 180) {
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

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
      grad.addColorStop(0, `rgba(180, 220, 255, 0)`)
      grad.addColorStop(0.7, `rgba(200, 230, 255, ${op * 0.5})`)
      grad.addColorStop(1, `rgba(240, 250, 255, ${op})`)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(ss.x, ss.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${op})`
      ctx.fill()

      const hg = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 10)
      hg.addColorStop(0, `rgba(180, 220, 255, ${op * 0.35})`)
      hg.addColorStop(1, `rgba(180, 220, 255, 0)`)
      ctx.fillStyle = hg
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 10, 0, Math.PI * 2)
      ctx.fill()
    }

    // 6. 彗星拖尾
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

      // 粒子光晕
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3)
      glow.addColorStop(0, `rgba(14, 165, 233, ${alpha * 0.5})`)
      glow.addColorStop(0.5, `rgba(100, 200, 255, ${alpha * 0.15})`)
      glow.addColorStop(1, `rgba(14, 165, 233, 0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2)
      ctx.fill()

      // 粒子核心
      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200, 240, 255, ${alpha})`
      ctx.fill()
    }

    animId = requestAnimationFrame(draw)
  }

  const init = () => {
    resize()
    initNebulae()
    initMilkyWay()
    initStars()
    draw(0)
  }

  init()

  window.addEventListener('resize', () => {
    resize()
    initNebulae()
    initMilkyWay()
    initStars()
  })

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
