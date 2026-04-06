<template>
  <div class="music-player">
    <!-- 精致的浮动按钮 -->
    <button class="player-fab" :class="{ playing: isPlaying }" @click="handleFabClick" title="Music">
      <div class="fab-ring"></div>
      <div class="fab-icon">
        <!-- 播放中：旋转唱片 + 音符 -->
        <div v-if="isPlaying" class="disc-spin">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(14,165,233,0.5)" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="4" stroke="rgba(14,165,233,0.8)" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="1.5" fill="#0ea5e9"/>
          </svg>
        </div>
        <!-- 未播放：音符图标 -->
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3" fill="rgba(14,165,233,0.3)"/>
          <circle cx="18" cy="16" r="3" fill="rgba(14,165,233,0.3)"/>
        </svg>
      </div>
      <!-- 音波扩散圈 -->
      <div v-if="isPlaying" class="pulse-ring"></div>
    </button>

    <!-- 展开面板 -->
    <Transition name="slide-up">
      <div v-if="expanded" class="player-body">
        <div class="player-info">
          <span class="player-title">{{ currentTrack.name }}</span>
          <span class="player-artist">{{ currentTrack.artist }}</span>
        </div>
        <div class="player-controls">
          <button @click="prevTrack" class="ctrl-btn" title="Previous">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button @click="togglePlay" class="ctrl-btn play-btn" :title="isPlaying ? 'Pause' : 'Play'">
            <svg v-if="!isPlaying" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </button>
          <button @click="nextTrack" class="ctrl-btn" title="Next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>
        <div class="volume-row">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/></svg>
          <input type="range" min="0" max="1" step="0.05" :value="volume" @input="setVolume($event.target.value)" class="volume-slider" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const expanded = ref(false)
const isPlaying = ref(false)
const volume = ref(0.1)
const currentIndex = ref(0)

const tracks = [
  { name: 'Deep Focus', artist: 'Lo-fi Radio' },
  { name: 'Cosmic Waves', artist: 'Space Ambient' },
  { name: 'Night Code', artist: 'Synthwave' },
]

const currentTrack = computed(() => tracks[currentIndex.value])

let audio = null

// Fab 按钮点击：第一次点击开始播放，之后切换面板
const handleFabClick = () => {
  if (!isPlaying.value) {
    startPlay()
  } else {
    expanded.value = !expanded.value
  }
}

const startPlay = () => {
  if (!audio) return
  if (!audio.src) {
    audio.src = 'https://streams.ilovemusic.de/iloveradio17.mp3'
  }
  audio.play().then(() => {
    isPlaying.value = true
  }).catch(() => {})
}

const tryAutoPlay = () => {
  if (!audio || isPlaying.value) return
  startPlay()
  if (isPlaying.value) {
    document.removeEventListener('click', tryAutoPlay)
    document.removeEventListener('touchstart', tryAutoPlay)
  }
}

onMounted(() => {
  audio = new Audio()
  audio.volume = volume.value
  audio.loop = true
  // 尝试自动播放（桌面端首次交互后触发）
  tryAutoPlay()
  document.addEventListener('click', tryAutoPlay)
  document.addEventListener('touchstart', tryAutoPlay)
})

const togglePlay = () => {
  if (!audio) return
  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
  } else {
    startPlay()
  }
}

const setVolume = (val) => {
  volume.value = parseFloat(val)
  if (audio) audio.volume = volume.value
}

const nextTrack = () => {
  currentIndex.value = (currentIndex.value + 1) % tracks.length
}

const prevTrack = () => {
  currentIndex.value = (currentIndex.value - 1 + tracks.length) % tracks.length
}

onUnmounted(() => {
  if (audio) { audio.pause(); audio = null }
  document.removeEventListener('click', tryAutoPlay)
  document.removeEventListener('touchstart', tryAutoPlay)
})
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 100;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 8px;
}

/* ===== 精致浮动按钮 ===== */
.player-fab {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(8, 15, 30, 0.85);
  border: 1px solid rgba(14, 165, 233, 0.12);
  backdrop-filter: blur(16px);
  color: rgba(14, 165, 233, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  overflow: visible;
}

.player-fab:hover {
  border-color: rgba(14, 165, 233, 0.3);
  color: #0ea5e9;
  transform: scale(1.08);
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.player-fab.playing {
  border-color: rgba(14, 165, 233, 0.25);
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.12), 0 2px 16px rgba(0, 0, 0, 0.3);
}

.fab-ring {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 1.5px solid transparent;
  border-top-color: rgba(14, 165, 233, 0.4);
  opacity: 0;
  transition: opacity 0.3s;
}

.player-fab.playing .fab-ring {
  opacity: 1;
  animation: ring-rotate 3s linear infinite;
}

@keyframes ring-rotate {
  to { transform: rotate(360deg); }
}

.fab-icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 旋转唱片 */
.disc-spin {
  animation: disc-rotate 3s linear infinite;
}

@keyframes disc-rotate {
  to { transform: rotate(360deg); }
}

/* 呼吸扩散圈 */
.pulse-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(14, 165, 233, 0.2);
  animation: pulse-out 2s ease-out infinite;
  pointer-events: none;
}

@keyframes pulse-out {
  0% { transform: scale(0.9); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* ===== 展开面板 ===== */
.player-body {
  background: rgba(8, 15, 30, 0.92);
  border: 1px solid rgba(14, 165, 233, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 14px;
  padding: 14px 16px;
  min-width: 210px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 1px rgba(14, 165, 233, 0.1);
}

.player-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.player-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

.player-artist {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 10px;
}

.ctrl-btn {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 4px;
  transition: color 0.15s;
  display: flex;
}

.ctrl-btn:hover { color: var(--color-text); }

.play-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(14, 165, 233, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.18) !important;
  color: #0ea5e9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn:hover {
  background: rgba(14, 165, 233, 0.14);
  color: #22d3ee;
}

.volume-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-tertiary);
}

.volume-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  background: rgba(100, 160, 220, 0.12);
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  background: #0ea5e9;
  border-radius: 50%;
  cursor: pointer;
}

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(8px) scale(0.95); }

@media (max-width: 768px) {
  .music-player { bottom: 16px; left: 16px; }
  .player-fab { width: 40px; height: 40px; }
}
</style>
