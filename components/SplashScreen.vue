<template>
  <Transition name="splash">
    <div v-if="show" class="splash" @click="dismiss">
      <canvas ref="warpCanvas" class="splash-canvas"></canvas>
      <div class="splash-text">
        <span class="splash-letter" v-for="(ch, i) in letters" :key="i" :style="{ animationDelay: `${i * 0.06}s` }">{{ ch }}</span>
      </div>
      <span class="splash-skip">CLICK TO SKIP</span>
    </div>
  </Transition>
</template>

<script setup>
const show = ref(false)
const warpCanvas = ref(null)
const letters = 'ZHOU ZHIQI'.split('')

let dismissTimer = null
let safetyTimer = null

const splashDone = useState('splashDone', () => false)

const dismiss = () => {
  show.value = false
  splashDone.value = true
  clearTimeout(dismissTimer)
  clearTimeout(safetyTimer)
}

onMounted(() => {
  // 已经看过启动屏的用户直接跳过
  if (sessionStorage.getItem('splash_shown')) {
    show.value = false
    return
  }

  show.value = true
  sessionStorage.setItem('splash_shown', '1')

  // 安全保底：最多3秒强制关闭，防止永远卡住
  safetyTimer = setTimeout(dismiss, 3000)

  const canvas = warpCanvas.value
  if (!canvas) {
    // Canvas 获取失败，1.5秒后关闭
    dismissTimer = setTimeout(dismiss, 1500)
    return
  }

  const ctx = canvas.getContext('2d')
  let w = canvas.width = window.innerWidth
  let h = canvas.height = window.innerHeight

  const cx = w / 2
  const cy = h / 2
  const stars = Array.from({ length: 400 }, () => ({
    x: (Math.random() - 0.5) * w * 3,
    y: (Math.random() - 0.5) * h * 3,
    z: Math.random() * 1500 + 500,
  }))

  let speed = 2
  let frame = 0

  const draw = () => {
    if (!show.value) return // 已消失则停止绘制

    ctx.fillStyle = 'rgba(5, 10, 20, 0.15)'
    ctx.fillRect(0, 0, w, h)

    frame++
    if (frame > 30) speed = Math.min(speed + 0.8, 50)

    for (const s of stars) {
      s.z -= speed

      if (s.z <= 0) {
        s.x = (Math.random() - 0.5) * w * 3
        s.y = (Math.random() - 0.5) * h * 3
        s.z = 1500
      }

      const sx = (s.x / s.z) * 300 + cx
      const sy = (s.y / s.z) * 300 + cy
      const r = Math.max(0.5, (1 - s.z / 1500) * 3)
      const alpha = Math.min(1, (1 - s.z / 1500) * 1.5)

      const prevZ = s.z + speed
      const psx = (s.x / prevZ) * 300 + cx
      const psy = (s.y / prevZ) * 300 + cy

      if (speed > 8) {
        ctx.beginPath()
        ctx.moveTo(psx, psy)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = `rgba(180, 220, 255, ${alpha * 0.6})`
        ctx.lineWidth = r * 0.8
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.arc(sx, sy, r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(220, 240, 255, ${alpha})`
      ctx.fill()
    }

    if (frame < 100) {
      requestAnimationFrame(draw)
    }
  }

  draw()

  // 1.5秒后淡出
  dismissTimer = setTimeout(dismiss, 1500)
})
</script>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: #050a14;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.splash-text {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 4px;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: 0.15em;
  color: white;
}

.splash-letter {
  display: inline-block;
  opacity: 0;
  animation: letter-in 0.4s ease forwards;
}

@keyframes letter-in {
  0% { opacity: 0; transform: translateY(20px) scale(0.8); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.splash-skip {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.25);
  animation: skip-fade 1s 0.8s ease forwards;
  opacity: 0;
}

@keyframes skip-fade {
  to { opacity: 1; }
}

.splash-leave-active {
  transition: opacity 0.6s ease;
}

.splash-leave-to {
  opacity: 0;
}
</style>
