// use client directive is recommended for components using hooks like useState/useEffect
'use client';

import React, { useEffect, useState } from 'react';
import { LucideMessageSquareQuote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Общее количество цитат
const QUOTES_COUNT = 20;

const RandomQuote: React.FC = () => {
  const { language, t } = useLanguage();
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const getMoscowTimeDate = () => {
      const now = new Date();
      // Get UTC milliseconds and add milliseconds for UTC+3 (Moscow time)
      const moscowTimeMilliseconds = now.getTime() + (3 * 60 * 60 * 1000) + now.getTimezoneOffset() * 60 * 1000;
      return new Date(moscowTimeMilliseconds);
    };

    const selectDailyQuote = () => {
      const moscowDate = getMoscowTimeDate();
      // Use the day of the year (or a simple combination of year and day) as a seed
      // This ensures the same quote for the same day MSK
      const startOfYear = new Date(moscowDate.getUTCFullYear(), 0, 0);
      const dayOfYear = Math.floor((moscowDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
      const seed = moscowDate.getUTCFullYear() * 1000 + dayOfYear; // Simple deterministic seed

      // Simple pseudo-random index based on the seed
      const pseudoRandom = (seed * 9301 + 49297) % 233280;
      const randomIndex = Math.floor(pseudoRandom / (233280 / QUOTES_COUNT)) + 1; // Индексы начинаются с 1
      
      setQuoteIndex(randomIndex);
    };

    const setDailyQuoteTimer = () => {
      const nowMSK = getMoscowTimeDate();
      const tomorrowMSK = new Date(nowMSK);
      tomorrowMSK.setUTCDate(nowMSK.getUTCDate() + 1);
      tomorrowMSK.setUTCHours(0, 0, 0, 0);
      // Adjust to UTC time for setTimeout
      const tomorrowUTC = new Date(tomorrowMSK.getTime() - (3 * 60 * 60 * 1000));
      
      const timerId = setTimeout(() => {
        selectDailyQuote(); // Change the quote for the new day
        setDailyQuoteTimer(); // Set the timer for the next day
        // Reset countdown when quote changes
        startCountdown();
      }, tomorrowUTC.getTime() - new Date().getTime()); // Calculate time until next midnight UTC

      return timerId;
    };

    const startCountdown = () => {
      const nowMSK = getMoscowTimeDate();
      const tomorrowMSK = new Date(nowMSK);
      tomorrowMSK.setUTCDate(nowMSK.getUTCDate() + 1);
      tomorrowMSK.setUTCHours(0, 0, 0, 0);
      // Adjust to UTC time for calculation
      const tomorrowUTC = new Date(tomorrowMSK.getTime() - (3 * 60 * 60 * 1000));

      const initialTimeLeft = Math.max(0, Math.floor((tomorrowUTC.getTime() - new Date().getTime()) / 1000));
      setTimeLeft(initialTimeLeft);

      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      return intervalId;
    };

    // Select initial quote for the current day and set the daily timer
    selectDailyQuote();
    const dailyTimerId = setDailyQuoteTimer();
    const countdownIntervalId = startCountdown();

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(dailyTimerId);
      clearInterval(countdownIntervalId);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Получаем текущую цитату из переводов
  const getCurrentQuote = () => {
    if (quoteIndex >= 1 && quoteIndex <= QUOTES_COUNT) {
      return t(`quotes.list.quote${quoteIndex}`);
    }
    return "";
  };

  return (
    <div className="rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <LucideMessageSquareQuote className="text-lg text-neutral-800 dark:text-neutral-100/70" />
          <p className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('quotes.quoteJS')}</p>
          <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">
            {t('quotes.newQuote').replace('{time}', formatTime(timeLeft))}
          </span>
        </div>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
          "{getCurrentQuote()}"
        </p>
      </div>
    </div>
  );
};

export default RandomQuote; 