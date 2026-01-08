'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarIcon, ClockIcon, BoxIcon, ToolsIcon, StarIcon, MenuIcon, EarthIcon } from './Icons'

interface WeatherData {
  temp: number
  description: string
  icon: string
}

const Header = () => {
  const pathname = usePathname()
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const date = now.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })
      const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })
      setCurrentDate(date)
      setCurrentTime(time)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Используем wttr.in API (бесплатный и не требует ключа)
        const wttrResponse = await fetch('https://wttr.in/Saint-Petersburg?format=j1&lang=ru')
        if (wttrResponse.ok) {
          const data = await wttrResponse.json()
          const current = data.current_condition[0]
          setWeather({
            temp: Math.round(parseFloat(current.temp_C)),
            description: current.weatherDesc[0].value || 'ясно',
            icon: '01d'
          })
        } else {
          // Fallback: используем простой формат
          const simpleResponse = await fetch('https://wttr.in/Saint-Petersburg?format=%t+%C&lang=ru')
          if (simpleResponse.ok) {
            const text = await simpleResponse.text()
            const match = text.match(/([+-]?\d+)/)
            if (match) {
              setWeather({
                temp: parseInt(match[1]),
                description: text.split(' ').slice(1).join(' ') || 'ясно',
                icon: '01d'
              })
            }
          }
        }
      } catch (error) {
        console.error('Error fetching weather:', error)
        // Устанавливаем демо данные при ошибке
        setWeather({
          temp: 5,
          description: 'облачно',
          icon: '02d'
        })
      }
    }

    fetchWeather()
    // Обновляем погоду каждые 30 минут
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000)

    return () => clearInterval(weatherInterval)
  }, [])

      const handleNavigation = (view: 'projects' | 'skills' | 'about') => {
        const event = new CustomEvent('navigateToView', { detail: view })
        window.dispatchEvent(event)
        setIsMobileMenuOpen(false)
      }

  return (
    <header className="flex gap-8 items-center justify-between z-[150]">
      {/* Мобильный градиентный фон для header */}
      <div className="opacity-0 fixed top-0 left-0 w-full h-56 bg-stone-950 mask-b-to-100% z-[100] smooth"></div>
      
      {/* Логотип на десктопе (xl и выше) */}
      <div className="hidden xl:flex gap-4 items-center fixed top-16 left-24 smooth z-[150]">
        <p className="text-white font-zed text-[14px]">
          newer__<span className="opacity-60">.space</span>
        </p>
      </div>

      {/* Логотип на мобилке (lg и ниже) - по центру */}
      <div className="top-9 flex lg:hidden gap-4 items-center left-1/2 transform -translate-x-1/2 justify-center text-center fixed z-[150] smooth">
        <p className="text-white font-zed text-[14px]">
          newer__<span className="opacity-60">.space</span>
        </p>
      </div>

      {/* Навигация на десктопе (lg и выше) */}
      <div className="hidden lg:flex gap-6 items-center fixed smooth z-[150] left-[120px] xl:left-80 top-16">
        <button
          onClick={() => handleNavigation('projects')}
          className="cursor-pointer flex gap-4 items-center smooth group"
        >
          <BoxIcon className="text-stone-300 opacity-80" size={16} />
          <div className="flex gap-2 items-center">
            <p className="hover:decoration-dotted underline decoration-transparent underline-offset-2 font-zed text-stone-300 text-[13px] smooth">
              Проекты
            </p>
            <span className="-translate-x-4 opacity-0 blur-sm font-zed text-stone-300 text-[12px] opacity-60 decoration-0 smooth group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-0 transition-all duration-300">
              →
            </span>
          </div>
        </button>
        <button
          onClick={() => handleNavigation('skills')}
          className="cursor-pointer flex gap-4 items-center smooth group"
        >
          <ToolsIcon className="text-stone-300 opacity-80" size={16} />
          <div className="flex gap-2 items-center">
            <p className="hover:decoration-dotted underline decoration-transparent underline-offset-2 font-zed text-stone-300 text-[13px] smooth">
              Навыки
            </p>
            <span className="-translate-x-4 opacity-0 blur-sm font-zed text-stone-300 text-[12px] opacity-60 decoration-0 smooth group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-0 transition-all duration-300">
              →
            </span>
          </div>
        </button>
        <button
          onClick={() => handleNavigation('about')}
          className="cursor-pointer flex gap-4 items-center smooth group"
        >
          <StarIcon className="text-stone-300 opacity-80" size={16} />
          <div className="flex gap-2 items-center">
            <p className="hover:decoration-dotted underline decoration-transparent underline-offset-2 font-zed text-stone-300 text-[13px] smooth">
              Обо мне
            </p>
            <span className="-translate-x-4 opacity-0 blur-sm font-zed text-stone-300 text-[12px] opacity-60 decoration-0 smooth group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-0 transition-all duration-300">
              →
            </span>
          </div>
        </button>
      </div>

      {/* Кнопка меню на мобилке (lg и ниже) - слева */}
      <div className="flex lg:hidden gap-6 items-center fixed smooth z-[150] rounded-full left-8 top-10 w-16">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex gap-4 items-center smooth"
        >
          <MenuIcon className="text-stone-300 opacity-80" size={16} />
          <div className="flex gap-2 items-center smooth">
            <p className="font-zed text-stone-300 text-[13px] smooth">Меню</p>
          </div>
        </button>
      </div>

      {/* Дата, время и погода на десктопе (lg и выше) - справа */}
      <div className="hidden lg:flex gap-6 items-center fixed smooth z-[150] right-20 top-16">
        <button className="flex gap-4 items-center smooth">
          <CalendarIcon className="text-stone-300 opacity-80" size={16} />
          <div className="flex gap-2 items-center">
            <p className="decoration-transparent underline-offset-2 font-zed text-stone-300 text-[13px] smooth">
              {currentDate.split(',')[0]} <span className="text-[12px] opacity-60">{new Date().getFullYear()}</span>
            </p>
          </div>
        </button>
        <div className="h-5 bg-white/10 w-0.5 rounded-full"></div>
        <button className="flex gap-4 items-center smooth">
          <ClockIcon className="text-stone-300 opacity-80" size={16} />
          <div className="flex gap-2 items-center">
            <p className="decoration-transparent underline-offset-2 font-zed text-stone-300 text-[13px] smooth">
              {currentTime.split(',')[0]} <span className="text-[12px] opacity-60">UTC+3</span>
            </p>
          </div>
        </button>
        {weather && (
          <>
            <div className="h-5 bg-white/10 w-0.5 rounded-full"></div>
            <button className="cursor-pointer flex gap-4 items-center smooth group">
              <EarthIcon className="text-stone-300 opacity-80" size={16} />
              <div className="flex gap-2 items-center">
                <p className="hover:decoration-dotted underline decoration-transparent underline-offset-2 font-zed text-stone-300 text-[13px] smooth">
                  {weather.temp > 0 ? '+' : ''}{weather.temp}°
                </p>
                <span className="-translate-x-4 opacity-0 blur-sm font-zed text-stone-300 text-[12px] opacity-60 decoration-0 smooth group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-0 transition-all duration-300">
                  →
                </span>
              </div>
            </button>
          </>
        )}
      </div>

      {/* Погода на мобилке (lg и ниже) - справа */}
      <div className="flex lg:hidden gap-6 items-center fixed smooth z-[150] rounded-full right-5 top-10 w-16">
        <button className="flex gap-4 items-center smooth">
          {weather && (
            <span className="text-stone-300 opacity-80 text-sm font-zed">
              {weather.temp > 0 ? '+' : ''}{weather.temp}°
            </span>
          )}
        </button>
      </div>

      {/* Мобильное выпадающее меню */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="fixed top-[80px] left-0 right-0 z-[150] lg:hidden mx-[16px]">
            <div className="group relative overflow-hidden rounded-[20px] border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-[20px] opacity-50"></div>
              <div className="absolute inset-[1px] bg-gradient-to-tl from-blue-500/10 via-transparent to-blue-500/5 rounded-[19px]"></div>
              
              <div className="relative z-[2] flex flex-col gap-[12px]">
                <button 
                  onClick={() => handleNavigation('projects')}
                  className="flex items-center gap-[12px] p-[12px] rounded-[12px] hover:bg-white/5 transition-colors text-left"
                >
                  <p className="text-[15px] font-semibold text-gray-200">Проекты</p>
                </button>
                <button 
                  onClick={() => handleNavigation('skills')}
                  className="flex items-center gap-[12px] p-[12px] rounded-[12px] hover:bg-white/5 transition-colors text-left"
                >
                  <p className="text-[15px] font-semibold text-gray-200">Навыки</p>
                </button>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="flex items-center gap-[12px] p-[12px] rounded-[12px] hover:bg-white/5 transition-colors text-left"
                >
                  <p className="text-[15px] font-semibold text-gray-200">Обо мне</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
