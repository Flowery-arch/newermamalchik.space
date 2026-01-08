'use client'

import { useState, useEffect } from 'react'
import { TelegramIcon, DiscordIcon, LaptopIcon } from './Icons'
import MinecraftHead3D from './MinecraftHead3D'

const About = () => {
  const [systemInfo] = useState({
    os: 'Arch Linux',
    kernel: '6.18.3-arch1-1',
    cpu: {
      name: 'AMD Ryzen 5 5500',
      cores: 6,
      threads: 12,
      architecture: 'x86_64'
    },
    gpu: {
      name: 'NVIDIA GeForce RTX 4060',
      vram: 8
    },
    ram: {
      total: 31,
      used: 14,
      available: 16
    },
    storage: {
      total: 1490,
      used: 42,
      free: 1448
    }
  })

  return (
    <div id="me" className="flex flex-col px-4 sm:px-8 lg:px-24 relative pb-8">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#171717_1.5px,transparent_1.5px)] [background-size:16px_16px] z-5 mask-y-from-80%"></div>
      <div className="flex flex-col items-start lg:items-start text-start lg:text-start gap-4 sm:gap-6 lg:gap-10 z-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-8">
          <MinecraftHead3D username="newer__" size={80} />
          <h1 className="text-white font-raleway font-semibold text-[28px] sm:text-[36px] md:text-[42px] lg:text-6xl leading-tight lg:leading-18">
            Немного обо <span className="text-amber-100 font-raleway tracking-tighter font-semibold inline-flex items-center gap-6">мне</span>.
          </h1>
        </div>

        <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-zed text-white/80 lg:max-w-4xl">
          Я full-stack разработчик, специализирующийся на создании веб-платформ для Minecraft проектов, 
          разработке Discord ботов и написании API. Создаю функциональные и красивые сайты для игровых серверов, 
          пишу ботов для автоматизации и взаимодействия с сообществами, а также разрабатываю надежные API для различных проектов. 
          В работе использую современный стек технологий: Next.js, React, TypeScript, JavaScript и Bun.
        </p>

        <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4 items-center smooth w-full sm:w-auto">
          <a 
            href="https://t.me/mkphotoss"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 items-center justify-center px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer w-full lg:w-auto transition-all duration-300"
          >
            <TelegramIcon className="text-white" size={14} />
            <p className="font-zed text-white text-[12px]">Telegram</p>
          </a>
          <a 
            href="https://discordapp.com/users/660534347429969931"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 items-center justify-center px-5 py-2 border-dotted border-white/20 hover:border-white border-1 f-smooth rounded-full hover:bg-white/5 cursor-pointer w-full lg:w-auto transition-all duration-300"
          >
            <DiscordIcon className="text-white" size={14} />
            <p className="font-zed text-white text-[12px]">Discord</p>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full mt-6 sm:mt-8 lg:mt-0">
          {/* Информация о системе */}
          <div className="lg:col-span-12 group always-on-display flex flex-col rounded-2xl w-full relative overflow-hidden border border-white/10 backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.04) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="flex flex-col p-5 lg:p-6 gap-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center p-2 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                  <LaptopIcon className="text-blue-400" size={18} />
                </div>
                <p className="font-zed text-white/60 text-[11px] uppercase tracking-wider">Моя система</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                {/* ОС и Ядро */}
                <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-zed text-white/40 text-[10px] uppercase tracking-wider">Операционная система</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-raleway text-white font-semibold text-[15px] leading-tight">{systemInfo.os}</p>
                    <p className="font-zed text-white/50 text-[11px]">Ядро {systemInfo.kernel}</p>
                    <p className="font-zed text-white/40 text-[10px] mt-1">Архитектура {systemInfo.cpu.architecture}</p>
                      </div>
                    </div>

                {/* Процессор */}
                <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-zed text-white/40 text-[10px] uppercase tracking-wider">Процессор</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-raleway text-white font-semibold text-[15px] leading-tight">{systemInfo.cpu.name}</p>
                    <p className="font-zed text-white/50 text-[11px]">{systemInfo.cpu.cores} ядер / {systemInfo.cpu.threads} потоков</p>
                    <p className="font-zed text-white/40 text-[10px] mt-1">Базовая частота до 4.2 GHz</p>
                      </div>
                    </div>

                {/* Видеокарта */}
                <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-zed text-white/40 text-[10px] uppercase tracking-wider">Видеокарта</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-raleway text-white font-semibold text-[15px] leading-tight">{systemInfo.gpu.name}</p>
                    <p className="font-zed text-white/50 text-[11px]">{systemInfo.gpu.vram}GB видеопамяти</p>
                    <p className="font-zed text-white/40 text-[10px] mt-1">Ada Lovelace архитектура</p>
            </div>
          </div>

                {/* Оперативная память */}
                <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-zed text-white/40 text-[10px] uppercase tracking-wider">Оперативная память</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-raleway text-white font-semibold text-[15px] leading-tight">
                      {systemInfo.ram.total}GB DDR4
                    </p>
                    <p className="font-zed text-white/50 text-[11px]">Частота 3666 MHz</p>
                    <p className="font-zed text-white/40 text-[10px] mt-1">Высокая пропускная способность</p>
                        </div>
                      </div>

                {/* Дисковое пространство */}
                <div className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="font-zed text-white/40 text-[10px] uppercase tracking-wider">Дисковое пространство</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-raleway text-white font-semibold text-[15px] leading-tight">
                      {systemInfo.storage.total > 1000 ? `${(systemInfo.storage.total / 1000).toFixed(1)}TB` : `${systemInfo.storage.total}GB`}
                    </p>
                    <p className="font-zed text-white/50 text-[11px]">M.2 NVMe накопители</p>
                    <p className="font-zed text-white/40 text-[10px] mt-1">PCIe 4.0 интерфейс</p>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
