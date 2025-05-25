'use client';

import { Clock as ClockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Clock() {
  const [time, setTime] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="easy-in-out grid grid-rows-[auto_1fr] gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10">
      <div className="flex items-center gap-2">
        <ClockIcon className="text-lg text-neutral-800 dark:text-neutral-100/70" />
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('time.clock.title')}</h1>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p className="text-neutral-800 dark:text-neutral-100">{time}</p>
        <p className="text-[12px] text-neutral-700 opacity-80 sm:text-[14px] dark:text-neutral-300">
          {t('time.clock.timezone')}
        </p>
      </div>
    </div>
  );
} 