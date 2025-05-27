'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-3 sm:py-4 text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-600 fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
      {t('footer.copyright')}
    </footer>
  );
} 