<template>
  <div class="error-page">
    <!-- Floating astronaut -->
    <div class="astronaut-scene">
      <div class="astronaut" ref="astroRef">
        <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Helmet -->
          <ellipse cx="100" cy="70" rx="52" ry="55" fill="#1e293b" stroke="rgba(100,180,255,0.3)" stroke-width="2"/>
          <ellipse cx="100" cy="68" rx="38" ry="40" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.3)" stroke-width="1.5"/>
          <!-- Visor reflection -->
          <ellipse cx="90" cy="60" rx="12" ry="15" fill="rgba(14,165,233,0.12)"/>
          <!-- Body -->
          <rect x="62" y="120" width="76" height="80" rx="16" fill="#1e293b" stroke="rgba(100,180,255,0.2)" stroke-width="2"/>
          <!-- Backpack -->
          <rect x="52" y="130" width="14" height="50" rx="6" fill="#0f172a" stroke="rgba(100,180,255,0.15)" stroke-width="1.5"/>
          <!-- Arms -->
          <path d="M62 140 Q30 150 25 180" stroke="rgba(100,180,255,0.25)" stroke-width="12" stroke-linecap="round" fill="none"/>
          <path d="M138 140 Q170 130 180 105" stroke="rgba(100,180,255,0.25)" stroke-width="12" stroke-linecap="round" fill="none"/>
          <!-- Glove (waving hand) -->
          <circle cx="180" cy="100" r="10" fill="#1e293b" stroke="rgba(14,165,233,0.3)" stroke-width="1.5"/>
          <!-- Legs -->
          <path d="M82 200 Q78 240 70 260" stroke="rgba(100,180,255,0.25)" stroke-width="12" stroke-linecap="round" fill="none"/>
          <path d="M118 200 Q122 240 130 260" stroke="rgba(100,180,255,0.25)" stroke-width="12" stroke-linecap="round" fill="none"/>
          <!-- Boots -->
          <ellipse cx="68" cy="264" rx="12" ry="8" fill="#0f172a" stroke="rgba(100,180,255,0.2)" stroke-width="1.5"/>
          <ellipse cx="132" cy="264" rx="12" ry="8" fill="#0f172a" stroke="rgba(100,180,255,0.2)" stroke-width="1.5"/>
          <!-- Belt detail -->
          <rect x="68" y="185" width="64" height="6" rx="3" fill="rgba(14,165,233,0.15)"/>
          <!-- Chest light -->
          <circle cx="100" cy="150" r="5" fill="rgba(14,165,233,0.4)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
          <!-- Tether (broken cable floating) -->
          <path d="M25 185 Q10 200 -10 195 Q-30 190 -50 200" stroke="rgba(100,180,255,0.15)" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
        </svg>
      </div>

      <!-- Floating debris -->
      <div class="debris d1">⚙️</div>
      <div class="debris d2">🔧</div>
      <div class="debris d3">💫</div>
      <div class="debris d4">🛸</div>
    </div>

    <!-- Text content -->
    <div class="error-content">
      <div class="error-code">
        <span class="digit">4</span>
        <span class="digit zero">
          <span class="planet-ring"></span>
          0
        </span>
        <span class="digit">4</span>
      </div>

      <h1 class="error-title">{{ locale === 'zh' ? '迷失在深空中...' : 'Lost in Deep Space...' }}</h1>
      <p class="error-desc">
        {{ locale === 'zh'
          ? '这位宇航员似乎飘到了宇宙的边缘。你要找的页面不在这个星系里。'
          : 'This astronaut has drifted to the edge of the universe. The page you\'re looking for is not in this galaxy.' }}
      </p>

      <div class="error-actions">
        <NuxtLink :to="localePath('/')" class="btn-main">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          {{ locale === 'zh' ? '返回基地' : 'Return to Base' }}
        </NuxtLink>
        <button class="btn-ghost" @click="$router.back()">
          {{ locale === 'zh' ? '返回上一页' : 'Go Back' }}
        </button>
      </div>

      <div class="error-coordinates">
        <span>COORD: {{ coordX }}° {{ coordY }}°</span>
        <span class="sep">|</span>
        <span>SIGNAL: {{ signal }}%</span>
        <span class="sep">|</span>
        <span>STATUS: <span class="status-lost">LOST</span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()

