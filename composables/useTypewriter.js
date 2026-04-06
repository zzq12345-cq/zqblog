export function useTypewriter(text, speed = 80) {
  const displayed = ref('')
  const done = ref(false)

  onMounted(() => {
    let i = 0
    const type = () => {
      if (i < text.length) {
        displayed.value += text.charAt(i)
        i++
        setTimeout(type, speed + Math.random() * 40)
      } else {
        done.value = true
      }
    }
    // 小延迟让页面先渲染
    setTimeout(type, 600)
  })

  return { displayed, done }
}
