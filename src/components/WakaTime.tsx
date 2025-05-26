'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

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
        <svg
          className="text-lg text-neutral-800 dark:text-neutral-100/70"
            width="18" 
            height="18" 
          viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9.103.435a1.753 1.753 0 0 1 1.652-.362c.218.072.406.203.609.333.16.101.348.145.493.261.072.058.014.16.014.232.189.45.29.942.13 1.42-.13.16-.362.203-.55.276-.03.203.043.39.072.594-.043.029-.072.058-.116.087.276-.015.551-.073.827-.13.101-.102.26-.044.39-.059.015-.203.088-.391.088-.594a.34.34 0 0 0 .116-.029c.014.145 0 .29.043.435.073.058.189.029.276.043 0 .058 0 .116.014.174 1.681-.014 3.377 0 5.058 0v.247h.16V2.42h.188c0 .26-.014.507 0 .768a.11.11 0 0 0 .073.029c0 .029.014.087.014.116.058-.058.13-.102.218-.073.014.044.029.087.043.145-.058.058-.087.13-.058.218.464.014.928 0 1.406 0 .044-.058.116-.087.189-.116a.464.464 0 0 1 .087.058h.68a.874.874 0 0 1 .015.333h-.696a.46.46 0 0 1-.087.073c-.072-.044-.13-.073-.202-.116h-1.261c-.247.072-.508.058-.754.014v.275H16.16a.532.532 0 0 1-.29.13c.044.218-.202.276-.29.436a.45.45 0 0 1-.231.174c-.073.449.087.87.203 1.29-.13.029-.276.072-.406.101-.073.29-.145.594-.203.884a.848.848 0 0 1-.507.58c-.174.203-.406.406-.682.42-.101.03-.174-.043-.246-.101-.362.029-.696-.145-1.015-.29-.347-.16-.666-.363-1-.55.03.202-.072.376-.145.55.16.072.377.13.464.304.058.13.116.276.116.435-.014.522-.072 1.044-.101 1.565.014.377-.174.754-.435 1.03-.174-.015-.319-.088-.478-.16-.058.13-.189.26-.116.42.058.189.058.392.145.566a6.674 6.674 0 0 1 1.217 1.753c.304.624.536 1.276.783 1.928.043 0 .13-.015.174-.015.058.189 0 .406.116.58.101.16.072.348.072.536-.029.435-.058.87-.101 1.305-.03.304-.102.609-.145.913.014.232.116.464.101.696-.014.217-.014.449-.188.608.014.493-.116.986.058 1.464.232.32.493.623.768.899.304.145.667.174.928.435.1.16.043.347.014.521a6.732 6.732 0 0 1-1.87 0c-.246-.058-.478-.159-.724-.188-.334.014-.725.145-1.03-.087-.028-.391.117-.768.189-1.145.029-.13.16-.217.145-.348-.03-.45-.058-.913-.087-1.362-.058-.03-.16-.058-.145-.145 0-.218-.072-.435-.13-.638a10.821 10.821 0 0 1-.16-1.681c-.014-.16.087-.276.203-.377.03-.246.058-.507.073-.754-.044-.13-.145-.232-.203-.348-.261.03-.638.087-.797-.188-.377-.565-.769-1.145-1.145-1.71-.16-.015-.348 0-.493-.102-.16-.174-.261-.405-.363-.623-.043.174-.072.362-.174.507-.087.145-.231.247-.333.377-.101.232-.188.464-.275.696-.102.29-.247.58-.276.899a1.543 1.543 0 0 1-.101.449c-.073.116-.203.16-.319.217-.087.189-.145.377-.275.537-.087.101-.232.13-.29.26-.058.174-.145.334-.218.493-.029.174.087.363.03.536-.102.435-.32.841-.522 1.232-.102.29-.174.595-.32.87-.057.116-.202.145-.318.16-.13.318-.276.623-.362.956a5.437 5.437 0 0 0-.03.971c0 .145.088.261.146.391.057.174.014.348-.015.522-.565.073-1.145.13-1.696-.043-.058-.044-.043-.116-.058-.174-.043-.261-.072-.536.015-.783.188-.681.348-1.362.536-2.043-.072-.073-.174-.13-.174-.247-.014-.188 0-.391.044-.58.087-.319.318-.565.434-.87.044-.13.03-.26.044-.39 0-.305.174-.551.304-.812.13-.218.232-.45.406-.638.116-.101.116-.26.203-.391.087-.16.232-.29.232-.479.029-.231-.058-.463-.03-.695.059-.681.19-1.348.305-2.03-.058-.072-.145-.144-.174-.246.015-.072.03-.13.044-.203l-.13-.217c.057-.087.115-.188.173-.275-.058-.044-.13-.102-.188-.145.072-.218.043-.537.304-.638.03.014.102.029.13.043-.043-.376-.043-.768-.086-1.145a3.534 3.534 0 0 1-.073-1.232c.145-.217.42-.304.667-.318-.319-.073-.638-.102-.942-.203-.015-.261.029-.522.072-.783.13-.507.073-1.029.145-1.55.073-.146.261-.175.42-.146.189.03.377-.029.566-.087 0-.072.014-.16 0-.232-.116-.507-.087-1.029 0-1.521.116-.638.377-1.261.855-1.71.319-.305.783-.45 1.217-.435.145 0 .232.145.348.232.058-.058.116-.116.16-.174-.073-.247-.189-.508-.174-.769.029-.58.217-1.174.652-1.565m4.522 4.102c.029.029.029.029 0 0m.203.029c.014.101.043.203-.015.29-.072.029-.16.029-.232.072.203 0 .406.015.61 0 .159-.043.1-.246.1-.362-.1-.116-.318-.044-.463 0m-.507.609c.145.159.217.405.347.565.189-.247.334-.508.551-.725-.26-.015-.522.015-.782-.015-.044.058-.073.116-.116.174z"/>
        </svg>
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