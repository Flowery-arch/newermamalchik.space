import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'newer__ | Портфолио',
  description: 'Портфолио разработчика newer__',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Science+Gothic:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="body">
        {children}
      </body>
    </html>
  )
}

