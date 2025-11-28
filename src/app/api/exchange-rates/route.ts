// app/api/exchange-rates/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

// Кеширование данных
let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 час кеширования

export async function GET() {
  const currentTime = Date.now();
  
  // Возвращаем кешированные данные, если они актуальны
  if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    // Используем API для получения курсов валют
    const response = await axios.get(
      'https://www.cbr-xml-daily.ru/daily_json.js'
    );

    if (!response.data || !response.data.Valute) {
      throw new Error('Exchange rate data not available');
    }

    const data = response.data;
    
    // Форматируем данные, оставляем только USD
    const result = {
      usd: {
        value: data.Valute.USD.Value,
        previous: data.Valute.USD.Previous,
        change: ((data.Valute.USD.Value - data.Valute.USD.Previous) / data.Valute.USD.Previous * 100).toFixed(2),
      },
      lastUpdated: data.Date
    };

    // Обновляем кеш
    cachedData = result;
    lastFetchTime = currentTime;

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    
    // Если есть кешированные данные, возвращаем их
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    
    // Fallback данные
    return NextResponse.json({
      usd: {
        value: 91.42,
        previous: 90.86,
        change: "0.61",
      },
      lastUpdated: new Date().toISOString()
    }, { status: 200 });
  }
}