<template>
  <div class="error-page">
    <!-- 漂浮粒子 -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle" :style="particleStyle(i)"></div>
    </div>

    <div class="container error-inner">
      <!-- 宇航员 -->
      <div class="error-visual">
        <div class="astronaut">
          <div class="helmet">
            <div class="visor"></div>
            <div class="visor-glare"></div>
          </div>
          <div class="body-suit"></div>
          <div class="arm left"></div>
          <div class="arm right"></div>
          <div class="leg left"></div>
          <div class="leg right"></div>
          <div class="backpack"></div>
          <div class="tether"></div>
          <div class="tether-dot"></div>
        </div>
      </div>

      <!-- 404 数字，带动态渐变 -->
      <h1 class="error-code anim-in d1">
        <span class="code-digit">4</span>
        <span class="code-planet">
          <span class="planet-ring"></span>
        </span>
        <span class="code-digit">4</span>
      </h1>

      <div class="error-badge anim-in d2">
        <span class="badge-dot"></span>
        {{ locale === 'zh' ? '页面未找到 · 请检查网址是否正确' : 'Page Not Found · Please check the URL' }}
      </div>

      <p class="error-title anim-in d2">{{ locale === 'zh' ? '迷失在太空中...' : 'Lost in space...' }}</p>
      <p class="error-desc anim-in d3">{{ locale === 'zh' ? '这个页面不存在，或者已经飘向了银河深处' : "This page doesn't exist, or has drifted into deep space" }}</p>

      <div class="error-actions anim-in d4">
        <NuxtLink :to="localePath('/')" class="btn-back clickable">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>{{ locale === 'zh' ? '返回地球' : 'Back to Earth' }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()

const particleStyle = (i) => {
  const size = Math.random() * 3 + 1
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${Math.random() * 6 + 4}s`,
    opacity: Math.random() * 0.5 + 0.2,
  }
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 漂浮粒子 */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  background: rgba(56, 189, 248, 0.6);
  border-radius: 50%;
  animation: drift linear infinite;
}

@keyframes drift {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
}

.error-inner {
  max-width: 500px;
  position: relative;
  z-index: 1;
}

/* 宇航员 */
.error-visual {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}

.astronaut {
  position: relative;
  width: 90px;
  height: 110px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  33% { transform: translateY(-18px) rotate(3deg); }
  66% { transform: translateY(-8px) rotate(-2deg); }
}

.helmet {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #e8edf3, #c8d0dc);
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.2), inset 0 -3px 6px rgba(0,0,0,0.1);
}

.visor {
  position: absolute;
  top: 11px;
  left: 9px;
  width: 32px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0c1628, #0ea5e9, #06b6d4, #22d3ee);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(14, 165, 233, 0.3);
}

.visor-glare {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 8px;
  height: 6px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transform: rotate(-20deg);
}

.body-suit {
  width: 40px;
  height: 36px;
  background: linear-gradient(180deg, #d4dae4, #bcc4d0);
  border-radius: 8px 8px 14px 14px;
  margin: -5px auto 0;
  position: relative;
  z-index: 1;
}

.arm {
  position: absolute;
  width: 11px;
  height: 30px;
  background: linear-gradient(180deg, #c8d0dc, #b0b8c4);
  border-radius: 6px;
  top: 48px;
  z-index: 0;
}

.arm.left { left: 10px; transform: rotate(20deg); animation: wave 4s ease-in-out infinite; }
.arm.right { right: 10px; transform: rotate(-15deg); }

@keyframes wave {
  0%, 100% { transform: rotate(20deg); }
  50% { transform: rotate(35deg); }
}

.leg {
  position: absolute;
  width: 13px;
  height: 24px;
  background: linear-gradient(180deg, #c0c8d4, #a8b0bc);
  border-radius: 6px;
  bottom: 0;
}

.leg.left { left: 24px; }
.leg.right { right: 24px; }

.backpack {
  position: absolute;
  width: 18px;
  height: 22px;
  background: linear-gradient(180deg, #a8b0bc, #98a0ac);
  border-radius: 4px;
  top: 46px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.tether {
  position: absolute;
  top: 58px;
  right: -40px;
  width: 50px;
  height: 1.5px;
  background: linear-gradient(to right, rgba(14, 165, 233, 0.5), rgba(14, 165, 233, 0.1));
  transform-origin: left;
  animation: tether-sway 6s ease-in-out infinite;
}

.tether-dot {
  position: absolute;
  top: 55px;
  right: -44px;
  width: 5px;
  height: 5px;
  background: rgba(14, 165, 233, 0.6);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.4);
  animation: tether-sway 6s ease-in-out infinite;
}

@keyframes tether-sway {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(8deg); }
}

/* 404 数字 */
.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  line-height: 1;
  margin-bottom: 16px;
}

.code-digit {
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  background: linear-gradient(135deg, #38bdf8 0%, #22d3ee 50%, #67e8f9 100%);
  background-size: 200% 200%;
  animation: gradient-flow 4s ease-in-out infinite;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 30px rgba(56, 189, 248, 0.3));
}

@keyframes gradient-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 中间 0 用星球代替 */
.code-planet {
  display: inline-block;
  width: clamp(4rem, 12vw, 6.5rem);
  height: clamp(4rem, 12vw, 6.5rem);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #1e3a5f, #0c1628);
  box-shadow:
    inset -8px -8px 20px rgba(0, 0, 0, 0.5),
    inset 4px 4px 12px rgba(14, 165, 233, 0.15),
    0 0 40px rgba(14, 165, 233, 0.2),
    0 0 80px rgba(6, 182, 212, 0.1);
  position: relative;
  animation: planet-rotate 20s linear infinite;
}

.planet-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(75deg);
  width: 140%;
  height: 140%;
  border: 2px solid rgba(56, 189, 248, 0.25);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.1);
}

@keyframes planet-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 600;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 9999px;
  margin-bottom: 20px;
  letter-spacing: 0.02em;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #f59e0b;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
  animation: badge-pulse 2s ease-in-out infinite;
}

@keyframes badge-pulse {
  50% { opacity: 0.4; }
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}

.error-desc {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 36px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  justify-content: center;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 24px rgba(14, 165, 233, 0.25);
}

.btn-back:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 40px rgba(14, 165, 233, 0.35);
  color: #fff;
}

/* 入场动画 */
.anim-in { opacity: 0; transform: translateY(30px); animation: anim-up 0.8s ease forwards; }
.d1 { animation-delay: 0.2s; }
.d2 { animation-delay: 0.5s; }
.d3 { animation-delay: 0.7s; }
.d4 { animation-delay: 0.9s; }
@keyframes anim-up { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .code-digit { font-size: clamp(3.5rem, 12vw, 5rem); }
  .code-planet { width: clamp(3rem, 10vw, 4.5rem); height: clamp(3rem, 10vw, 4.5rem); }
}
</style>
