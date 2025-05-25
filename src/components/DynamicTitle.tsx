'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '@/contexts/LanguageContext';

// Компонент для динамической смены заголовка в зависимости от языка
export default function DynamicTitle({ 
  titleRu, 
  titleEn,
  titleJa,
  pageName = ''
}: {
  titleRu: string;
  titleEn: string;
  titleJa: string;
  pageName?: string;
}) {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Выбираем заголовок в зависимости от текущего языка
    const title = language === 'ru' 
      ? titleRu 
      : language === 'ja' 
        ? titleJa 
        : titleEn;
    
    // Если есть название страницы, добавляем его к заголовку
    const fullTitle = pageName 
      ? `${pageName} · ${title}`
      : title;
    
    // Устанавливаем заголовок
    document.title = fullTitle;
  }, [language, titleRu, titleEn, titleJa, pageName]);

  return null; // Этот компонент не рендерит HTML
} 