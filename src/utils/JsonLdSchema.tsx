'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useLanguage } from '@/contexts/LanguageContext'

// Компонент добавляет структурированные данные JSON-LD, которые Google и другие поисковые системы используют
// для лучшего понимания контента сайта
export default function JsonLdSchema() {
  const [origin, setOrigin] = useState('')
  const { language } = useLanguage()

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const getPersonSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'newermamalchik',
      alternateName: 'Mikhail',
      url: origin,
      image: {
        '@type': 'ImageObject',
        url: 'https://cdn.discordapp.com/avatars/660534347429969931/a_95eb00e5856ddb138696fe51c6ea21be?size=1024',
        width: 1024,
        height: 1024,
      },
      birthDate: '2006-02-25',
      gender: 'Male',
      nationality: 'RU',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RU',
        addressLocality: 'Russia',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: 'https://t.me/mkphotoss',
      },
      sameAs: [
        'https://t.me/mkphotoss',
        'https://discord.com/users/660534347429969931',
        'https://github.com/Flowery-arch',
      ],
      worksFor: {
        '@type': 'Organization',
        name: language === 'ru' ? 'Фриланс' : 'Freelance',
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: language === 'ru' ? 'Веб-разработчик' : 'Web Developer',
        occupationLocation: {
          '@type': 'Country',
          name: 'Russia',
        },
        skills: [
          'TypeScript',
          'JavaScript',
          'Vue.js',
          'Next.js',
          'React',
          'Node.js',
          'Java',
          'Tailwind CSS',
          'HTML',
          'CSS',
        ],
      },
    }

    if (language === 'ru') {
      return {
        ...baseSchema,
        jobTitle: 'Веб-разработчик',
        description:
          'Веб-разработчик, специализирующийся на TypeScript (Vue/Next.js) и Java для модификаций игр. Создаю современные веб-приложения с акцентом на производительность и пользовательский опыт.',
        knowsAbout: [
          'TypeScript',
          'JavaScript',
          'Vue.js',
          'Next.js',
          'React',
          'Nuxt.js',
          'Bun',
          'Node.js',
          'Java',
          'Веб-разработка',
          'Фронтенд',
          'Бэкенд',
          'Tailwind CSS',
          'Discord боты',
          'Модификации игр',
        ],
      }
    } else {
      return {
        ...baseSchema,
        jobTitle: 'Web Developer',
        description:
          'Web developer specializing in TypeScript (Vue/Next.js) and Java for game modifications. Creating modern web applications with focus on performance and user experience.',
        knowsAbout: [
          'TypeScript',
          'JavaScript',
          'Vue.js',
          'Next.js',
          'React',
          'Nuxt.js',
          'Bun',
          'Node.js',
          'Java',
          'Web Development',
          'Frontend',
          'Backend',
          'Tailwind CSS',
          'Discord Bots',
          'Game Modifications',
        ],
      }
    }
  }

  const getWebsiteSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: origin,
      inLanguage: language,
      copyrightYear: 2025,
      copyrightHolder: {
        '@type': 'Person',
        name: 'newermamalchik',
      },
      creator: {
        '@type': 'Person',
        name: 'newermamalchik',
      },
      publisher: {
        '@type': 'Person',
        name: 'newermamalchik',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/projects?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }

    if (language === 'ru') {
      return {
        ...baseSchema,
        name: 'Портфолио · newermamalchik',
        description:
          'Персональный сайт-портфолио веб-разработчика специализирующегося на TypeScript. Здесь вы найдете мои проекты, навыки и способы связи.',
        keywords:
          'newermamalchik, веб-разработчик, typescript, next.js, vue.js, портфолио, разработка',
      }
    } else {
      return {
        ...baseSchema,
        name: 'Portfolio · newermamalchik',
        description:
          'Personal portfolio website of a web developer specializing in TypeScript. Here you will find my projects, skills and contact information.',
        keywords:
          'newermamalchik, web developer, typescript, next.js, vue.js, portfolio, development',
      }
    }
  }

  const getOrganizationSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'newermamalchik Portfolio',
      url: origin,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/favicon.ico`,
      },
      founder: {
        '@type': 'Person',
        name: 'newermamalchik',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: 'https://t.me/mkphotoss',
      },
    }
  }

  const getBreadcrumbSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: language === 'ru' ? 'Главная' : 'Home',
          item: origin,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: language === 'ru' ? 'Проекты' : 'Projects',
          item: `${origin}/projects`,
        },
      ],
    }
  }

  if (!origin) return null

  const personSchema = getPersonSchema()
  const websiteSchema = getWebsiteSchema()
  const organizationSchema = getOrganizationSchema()
  const breadcrumbSchema = getBreadcrumbSchema()

  return (
    <>
      <Script
        id='person-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        strategy='afterInteractive'
      />
      <Script
        id='website-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy='afterInteractive'
      />
      <Script
        id='organization-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy='afterInteractive'
      />
      <Script
        id='breadcrumb-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy='afterInteractive'
      />
    </>
  )
}
