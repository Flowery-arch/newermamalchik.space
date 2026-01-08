'use client'

import { useState, useEffect } from 'react'
import { TelegramIcon, GithubIcon, ArrowRightIcon } from './Icons'
import MinecraftSkin3D from './MinecraftSkin3D'
import Projects from './Projects'
import Skills from './Skills'
import About from './About'

const Hero = () => {
  const [activeView, setActiveView] = useState<'hero' | 'projects' | 'skills' | 'about'>('hero')

  useEffect(() => {
    const handleNavigation = (event: CustomEvent<string>) => {
      const view = event.detail as 'hero' | 'projects' | 'skills' | 'about'
      setActiveView(view)
    }

    window.addEventListener('navigateToView' as any, handleNavigation as EventListener)
    
    return () => {
      window.removeEventListener('navigateToView' as any, handleNavigation as EventListener)
    }
  }, [])

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      const headerHeight = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const elementHeight = element.offsetHeight
      const viewportHeight = window.innerHeight
      const targetPosition = elementPosition + (elementHeight * 0.6) - (viewportHeight / 2) - headerHeight
      const scrollOffset = Math.max(0, targetPosition)

      const startPosition = window.pageYOffset
      const distance = scrollOffset - startPosition
      const duration = 800
      let start: number | null = null

      const animateScroll = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const percentage = Math.min(progress / duration, 1)
        
        const ease = percentage < 0.5
          ? 2 * percentage * percentage
          : 1 - Math.pow(-2 * percentage + 2, 3) / 2

        window.scrollTo(0, startPosition + distance * ease)

        if (progress < duration) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  const handleShiftToProjects = () => {
    setActiveView('projects')
  }

  const handleShiftToSkills = () => {
    setActiveView('skills')
  }

  const handleShiftToAbout = () => {
    setActiveView('about')
  }

  const handleBack = () => {
    if (activeView === 'about') {
      setActiveView('skills')
    } else if (activeView === 'skills') {
      setActiveView('projects')
    } else if (activeView === 'projects') {
      setActiveView('hero')
    }
  }

  return (
    <div className="relative overflow-hidden h-screen">
      {/* Кнопки навигации */}
      {activeView !== 'hero' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 lg:left-auto lg:transform-none lg:right-8 lg:top-56 lg:bottom-auto z-[100] flex gap-3 items-center">
          <button
            onClick={handleBack}
            className="pointer-events-auto glass-liquid flex gap-2 lg:gap-3 items-center justify-center px-4 lg:px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer smooth"
            style={{ zIndex: 100 }}
          >
            <ArrowRightIcon className="text-white rotate-180" size={14} />
            <p className="font-zed text-white text-[11px] lg:text-[12px]">Назад</p>
          </button>
          {activeView === 'projects' && (
            <button
              onClick={handleShiftToSkills}
              className="pointer-events-auto glass-liquid flex gap-2 lg:gap-3 items-center justify-center px-4 lg:px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer smooth"
              style={{ zIndex: 100 }}
            >
              <ArrowRightIcon className="text-white" size={14} />
              <p className="font-zed text-white text-[11px] lg:text-[12px]">Навыки</p>
            </button>
          )}
          {activeView === 'skills' && (
            <button
              onClick={handleShiftToAbout}
              className="pointer-events-auto glass-liquid flex gap-2 lg:gap-3 items-center justify-center px-3 lg:px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer smooth whitespace-nowrap"
              style={{ zIndex: 100 }}
            >
              <ArrowRightIcon className="text-white flex-shrink-0" size={14} />
              <p className="font-zed text-white text-[11px] lg:text-[12px]">Обо мне</p>
            </button>
          )}
        </div>
      )}
      
      <div 
        className={`flex flex-col relative h-full px-8 lg:px-0 transition-transform duration-1000 ease-in-out ${
          activeView === 'hero' ? 'transform translate-x-0' : 'transform translate-x-[-100%]'
        }`}
      >
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-5 mask-b-from-80%"></div>
        <div className="flex flex-col lg:flex-row items-center lg:items-center text-center lg:text-left gap-6 lg:gap-16 mt-20 lg:mt-32 z-50 w-full">
          {/* Скин слева */}
          <div className="hidden md:flex items-center justify-center lg:justify-start flex-shrink-0 w-full lg:w-auto order-1 lg:order-1">
            <div className="w-full max-w-[350px] lg:max-w-[550px]">
              <MinecraftSkin3D username="newer__" size={550} />
            </div>
          </div>
          {/* Текст справа */}
          <div className="flex flex-col items-center lg:items-start gap-10 flex-1 w-full lg:w-auto lg:pl-8 order-2 lg:order-2">
            <h1 className="text-white font-raleway font-semibold text-[42px] lg:text-6xl leading-12 lg:leading-18 translate-y-0 scale-100 opacity-100 blur-none smooth">
              Привет, я <br className="lg:hidden" />
              <span className="gradient-text-purple font-raleway tracking-tighter font-semibold inline-flex items-center gap-6">newer__</span>. <br />
              <span className="gradient-text font-raleway tracking-tighter font-semibold inline-flex items-center gap-6">Full-stack</span>
              <br className="lg:hidden" />
              <span className="lg:hidden">разработчик.</span> <span className="hidden lg:inline">разработчик.</span>
            </h1>
            <p className="text-[13px] lg:text-[15px] font-zed text-white/80 lg:max-w-4xl translate-y-0 scale-100 opacity-100 blur-none hidden lg:inline smooth">
              Я full-stack разработчик, специализирующийся на создании веб-платформ для Minecraft проектов, 
              разработке Discord ботов и написании API. Создаю функциональные и красивые сайты для игровых серверов, 
              пишу ботов для автоматизации и взаимодействия с сообществами, а также разрабатываю надежные API для различных проектов. 
              В работе использую современный стек технологий: 
              <span className="text-blue-400 hover:underline cursor-default underline-offset-4 decoration-dotted"> Next.js</span> и 
              <span className="text-blue-300 hover:underline cursor-default underline-offset-4 decoration-dotted"> React</span> для фронтенда, 
              <span className="text-blue-500 hover:underline cursor-default underline-offset-4 decoration-dotted"> TypeScript</span> и 
              <span className="text-yellow-400 hover:underline cursor-default underline-offset-4 decoration-dotted"> JavaScript</span> для разработки, 
              <span className="text-yellow-300 hover:underline cursor-default underline-offset-4 decoration-dotted"> Bun</span> для бэкенда и API.
            </p>
            <p className="text-[13px] lg:text-[15px] font-zed text-white/80 lg:max-w-4xl translate-y-0 scale-100 opacity-100 blur-none lg:hidden smooth">
              Я full-stack разработчик, специализирующийся на создании веб-платформ для Minecraft проектов, 
              разработке Discord ботов и написании API. Создаю функциональные и красивые сайты для игровых серверов, 
              пишу ботов для автоматизации и взаимодействия с сообществами, а также разрабатываю надежные API для различных проектов. 
              В работе использую современный стек технологий: 
              <span className="text-blue-400 hover:underline cursor-default underline-offset-4 decoration-dotted"> Next.js</span> и 
              <span className="text-blue-300 hover:underline cursor-default underline-offset-4 decoration-dotted"> React</span> для фронтенда, 
              <span className="text-blue-500 hover:underline cursor-default underline-offset-4 decoration-dotted"> TypeScript</span> и 
              <span className="text-yellow-400 hover:underline cursor-default underline-offset-4 decoration-dotted"> JavaScript</span> для разработки, 
              <span className="text-yellow-300 hover:underline cursor-default underline-offset-4 decoration-dotted"> Bun</span> для бэкенда и API.
            </p>
            <div className="translate-y-0 scale-100 opacity-100 blur-none grid grid-cols-2 lg:flex lg:flex-row gap-2 lg:gap-4 items-center smooth w-full lg:w-auto">
              <a 
                href="https://t.me/mkphotoss" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-liquid flex gap-3 items-center justify-center px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer lg:hidden col-span-2"
              >
                <TelegramIcon className="text-white" size={14} />
                <p className="font-zed text-white text-[12px]">Связаться со мной</p>
              </a>
              <button onClick={handleShiftToProjects} className="glass-liquid flex gap-3 items-center justify-center px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer hidden lg:flex">
                <ArrowRightIcon className="text-white" size={14} />
                <p className="font-zed text-white text-[12px]">Мои работы</p>
              </button>
              <button onClick={handleShiftToProjects} className="glass-liquid flex gap-3 items-center justify-center px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer lg:hidden">
                <ArrowRightIcon className="text-white" size={14} />
                <p className="font-zed text-white text-[12px]">Мои работы</p>
              </button>
              <a 
                href="https://github.com/Flowery-arch" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-liquid flex gap-3 items-center justify-center px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer"
              >
                <GithubIcon className="text-white" size={14} />
                <p className="font-zed text-white text-[12px]">GitHub</p>
              </a>
              <a 
                href="https://t.me/mkphotoss" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-liquid flex gap-3 items-center justify-center px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer hidden lg:flex"
              >
                <TelegramIcon className="text-white" size={14} />
                <p className="font-zed text-white text-[12px]">Связаться со мной</p>
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer внутри Hero */}
        <footer className="absolute bottom-0 left-0 right-0 flex px-8 lg:px-24 pt-8 pb-8 items-center justify-center z-30">
          <div className="flex flex-col gap-2 items-center">
            <p className="font-zed text-gray-300 text-[12px] text-center">
              Сделано <span className="gradient-text">с любовью</span>
            </p>
            <p className="font-zed text-gray-500/40 text-[9px] text-center opacity-30">
              Идея портфолио взята у другого кодера
            </p>
          </div>
        </footer>
      </div>
      
      {/* Кнопка справа под Hero */}
      {activeView === 'hero' && (
        <button
          onClick={handleShiftToProjects}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 lg:left-auto lg:transform-none lg:right-8 lg:top-56 lg:bottom-auto z-50 glass-liquid flex gap-2 lg:gap-3 items-center justify-center px-4 lg:px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer smooth"
        >
          <ArrowRightIcon className="text-white" size={14} />
          <p className="font-zed text-white text-[11px] lg:text-[12px]">Проекты</p>
        </button>
      )}

      {/* Блок проектов, появляющийся после сдвига */}
      <div 
        className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out overflow-hidden ${
          activeView === 'projects'
            ? 'opacity-100 z-40 transform translate-x-0' 
            : 'opacity-0 z-0 pointer-events-none transform translate-x-full'
        }`}
      >
        <div className="relative h-full pt-8 sm:pt-12 lg:pt-32 pb-20 sm:pb-24 lg:pb-0 overflow-y-auto">
          <Projects />
        </div>
      </div>

      {/* Блок навыков, появляющийся после сдвига */}
      <div 
        className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out overflow-hidden ${
          activeView === 'skills'
            ? 'opacity-100 z-40 transform translate-x-0' 
            : 'opacity-0 z-0 pointer-events-none transform translate-x-full'
        }`}
      >
        <div className="relative h-full pt-16 sm:pt-20 lg:pt-32 pb-20 sm:pb-24 lg:pb-0 overflow-y-auto">
          <Skills />
        </div>
      </div>

      {/* Блок "Обо мне", появляющийся после сдвига */}
      <div 
        className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out overflow-hidden ${
          activeView === 'about'
            ? 'opacity-100 z-40 transform translate-x-0' 
            : 'opacity-0 z-0 pointer-events-none transform translate-x-full'
        }`}
      >
        <div className="relative h-full pt-16 sm:pt-20 lg:pt-32 pb-20 sm:pb-24 lg:pb-0 overflow-y-auto">
          <About />
        </div>
      </div>
    </div>
  )
}

export default Hero
