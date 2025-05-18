'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      className="fixed top-4 right-4 p-2 rounded-xl bg-neutral-100/20 px-4 py-2 ring-2 ring-neutral-400/30 transition-all duration-500 
        hover:scale-[0.98] hover:opacity-80 active:scale-95 active:opacity-90 
        dark:bg-neutral-900/20 dark:ring-neutral-700/30
        text-neutral-800 dark:text-neutral-200"
      aria-label="Toggle language"
    >
      {t('languageToggle')}
    </button>
  );
} 