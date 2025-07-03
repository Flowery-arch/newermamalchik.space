'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, DollarSign, BarChart4 } from 'lucide-react';

interface ExchangeRateData {
  usd: {
    value: number;
    previous: number;
    change: string;
  };
  lastUpdated: string;
  loading: boolean;
  error: boolean;
}

export default function ExchangeRates() {
  const { t, language } = useLanguage();
  
  // Состояние для данных о курсах валют
  const [ratesData, setRatesData] = useState<ExchangeRateData>({
    usd: {
      value: 0,
      previous: 0,
      change: "0",
    },
    lastUpdated: new Date().toISOString(),
    loading: true,
    error: false
  });
  
  // Получение данных о курсах валют
  useEffect(() => {
    let intervalId;
    let isMounted = true;

    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('/api/exchange-rates');
        const data = await response.json();
        if (!isMounted) return;
        
        setRatesData({
          ...data,
          loading: false,
          error: false
        });
      } catch (error) {
        if (isMounted) {
          setRatesData(prev => ({ 
            ...prev, 
            loading: false, 
            error: true 
          }));
        }
      }
    };

    fetchExchangeRates();
    intervalId = setInterval(fetchExchangeRates, 3600000); // обновляем раз в час

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);



  // Отображение изменения курса
  const renderChange = (change: string) => {
    const changeValue = parseFloat(change);
    const isPositive = changeValue > 0;
    const color = isPositive ? "text-green-600 dark:text-green-400" : 
                 changeValue < 0 ? "text-red-600 dark:text-red-400" : "text-neutral-600 dark:text-neutral-400";
    
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        {changeValue > 0 ? <TrendingUp size={14} /> : 
         changeValue < 0 ? <TrendingDown size={14} /> : null}
        <span className="text-xs font-medium">{change}%</span>
      </div>
    );
  };

  return (
    <div className="rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart4 className="w-5 h-5 text-neutral-800 dark:text-neutral-100/70" />
            <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">exchange.json</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          {ratesData.loading ? (
            <span className="text-neutral-500 text-sm">Загрузка...</span>
          ) : ratesData.error ? (
            <span className="text-red-500 text-sm">Ошибка загрузки</span>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
                {/* USD карточка */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-neutral-700 dark:text-neutral-300" size={24} />
                  <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                      {ratesData.usd.value.toFixed(2)} ₽
                    </span>
                </div>
                {renderChange(ratesData.usd.change)}
              </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
} 