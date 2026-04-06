export const useTheme = () => {
  const theme = useState('theme', () => 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
  }

  const setTheme = (value) => {
    theme.value = value
    localStorage.setItem('theme', value)
  }

  const isDark = computed(() => theme.value === 'dark')

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  }
}
