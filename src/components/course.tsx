'use client';

import React, { useEffect, useState } from 'react';
import { LucideScale } from 'lucide-react';

interface TickerData {
  USD?: { last: number; };
  RUB?: { last: number; };
  EUR?: { last: number; };
  GBP?: { last: number; };
  CNY?: { last: number; };
}

const Course = () => {
  const [rates, setRates] = useState<TickerData | null>(null);
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
        const data: TickerData = await response.json();
        setRates(data);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching exchange rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    // Fetch rates initially and then every 60 seconds
    const intervalId = setInterval(fetchRates, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Calculate USD/RUB if BTC/USD and BTC/RUB are available
  const usdrubRate = (rates?.RUB?.last && rates?.USD?.last) 
    ? (rates.RUB.last / rates.USD.last).toFixed(2) 
    : null;

  // Calculate EUR/RUB if BTC/EUR and BTC/RUB are available
  const eurrubRate = (rates?.RUB?.last && rates?.EUR?.last)
    ? (rates.RUB.last / rates.EUR.last).toFixed(2)
    : null;

  // Calculate GBP/RUB if BTC/GBP and BTC/RUB are available
  const gbrrubRate = (rates?.RUB?.last && rates?.GBP?.last)
    ? (rates.RUB.last / rates.GBP.last).toFixed(2)
    : null;

  // Calculate CNY/RUB if BTC/CNY and BTC/RUB are available
  const cnyrubRate = (rates?.RUB?.last && rates?.CNY?.last)
    ? (rates.RUB.last / rates.CNY.last).toFixed(2)
    : null;

  if (loading) {
    return <p>Загрузка курсов...</p>;
  }

  if (error) {
    return <p className="text-red-500">Ошибка загрузки курсов: {error}</p>;
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <LucideScale className="text-lg text-neutral-800 dark:text-neutral-100/70" />
        <p className="text-sm text-neutral-800 dark:text-neutral-100/70">course.tsx</p>
      </div>
      {rates?.RUB?.last && (
        <div className="flex items-center gap-2">
          {/* Placeholder for BTC SVG */}
          <span className="text-xl">₿</span> 
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            1 BTC ≈ {rates.RUB.last.toFixed(2)} RUB
          </p>
        </div>
      )}
      {usdrubRate && (
        <div className="flex items-center gap-2">
          {/* Placeholder for USD SVG */}
          <span className="text-xl">$</span> 
           <p className="text-sm text-neutral-700 dark:text-neutral-300">
            1 USD ≈ {usdrubRate} RUB
          </p>
        </div>
      )}
      {eurrubRate && (
        <div className="flex items-center gap-2">
          {/* Placeholder for EUR SVG */}
          <span className="text-xl">€</span> 
           <p className="text-sm text-neutral-700 dark:text-neutral-300">
            1 EUR ≈ {eurrubRate} RUB
          </p>
        </div>
      )}
      {gbrrubRate && (
        <div className="flex items-center gap-2">
          {/* Placeholder for GBP SVG */}
          <span className="text-xl">£</span> 
           <p className="text-sm text-neutral-700 dark:text-neutral-300">
            1 GBP ≈ {gbrrubRate} RUB
          </p>
        </div>
      )}
      {cnyrubRate && (
        <div className="flex items-center gap-2">
          {/* Placeholder for CNY SVG */}
          <span className="text-xl">¥</span> 
           <p className="text-sm text-neutral-700 dark:text-neutral-300">
            1 CNY ≈ {cnyrubRate} RUB
          </p>
        </div>
      )}
       {!rates?.RUB?.last && !usdrubRate && !eurrubRate && !gbrrubRate && !cnyrubRate && (
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Нет данных по курсам.
        </p>
      )}
    </div>
  );
};

export default Course; 