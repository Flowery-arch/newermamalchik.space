import type { Metadata, Viewport } from 'next'

// Базовые метаданные для всех языков
const baseMetadata: Metadata = {
  applicationName: 'newermamalchik portfolio',
  authors: [{ name: 'newermamalchik', url: 'https://neweramamalchik.space' }],
  creator: 'newermamalchik',
  publisher: 'newermamalchik',
  metadataBase: new URL('https://neweramamalchik.space'),
  alternates: {
    languages: {
      'en-US': '/en',
      'ru-RU': '/ru',
      'ja-JP': '/ja',
    },
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'SIMg_VuH-oGhs7O2maxxffI1K2W_gUhVUV-jd-wO2q4',
    yandex: '57626dcbaf3650bf',
  },
  category: 'technology',
  classification: 'Personal Portfolio',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

// Выносим viewport в отдельный экспорт согласно документации Next.js
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

// Метаданные для разных языков
export const metadata: Metadata = {
  ...baseMetadata,
  // Общие метаданные с запасными значениями на русском
  title: {
    default: 'Портфолио · newermamalchik',
    template: '%s · newermamalchik',
  },
  description:
    'Портфолио веб-разработчика TypeScript (Vue/Next.js). Здесь вы можете ознакомиться с моими проектами, навыками и узнать больше обо мне. Также работаю с Java для модификаций игр.',
  keywords: [
    'newermamalchik',
    'веб-разработчик',
    'typescript',
    'next.js',
    'vue.js',
    'nuxt.js',
    'фронтенд',
    'бэкенд',
    'портфолио',
    'разработка',
    'javascript',
    'java',
    'модинг',
    'discord bot',
    'web developer',
    'frontend developer',
    'fullstack developer',
    'react',
    'tailwind css',
    'russian developer',
    'portfolio website',
    'михаил',
    'mikhail',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US', 'ja_JP'],
    url: 'https://newermamalchik.space',
    title: 'Портфолио · newermamalchik',
    description:
      'Портфолио веб-разработчика TypeScript (Vue/Next.js). Здесь вы можете ознакомиться с моими проектами, навыками и узнать больше обо мне. Также работаю с Java для модификаций игр.',
    siteName: 'newermamalchik портфолио',
    images: [
      {
        url: 'https://neweramamalchik.space/og-image.png',
        width: 1200,
        height: 630,
        alt: 'newermamalchik Portfolio Preview - TypeScript/Vue.js Developer',
        type: 'image/png',
      },
      {
        url: 'https://neweramamalchik.space/og-image-square.png',
        width: 400,
        height: 400,
        alt: 'newermamalchik Portfolio Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@newermamalchik',
    creator: '@newermamalchik',
    title: 'Портфолио · newermamalchik',
    description:
      'Портфолио веб-разработчика TypeScript (Vue/Next.js). Здесь вы можете ознакомиться с моими проектами, навыками и узнать больше обо мне. Также работаю с Java для модификаций игр.',
    images: ['https://newermamalchik.space/og-image.png'],
  },
  // Локализованные теги для разных языков для поисковиков
  other: {
    'google-site-verification': 'SIMg_VuH-oGhs7O2maxxffI1K2W_gUhVUV-jd-wO2q4',
    'yandex-verification': '57626dcbaf3650bf',
    'mailru-domain': 'ZEoAdyuq15QJVaAn',
    'msvalidate.01': 'your-bing-verification-code',
    'fb:app_id': 'your-facebook-app-id',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#0a0a0a',
    'msapplication-TileColor': '#0a0a0a',
    'msapplication-config': '/browserconfig.xml',
    'format-detection': 'telephone=no',
    referrer: 'origin-when-cross-origin',
    'color-scheme': 'dark light',
    'supported-color-schemes': 'dark light',
  },
}
