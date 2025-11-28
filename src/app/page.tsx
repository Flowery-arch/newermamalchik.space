'use client'

import { useEffect, useState, useMemo, Suspense } from 'react'
import dynamic from 'next/dynamic'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import ThemeTransition from '@/components/ui/ThemeTransition'
import { useLanguage } from '@/contexts/LanguageContext'
import { useParallax } from '@/lib/useParallax'
import FallingSymbols from '@/components/ui/FallingSymbols'
import { motion, AnimatePresence } from 'framer-motion'
import JsonLdSchema from '@/utils/JsonLdSchema'
import DynamicTitle from '@/components/features/DynamicTitle'

// Динамически загружаем компоненты для лучшей производительности
const Weather = dynamic(() => import('@/components/features/Weather'), {
  loading: () => (
    <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-24' />
  ),
  ssr: false,
})

const TimeClock = dynamic(() => import('@/components/features/Clock'), {
  loading: () => (
    <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-24' />
  ),
  ssr: false,
})

const ExchangeRates = dynamic(() => import('@/components/features/ExchangeRates'), {
  loading: () => (
    <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-24' />
  ),
  ssr: false,
})

const Music = dynamic(() => import('@/components/features/Music'), {
  loading: () => (
    <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-32' />
  ),
  ssr: false,
})

const RandomQuote = dynamic(() => import('@/components/features/RandomQuote'), {
  loading: () => (
    <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-24' />
  ),
  ssr: false,
})

const GitHubStats = dynamic(() => import('@/components/features/GitHubStats'), {
  loading: () => (
    <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-32' />
  ),
  ssr: false,
})

export default function Home() {
  const { t, language } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showTetris, setShowTetris] = useState(false)
  const parallaxOffset = useParallax(0.1)

  useEffect(() => {
    setIsLoaded(true)

    // Предзагружаем критически важные ресурсы
    const preloadResources = async () => {
      // Предзагружаем изображения
      const img = new Image()
      img.src =
        'https://cdn.discordapp.com/avatars/660534347429969931/a_95eb00e5856ddb138696fe51c6ea21be?size=1024'
    }

    preloadResources()
  }, [])

  // Мемоизируем анимационные варианты
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  )

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      },
    }),
    [],
  )

  return (
    <main className='min-h-screen bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#1a1a1a] flex flex-col relative overflow-x-hidden'>
      <JsonLdSchema />
      <DynamicTitle
        titleRu='Портфолио · newermamalchik'
        titleEn='Portfolio · newermamalchik'
        titleJa='ポートフォリオ · newermamalchik'
      />

      <Suspense fallback={<div className='fixed inset-0 bg-white dark:bg-[#0a0a0a] z-50' />}>
        <FallingSymbols />
        <ThemeTransition />
      </Suspense>

      <div className='w-full relative flex justify-center'>
        <AnimatePresence mode='wait'>
          {/* Первая страница - Основной контент */}
          {!showTetris && (
            <motion.div
              key='homepage'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className='w-full flex flex-col flex-grow py-6 sm:py-8 md:py-10 lg:py-12 items-start md:items-center pb-16 sm:pb-20'
            >
              <motion.div
                className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
                mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8 2xl:mt-10
                scale-[0.98] sm:scale-100 md:scale-[1.02] lg:scale-[1.05] xl:scale-[1.08] 2xl:scale-[1.1]'
                style={{ transform: `translateY(${parallaxOffset}px)` }}
                variants={containerVariants}
                initial='hidden'
                animate='visible'
              >
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  {/* Левая колонка */}
                  <div className='flex flex-col gap-6'>
                    {/* About - перемещаем наверх для лучшей иерархии */}
                    <motion.div
                      variants={itemVariants}
                      className='transition-all duration-500 ease-in-out hover:animate-float hover:scale-[1.02] active:scale-[0.98]'
                    >
                      <About />
                    </motion.div>

                    {/* Music */}
                    <motion.div
                      variants={itemVariants}
                      className='w-full transition-all duration-500 ease-in-out hover:animate-float hover:scale-[1.02] active:scale-[0.98]'
                    >
                      <Suspense
                        fallback={
                          <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-32' />
                        }
                      >
                        <Music />
                      </Suspense>
                    </motion.div>

                    {/* Weather, Clock, ExchangeRates в одном ряду */}
                    <motion.div
                      variants={itemVariants}
                      className='grid grid-cols-1 sm:grid-cols-3 gap-6'
                    >
                      <div className='transition-all duration-500 ease-in-out hover:animate-float hover:scale-[1.02] active:scale-[0.98]'>
                        <Suspense
                          fallback={
                            <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-24' />
                          }
                        >
                          <TimeClock />
                        </Suspense>
                      </div>
                      <div className='transition-all duration-500 ease-in-out hover:animate-float hover:scale-[1.02] active:scale-[0.98]'>
                        <Suspense
                          fallback={
                            <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-24' />
                          }
                        >
                          <Weather />
                        </Suspense>
                      </div>
                      <div className='transition-all duration-500 ease-in-out hover:animate-float hover:scale-[1.02] active:scale-[0.98]'>
                        <Suspense
                          fallback={
                            <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-24' />
                          }
                        >
                          <ExchangeRates />
                        </Suspense>
                      </div>
                    </motion.div>
                  </div>

                  {/* Правая колонка */}
                  <div className='flex flex-col gap-6'>
                    {/* Первый ряд: Projects и GitHub Stats */}
                    <motion.div variants={itemVariants} className='grid grid-cols-1 gap-6'>
                      <div className='transition-all duration-500 ease-in-out hover:animate-float hover:scale-[1.02] active:scale-[0.98]'>
                        <Projects />
                      </div>
                      <div className='transition-all duration-500 ease-in-out hover:animate-float hover:scale-[1.02] active:scale-[0.98]'>
                        <Suspense
                          fallback={
                            <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-32' />
                          }
                        >
                          <GitHubStats />
                        </Suspense>
                      </div>
                    </motion.div>

                    {/* Второй ряд: RandomQuote */}
                    <motion.div
                      variants={itemVariants}
                      className='transition-all duration-500 ease-in-out hover:animate-float hover:scale-[1.02] active:scale-[0.98]'
                    >
                      <Suspense
                        fallback={
                          <div className='animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-xl h-24' />
                        }
                      >
                        <RandomQuote />
                      </Suspense>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Вторая страница - Тетрис Демо */}
          {showTetris && (
            <motion.div
              key='tetrispage'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6'
            >
              <div className='w-full max-w-lg mx-auto'>{/* Здесь будет тетрис */}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className='flex justify-center py-5 mt-auto'>
        <motion.p
          className='text-center text-sm font-semibold text-neutral-601 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-300'
          initial={{ opacity: -1, y: 20 }}
          animate={{ opacity: 0, y: 0 }}
          transition={{ delay: 0, duration: 0.5 }}
        >
          © 2024–2026 newermamalchik. Все права защищены. Несанкционированная загрузка, копирование
          или редактирование запрещены.
        </motion.p>
      </footer>
    </main>
  )
}
