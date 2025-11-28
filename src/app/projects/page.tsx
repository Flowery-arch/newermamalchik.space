'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LucideHome, LucideFolder, LucideArrowLeft, LucideShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
  id: string;
  name: string;
  displayNameKey: string;
  descriptionKey: string;
  url?: string;
  githubUrl?: string;
  imageUrl?: string;
  logoUrl?: string;
  backgroundImg?: string;
  glowColor?: string;
  type: 'frontend' | 'backend' | 'fullstack' | 'other';
  category: 'my' | 'orders';
  stack: string[];
  status: {
    color: string;
    textKey: string;
    type: 'active' | 'development' | 'done' | 'planned' | 'archived';
  };
}

const projects: Project[] = [
  {
    id: 'portfolio-frontend',
    name: 'portfolio',
    displayNameKey: 'Portfolio',
    descriptionKey: 'projects.descriptions.biography_frontend',
    url: 'https://neweramamalchik.space/',
    githubUrl: 'https://github.com/Flowery-arch/newermamalchik.space',
    logoUrl: '/favicon.ico',
    backgroundImg: '/img/projects/portfolio.png',
    glowColor: 'bg-indigo-400',
    type: 'frontend',
    category: 'my',
    stack: ['React v19', 'NextJS 15.3.4', 'Tailwind v4'],
    status: {
      color: 'oklch(0.792 0.209 151.711)',
      textKey: 'projects.status.production',
      type: 'active'
    }
  },
  {
    id: 'portfolio-backend',
    name: 'portfolio-api',
    displayNameKey: 'Portfolio API',
    descriptionKey: 'projects.descriptions.biography_backend',
    githubUrl: 'https://github.com/Flowery-arch/newermamalchik.space',
    logoUrl: '/favicon.ico',
    backgroundImg: '/img/projects/portfolio.png',
    glowColor: 'bg-indigo-400',
    type: 'backend',
    category: 'my',
    stack: ['NextJS API Routes', 'Spotify API', 'Exchange Rates API', 'GitHub API'],
    status: {
      color: 'oklch(0.792 0.209 151.711)',
      textKey: 'projects.status.production',
      type: 'active'
    }
  },
  {
    id: 'flowery-mc',
    name: 'flowerymc',
    displayNameKey: 'Flowery',
    descriptionKey: 'projects.descriptions.flowery_mc',
    url: 'https://flowerymc.online/',
    logoUrl: '/logos/flowery.png',
    backgroundImg: '/img/projects/flowery.png',
    glowColor: 'bg-pink-400',
    type: 'frontend',
    category: 'my',
    stack: ['React v19', 'NextJS 15.3.4', 'Tailwind v4'],
    status: {
      color: 'oklch(0.792 0.209 151.711)',
      textKey: 'projects.status.production',
      type: 'active'
    }
  },
  {
    id: 'flowery-backend',
    name: 'flowerymc-api',
    displayNameKey: 'Flowery API',
    descriptionKey: 'projects.descriptions.flowery_backend',
    logoUrl: '/logos/flowery.png',
    backgroundImg: '/img/projects/flowery.png',
    glowColor: 'bg-pink-400',
    type: 'backend',
    category: 'my',
    stack: ['NextJS API Routes', 'Auth System', 'Payment API', 'Minecraft Server API'],
    status: {
      color: 'oklch(0.792 0.209 151.711)',
      textKey: 'projects.status.production',
      type: 'active'
    }
  },
  {
    id: 'rgb-community',
    name: 'rgb_community',
    displayNameKey: 'RGB Community',
    descriptionKey: 'projects.descriptions.rgb_community',
    url: 'https://rgb-community.vercel.app/',
    logoUrl: '/logos/rgb.ico',
    backgroundImg: '/img/projects/rgb.png',
    glowColor: 'bg-green-400',
    type: 'frontend',
    category: 'orders',
    stack: ['React v19', 'NextJS 15.3.4', 'Tailwind v4'],
    status: {
      color: 'oklch(0.792 0.209 151.711)',
      textKey: 'projects.status.production',
      type: 'active'
    }
  },
  {
    id: 'moderncord',
    name: 'moderncord',
    displayNameKey: 'ModernCord',
    descriptionKey: 'projects.descriptions.moderncord',
    url: 'https://moerncordd.vercel.app/',
    logoUrl: '/logos/moderncord.ico',
    backgroundImg: '/img/projects/moderncord.png',
    glowColor: 'bg-red-400',
    type: 'frontend',
    category: 'orders',
    stack: ['React v19', 'NextJS 15.3.4', 'Tailwind v4'],
    status: {
      color: 'oklch(0.792 0.209 151.711)',
      textKey: 'projects.status.production',
      type: 'active'
    }
  },
  {
    id: 'brqden',
    name: 'brqden',
    displayNameKey: 'Brqden',
    descriptionKey: 'projects.descriptions.brqden',
    url: 'https://brqden.ru/',
    logoUrl: '/logos/brqden.ico',
    backgroundImg: '/img/projects/brqden.png',
    glowColor: 'bg-yellow-400',
    type: 'frontend',
    category: 'orders',
    stack: ['React v19', 'NextJS 15.3.4', 'Tailwind v4'],
    status: {
      color: 'oklch(0.792 0.209 151.711)',
      textKey: 'projects.status.production',
      type: 'active'
    }
  }
];

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('frontend');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const filteredProjects = projects
    .filter(project => {
      if (project.type === 'backend') {
        return activeFilter === 'backend';
      }
      return activeFilter === 'all' || activeFilter === project.type;
    })
    .filter(project => activeCategory === 'all' || project.category === activeCategory);

  useEffect(() => {
    setActiveCategory('my');
    setActiveFilter('frontend');
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]" style={{ opacity: 1, transform: 'none' }}>
      <div className="mx-auto flex max-w-[80rem] flex-col px-6 py-12 md:pt-30">
        <div className="grid gap-6">
          <Link 
            className="flex w-fit items-center transition-transform duration-600 ease-in-out hover:scale-102 hover:opacity-90 active:scale-96" 
            href="/"
          >
            <div className="flex items-center gap-2">
              <LucideArrowLeft className="text-2xl text-neutral-600 dark:text-neutral-300" />
              <p className="font-semibold text-neutral-600 dark:text-neutral-300">{t('projects.back.projects')}</p>
            </div>
          </Link>
          
          <div className="easy-in-out grid grid-rows-[auto_1fr] gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 duration-600 dark:bg-neutral-900/10 dark:ring-neutral-300/10 hover:scale-100">
            <div className="flex items-center gap-2">
              <LucideFolder className="text-lg text-neutral-800 dark:text-neutral-100/70" />
              <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">projects.md</h1>
            </div>
            
            <div className="grid justify-center gap-4 py-4 sm:justify-between lg:flex">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveCategory('my')}
                  className={`cursor-pointer rounded-xl ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90 dark:ring-neutral-600/30 flex items-center gap-2 px-4 py-1 ${activeCategory === 'my' ? 'bg-gray-200 dark:bg-neutral-600/20' : 'bg-neutral-100/20 dark:bg-neutral-900/20'}`}
                >
                  <div className="relative h-5 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeCategory === 'my' ? 'opacity-0' : 'opacity-100'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2c-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeCategory === 'my' ? 'opacity-100' : 'opacity-0'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="font-semibold">{t('projects.types.my')}</p>
                </button>
                
                <button 
                  onClick={() => setActiveCategory('orders')}
                  className={`cursor-pointer rounded-xl ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90 dark:ring-neutral-600/30 flex items-center gap-2 px-4 py-1 ${activeCategory === 'orders' ? 'bg-gray-200 dark:bg-neutral-600/20' : 'bg-neutral-100/20 dark:bg-neutral-900/20'}`}
                >
                  <div className="relative h-5 w-5">
                    <LucideShoppingCart className={`absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeCategory === 'orders' ? 'opacity-0' : 'opacity-100'}`} />
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeCategory === 'orders' ? 'opacity-100' : 'opacity-0'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="font-semibold">{t('projects.types.orders')}</p>
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={`cursor-pointer rounded-xl ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90 dark:ring-neutral-600/30 flex items-center gap-2 px-4 py-1 ${activeFilter === 'all' ? 'bg-gray-200 dark:bg-neutral-600/20' : 'bg-neutral-100/20 dark:bg-neutral-900/20'}`}
                >
                  <div className="relative h-5 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeFilter === 'all' ? 'opacity-0' : 'opacity-100'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2c-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeFilter === 'all' ? 'opacity-100' : 'opacity-0'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="font-semibold">All</p>
                </button>
                
                <button 
                  onClick={() => setActiveFilter('frontend')}
                  className={`cursor-pointer rounded-xl ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90 dark:ring-neutral-600/30 flex items-center gap-2 px-4 py-1 ${activeFilter === 'frontend' ? 'bg-gray-200 dark:bg-neutral-600/20' : 'bg-neutral-100/20 dark:bg-neutral-900/20'}`}
                >
                  <div className="relative h-5 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeFilter === 'frontend' ? 'opacity-0' : 'opacity-100'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        <path d="M3 9h18M9 21V9"></path>
                      </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeFilter === 'frontend' ? 'opacity-100' : 'opacity-0'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="font-semibold">{t('projects.types.frontend')}</p>
                </button>
                
                <button 
                  onClick={() => setActiveFilter('backend')}
                  className={`cursor-pointer rounded-xl ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90 dark:ring-neutral-600/30 flex items-center gap-2 px-4 py-1 ${activeFilter === 'backend' ? 'bg-gray-200 dark:bg-neutral-600/20' : 'bg-neutral-100/20 dark:bg-neutral-900/20'}`}
                >
                  <div className="relative h-5 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeFilter === 'backend' ? 'opacity-0' : 'opacity-100'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                        <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                        <path d="M6 6h.01M6 18h.01"></path>
                      </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeFilter === 'backend' ? 'opacity-100' : 'opacity-0'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="font-semibold">{t('projects.types.backend')}</p>
                </button>
                
                <button 
                  onClick={() => setActiveFilter('other')}
                  className={`cursor-pointer rounded-xl ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90 dark:ring-neutral-600/30 flex items-center gap-2 px-4 py-1 ${activeFilter === 'other' ? 'bg-gray-200 dark:bg-neutral-600/20' : 'bg-neutral-100/20 dark:bg-neutral-900/20'}`}
                >
                  <div className="relative h-5 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeFilter === 'other' ? 'opacity-0' : 'opacity-100'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.39 4.39a1 1 0 0 0 1.68-.474a2.5 2.5 0 1 1 3.014 3.015a1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474a2.5 2.5 0 1 0-3.014 3.015a1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474a2.5 2.5 0 1 1-3.014-3.015a1 1 0 0 0 .474-1.68l1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474a2.5 2.5 0 1 0 3.014-3.015a1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`iconify iconify--lucide absolute top-0 left-0 text-xl transition-opacity duration-500 ${activeFilter === 'other' ? 'opacity-100' : 'opacity-0'}`} width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <p className="font-semibold">{t('projects.types.other')}</p>
                </button>
              </div>
            </div>
            
            <div style={{ position: 'relative', width: '100%', height: '100%', opacity: 1, transform: 'none' }}>
              {filteredProjects.length === 0 ? (
                <p className="text-center py-8 text-neutral-600 dark:text-neutral-400">
                  {t('projects.search.noResults')}
                </p>
              ) : (
                <div className="grid gap-8 lg:grid-cols-2">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      style={{ transform: 'perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' }}
                    >
                      <a
                        className="easy-in-out rounded-xl shadow-lg ring-2 ring-neutral-500/20 duration-600 active:scale-98 active:opacity-80 dark:bg-neutral-950 dark:ring-neutral-300/10 relative grid gap-4 p-6 hover:scale-100"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={project.url || (project.githubUrl || "#")}
                      >
                        {project.backgroundImg && (
                          <div className="absolute top-2 right-2 z-0">
                            <div className="hidden lg:flex relative">
                              <Image
                                alt={project.name}
                                src={project.backgroundImg}
                                width={350}
                                height={150}
                                className="max-h-[150px] rounded-xl opacity-60"
                              />
                              <div className="bg-white/10 dark:bg-transparent absolute inset-0 rounded-xl pointer-events-none" />
                            </div>
                          </div>
                        )}
                        <div className="z-1 flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {project.logoUrl && (
                              <div className="relative">
                                <div className="absolute -top-6 -left-6">
                                  <div className={`${project.glowColor} block size-24 rounded-full opacity-30 blur-[50px]`} />
                                </div>
                                <Image
                                  src={project.logoUrl}
                                  alt={project.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full relative z-10"
                                />
                              </div>
                            )}
                            <div className="grid items-center gap-5 md:flex">
                              <p className="text-md text-neutral-800 dark:text-neutral-200">
                                {project.displayNameKey}
                              </p>
                              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                / {project.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="z-1 grid gap-2 md:flex md:gap-4">
                          {project.stack.map((tech, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{tech}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="z-1 grid items-center gap-4 md:flex md:gap-8">
                          <div className="flex items-center gap-2">
                            <p className="text-[12px] font-semibold" style={{ color: project.status.color }}>
                              {t(project.status.textKey)}
                            </p>
                          </div>
                          
                          {project.githubUrl ? (
                            <div className="flex items-center gap-2 font-semibold opacity-80">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-lg text-emerald-400" width="1em" height="1em" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"></path>
                                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </g>
                              </svg>
                              <p className="text-[12px] text-emerald-400">{t('projects.sourceCode.open')}</p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 font-semibold opacity-80">
                              <svg xmlns="http://www.w3.org/2000/svg" className="text-lg text-red-500" width="1em" height="1em" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"></path>
                                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </g>
                              </svg>
                              <p className="text-[12px] text-red-500">{t('projects.sourceCode.closed')}</p>
                            </div>
                          )}
                        </div>
                        
                        <p className="z-1 text-[13px] font-semibold">{t(project.descriptionKey)}</p>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <footer className="flex justify-center py-4">
          <p className="text-center text-sm font-semibold text-neutral-600 dark:text-neutral-800">
            © 2025–2026 newermamalchik. Все права защищены. Несанкционированная загрузка, копирование или редактирование запрещены.
          </p>
        </footer>
      </div>
    </div>
  );
} 