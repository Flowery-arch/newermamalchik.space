'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { GamepadIcon, RefreshCw } from 'lucide-react';

interface SteamTimeData {
  totalHours: number;
  totalMinutes: number;
  isOnline: boolean;
  gameName?: string;
  loading: boolean;
  error: boolean;
}

export default function ComputerTime() {
  const { t, language } = useLanguage();
  const [timeSpent, setTimeSpent] = useState({ hours: 0, minutes: 0 });
  const [isActiveHours, setIsActiveHours] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [gameName, setGameName] = useState('Counter-Strike 2');
  
  // Состояние для данных из Steam API
  const [steamData, setSteamData] = useState<SteamTimeData>({
    totalHours: 0,
    totalMinutes: 0,
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
  
  // Подключение к SSE и получение обновлений в реальном времени
  useEffect(() => {
    // Начальная загрузка данных
    const fetchInitialData = async () => {
      try {
        const response = await fetch('/api/steam-time');
        const data = await response.json();
        if (data.success) {
          updateSteamData(data);
        }
      } catch (error) {
        console.error('Ошибка при начальной загрузке:', error);
        setSteamData(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    // Функция обновления данных
    const updateSteamData = (data: any) => {
      setSteamData({
        totalHours: data.totalHours,
        totalMinutes: data.totalMinutes,
        isOnline: data.isOnline,
        gameName: data.gameName || 'Counter-Strike 2',
        loading: false,
        error: false
      });
      
      setTimeSpent({
        hours: data.totalHours,
        minutes: data.totalMinutes
      });
      
      setGameName(data.gameName || 'Counter-Strike 2');
      setIsActiveHours(data.isOnline);
    };

    // Загружаем начальные данные
    fetchInitialData();

    // Устанавливаем SSE подключение
    const eventSource = new EventSource('/api/steam-time');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.success) {
          updateSteamData(data);
        }
      } catch (error) {
        console.error('Ошибка при обработке данных Steam:', error);
        setSteamData(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      setSteamData(prev => ({ ...prev, loading: false, error: true }));
      eventSource.close();
      
      // Если ошибка SSE, переключаемся на проверку по московскому времени
      const checkMoscowTime = () => {
        const now = new Date();
        const moscowHour = (now.getUTCHours() + 3) % 24; // МСК = UTC+3
        setIsActiveHours(moscowHour >= 9 && moscowHour < 21);
      };
      
      checkMoscowTime();
      const interval = setInterval(checkMoscowTime, 60000);
      return () => clearInterval(interval);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  
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
      .replace('{minutes}', timeSpent.minutes.toString());
    
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
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 text-neutral-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
            <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t('loading')}
            </span>
          </div>
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