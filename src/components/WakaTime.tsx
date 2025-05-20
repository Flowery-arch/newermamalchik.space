'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function ComputerTime() {
  const { t, language } = useLanguage();
  const [timeSpent, setTimeSpent] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActiveHours, setIsActiveHours] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Функция для получения данных о времени за компьютером
  useEffect(() => {
    // Проверяем, есть ли уже сохраненное время начала
    let startTimestamp = localStorage.getItem('coding_start_time');
    
    // Если нет, создаем новое время начала и сохраняем его
    if (!startTimestamp) {
      startTimestamp = Date.now().toString();
      localStorage.setItem('coding_start_time', startTimestamp);
    }
    
    const startDate = new Date(parseInt(startTimestamp));
    
    const updateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();
      
      // Переводим миллисекунды в часы, минуты и секунды
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      setTimeSpent({ hours, minutes, seconds });
      
      // Проверяем текущее время МСК для индикатора активности
      const moscowHour = (now.getUTCHours() + 3) % 24; // МСК = UTC+3
      setIsActiveHours(moscowHour >= 9 && moscowHour < 21);
    };
    
    // Обновляем время каждую секунду
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Форматирование времени с учетом языка
  const formattedTime = () => {
    if (language === 'en') {
      return `${timeSpent.hours}h ${timeSpent.minutes}m ${timeSpent.seconds}s`;
    } else {
      return `${timeSpent.hours}ч ${timeSpent.minutes}м ${timeSpent.seconds}с`;
    }
  };

  // Цвет индикатора активности
  const statusColor = isActiveHours ? '#07b97a' : '#ef4444';

  return (
    <div className="easy-in-out grid gap-2 rounded-xl p-4 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10">
      <div className="flex items-center gap-2">
        <Clock className="text-lg text-neutral-800 dark:text-neutral-100/70" size={18} />
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('codding.time')}</h1>
      </div>
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="text-2xl animate-pulse current-color h-[1em] w-[2em]"
        >
          <path
            fill="none"
            d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray="256.58892822265625"
            strokeDashoffset="256.58892822265625"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="256.58892822265625"
              to="0"
              dur="2s"
              fill="freeze"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <div className="flex items-center gap-2">
          <span className="text-lg text-neutral-800 dark:text-neutral-100">
            {formattedTime()}
          </span>
          <div className="relative">
            <div 
              className="relative pointer-events-none"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <svg
                className="glowing-circle cursor-pointer"
                height="12"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <circle
                  cx="6"
                  cy="6"
                  r="3"
                  fill={statusColor}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                <div
                  className="size-8 rounded-full opacity-25 blur-[20px]"
                  style={{ backgroundColor: statusColor }}
                />
              </div>
            </div>
            {showTooltip && (
              <div className="absolute z-10 -right-2 bottom-full mb-2 w-48 p-2 text-xs rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-neutral-500/20 dark:ring-neutral-300/10">
                <p className="text-neutral-800 dark:text-neutral-200">
                  {isActiveHours ? t('codding.active') : t('codding.inactive')}
                </p>
                <div className="absolute -bottom-1 right-2 w-2 h-2 bg-white dark:bg-neutral-800 transform rotate-45 ring-1 ring-neutral-500/20 dark:ring-neutral-300/10"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 