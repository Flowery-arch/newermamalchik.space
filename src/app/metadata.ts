import type { Metadata, Viewport } from "next";

// Базовые метаданные для всех языков
const baseMetadata: Metadata = {
  applicationName: "newermamalchik portfolio",
  authors: [{ name: "newermamalchik" }],
  creator: "newermamalchik",
  publisher: "newermamalchik",
  metadataBase: new URL("https://newermamalchik.space"),
  alternates: {
    languages: {
      'en-US': '/en',
      'ru-RU': '/ru',
    },
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "SIMg_VuH-oGhs7O2maxxffI1K2W_gUhVUV-jd-wO2q4",
    yandex: "57626dcbaf3650bf",
  },
  category: "technology",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon.ico', sizes: 'any' }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest'
      }
    ]
  },
  manifest: '/site.webmanifest',
};

// Выносим viewport в отдельный экспорт согласно документации Next.js
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
};

// Метаданные для разных языков
export const metadata: Metadata = {
  ...baseMetadata,
  // Общие метаданные с запасными значениями на русском
  title: {
    default: "Портфолио · newermamalchik",
    template: "%s · newermamalchik"
  },
  description: "Портфолио веб-разработчика TypeScript (Vue/Next.js). Здесь вы можете ознакомиться с моими проектами, навыками и узнать больше обо мне. Также работаю с Java для модификаций игр.",
  keywords: [
    "newermamalchik", 
    "веб-разработчик",
    "typescript",
    "next.js",
    "vue.js",
    "фронтенд",
    "бэкенд",
    "портфолио",
    "разработка",
    "javascript",
    "java",
    "модинг",
    "discord bot"
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
    url: "https://newermamalchik.space",
    title: "Портфолио · newermamalchik",
    description: "Портфолио веб-разработчика TypeScript (Vue/Next.js). Здесь вы можете ознакомиться с моими проектами, навыками и узнать больше обо мне. Также работаю с Java для модификаций игр.",
    siteName: "newermamalchik портфолио",
    images: [
      {
        url: "https://newermamalchik.space/og-image.png", // Это нужно создать и разместить в папке public
        width: 1200,
        height: 630,
        alt: "newermamalchik Portfolio Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Портфолио · newermamalchik",
    description: "Портфолио веб-разработчика TypeScript (Vue/Next.js). Здесь вы можете ознакомиться с моими проектами, навыками и узнать больше обо мне. Также работаю с Java для модификаций игр.",
    images: ["https://newermamalchik.space/og-image.png"],
  },
  // Локализованные теги для разных языков для поисковиков
  other: {
    'google-site-verification': 'verification_token', // Замените на свой
    'mailru-domain': 'ZEoAdyuq15QJVaAn',
  },
}; 