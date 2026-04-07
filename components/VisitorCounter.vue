<template>
  <div class="visitor-badge" v-if="count > 0">
    <div class="badge-glow"></div>
    <div class="badge-content">
      <div class="badge-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
      <div class="badge-number">
        <span v-for="(digit, i) in digits" :key="i" class="digit" :style="{ animationDelay: `${0.8 + i * 0.1}s` }">
          {{ digit }}
        </span>
      </div>
      <div class="badge-label">{{ locale === 'zh' ? '位访客到访' : 'visitors' }}</div>
    </div>
    <div class="badge-live">
      <span class="live-dot"></span>
      Live
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const count = ref(0)

const digits = computed(() => count.value.toString().split(''))

onMounted(async () => {
  try {
    const visited = sessionStorage.getItem('zzq-visited')
    if (!visited) {
      const res = await $fetch('/api/visitors', { method: 'POST' })
      count.value = res.count
      sessionStorage.setItem('zzq-visited', '1')
    } else {
      const res = await $fetch('/api/visitors')
      count.value = res.count
    }
  } catch {
    count.value = 0
  }
})
</script>

<style scoped>
.visitor-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px 14px 20px;
  background: rgba(10, 18, 38, 0.7);
  border: 1px solid rgba(14, 165, 233, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
  animation: badge-appear 0.6s ease 1s forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes badge-appear {
  to { opacity: 1; transform: translateY(0); }
}

.badge-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.badge-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 10px;
  color: var(--color-primary-light);
}

.badge-number {
  display: flex;
  gap: 2px;
}

.digit {
  font-size: 1.6rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, #38bdf8, #22d3ee);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  opacity: 0;
  transform: translateY(12px);
  animation: digit-flip 0.5s ease forwards;
}

@keyframes digit-flip {
  to { opacity: 1; transform: translateY(0); }
}

.badge-label {
  font-size: 13px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.badge-live {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 700;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
  animation: live-pulse 2s ease-in-out infinite;
}

@keyframes live-pulse {
  50% { opacity: 0.4; transform: scale(0.8); }
}

@media (max-width: 768px) {
  .visitor-badge { padding: 10px 16px; gap: 10px; }
  .badge-icon { width: 32px; height: 32px; }
  .badge-icon svg { width: 16px; height: 16px; }
  .digit { font-size: 1.2rem; }
  .badge-label { font-size: 11px; }
}
</style>
