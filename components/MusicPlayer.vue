<template>
  <div class="music-player" :class="{ expanded }">
    <button class="player-toggle" @click="expanded = !expanded" :title="expanded ? 'Collapse' : 'Music'">
      <svg v-if="!isPlaying" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16"/>
      </svg>
      <div v-else class="bars">
        <span></span><span></span><span></span>
      </div>
    </button>

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

// Lo-fi tracks (free URLs)
const tracks = [
  { name: 'Deep Focus', artist: 'Lo-fi Chill', url: '' },
  { name: 'Cosmic Waves', artist: 'Space Ambient', url: '' },
  { name: 'Night Code', artist: 'Synthwave', url: '' },
]

const currentTrack = computed(() => tracks[currentIndex.value])

let audio = null

const tryAutoPlay = () => {
  if (!audio || isPlaying.value) return
  audio.src = 'https://streams.ilovemusic.de/iloveradio17.mp3'
  audio.play().then(() => {
    isPlaying.value = true
    // 首次交互后成功播放，移除监听
    document.removeEventListener('click', tryAutoPlay)
    document.removeEventListener('keydown', tryAutoPlay)
    document.removeEventListener('touchstart', tryAutoPlay)
  }).catch(() => {})
}

onMounted(() => {
  audio = new Audio()
  audio.volume = volume.value
  audio.loop = true

  // 浏览器要求至少一次用户交互才能自动播放
  // 尝试直接播放，失败则等待首次交互
  tryAutoPlay()
  document.addEventListener('click', tryAutoPlay, { once: false })
  document.addEventListener('keydown', tryAutoPlay, { once: false })
  document.addEventListener('touchstart', tryAutoPlay, { once: false })
})

const togglePlay = () => {
  if (!audio) return
  if (isPlaying.value) {
    audio.pause()
  } else {
    // Use a public lofi stream/track
    if (!audio.src) {
      audio.src = 'https://streams.ilovemusic.de/iloveradio17.mp3'
    }
    audio.play().catch(() => {})
  }
  isPlaying.value = !isPlaying.value
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

.player-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(10, 18, 38, 0.8);
  border: 1px solid rgba(14, 165, 233, 0.15);
  backdrop-filter: blur(12px);
  color: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.player-toggle:hover {
  border-color: rgba(14, 165, 233, 0.3);
  transform: scale(1.05);
  box-shadow: 0 0 16px rgba(14, 165, 233, 0.15);
}

/* Animated bars */
.bars {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 14px;
}

.bars span {
  width: 3px;
  background: #0ea5e9;
  border-radius: 1px;
  animation: bar-bounce 0.8s ease-in-out infinite;
}

.bars span:nth-child(1) { height: 6px; animation-delay: 0s; }
.bars span:nth-child(2) { height: 10px; animation-delay: 0.15s; }
.bars span:nth-child(3) { height: 4px; animation-delay: 0.3s; }

@keyframes bar-bounce {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.4); }
}

/* Body panel */
.player-body {
  background: rgba(10, 18, 38, 0.9);
  border: 1px solid rgba(14, 165, 233, 0.12);
  backdrop-filter: blur(16px);
  border-radius: 12px;
  padding: 14px 16px;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
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
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(14, 165, 233, 0.2) !important;
  color: #0ea5e9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn:hover {
  background: rgba(14, 165, 233, 0.15);
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
  background: rgba(100, 160, 220, 0.15);
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  background: #0ea5e9;
  border-radius: 50%;
  cursor: pointer;
}

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.2s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(8px); }

@media (max-width: 768px) {
  .music-player { bottom: 16px; left: 16px; }
  .player-toggle { width: 36px; height: 36px; }
}
</style>
