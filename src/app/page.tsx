'use client';

import { useEffect, useState } from 'react';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Weather from '@/components/Weather';
import TimeClock from '@/components/time.clock';
import ComputerTime from '@/components/WakaTime';
import Music from '@/components/Music';
import Course from '@/components/course';
import RandomQuote from '@/components/RandomQuote';
import ToolsAndTechnologies from '@/components/ToolsAndTechnologies';
import ThemeTransition from '@/components/ThemeTransition';
import SwipeIndicator from '@/components/SwipeIndicator';
import TetrisDemo from '@/components/TetrisDemo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParallax } from '@/hooks/useParallax';
import FallingSymbols from '@/components/FallingSymbols';
import { motion, AnimatePresence } from 'framer-motion';
import JsonLdSchema from '../components/JsonLdSchema';
import DynamicTitle from '../components/DynamicTitle';
import GitHubStats from '../components/GitHubStats';
import Footer from '../components/Footer';

export default function Home() {
  const { t, language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTetris, setShowTetris] = useState(false);
  const parallaxOffset = useParallax(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col relative overflow-hidden">
      <JsonLdSchema />
      <DynamicTitle 
        titleRu="Портфолио · newermamalchik" 
        titleEn="Portfolio · newermamalchik" 
        titleJa="ポートフォリオ · newermamalchik"
      />
      <SwipeIndicator onPageChange={setShowTetris} />
      
          <FallingSymbols />
          <ThemeTransition />
          
      <div className="w-full h-full relative flex justify-center">
        <AnimatePresence mode="wait">
          {/* Первая страница - Основной контент */}
          {!showTetris && (
          <motion.div
              key="homepage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full flex flex-col flex-grow py-4 sm:py-6 md:py-8 lg:py-12 items-start md:items-center pb-16 sm:pb-20"
          >
            <div 
                className="mx-auto w-full max-w-[1600px] px-3 sm:px-4 md:px-6 lg:px-8 mt-2 sm:mt-4 md:mt-8 lg:mt-12 scale-[0.98] sm:scale-100 md:scale-[1.02] lg:scale-[1.05] xl:scale-[1.08] 2xl:scale-[1.1]"
              style={{ transform: `translateY(${parallaxOffset}px)` }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-3 sm:gap-4 md:gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                  {/* Music */}
                  <div className={`w-full transition-all duration-500 ease-in-out hover:animate-float ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <Music />
                  </div>
                  {/* Weather, Clock, WakaTime */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <TimeClock />
                    </div>
                    <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <Weather />
                    </div>
                    <div className={`transition-all duration-500 ease-in-out hover:animate-float sm:col-span-2 md:col-span-1 ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                          <ComputerTime />
                    </div>
                  </div>
                  {/* About */}
                  <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <About />
                  </div>
                </div>

                {/* Right Column - Projects and Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {/* First column: Projects + GitHub Stats */}
                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                      <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <Projects />
                      </div>
                      <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <GitHubStats />
                      </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                    <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <RandomQuote />
                    </div>
                    <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="rounded-xl p-3 sm:p-4 md:p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10">
                        <Course />
                      </div>
                    </div>
                    <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <ToolsAndTechnologies />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          )}

          {/* Вторая страница - Тетрис Демо */}
          {showTetris && (
            <motion.div 
              key="tetrispage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
            >
              <div className="w-full max-w-lg mx-auto">
                <TetrisDemo />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Footer />
    </main>
  );
} 