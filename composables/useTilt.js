export function useTilt(options = {}) {
  const { max = 8, speed = 400, glare = true } = options
  const el = ref(null)
  const style = ref({})

  onMounted(() => {
    if (!el.value) return
    const node = el.value

    const onMove = (e) => {
      const rect = node.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotateX = (0.5 - y) * max * 2
      const rotateY = (x - 0.5) * max * 2

      style.value = {
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      }

      // 光泽
      if (glare && node.querySelector('.tilt-glare')) {
        const glareEl = node.querySelector('.tilt-glare')
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90
        glareEl.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.12) 0%, transparent 60%)`
        glareEl.style.opacity = Math.max(x, y) * 0.8
      }
    }

    const onLeave = () => {
      style.value = {
        transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      }
      if (glare && node.querySelector('.tilt-glare')) {
        node.querySelector('.tilt-glare').style.opacity = 0
      }
    }

    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', onLeave)

    onUnmounted(() => {
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', onLeave)
    })
  })

  return { el, style }
}
