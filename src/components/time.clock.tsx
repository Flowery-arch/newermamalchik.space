'use client';

import { Clock as ClockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const languageTimezones: Record<string, { timeZone: string; label: string }> = {
  ru: { timeZone: 'Europe/Moscow', label: 'UTC+3 (Moscow)' },
  en: { timeZone: 'America/New_York', label: 'UTC-4 (New York)' },
  ja: { timeZone: 'Asia/Tokyo', label: 'UTC+9 (Tokyo)' },
};

export default function Clock() {
  const [time, setTime] = useState('');
  const { t, language } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tzInfo = languageTimezones[language] || languageTimezones['en'];
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: tzInfo.timeZone,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [language]);

  const tzLabel = languageTimezones[language]?.label || languageTimezones['en'].label;

  return (
    <div className="easy-in-out grid grid-rows-[auto_1fr] gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10">
      <div className="flex items-center gap-2">
        <ClockIcon className="text-lg text-neutral-800 dark:text-neutral-100/70" />
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('time.clock.title')}</h1>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p className="text-neutral-800 dark:text-neutral-100">{time}</p>
        <p className="text-[12px] text-neutral-700 opacity-80 sm:text-[14px] dark:text-neutral-300">
          {tzLabel}
        </p>
      </div>
    </div>
  );
}
