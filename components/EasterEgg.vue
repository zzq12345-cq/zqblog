<template>
  <Teleport to="body">
    <Transition name="game-fade">
      <div v-if="active" class="easter-egg-overlay" @click.self="close">
        <div class="game-container">
          <div class="game-header">
            <span class="game-title">🚀 SPACE DEFENDER</span>
            <span class="game-score">SCORE: {{ score }}</span>
            <button class="game-close" @click="close">✕</button>
          </div>
          <canvas ref="gameCanvas" class="game-canvas" width="400" height="500"></canvas>
          <div v-if="gameOver" class="game-over-screen">
            <h2>GAME OVER</h2>
            <p>Score: {{ score }}</p>
            <button @click="restart">RETRY</button>
          </div>
          <p class="game-hint">← → 移动 &nbsp; SPACE 射击 &nbsp; ESC 退出</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const active = ref(false)
const gameCanvas = ref(null)
const score = ref(0)
const gameOver = ref(false)

// Konami Code: ↑↑↓↓←→←→BA
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
const inputBuffer = ref([])

const checkKonami = (e) => {
  inputBuffer.value.push(e.keyCode)
  if (inputBuffer.value.length > konamiCode.length) {
    inputBuffer.value.shift()
  }
  if (inputBuffer.value.length === konamiCode.length &&
      inputBuffer.value.every((v, i) => v === konamiCode[i])) {
    active.value = true
    inputBuffer.value = []
    nextTick(() => startGame())
  }
}

onMounted(() => {
  window.addEventListener('keydown', checkKonami)
})

onUnmounted(() => {
  window.removeEventListener('keydown', checkKonami)
})

const close = () => {
  active.value = false
  gameOver.value = false
  score.value = 0
}

let gameLoop = null

const restart = () => {
  gameOver.value = false
  score.value = 0
  startGame()
}

const startGame = () => {
  const canvas = gameCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const W = 400, H = 500

  // Player ship
  const ship = { x: W / 2, y: H - 50, w: 30, speed: 5 }
  const bullets = []
  const enemies = []
  const particles = []
  const stars = Array.from({ length: 60 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    s: Math.random() * 1.5 + 0.5, v: Math.random() * 1 + 0.5
  }))

  const keys = {}
  const onKey = (e) => { keys[e.key] = e.type === 'keydown' }
  const onKeyDown = (e) => {
    onKey(e)
    if (e.key === 'Escape') close()
    if (e.key === ' ') {
      e.preventDefault()
      bullets.push({ x: ship.x, y: ship.y - 15, vy: -7 })
    }
  }
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKey)

  let spawnTimer = 0
  score.value = 0
  gameOver.value = false

  const loop = () => {
    if (!active.value || gameOver.value) {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKey)
      return
    }

    ctx.fillStyle = '#050810'
    ctx.fillRect(0, 0, W, H)

    // Stars
    for (const s of stars) {
      s.y += s.v
      if (s.y > H) { s.y = 0; s.x = Math.random() * W }
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${s.s / 2})`
      ctx.fill()
    }

    // Move ship
    if (keys['ArrowLeft'] && ship.x > 15) ship.x -= ship.speed
    if (keys['ArrowRight'] && ship.x < W - 15) ship.x += ship.speed

    // Draw ship
    ctx.beginPath()
    ctx.moveTo(ship.x, ship.y - 15)
    ctx.lineTo(ship.x - 12, ship.y + 10)
    ctx.lineTo(ship.x + 12, ship.y + 10)
    ctx.closePath()
    ctx.fillStyle = '#0ea5e9'
    ctx.fill()
    ctx.shadowBlur = 10
    ctx.shadowColor = '#0ea5e9'
    ctx.fill()
    ctx.shadowBlur = 0

    // Engine flame
    ctx.beginPath()
    ctx.moveTo(ship.x - 5, ship.y + 10)
    ctx.lineTo(ship.x, ship.y + 18 + Math.random() * 5)
    ctx.lineTo(ship.x + 5, ship.y + 10)
    ctx.fillStyle = `rgba(251, 191, 36, ${0.6 + Math.random() * 0.4})`
    ctx.fill()

    // Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i]
      b.y += b.vy
      if (b.y < 0) { bullets.splice(i, 1); continue }

      ctx.beginPath()
      ctx.arc(b.x, b.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#22d3ee'
      ctx.fill()
      // Glow
      ctx.beginPath()
      ctx.arc(b.x, b.y, 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(34, 211, 238, 0.2)'
      ctx.fill()
    }

    // Spawn enemies
    spawnTimer++
    if (spawnTimer > 40) {
      enemies.push({
        x: Math.random() * (W - 40) + 20, y: -20,
        w: 20, vy: 1.5 + Math.random() * 1.5,
        hp: 1
      })
      spawnTimer = 0
    }

    // Enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i]
      e.y += e.vy
      if (e.y > H + 20) { enemies.splice(i, 1); continue }

      // Hit detection
      if (Math.abs(e.x - ship.x) < 18 && Math.abs(e.y - ship.y) < 18) {
        gameOver.value = true
        break
      }

      // Bullet hit
      for (let j = bullets.length - 1; j >= 0; j--) {
        const b = bullets[j]
        if (Math.abs(b.x - e.x) < 14 && Math.abs(b.y - e.y) < 14) {
          // Explosion particles
          for (let k = 0; k < 8; k++) {
            particles.push({
              x: e.x, y: e.y,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              life: 1
            })
          }
          enemies.splice(i, 1)
          bullets.splice(j, 1)
          score.value += 10
          break
        }
      }

      // Draw enemy
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(e.x - 10, e.y - 10, 20, 20)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)'
      ctx.lineWidth = 1
      ctx.strokeRect(e.x - 13, e.y - 13, 26, 26)
    }

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.life -= 0.03
      if (p.life <= 0) { particles.splice(i, 1); continue }
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(251, 191, 36, ${p.life})`
      ctx.fill()
    }

    gameLoop = requestAnimationFrame(loop)
  }

  gameLoop = requestAnimationFrame(loop)
}
</script>

<style scoped>
.easter-egg-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-container {
  position: relative;
  background: #0a0f1a;
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(14, 165, 233, 0.1);
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(14, 165, 233, 0.06);
  border-bottom: 1px solid rgba(14, 165, 233, 0.1);
}

.game-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #0ea5e9;
}

.game-score {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #22d3ee;
}

.game-close {
  background: none;
  border: none;
  color: var(--color-text-tertiary);
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
}

.game-canvas {
  display: block;
}

.game-hint {
  padding: 8px 16px;
  text-align: center;
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--color-text-tertiary);
  background: rgba(14, 165, 233, 0.04);
  border-top: 1px solid rgba(14, 165, 233, 0.1);
}

.game-over-screen {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(5, 8, 16, 0.9);
  z-index: 10;
}

.game-over-screen h2 {
  font-size: 2rem;
  font-weight: 900;
  color: #ef4444;
  margin-bottom: 8px;
  letter-spacing: 0.1em;
}

.game-over-screen p {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  color: #22d3ee;
  margin-bottom: 24px;
}

.game-over-screen button {
  padding: 10px 28px;
  background: var(--gradient-primary);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.game-fade-enter-active, .game-fade-leave-active { transition: all 0.3s; }
.game-fade-enter-from, .game-fade-leave-to { opacity: 0; transform: scale(0.95); }
</style>
