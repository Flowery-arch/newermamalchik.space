'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useLanguage } from '@/contexts/LanguageContext';

// Компонент добавляет структурированные данные JSON-LD, которые Google и другие поисковые системы используют
// для лучшего понимания контента сайта
export default function JsonLdSchema() {
  const [origin, setOrigin] = useState('');
  const { language } = useLanguage();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const getPersonSchema = () => {
    if (language === 'ru') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'newermamalchik',
        url: origin,
        image: `${origin}/og-image.png`,
        jobTitle: 'Веб-разработчик',
        description: 'Веб-разработчик, специализирующийся на TypeScript (Vue/Next.js) и Java для модификаций игр',
        knowsAbout: [
          'TypeScript', 'JavaScript', 'Vue.js', 'Next.js', 'Bun', 'Node.js', 'Java', 'Веб-разработка'
        ],
        sameAs: [
          'https://t.me/mkphotoss',
          'https://discord.com/users/660534347429969931',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Фриланс'
        }
      };
    } else {
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'newermamalchik',
        url: origin,
        image: `${origin}/og-image.png`,
        jobTitle: 'Web Developer',
        description: 'Web developer specializing in TypeScript (Vue/Next.js) and Java for game modifications',
        knowsAbout: [
          'TypeScript', 'JavaScript', 'Vue.js', 'Next.js', 'Bun', 'Node.js', 'Java', 'Web Development'
        ],
        sameAs: [
          'https://t.me/mkphotoss',
          'https://discord.com/users/660534347429969931',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance'
        }
      };
    }
  };

  const getWebsiteSchema = () => {
    if (language === 'ru') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: origin,
        name: 'Портфолио · newermamalchik',
        description: 'Персональный сайт-портфолио веб-разработчика специализирующегося на TypeScript',
        author: {
          '@type': 'Person',
          name: 'newermamalchik'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${origin}/projects?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      };
    } else {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: origin,
        name: 'Portfolio · newermamalchik',
        description: 'Personal portfolio website of a web developer specializing in TypeScript',
        author: {
          '@type': 'Person',
          name: 'newermamalchik'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${origin}/projects?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      };
    }
  };

  if (!origin) return null;

  const personSchema = getPersonSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <Script 
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script 
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
} 