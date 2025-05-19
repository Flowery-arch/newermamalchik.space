'use client';

import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Weather from '@/components/Weather';
import Clock from '@/components/Clock';
import WakaTime from '@/components/WakaTime';
import Spotify from '@/components/Spotify';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col">
      <div className="flex-grow flex items-center py-6 sm:py-12">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 scale-90 mt-8 sm:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Spotify */}
              <div className="w-full transition duration-300 ease-in-out hover:scale-101">
                <Spotify />
              </div>
              {/* Weather, Clock, WakaTime */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 transition duration-300 ease-in-out hover:scale-101">
                <Clock />
                <Weather />
                <WakaTime />
              </div>
              {/* About */}
              <div className="transition duration-300 ease-in-out hover:scale-101">
                <About />
              </div>
            </div>

            {/* Right Column - Projects and Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition duration-300 ease-in-out hover:scale-101">
              <Projects />
              <Skills />
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full py-4 sm:py-6 text-center text-sm text-neutral-500 dark:text-neutral-600">
        {t('footer.copyright')}
      </footer>
    </main>
  );
} 