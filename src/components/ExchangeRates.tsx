'use client';

import React, { useEffect, useState } from 'react';

interface ExchangeRatesData {
  USD?: { last: number; };
  RUB?: { last: number; };
  // Add other currencies if needed
}

const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRatesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://blockchain.info/ticker');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ExchangeRatesData = await response.json();
        setRates(data);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching exchange rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <p>Загрузка курсов...</p>;
  }

  if (error) {
    return <p className="text-red-500">Ошибка загрузки курсов: {error}</p>;
  }

  return (
    <div className="grid gap-2">
      <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Курсы обмена Bitcoin:</p>
      {rates?.USD && (
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          BTC/USD: {rates.USD.last.toFixed(2)}
        </p>
      )}
      {rates?.RUB && (
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          BTC/RUB: {rates.RUB.last.toFixed(2)}
        </p>
      )}
      {!rates?.USD && !rates?.RUB && (
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Нет данных по курсам USD и RUB.
        </p>
      )}
    </div>
  );
};

export default ExchangeRates; 