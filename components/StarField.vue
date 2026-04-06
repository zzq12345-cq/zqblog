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

const mousePixel = reactive({ x: 0, y: 0, prevX: 0, prevY: 0 })
const cometTrail = []

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, animId

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

  const layers = []
  const milkyWayStars = []
  const shootingStars = []
  const nebulae = []
  const dustParticles = []
  const deepGalaxies = []

  const resize = () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }

  const starColors = [
    [255, 255, 255],   // pure white
    [200, 220, 255],   // cool white
    [180, 210, 255],   // pale blue
    [255, 240, 220],   // warm white
    [160, 200, 255],   // light blue
    [255, 220, 180],   // pale orange
    [120, 200, 255],   // cyan-blue
    [255, 200, 150],   // warm amber
    [200, 180, 255],   // lavender
    [255, 180, 180],   // pale rose
  ]

  // ——— Deep-field background gradient ———
  const drawBackground = () => {
    const bg = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8)
    bg.addColorStop(0, '#080d1a')
    bg.addColorStop(0.3, '#060b16')
    bg.addColorStop(0.6, '#050912')
    bg.addColorStop(1, '#030710')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    // subtle warm spot
    const warm = ctx.createRadialGradient(w * 0.75, h * 0.3, 0, w * 0.75, h * 0.3, w * 0.4)
    warm.addColorStop(0, 'rgba(25, 12, 40, 0.3)')
    warm.addColorStop(0.5, 'rgba(15, 8, 30, 0.15)')
    warm.addColorStop(1, 'transparent')
    ctx.fillStyle = warm
    ctx.fillRect(0, 0, w, h)

    // cool accent
    const cool = ctx.createRadialGradient(w * 0.2, h * 0.7, 0, w * 0.2, h * 0.7, w * 0.35)
    cool.addColorStop(0, 'rgba(5, 20, 50, 0.25)')
    cool.addColorStop(0.6, 'rgba(5, 15, 35, 0.1)')
    cool.addColorStop(1, 'transparent')
    ctx.fillStyle = cool
    ctx.fillRect(0, 0, w, h)
  }

  // ——— Deep-field galaxies (tiny elliptical smudges) ———
  const initDeepGalaxies = () => {
    deepGalaxies.length = 0
    const count = Math.floor(Math.min(w, h) / 80)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI
      deepGalaxies.push({
        x: Math.random() * w,
        y: Math.random() * h,
        rx: Math.random() * 8 + 3,
        ry: Math.random() * 3 + 1.5,
        angle,
        color: [
          [140, 160, 220],
          [180, 150, 200],
          [160, 180, 210],
          [200, 170, 190],
        ][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.06 + 0.02,
      })
    }
  }

  // ——— Cosmic dust layer ———
  const initDust = () => {
    dustParticles.length = 0
    for (let i = 0; i < 300; i++) {
      dustParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.4 + 0.1,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.2 + 0.05,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      })
    }
  }

  // ——— Milky Way ———
  const initMilkyWay = () => {
    milkyWayStars.length = 0
    const angle = -Math.PI / 6
    const bandWidth = Math.max(w, h) * 0.3
    const bandLen = Math.sqrt(w * w + h * h) * 1.3
    const cx = w * 0.5
    const cy = h * 0.5

    for (let i = 0; i < 1000; i++) {
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
        r: Math.random() * 0.9 + 0.15,
        opacity: brightness,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.012 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
      })
    }

    // Star clusters within milky way
    for (let c = 0; c < 25; c++) {
      const along = (Math.random() - 0.5) * bandLen * 0.8
      const across = (Math.random() - 0.5) * bandWidth * 0.15
      const clusterX = cx + along * Math.cos(angle) - across * Math.sin(angle)
      const clusterY = cy + along * Math.sin(angle) + across * Math.cos(angle)

      for (let s = 0; s < 20; s++) {
        const dx = (Math.random() - 0.5) * 35
        const dy = (Math.random() - 0.5) * 35
        milkyWayStars.push({
          x: clusterX + dx,
          y: clusterY + dy,
          r: Math.random() * 0.7 + 0.2,
          opacity: Math.random() * 0.5 + 0.4,
          color: starColors[Math.floor(Math.random() * 4)],
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }
  }

  // Draw milky way glow with warm+cool bands
  const drawMilkyWayGlow = (time) => {
    const angle = -Math.PI / 6
    const bandWidth = Math.max(w, h) * 0.3
    const bandLen = Math.sqrt(w * w + h * h) * 1.2

    ctx.save()
    ctx.translate(w * 0.5 + smoothMx * 5, h * 0.5 + smoothMy * 4)
    ctx.rotate(angle)

    const pulse = Math.sin(time * 0.0002) * 0.15 + 0.85

    // Outer diffuse glow — blue-purple
    const outer = ctx.createLinearGradient(0, -bandWidth * 0.7, 0, bandWidth * 0.7)
    outer.addColorStop(0, 'rgba(80, 100, 180, 0)')
    outer.addColorStop(0.2, `rgba(70, 90, 160, ${0.012 * pulse})`)
    outer.addColorStop(0.35, `rgba(90, 110, 180, ${0.025 * pulse})`)
    outer.addColorStop(0.5, `rgba(110, 130, 200, ${0.04 * pulse})`)
    outer.addColorStop(0.65, `rgba(90, 110, 180, ${0.025 * pulse})`)
    outer.addColorStop(0.8, `rgba(70, 90, 160, ${0.012 * pulse})`)
    outer.addColorStop(1, 'rgba(80, 100, 180, 0)')
    ctx.fillStyle = outer
    ctx.fillRect(-bandLen * 0.6, -bandWidth * 0.7, bandLen * 1.2, bandWidth * 1.4)

    // Core bright band — warmer tones
    const core = ctx.createLinearGradient(0, -bandWidth * 0.12, 0, bandWidth * 0.12)
    core.addColorStop(0, 'rgba(150, 160, 200, 0)')
    core.addColorStop(0.3, `rgba(160, 170, 210, ${0.02 * pulse})`)
    core.addColorStop(0.5, `rgba(180, 185, 220, ${0.035 * pulse})`)
    core.addColorStop(0.7, `rgba(160, 170, 210, ${0.02 * pulse})`)
    core.addColorStop(1, 'rgba(150, 160, 200, 0)')
    ctx.fillStyle = core
    ctx.fillRect(-bandLen * 0.5, -bandWidth * 0.12, bandLen, bandWidth * 0.24)

    // Warm inner filament 
    const warm = ctx.createLinearGradient(0, -bandWidth * 0.05, 0, bandWidth * 0.05)
    warm.addColorStop(0, 'rgba(200, 180, 160, 0)')
    warm.addColorStop(0.5, `rgba(200, 185, 170, ${0.015 * pulse})`)
    warm.addColorStop(1, 'rgba(200, 180, 160, 0)')
    ctx.fillStyle = warm
    ctx.fillRect(-bandLen * 0.4, -bandWidth * 0.05, bandLen * 0.8, bandWidth * 0.1)

    ctx.restore()
  }

  // ——— Enhanced nebulae ———
  const initNebulae = () => {
    nebulae.length = 0
    nebulae.push(
      { x: w * 0.12, y: h * 0.3, rx: w * 0.2, ry: h * 0.18, color: [20, 50, 120], opacity: 0.035, phase: 0 },
      { x: w * 0.82, y: h * 0.22, rx: w * 0.16, ry: h * 0.14, color: [60, 30, 100], opacity: 0.03, phase: 1 },
      { x: w * 0.55, y: h * 0.75, rx: w * 0.15, ry: h * 0.12, color: [10, 70, 120], opacity: 0.025, phase: 2 },
      { x: w * 0.35, y: h * 0.55, rx: w * 0.18, ry: h * 0.15, color: [40, 20, 80], opacity: 0.02, phase: 3 },
      // Emission nebula (reddish-warm)
      { x: w * 0.7, y: h * 0.55, rx: w * 0.1, ry: h * 0.08, color: [100, 40, 60], opacity: 0.018, phase: 4 },
    )
  }

  // ——— Star layers ———
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
    layers.push(createLayer(280, 0.3, [0.2, 0.6]))
    layers.push(createLayer(140, 0.6, [0.5, 1.3]))
    layers.push(createLayer(60, 1.0, [1.0, 2.5]))
  }

  // ——— Planets ———
  const drawPlanets = (time) => {
    const mx = smoothMx * 3
    const my = smoothMy * 2

    // Large planet with rings
    const bigX = w * 0.82 + mx
    const bigY = h * 0.28 + my
    const bigR = Math.min(w, h) * 0.08

    // Atmospheric glow
    const atmo = ctx.createRadialGradient(bigX, bigY, bigR * 0.9, bigX, bigY, bigR * 2.2)
    atmo.addColorStop(0, 'rgba(30, 60, 140, 0.07)')
    atmo.addColorStop(0.4, 'rgba(25, 50, 120, 0.03)')
    atmo.addColorStop(1, 'rgba(20, 40, 100, 0)')
    ctx.fillStyle = atmo
    ctx.beginPath()
    ctx.arc(bigX, bigY, bigR * 2.2, 0, Math.PI * 2)
    ctx.fill()

    // Planet body
    const body = ctx.createRadialGradient(bigX - bigR * 0.3, bigY - bigR * 0.3, 0, bigX, bigY, bigR)
    body.addColorStop(0, 'rgba(45, 65, 115, 0.7)')
    body.addColorStop(0.35, 'rgba(30, 50, 95, 0.65)')
    body.addColorStop(0.7, 'rgba(18, 35, 70, 0.6)')
    body.addColorStop(1, 'rgba(8, 18, 45, 0.55)')
    ctx.fillStyle = body
    ctx.beginPath()
    ctx.arc(bigX, bigY, bigR, 0, Math.PI * 2)
    ctx.fill()

    // Atmospheric bands
    ctx.save()
    ctx.beginPath()
    ctx.arc(bigX, bigY, bigR, 0, Math.PI * 2)
    ctx.clip()
    for (let i = -4; i <= 4; i++) {
      const yOff = i * bigR * 0.18
      const bandOpacity = 0.03 + Math.abs(i) * 0.006
      const wobble = Math.sin(time * 0.0003 + i) * 1.5
      ctx.fillStyle = `rgba(90, 140, 200, ${bandOpacity})`
      ctx.fillRect(bigX - bigR, bigY + yOff - 1.5 + wobble, bigR * 2, 3)
    }
    ctx.restore()

    // Specular highlight
    const hl = ctx.createRadialGradient(bigX - bigR * 0.4, bigY - bigR * 0.4, 0, bigX, bigY, bigR)
    hl.addColorStop(0, 'rgba(160, 200, 255, 0.1)')
    hl.addColorStop(0.4, 'rgba(160, 200, 255, 0.02)')
    hl.addColorStop(1, 'rgba(160, 200, 255, 0)')
    ctx.fillStyle = hl
    ctx.beginPath()
    ctx.arc(bigX, bigY, bigR, 0, Math.PI * 2)
    ctx.fill()

    // Rings
    ctx.save()
    ctx.translate(bigX, bigY)
    ctx.scale(1, 0.28)
    for (const [radiusMul, alpha, lineW] of [[1.8, 0.1, 0.06], [1.6, 0.07, 0.1], [1.45, 0.04, 0.07]]) {
      ctx.beginPath()
      ctx.arc(0, 0, bigR * radiusMul, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(120, 170, 230, ${alpha})`
      ctx.lineWidth = bigR * lineW
      ctx.stroke()
    }
    ctx.restore()

    // Small moon
    const moonX = w * 0.18 + mx * 1.5
    const moonY = h * 0.72 + my * 1.5
    const moonR = Math.min(w, h) * 0.025

    const moonGlow = ctx.createRadialGradient(moonX, moonY, moonR * 0.8, moonX, moonY, moonR * 2.5)
    moonGlow.addColorStop(0, 'rgba(180, 200, 220, 0.06)')
    moonGlow.addColorStop(1, 'rgba(180, 200, 220, 0)')
    ctx.fillStyle = moonGlow
    ctx.beginPath()
    ctx.arc(moonX, moonY, moonR * 2.5, 0, Math.PI * 2)
    ctx.fill()

    const moonBody = ctx.createRadialGradient(moonX - moonR * 0.3, moonY - moonR * 0.3, 0, moonX, moonY, moonR)
    moonBody.addColorStop(0, 'rgba(200, 210, 225, 0.6)')
    moonBody.addColorStop(0.7, 'rgba(150, 165, 185, 0.5)')
    moonBody.addColorStop(1, 'rgba(100, 115, 140, 0.4)')
    ctx.fillStyle = moonBody
    ctx.beginPath()
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2)
    ctx.fill()

    // Craters
    for (const [cx, cy, cr] of [[0.2, -0.3, 0.15], [-0.3, 0.1, 0.12], [0.1, 0.25, 0.1]]) {
      ctx.beginPath()
      ctx.arc(moonX + cx * moonR, moonY + cy * moonR, cr * moonR, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(60, 75, 100, 0.25)'
      ctx.fill()
    }

    // Small asteroid
    const smX = w * 0.65 + mx * 2
    const smY = h * 0.85 + my * 2
    const smR = Math.min(w, h) * 0.012

    const smBody = ctx.createRadialGradient(smX - smR * 0.2, smY - smR * 0.2, 0, smX, smY, smR)
    smBody.addColorStop(0, 'rgba(170, 130, 100, 0.5)')
    smBody.addColorStop(1, 'rgba(120, 85, 60, 0.3)')
    ctx.fillStyle = smBody
    ctx.beginPath()
    ctx.arc(smX, smY, smR, 0, Math.PI * 2)
    ctx.fill()
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

  // ——— MAIN DRAW ———
  const draw = (time) => {
    // Parallax
    if (mouse.active) { targetMx = mouse.x; targetMy = mouse.y }
    else { targetMx *= 0.98; targetMy *= 0.98 }
    smoothMx += (targetMx - smoothMx) * 0.04
    smoothMy += (targetMy - smoothMy) * 0.04

    // 1. Deep-space background
    drawBackground()

    // 2. Milky way glow
    drawMilkyWayGlow(time)

    // 3. Nebulae
    for (const n of nebulae) {
      const nx = n.x + smoothMx * 8
      const ny = n.y + smoothMy * 6
      const pulse = Math.sin(time * 0.00025 + n.phase) * 0.3 + 0.7

      // Multi-layer nebula for depth
      for (const [scaleMul, opacityMul] of [[1, 1], [0.7, 1.5], [0.4, 2]]) {
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, Math.max(n.rx, n.ry) * scaleMul)
        const [r, g, b] = n.color
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${n.opacity * pulse * opacityMul})`)
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${n.opacity * pulse * opacityMul * 0.4})`)
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.ellipse(nx, ny, n.rx * scaleMul, n.ry * scaleMul, 0, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 4. Planets
    drawPlanets(time)

    // 5. Deep-field galaxies
    for (const g of deepGalaxies) {
      const gx = g.x + smoothMx * 3
      const gy = g.y + smoothMy * 2
      ctx.save()
      ctx.translate(gx, gy)
      ctx.rotate(g.angle)
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.rx)
      const [r, gb, b] = g.color
      grad.addColorStop(0, `rgba(${r}, ${gb}, ${b}, ${g.opacity * 1.5})`)
      grad.addColorStop(0.4, `rgba(${r}, ${gb}, ${b}, ${g.opacity * 0.6})`)
      grad.addColorStop(1, `rgba(${r}, ${gb}, ${b}, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, 0, g.rx, g.ry, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // 6. Milky way stars
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

    // 7. Cosmic dust
    for (const d of dustParticles) {
      d.x += d.vx
      d.y += d.vy
      if (d.x < -5) d.x = w + 5
      if (d.x > w + 5) d.x = -5
      if (d.y < -5) d.y = h + 5
      if (d.y > h + 5) d.y = -5

      const px = d.x + smoothMx * 2
      const py = d.y + smoothMy * 1.5
      const [r, g, b] = d.color

      ctx.beginPath()
      ctx.arc(px, py, d.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${d.opacity})`
      ctx.fill()
    }

    // 8. Main star layers
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

        // Glow for medium stars
        if (s.r > 1.0) {
          const glowR = s.r * 4.5
          const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR)
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`)
          glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.05})`)
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(px, py, glowR, 0, Math.PI * 2)
          ctx.fill()
        }

        // 6-point star spikes for bright stars
        if (s.r > 1.6) {
          const spikeLen = s.r * 6 * (twinkle * 0.3 + 0.7)
          const shortSpike = spikeLen * 0.6
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          // Main cross
          ctx.moveTo(px - spikeLen, py); ctx.lineTo(px + spikeLen, py)
          ctx.moveTo(px, py - spikeLen); ctx.lineTo(px, py + spikeLen)
          // Diagonal cross (45°)
          ctx.moveTo(px - shortSpike * 0.7, py - shortSpike * 0.7)
          ctx.lineTo(px + shortSpike * 0.7, py + shortSpike * 0.7)
          ctx.moveTo(px + shortSpike * 0.7, py - shortSpike * 0.7)
          ctx.lineTo(px - shortSpike * 0.7, py + shortSpike * 0.7)
          ctx.stroke()
        }

        // Star core
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.fill()
      }
    }

    // 9. Shooting stars
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

      // Head glow
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${op})`
      ctx.fill()

      const hg = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 12)
      hg.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${op * 0.35})`)
      hg.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`)
      ctx.fillStyle = hg
      ctx.beginPath()
      ctx.arc(ss.x, ss.y, 12, 0, Math.PI * 2)
      ctx.fill()
    }

    // 10. Mouse comet trail
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
    initNebulae()
    initMilkyWay()
    initStars()
    initDust()
    initDeepGalaxies()
    draw(0)
  }

  init()

  window.addEventListener('resize', () => {
    resize()
    initNebulae()
    initMilkyWay()
    initStars()
    initDust()
    initDeepGalaxies()
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