useHead({
  title: locale.value === 'zh' ? '404 - 迷失深空 | 周志琪' : '404 - Lost in Space | Zhou Zhiqi',
})

const coordX = ref('127.43')
const coordY = ref('256.89')
const signal = ref(3)

onMounted(() => {
  // Randomly shift coordinates
  setInterval(() => {
    coordX.value = (Math.random() * 360).toFixed(2)
    coordY.value = (Math.random() * 360).toFixed(2)
    signal.value = Math.floor(Math.random() * 8) + 1
  }, 2000)
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Astronaut */
.astronaut-scene {
  position: relative;
  width: 200px;
  height: 280px;
  margin-bottom: 32px;
}

.astronaut {
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(14, 165, 233, 0.15));
}

.astronaut svg {
  width: 200px;
  height: 280px;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  25% { transform: translateY(-15px) rotate(1deg); }
  50% { transform: translateY(-8px) rotate(3deg); }
  75% { transform: translateY(-20px) rotate(-1deg); }
}

/* Debris */
.debris {
  position: absolute;
  font-size: 20px;
  animation: drift 8s ease-in-out infinite;
  opacity: 0.6;
}

.d1 { top: 10%; left: -30px; animation-delay: 0s; animation-duration: 7s; }
.d2 { top: 60%; right: -20px; animation-delay: -2s; animation-duration: 9s; }
.d3 { bottom: 10%; left: -20px; animation-delay: -4s; animation-duration: 6s; }
.d4 { top: 30%; right: -40px; animation-delay: -1s; animation-duration: 11s; }

@keyframes drift {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(45deg); }
  50% { transform: translateY(10px) rotate(90deg); }
  75% { transform: translateY(-10px) rotate(180deg); }
}

/* Error code */
.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}

.digit {
  font-size: clamp(4rem, 10vw, 7rem);
  font-weight: 900;
  color: transparent;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.8), rgba(6, 182, 212, 0.6));
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: -0.05em;
  text-shadow: 0 0 40px rgba(14, 165, 233, 0.2);
}

.digit.zero {
  position: relative;
}

.planet-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 110%;
  height: 30%;
  border: 2px solid rgba(14, 165, 233, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotateX(70deg);
  animation: ring-spin 4s linear infinite;
}

@keyframes ring-spin {
  from { transform: translate(-50%, -50%) rotateX(70deg) rotateZ(0deg); }
  to { transform: translate(-50%, -50%) rotateX(70deg) rotateZ(360deg); }
}

.error-title {
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.error-desc {
  font-size: 15px;
  color: var(--color-text-secondary);
  max-width: 440px;
  line-height: 1.7;
  margin: 0 auto 32px;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.btn-main {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: var(--shadow-primary);
  transition: all 0.2s;
}

.btn-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.25);
}

.btn-ghost {
  padding: 12px 28px;
  background: rgba(14, 165, 233, 0.06);
  border: 1px solid rgba(14, 165, 233, 0.15);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ghost:hover {
  background: rgba(14, 165, 233, 0.1);
  border-color: rgba(14, 165, 233, 0.25);
}

/* Coordinates HUD */
.error-coordinates {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--color-text-tertiary);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.sep { opacity: 0.3; }

.status-lost {
  color: #ef4444;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@media (max-width: 768px) {
  .astronaut-scene { width: 140px; height: 200px; }
  .astronaut svg { width: 140px; height: 200px; }
  .error-coordinates { flex-wrap: wrap; justify-content: center; font-size: 10px; }
  .debris { font-size: 16px; }
}
</style>
