'use client';

import { useEffect, useState } from 'react';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Weather from '@/components/Weather';
import TimeClock from '@/components/time.clock';
import WakaTime from '@/components/WakaTime';
import Music from '@/components/Music';
import Course from '@/components/course';
import RandomQuote from '@/components/RandomQuote';
import ToolsAndTechnologies from '@/components/ToolsAndTechnologies';
import AnimatedBackground from '@/components/AnimatedBackground';
import ThemeTransition from '@/components/ThemeTransition';
import { useLanguage } from '@/contexts/LanguageContext';
import { useParallax } from '@/hooks/useParallax';

export default function Home() {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const parallaxOffset = useParallax(0.1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col relative">
      <AnimatedBackground />
      <ThemeTransition />
      
      <div className="flex-grow flex items-center py-4 sm:py-8 md:py-12">
        <div 
          className="mx-auto w-full max-w-[1600px] px-3 sm:px-6 md:px-8 scale-95 sm:scale-90 mt-4 sm:mt-8 md:mt-16"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
              {/* Music */}
              <div className={`w-full transition-all duration-500 ease-in-out hover:animate-float ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Music />
              </div>
              {/* Weather, Clock, WakaTime */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
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
                <div className={`transition-all duration-500 ease-in-out hover:animate-float xs:col-span-2 sm:col-span-1 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <WakaTime />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div className={`transition-all duration-500 ease-in-out hover:animate-float h-full ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <Projects />
              </div>
              {/* Placeholder for Discord Status and Exchange Rates */}
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                {/* Placeholder: Discord Status */}
                <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <RandomQuote />
                </div>
                {/* Exchange Rates Chart */}
                <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="rounded-xl p-4 sm:p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10">
                    <Course />
                  </div>
                </div>
                {/* Tools and Technologies Block */}
                <div className={`transition-all duration-500 ease-in-out hover:animate-float ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <ToolsAndTechnologies />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full py-3 sm:py-4 md:py-6 text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-600">
        {t('footer.copyright')}
      </footer>
    </main>
  );
} 