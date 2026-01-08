'use client'

import { useState } from 'react'
import React from 'react'
import { BoxIcon, ArrowRightIcon, LaptopIcon, ServerIcon, GearIcon, TypeScriptIcon, ReactIcon, NextJSIcon, TailwindIcon, BunIcon, PostgreSQLIcon, RedisIcon, JavaScriptIcon, DiscordIcon } from './Icons'

interface Project {
  name: string
  domain: string
  year: string
  description: string
  accentColor: string
  stack: string[]
  url: string
  type: 'site' | 'other'
  image?: string
  backgroundImage?: string
}

const sites: Project[] = [
  {
    name: 'FLW',
    domain: 'flowerymc.online',
    year: '2025-2026',
    description: 'Мой личный Minecraft проект - полнофункциональный сайт с онлайн картой, вики, системой управления и интеграцией с игровым сервером.',
    accentColor: '#60a5fa',
    stack: ['TypeScript', 'Next.js', 'React', 'Bun'],
    url: 'https://flowerymc.online/',
    type: 'site',
    image: 'https://flowerymc.online/shamewall/1.png',
    backgroundImage: '/image1.png',
  },
  {
    name: 'Затмение',
    domain: 'zatmenie.space',
    year: '2025-2026',
    description: 'Веб-платформа для Minecraft проекта с современным дизайном и функциональностью.',
    accentColor: '#a855f7',
    stack: ['TypeScript', 'Next.js', 'React'],
    url: 'https://zatmenie.space/',
    type: 'site',
    image: 'https://zatmenie.space/zatmenie/zatmenie.svg',
    backgroundImage: '/image.png',
  },
  {
    name: 'Портфолио',
    domain: 'neweramamalchik.space',
    year: '2025-2026',
    description: 'Сайт моего портфолио с информацией о проектах, навыках и контактах.',
    accentColor: '#3b82f6',
    stack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
    url: 'https://neweramamalchik.space/',
    type: 'site',
    backgroundImage: '/image2.png',
  },
]

const other: Project[] = [
  {
    name: 'Discord Bot FLW',
    domain: 'discord-bot',
    year: '2025-2026',
    description: 'Многофункциональный Discord бот для проекта FLW. Работает с сервером, получает данные о проекте и игроках. Может подсказать что есть на сервере и чего нету, предоставляет полезную информацию игрокам.',
    accentColor: '#a855f7',
    stack: ['TypeScript', 'JavaScript', 'Discord.js', 'Bun'],
    url: '#',
    type: 'other',
  },
  {
    name: 'API для ЛК FLW',
    domain: 'api-lk',
    year: '2025-2026',
    description: 'API для личного кабинета на сайте FLW. Обеспечивает авторизацию, управление профилем и интеграцию с игровым сервером.',
    accentColor: '#10b981',
    stack: ['TypeScript', 'Bun', 'PostgreSQL'],
    url: '#',
    type: 'other',
  },
  {
    name: 'API Новостей FLW',
    domain: 'api-news',
    year: '2025-2026',
    description: 'Отдельный API для загрузки и управления новостями проекта. Позволяет добавлять, редактировать и получать новости через RESTful интерфейс.',
    accentColor: '#3b82f6',
    stack: ['TypeScript', 'Bun', 'PostgreSQL'],
    url: '#',
    type: 'other',
  },
  {
    name: 'API Игроков FLW',
    domain: 'api-players',
    year: '2025-2026',
    description: 'API для получения списка всех игроков, их статистики и данных. Интеграция с игровым сервером для получения актуальной информации об игроках.',
    accentColor: '#60a5fa',
    stack: ['TypeScript', 'Bun', 'PostgreSQL', 'Redis'],
    url: '#',
    type: 'other',
  },
  {
    name: 'API Админ-панели FLW',
    domain: 'api-admin',
    year: '2025-2026',
    description: 'API для управления проектом прямо с сайта через админ-панель. Позволяет управлять сервером, игроками, настройками и другими аспектами проекта.',
    accentColor: '#f59e0b',
    stack: ['TypeScript', 'Bun', 'PostgreSQL', 'Redis'],
    url: '#',
    type: 'other',
  },
]

