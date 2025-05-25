'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { GamepadIcon, RefreshCw } from 'lucide-react';

interface SteamTimeData {
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  isOnline: boolean;
  gameName?: string;
  loading: boolean;
  error: boolean;
}

export default function ComputerTime() {
  const { t, language } = useLanguage();
  const [timeSpent, setTimeSpent] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActiveHours, setIsActiveHours] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [gameName, setGameName] = useState('Counter-Strike 2');
  
  // Состояние для данных из Steam API
  const [steamData, setSteamData] = useState<SteamTimeData>({
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
    isOnline: false,
    gameName: 'Counter-Strike 2',
    loading: true,
    error: false
  });
  
  // Проверка на админа (простая - по спец. комбинации клавиш)
  useEffect(() => {
    let keys: string[] = [];
    const adminCode = 'adminreset';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > adminCode.length) {
        keys = keys.slice(-adminCode.length);
      }
      
      const typed = keys.join('');
      if (typed === adminCode) {
        setIsAdmin(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Функция для получения данных из Steam API
  useEffect(() => {
    const fetchSteamData = async () => {
      try {
        const response = await fetch('/api/steam-time');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setSteamData({
              totalHours: data.totalHours,
              totalMinutes: data.totalMinutes,
              totalSeconds: data.totalSeconds || 0,
              isOnline: data.isOnline,
              gameName: data.gameName || 'Counter-Strike 2',
              loading: false,
              error: false
            });
            
            // Обновляем общее время для отображения
            setTimeSpent({
              hours: data.totalHours,
              minutes: data.totalMinutes,
              seconds: data.totalSeconds || 0
            });
            
            // Устанавливаем название игры
            setGameName(data.gameName || 'Counter-Strike 2');
            
            // Устанавливаем индикатор активности на основе статуса в Steam
            setIsActiveHours(data.isOnline);
          } else {
            setSteamData(prev => ({ ...prev, loading: false, error: true }));
          }
        } else {
          setSteamData(prev => ({ ...prev, loading: false, error: true }));
        }
      } catch (error) {
        console.error('Ошибка при запросе данных Steam:', error);
        setSteamData(prev => ({ ...prev, loading: false, error: true }));
      }
    };
    
    // Вызываем функцию сразу при монтировании компонента
    fetchSteamData();
    
    // Обновляем данные каждые 5 минут
    const interval = setInterval(fetchSteamData, 300000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Проверка текущего времени MSK для индикатора активности (если данные из Steam недоступны)
  useEffect(() => {
    if (steamData.error) {
      const checkMoscowTime = () => {
        const now = new Date();
        const moscowHour = (now.getUTCHours() + 3) % 24; // МСК = UTC+3
        setIsActiveHours(moscowHour >= 9 && moscowHour < 21);
      };
      
      checkMoscowTime();
      const interval = setInterval(checkMoscowTime, 60000); // Проверяем каждую минуту
      
      return () => clearInterval(interval);
    }
  }, [steamData.error]);
  
  // Функция сброса времени (только для админа)
  const resetTime = async () => {
    if (!isAdmin) return;
    
    setResetting(true);
    try {
      // Показываем уведомление об успешном сбросе
      setShowResetSuccess(true);
      setTimeout(() => {
        setShowResetSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Ошибка при сбросе времени:', error);
    } finally {
      setResetting(false);
    }
  };
  
  // Форматирование времени с учетом языка
  const formattedTime = () => {
    const format = t('codding.format')
      .replace('{hours}', timeSpent.hours.toString())
      .replace('{minutes}', timeSpent.minutes.toString())
      .replace('{seconds}', timeSpent.seconds.toString());
    
    return format;
  };

  // Стиль для бейджа активности
  const badgeStyle = isActiveHours ? 
    "bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-600 dark:text-emerald-300 ring-1 ring-emerald-500/40 shadow-sm" : 
    "bg-gradient-to-r from-red-500/30 to-orange-500/30 text-red-600 dark:text-red-300 ring-1 ring-red-500/40 shadow-sm";

  return (
    <div className="easy-in-out relative grid gap-2 rounded-xl p-4 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 dark:bg-neutral-900/10 dark:ring-neutral-300/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GamepadIcon className="text-lg text-neutral-800 dark:text-neutral-100/70" size={18} />
          <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">cs2.time</h1>
          <span 
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium tracking-wide ${badgeStyle}`}
            title={isActiveHours ? t('codding.active') : t('codding.inactive')}
          >
            {isActiveHours ? t('cs2.online') : t('cs2.offline')}
          </span>
        </div>
        {isAdmin && (
          <button
            onClick={resetTime}
            disabled={resetting}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            title={t('codding.reset')}
          >
            <RefreshCw size={16} className={resetting ? 'animate-spin' : ''} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {steamData.loading ? (
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
        ) : (
          <span className="text-2xl font-medium tracking-tight text-neutral-800 dark:text-neutral-100/70">
            {formattedTime()}
          </span>
        )}
      </div>
      
      {/* Уведомление об успешном сбросе */}
      {showResetSuccess && (
        <div className="fixed bottom-4 left-1/2 z-50 transform animate-fade-in-out rounded-md bg-green-500 px-4 py-2 text-sm text-white shadow-lg">
          {t('codding.resetSuccess')}
        </div>
      )}
    </div>
  );
} 