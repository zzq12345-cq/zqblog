<template>
  <div class="error-page">
    <div class="container error-inner">
      <div class="error-visual">
        <div class="astronaut">
          <div class="helmet">
            <div class="visor"></div>
          </div>
          <div class="body-suit"></div>
          <div class="arm left"></div>
          <div class="arm right"></div>
          <div class="leg left"></div>
          <div class="leg right"></div>
          <div class="backpack"></div>
          <div class="tether"></div>
        </div>
      </div>

      <h1 class="error-code anim-in d1">404</h1>
      <p class="error-title anim-in d2">{{ locale === 'zh' ? '迷失在太空中...' : 'Lost in space...' }}</p>
      <p class="error-desc anim-in d3">{{ locale === 'zh' ? '这个页面不存在，或者已经飘向了银河深处' : "This page doesn't exist, or has drifted into deep space" }}</p>
      <NuxtLink :to="localePath('/')" class="btn-primary anim-in d4 clickable">
        <span>{{ locale === 'zh' ? '返回地球' : 'Back to Earth' }}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.error-inner {
  max-width: 500px;
}

.error-visual {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

/* CSS Astronaut */
.astronaut {
  position: relative;
  width: 80px;
  height: 100px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  33% { transform: translateY(-15px) rotate(3deg); }
  66% { transform: translateY(-8px) rotate(-2deg); }
}

.helmet {
  width: 44px;
  height: 44px;
  background: #e0e7ef;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.15);
}

.visor {
  position: absolute;
  top: 10px;
  left: 8px;
  width: 28px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a5f, #0ea5e9, #06b6d4);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
}

.body-suit {
  width: 36px;
  height: 32px;
  background: #d0d8e4;
  border-radius: 8px 8px 12px 12px;
  margin: -4px auto 0;
  position: relative;
  z-index: 1;
}

.arm {
  position: absolute;
  width: 10px;
  height: 28px;
  background: #c8d0dc;
  border-radius: 5px;
  top: 46px;
  z-index: 0;
}

.arm.left { left: 10px; transform: rotate(15deg); }
.arm.right { right: 10px; transform: rotate(-15deg); }

.leg {
  position: absolute;
  width: 12px;
  height: 22px;
  background: #c0c8d4;
  border-radius: 6px;
  bottom: 0;
}

.leg.left { left: 22px; }
.leg.right { right: 22px; }

.backpack {
  position: absolute;
  width: 16px;
  height: 20px;
  background: #b0b8c4;
  border-radius: 4px;
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
}

.tether {
  position: absolute;
  top: 56px;
  right: -30px;
  width: 40px;
  height: 1px;
  background: linear-gradient(to right, rgba(200, 210, 220, 0.6), transparent);
  transform-origin: left;
  animation: tether-sway 6s ease-in-out infinite;
}

@keyframes tether-sway {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(8deg); }
}

.error-code {
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 12px;
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
  margin-bottom: 32px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 30px;
  background: var(--gradient-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s;
  box-shadow: 0 4px 24px rgba(14, 165, 233, 0.25);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.35);
  color: #fff;
}

.anim-in { opacity: 0; transform: translateY(30px); animation: anim-up 0.8s ease forwards; }
.d1 { animation-delay: 0.2s; } .d2 { animation-delay: 0.4s; } .d3 { animation-delay: 0.6s; } .d4 { animation-delay: 0.8s; }
@keyframes anim-up { to { opacity: 1; transform: translateY(0); } }
</style>
