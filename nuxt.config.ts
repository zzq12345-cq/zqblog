// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: '周志琪 | AI & 全栈开发者',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: '周志琪的个人主页 — AI & 全栈开发者，专注于人工智能、Web开发与嵌入式系统' },
        { name: 'author', content: 'Zhou Zhiqi' },
        { property: 'og:title', content: '周志琪 | AI & Full-Stack Developer' },
        { property: 'og:description', content: 'Personal portfolio of Zhou Zhiqi — AI & Full-Stack Developer' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://zzqxmu.com' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },

  css: [
    '~/assets/css/variables.css',
    '~/assets/css/base.css',
    '~/assets/css/animations.css',
  ],

  // 关闭路径前缀，让 components/layout/TheNavbar.vue 直接以 TheNavbar 使用
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
  },

  i18n: {
    locales: [
      { code: 'zh', name: '中文', file: 'zh.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'zh',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/projects': { prerender: true },
    '/blog': { prerender: true },
    '/contact': { prerender: true },
  },
})
