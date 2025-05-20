'use client';

import { HelpCircle, Languages, Moon, Sun, User } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TypingText from './TypingText';

export default function About() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="easy-in-out grid grid-rows-[auto_1fr] gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10">
      <div className="flex items-center gap-2">
        <User
          className="text-lg text-neutral-800 dark:text-neutral-100/70"
          size={18}
        />
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('about.md')}</h1>
      </div>
      
      <div className="flex items-center gap-6 w-full flex-col sm:flex-row">
        <div className="relative aspect-square w-32 sm:w-40 overflow-hidden rounded-full shrink-0">
          <div className="absolute inset-[-8px] -z-10">
            <div className="h-full w-full animate-pulse rounded-full bg-purple-500/40 blur-xl"></div>
          </div>
          <Image
            src="https://cdn.discordapp.com/avatars/660534347429969931/a_95eb00e5856ddb138696fe51c6ea21be?size=1024"
            alt="avatar"
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            quality={100}
            priority
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-baseline gap-2 justify-center sm:justify-start">
            <TypingText 
              text={`${t('about.greeting')} ${t('about.name')}`} 
              className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-200" 
              nameHighlight={t('about.name')}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
            <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="button-base text-sm hover:underline">
              TypeScript
            </a>
            <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer" className="button-base text-sm hover:underline">
              Vue
            </a>
            <a href="https://nuxt.com/" target="_blank" rel="noopener noreferrer" className="button-base text-sm hover:underline">
              Nuxt
            </a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="button-base text-sm hover:underline">
              Tailwind
            </a>
          </div>
          <p className="text-sm sm:text-md text-neutral-800 dark:text-neutral-200 mt-2">{t('about.description')}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <a
          href="https://t.me/mkphotoss"
          target="_blank"
          rel="noopener noreferrer"
          className="button-base flex items-center gap-2"
          title="Telegram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 icon-primary opacity-70"><path d="M9.036 16.569l-.398 4.013c.57 0 .818-.246 1.117-.543l2.68-2.557 5.557 4.06c1.018.561 1.74.266 1.99-.941l3.61-16.84c.33-1.545-.561-2.15-1.55-1.78L1.36 9.23c-1.51.59-1.49 1.44-.258 1.82l4.13 1.29 9.57-6.04c.45-.29.86-.13.52.16" fill="currentColor"/></svg>
          <span className="font-semibold text-primary">{t('about.contact')}</span>
        </a>
        <a
          href="https://discord.com/users/660534347429969931"
          target="_blank"
          rel="noopener noreferrer"
          className="button-base flex items-center justify-center p-2 w-10 h-10"
          title="Discord"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 icon-primary opacity-50"><path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.112.112 0 0 0-.119.056c-.516.909-1.096 2.096-1.504 3.037a17.876 17.876 0 0 0-5.362 0c-.408-.941-.988-2.128-1.504-3.037a.115.115 0 0 0-.119-.056A19.736 19.736 0 0 0 3.683 4.369a.104.104 0 0 0-.047.043C.533 9.043-.32 13.579.099 18.057a.117.117 0 0 0 .045.082c2.053 1.507 4.042 2.422 5.993 3.029a.112.112 0 0 0 .123-.041c.461-.63.873-1.295 1.226-1.994a.112.112 0 0 0-.061-.155c-.652-.247-1.27-.549-1.872-.892a.112.112 0 0 1-.011-.186c.126-.094.252-.192.372-.291a.112.112 0 0 1 .114-.013c3.927 1.793 8.18 1.793 12.062 0a.112.112 0 0 1 .115.012c.12.099.246.197.372.291a.112.112 0 0 1-.01.186 12.298 12.298 0 0 1-1.873.893.112.112 0 0 0-.06.154c.36.699.772 1.364 1.227 1.994a.112.112 0 0 0 .123.041c1.951-.607 3.94-1.522 5.993-3.029a.115.115 0 0 0 .045-.082c.5-5.177-.838-9.673-3.237-13.645a.104.104 0 0 0-.047-.043ZM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419Zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.174 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419Z" fill="currentColor"/></svg>
        </a>
        <button
          className="button-base flex items-center gap-2"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <div className="relative flex items-center justify-center px-2">
            <Sun className={`absolute text-xl icon-primary transition-opacity duration-500 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`} />
            <Moon className={`absolute text-xl icon-primary transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <p className="font-semibold text-primary">
            {t(`about.theme.${theme === 'dark' ? 'dark' : 'light'}`)}
          </p>
        </button>

        <button 
          className="button-base w-fit"
          onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
        >
          <div className="flex items-center gap-2">
            <Languages className="text-xl icon-primary" />
            <p className="font-semibold text-primary">{t('languageToggle')}</p>
          </div>
        </button>
      </div>
    </div>
  );
} 