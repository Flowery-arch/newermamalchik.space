'use client';

import { Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeatherData {
  temp: number;
  tempF: number;
  description: string;
  isDay: boolean;
  windSpeed: number;
  windSpeedMph: number;
}

// Координаты Санкт-Петербурга
const LAT = 59.9375;
const LON = 30.3086;

// Коды погоды WMO
const weatherCodes: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

// Конвертация из Цельсия в Фаренгейт
const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9/5 + 32) * 10) / 10;
};

// Конвертация из м/с в мили/ч
const msToMph = (ms: number): number => {
  return Math.round(ms * 2.237 * 10) / 10;
};

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code,is_day,wind_speed_10m`
        );
        const data = await response.json();
        
        const description = data.current.weather_code.toString();
        const tempC = Math.round(data.current.temperature_2m * 10) / 10;
        const windSpeedMs = Math.round(data.current.wind_speed_10m * 10) / 10;
        
        setWeather({
          temp: tempC,
          tempF: celsiusToFahrenheit(tempC),
          description: t(`weatherCodes.${description}`),
          isDay: data.current.is_day === 1,
          windSpeed: windSpeedMs,
          windSpeedMph: msToMph(windSpeedMs)
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes

    return () => clearInterval(interval);
  }, [t]);

  if (loading) {
    return (
      <div className="rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2.5 mb-4">
            <Cloud className="text-lg text-neutral-800 dark:text-neutral-100/70" size={18} />
            <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('weather.md')}</h1>
        </div>
          <div className="flex items-center justify-center flex-1">
          <p className="text-neutral-500">{t('weather.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2.5 mb-4">
            <Cloud className="text-lg text-neutral-800 dark:text-neutral-100/70" size={18} />
            <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('weather.md')}</h1>
        </div>
          <div className="flex items-center justify-center flex-1">
          <p className="text-red-500">{t('weather.failed')}</p>
          </div>
        </div>
      </div>
    );
  }

  // Выбор температуры в зависимости от языка
  const getTemperatureDisplay = () => {
    if (language === 'en') {
      return (
        <>
          <p className="text-lg font-medium text-neutral-800 dark:text-neutral-100">
            {weather.tempF}°F
          </p>
          <span className="text-xs text-neutral-500">({weather.temp}°C)</span>
        </>
      );
    } else {
      // Для русского и японского языков используем градусы Цельсия
      return (
        <p className="text-lg font-medium text-neutral-800 dark:text-neutral-100">
          {weather.temp}°C
        </p>
      );
    }
  };

  // Выбор скорости ветра в зависимости от языка
  const getWindSpeedDisplay = () => {
    if (language === 'en') {
      return `${weather.windSpeedMph} ${t('weather.windUnit')}`;
    } else {
      return `${weather.windSpeed} ${t('weather.windUnit')}`;
    }
  };

  return (
    <div className="rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2.5 mb-4">
          <Cloud className="text-lg text-neutral-800 dark:text-neutral-100/70" size={18} />
          <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">{t('weather.md')}</h1>
      </div>
        <div className="flex items-center justify-between flex-1">
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-2">
            {getTemperatureDisplay()}
          </div>
          <p className="text-[12px] font-semibold text-neutral-500 truncate" title={weather.description}>
            {weather.description}
          </p>
          <p className="text-[12px] text-neutral-500 mt-1">
            {t('weather.wind')}: {getWindSpeedDisplay()}
          </p>
        </div>
        <div className="flex h-[64px] w-[64px] flex-shrink-0 items-center justify-center">
          {weather.isDay ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-neutral-800 dark:text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-neutral-800 dark:text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          )}
          </div>
        </div>
      </div>
    </div>
  );
} 