const Projects = () => {
  const [activeTab, setActiveTab] = useState<'site' | 'other'>('site')

  // Функция для конвертации hex в rgba с прозрачностью
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const getCurrentProjects = () => {
    switch (activeTab) {
      case 'site':
        return sites
      case 'other':
        return other
      default:
        return sites
    }
  }

  const getTabIcon = (tab: 'site' | 'other') => {
    switch (tab) {
      case 'site':
        return <LaptopIcon className="text-white" size={14} />
      case 'other':
        return <GearIcon className="text-white" size={14} />
    }
  }

  return (
    <div id="projects" className="flex flex-col px-4 sm:px-8 lg:px-24 relative mt-12 sm:mt-16 lg:mt-0 pb-8">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px] z-5 mask-y-from-80%"></div>

      <div className="translate-y-0 scale-100 opacity-100 blur-none flex flex-col z-50 smooth">
        <div className="flex flex-col items-start text-start gap-4 sm:gap-6 lg:gap-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center p-2 sm:p-3 rounded-xl bg-blue-700/10">
              <BoxIcon className="text-blue-100" size={20} />
            </div>
            <h1 className="text-white font-raleway font-semibold text-[32px] sm:text-[38px] md:text-[42px] lg:text-6xl leading-tight lg:leading-18">
              Мои <span className="text-blue-100 italic font-raleway tracking-tighter font-semibold inline-flex items-center gap-6">проекты</span>.
            </h1>
          </div>
          <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-zed text-white/80 lg:max-w-4xl">
            Веб-платформы для Minecraft серверов, Discord боты и API для различных задач. 
            Создаю быстрые, надежные и масштабируемые решения с современным стеком технологий.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('site')}
              className={`relative flex gap-2.5 items-center px-5 py-2.5 rounded-xl transition-all duration-300 ${
                activeTab === 'site' 
                  ? 'glass-liquid border border-blue-400/30 shadow-lg shadow-blue-400/10' 
                  : 'glass-effect border border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {activeTab === 'site' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-400/5 rounded-xl"></div>
              )}
              <div className="relative z-10">
                {getTabIcon('site')}
              </div>
              <p className={`relative z-10 font-zed text-[13px] font-medium transition-colors ${
                activeTab === 'site' ? 'text-white' : 'text-gray-400'
              }`}>
                Сайты
              </p>
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={`relative flex gap-2.5 items-center px-5 py-2.5 rounded-xl transition-all duration-300 ${
                activeTab === 'other' 
                  ? 'glass-liquid border border-purple-400/30 shadow-lg shadow-purple-400/10' 
                  : 'glass-effect border border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {activeTab === 'other' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-blue-400/5 to-purple-400/5 rounded-xl"></div>
              )}
              <div className="relative z-10">
                {getTabIcon('other')}
              </div>
              <p className={`relative z-10 font-zed text-[13px] font-medium transition-colors ${
                activeTab === 'other' ? 'text-white' : 'text-gray-400'
              }`}>
                Другое
              </p>
            </button>
          </div>
        </div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mt-8 lg:mt-12">
          {getCurrentProjects().map((project, index) => {
            const isLastProject = index === getCurrentProjects().length - 1
            const isPortfolio = project.name === 'Портфолио'
            const showFooter = isLastProject && isPortfolio && activeTab === 'site'
            
            return (
              <React.Fragment key={index}>
                <div
                  className="group always-on-display flex flex-col rounded-3xl w-full relative overflow-hidden border border-white/10 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.04) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              {/* Фоновое изображение */}
              {project.backgroundImage && (
                <img 
                  src={project.backgroundImage}
                  alt={project.name}
                  className="absolute w-full h-full object-cover object-top top-0 left-0 z-0"
                  style={{
                    opacity: 0.35,
                  }}
                />
              )}

              {/* Декоративный градиент в углу */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${project.accentColor}, transparent)`
                }}
              ></div>

              <div className="flex flex-col p-4 sm:p-5 lg:p-6 gap-3 sm:gap-4 relative z-10">
                {/* Заголовок с логотипом и названием */}
                <div className="flex items-start justify-between z-20 gap-3">
                  <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                    <div className="flex gap-3 items-center z-20 flex-wrap">
                      <div className="relative flex-shrink-0">
                        {project.type === 'site' ? (
                          <>
                            {project.name === 'FLW' && project.image ? (
                              <div className="max-w-[120px] flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-white/20 to-purple-400/10 rounded-lg blur-md scale-110 animate-pulse"></div>
                                <img 
                                  src={project.image}
                                  alt={project.name}
                                  className="z-[2] relative drop-shadow-lg h-12 w-auto object-contain"
                                  loading="lazy"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = `https://www.google.com/s2/favicons?domain=${project.domain}&sz=64`
                                  }}
                                />
                              </div>
                            ) : (
                              <>
                                <img 
                                  src={project.image || `https://www.google.com/s2/favicons?domain=${project.domain}&sz=64`}
                                  alt={project.name}
                                  className="h-6 w-auto rounded-full"
                                  loading="lazy"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    if (!project.image) {
                                      target.style.display = 'none'
                                      const parent = target.parentElement
                                      if (parent) {
                                        const fallback = document.createElement('div')
                                        fallback.className = 'h-6 w-6 rounded-full'
                                        fallback.style.backgroundColor = project.accentColor
                                        parent.appendChild(fallback)
                                      }
                                    } else {
                                      target.src = `https://www.google.com/s2/favicons?domain=${project.domain}&sz=64`
                                    }
                                  }}
                                />
                                <div className="ellipsis-animation absolute -top-3 -left-3">
                                  <div 
                                    className="size-12 rounded-full opacity-20 blur-[30px]"
                                    style={{ backgroundColor: project.accentColor }}
                                  ></div>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="relative">
                            <div 
                              className="h-6 w-6 rounded-full"
                              style={{ backgroundColor: project.accentColor }}
                            ></div>
                            <div className="ellipsis-animation absolute -top-3 -left-3">
                              <div 
                                className="size-12 rounded-full opacity-20 blur-[30px]"
                                style={{ backgroundColor: project.accentColor }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      {project.name !== 'FLW' && (
                        <h1 className="font-raleway font-semibold text-white text-[18px] lg:text-[20px] leading-tight drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>{project.name}</h1>
                      )}
                      <div 
                        className="px-2.5 py-1 rounded-full border"
                        style={{ 
                          backgroundColor: hexToRgba(project.accentColor, 0.15),
                          borderColor: hexToRgba(project.accentColor, 0.3)
                        }}
                      >
                        <h1 
                          className="font-zed font-bold text-[11px]"
                          style={{ color: project.accentColor }}
                        >
                          {project.year}
                        </h1>
                      </div>
                    </div>
                    <h1 className="font-zed font-medium text-gray-200 text-[12px] lg:text-[13px] drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}>
                      {(() => {
                        const parts = project.domain.split('.')
                        if (parts.length > 1) {
                          const domainName = parts.slice(0, -1).join('.')
                          const domainZone = '.' + parts[parts.length - 1]
                          return (
                            <>
                              {domainName}
                              <span className="opacity-70 text-[12px] font-medium">{domainZone}</span>
                            </>
                          )
                        }
                        return project.domain
                      })()}
                    </h1>
                  </div>
                  <div className="hidden lg:flex gap-4 items-center flex-shrink-0">
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn glass-liquid flex gap-2 items-center justify-center px-4 py-2 rounded-lg hover:scale-105 cursor-pointer transition-all duration-300 border border-white/15 hover:border-white/30 hover:shadow-lg"
                      style={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <ArrowRightIcon className="text-white group-hover/btn:translate-x-1 transition-transform duration-300" size={14} />
                      <p className="font-zed text-white text-[12px] font-semibold">Посмотреть</p>
                    </a>
                  </div>
                </div>

                {/* Тип проекта и описание */}
                <div className="flex flex-col gap-3.5 z-20">
                  <div className="flex gap-3 items-center">
                    {project.type === 'site' ? (
                      <>
                        <div className="flex gap-2 items-center">
                          <div 
                            className="flex p-1.5 rounded-lg border"
                            style={{ 
                              backgroundColor: hexToRgba(project.accentColor, 0.12),
                              borderColor: hexToRgba(project.accentColor, 0.2)
                            }}
                          >
                            <LaptopIcon 
                              className="text-lg"
                              style={{ color: project.accentColor }}
                              size={16}
                            />
                          </div>
                          <p className="font-zed text-white text-[12px] font-semibold drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}>Фронтенд</p>
                        </div>
                        <span className="text-[11px] text-white/50">•</span>
                        <div className="flex gap-2 items-center">
                          <div 
                            className="flex p-1.5 rounded-lg border"
                            style={{ 
                              backgroundColor: hexToRgba(project.accentColor, 0.12),
                              borderColor: hexToRgba(project.accentColor, 0.2)
                            }}
                          >
                            <ServerIcon 
                              className="text-lg"
                              style={{ color: project.accentColor }}
                              size={16}
                            />
                          </div>
                          <p className="font-zed text-white text-[12px] font-semibold drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}>Бекенд</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <div 
                          className="flex p-1.5 rounded-lg border"
                          style={{ 
                            backgroundColor: hexToRgba(project.accentColor, 0.12),
                            borderColor: hexToRgba(project.accentColor, 0.2)
                          }}
                        >
                          {project.name.includes('Discord') ? (
                            <GearIcon 
                              className="text-lg"
                              style={{ color: project.accentColor }}
                              size={16}
                            />
                          ) : (
                            <ServerIcon 
                              className="text-lg"
                              style={{ color: project.accentColor }}
                              size={16}
                            />
                          )}
                        </div>
                        <p className="font-zed text-white text-[12px] font-semibold drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}>
                          {project.name.includes('Discord') ? 'Discord бот' : 'API'}
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="font-zed text-gray-200 text-[12px] lg:text-[13px] max-w-xl text-pretty leading-relaxed drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)' }}>
                    {project.description}
                  </p>

                  {/* Технологии */}
                  <div className="flex flex-wrap gap-2 items-center z-20">
                    {project.stack.map((tech, techIndex) => {
                      // Функция для получения иконки технологии
                      const getTechIcon = (techName: string) => {
                        const techLower = techName.toLowerCase()
                        if (techLower.includes('typescript') || techLower === 'ts') {
                          return <TypeScriptIcon size={12} />
                        } else if (techLower.includes('react')) {
                          return <ReactIcon size={12} />
                        } else if (techLower.includes('next')) {
                          return <NextJSIcon size={12} />
                        } else if (techLower.includes('tailwind')) {
                          return <TailwindIcon size={12} />
                        } else if (techLower === 'bun') {
                          return <BunIcon size={12} />
                        } else if (techLower.includes('postgresql') || techLower.includes('postgres')) {
                          return <PostgreSQLIcon size={12} />
                        } else if (techLower === 'redis') {
                          return <RedisIcon size={12} />
                        } else if (techLower.includes('javascript') || techLower === 'js') {
                          return <JavaScriptIcon size={12} />
                        } else if (techLower.includes('discord')) {
                          return <DiscordIcon size={12} />
                        }
                        return null
                      }

                      const techIcon = getTechIcon(tech)
                      const techColor = project.accentColor

                      return (
                        <div key={techIndex} className="flex gap-2 items-center">
                          <div 
                            className="flex gap-2 items-center px-2.5 py-1 rounded-lg border"
                            style={{
                              backgroundColor: hexToRgba(techColor, 0.08),
                              borderColor: hexToRgba(techColor, 0.15)
                            }}
                          >
                            {techIcon && <span style={{ color: techColor }}>{techIcon}</span>}
                            <p 
                              className="font-zed text-[11px] font-medium drop-shadow-sm"
                              style={{ 
                                color: techColor,
                                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                              }}
                            >
                              {tech}
                            </p>
                          </div>
                          {techIndex < project.stack.length - 1 && (
                            <span className="hidden lg:inline text-[10px] text-gray-500">•</span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Кнопка для мобильных */}
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn glass-liquid flex gap-2 items-center justify-center px-4 py-2 rounded-lg hover:scale-105 cursor-pointer lg:hidden mt-2 transition-all duration-300 border border-white/15 hover:border-white/30 hover:shadow-lg"
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <ArrowRightIcon className="text-white group-hover/btn:translate-x-1 transition-transform duration-300" size={14} />
                    <p className="font-zed text-white text-[12px] font-semibold">Посмотреть</p>
                  </a>
                </div>
              </div>
            </div>
            {showFooter && (
              <div className="hidden lg:flex items-center justify-center">
                <footer className="flex flex-col gap-2 items-center justify-center">
                  <p className="font-zed text-gray-300 text-[12px] text-center">
                    Сделано <span className="gradient-text">с любовью</span>
                  </p>
                  <p className="font-zed text-gray-500/40 text-[9px] text-center opacity-30">
                    Идея портфолио взята у другого кодера
                  </p>
                </footer>
              </div>
            )}
            </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Projects
