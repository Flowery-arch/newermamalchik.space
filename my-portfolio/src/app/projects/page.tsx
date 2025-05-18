'use client'

import { useState } from 'react';
import { LucideFolder, LucideHome, Heart, Package, Server, Settings, Check, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Project {
  name: string;
  displayName: string;
  version: string;
  url: string;
  description: string;
  image?: string;
  logo?: string;
  glowColor?: string;
  stack: {
    react?: string;
    next?: string;
    tailwind?: string;
    bun?: string;
    elysia?: string;
  };
  status: {
    color: string;
    text: string;
  };
  sourceCode: boolean;
  type: 'my' | 'orders' | 'frontend' | 'backend' | 'other';
  showIn?: string[];
}

const projects: Project[] = [
  {
    name: 'biography',
    displayName: 'Биография',
    version: 'v1',
    url: 'https://newermamalchik.space',
    description: 'Мой личный сайт-портфолио, улучшенная версия предыдущего (v0). Полностью переписанный код и улучшенный дизайн.',
    image: '/img/projects/bio.png',
    logo: '/favicon.ico',
    glowColor: 'bg-red-600',
    stack: {
      react: 'v18.2.0',
      next: '14.1.0',
      tailwind: 'v3.4.1'
    },
    status: {
      color: '#07b97a',
      text: 'Done, getting updates'
    },
    sourceCode: false,
    type: 'my',
    showIn: ['my', 'frontend']
  },
  {
    name: 'biography-api',
    displayName: 'Biography API',
    version: 'v1',
    url: 'https://newermamalchik.space',
    description: 'REST API для личного сайта-портфолио. Node.js, Express, MongoDB для хранения данных, система кэширования и аналитики.',
    logo: '/favicon.ico',
    stack: {
      bun: 'v1.2',
      elysia: 'v1.2'
    },
    status: {
      color: '#07b97a',
      text: 'Production'
    },
    sourceCode: false,
    type: 'backend',
    showIn: ['backend']
  },
  {
    name: 'flowery',
    displayName: 'Flowery',
    version: 'v4',
    url: 'https://flowerymc.online',
    description: 'Minecraft проект с уникальными функциями и современным дизайном.',
    logo: 'https://images-ext-1.discordapp.net/external/rR0y_v-Ghc1rCpIt91lgqrbD5KL9Ba3c2jofWqIZ8XU/%3Fsize%3D1024/https/cdn.discordapp.com/icons/1144350058964336724/0a0c7ce9a2307601f5cfeb81ee8199fa.webp?format=webp&width=780&height=780',
    stack: {
      react: 'v18.2.0',
      next: '14.1.0',
      tailwind: 'v3.4.1'
    },
    status: {
      color: '#07b97a',
      text: 'Done, getting updates'
    },
    sourceCode: false,
    type: 'my',
    showIn: ['my', 'frontend']
  },
  {
    name: 'flowery-api',
    displayName: 'Flowery API',
    version: 'v4',
    url: 'https://newermamalchik.space',
    description: 'Бэкенд для Minecraft проекта Flowery. Апи для покупки проходок профиля пользвоателя и т.д.',
    logo: 'https://images-ext-1.discordapp.net/external/rR0y_v-Ghc1rCpIt91lgqrbD5KL9Ba3c2jofWqIZ8XU/%3Fsize%3D1024/https/cdn.discordapp.com/icons/1144350058964336724/0a0c7ce9a2307601f5cfeb81ee8199fa.webp?format=webp&width=780&height=780',
    stack: {
      bun: 'v1.2',
      elysia: 'v1.2'
    },
    status: {
      color: '#07b97a',
      text: 'Production'
    },
    sourceCode: false,
    type: 'backend',
    showIn: ['backend']
  }
];

type FilterType = 'my' | 'orders' | 'frontend' | 'backend' | 'other';

interface FilterIcon {
  active: typeof Heart;
  inactive: typeof Heart;
}

const filterIcons: Record<FilterType, FilterIcon> = {
  my: {
    active: Check,
    inactive: Heart
  },
  orders: {
    active: Check,
    inactive: Package
  },
  frontend: {
    active: Check,
    inactive: Settings
  },
  backend: {
    active: Check,
    inactive: Server
  },
  other: {
    active: Check,
    inactive: Trash2
  }
};

export default function ProjectsPage() {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['my']);
  const router = useRouter();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const toggleFilter = (filter: FilterType) => {
    if (filter === 'orders') {
      // If orders is clicked, it should be exclusive
      setActiveFilters(['orders']);
    } else if (activeFilters.includes('orders')) {
      // If we're switching from orders to another filter
      setActiveFilters([filter]);
    } else {
      setActiveFilters(prev => {
        // If clicking frontend/backend/other, remove other two if present
        if (['frontend', 'backend', 'other'].includes(filter)) {
          const baseFilters = prev.filter(f => !['frontend', 'backend', 'other'].includes(f));
          if (prev.includes(filter)) {
            // If clicking the same filter, just remove it
            return baseFilters;
          }
          // Add the new filter
          return [...baseFilters, filter];
        }
        
        // For my filter
        if (prev.includes(filter)) {
          // Don't remove if it's the last filter
          if (prev.length === 1) return prev;
          return prev.filter(f => f !== filter);
        } else {
          return [...prev, filter];
        }
      });
    }
  };

  const filteredProjects = projects.filter(project => {
    if (activeFilters.includes('orders')) {
      return project.type === 'orders';
    }
    
    // Check if any of the technical filters (frontend, backend, other) are active
    const technicalFilter = activeFilters.find(f => ['frontend', 'backend', 'other'].includes(f));
    
    if (technicalFilter) {
      // If technical filter is active, show only projects that belong to that category
      return project.showIn?.includes(technicalFilter) || project.type === technicalFilter;
    }
    
    // For other cases (my), show projects as before
    return activeFilters.some(filter => 
      project.showIn ? project.showIn.includes(filter) : project.type === filter
    );
  });

  const renderFilterButton = (filter: FilterType) => {
    const IconSet = filterIcons[filter];
    const isActive = activeFilters.includes(filter);
    
    return (
      <button
        key={filter}
        onClick={() => toggleFilter(filter)}
        className={`cursor-pointer rounded-xl ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-95 active:opacity-90 dark:ring-neutral-600/30 flex items-center gap-2 px-4 py-1 ${
          isActive ? 'bg-gray-200 dark:bg-neutral-600/20' : 'bg-neutral-100/20 dark:bg-neutral-900/20'
        }`}
      >
        <div className="relative h-5 w-5">
          <IconSet.inactive 
            className={`absolute top-0 left-0 text-xl transition-opacity duration-500 text-neutral-700 dark:text-neutral-300 ${
              isActive ? 'opacity-0' : 'opacity-70'
            }`}
          />
          <IconSet.active 
            className={`absolute top-0 left-0 text-xl transition-opacity duration-500 text-neutral-700 dark:text-neutral-300 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <p className="font-semibold capitalize text-neutral-700 dark:text-neutral-300">{filter}</p>
      </button>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex-grow flex items-center py-12">
        <div className="mx-auto w-full max-w-[1600px] px-8">
          <div className="grid gap-6">
            <motion.button 
              onClick={handleHomeClick}
              className="flex w-fit items-center transition-all duration-300 ease-in-out hover:scale-102 hover:opacity-90 active:scale-96" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="flex items-center gap-2">
                <LucideHome className="text-lg text-neutral-800 dark:text-neutral-100/70" />
                <p className="text-sm text-neutral-800 dark:text-neutral-100/70">Вернуться обратно</p>
              </div>
            </motion.button>

            <div className="easy-in-out grid grid-rows-[auto_1fr] gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-white/80 dark:bg-neutral-900/10">
              <div className="flex items-center gap-2">
                <LucideFolder className="text-lg text-neutral-800 dark:text-neutral-100/70" />
                <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">projects.md</h1>
              </div>

              <div className="grid justify-center gap-4 py-4 sm:justify-between lg:flex">
                <div className="flex items-center gap-4">
                  {['my', 'orders'].map((filter) => renderFilterButton(filter as FilterType))}
                </div>

                <div className="flex items-center gap-4">
                  {['frontend', 'backend', 'other'].map((filter) => renderFilterButton(filter as FilterType))}
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {filteredProjects.map((project) => (
                  <div
                    key={project.name}
                    style={{
                      willChange: 'transform',
                      transition: '2000ms cubic-bezier(0.215, 0.61, 0.355, 1)',
                      transform: 'perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    }}
                  >
                    <a
                      className="easy-in-out group rounded-xl bg-white/80 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-[1.02] active:scale-98 active:opacity-80 dark:bg-neutral-900/10 dark:ring-neutral-300/10 relative grid gap-4 p-6 overflow-hidden"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name === 'biography' && (
                        <div className="absolute inset-0 -z-10">
                          <Image
                            src="https://media.discordapp.net/attachments/1153709702467813446/1373753854918787163/me.png?ex=682b8f7a&is=682a3dfa&hm=cd1eff7dbe5c96c6bfcc57dee7f04caf6a57ce86df19c675326f25fec8509f9e&=&format=webp&quality=lossless&width=1392&height=661"
                            alt="Background"
                            fill
                            className="object-cover opacity-[0.15] blur-2xl scale-110 grayscale dark:opacity-[0.1]"
                            quality={100}
                            priority
                          />
                        </div>
                      )}
                      <div className="z-1 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="grid items-center gap-5 md:flex">
                            {project.logo && (
                              <div className="relative size-8 transition-transform duration-300 ease-out group-hover:rotate-[360deg]">
                                <Image
                                  src={project.logo}
                                  alt={project.name}
                                  fill
                                  className="rounded-full object-cover"
                                />
                              </div>
                            )}
                            <p className="text-md font-semibold text-neutral-800 dark:text-neutral-100">{project.displayName}</p>
                            <p className="text-sm text-neutral-700 dark:text-neutral-400">/ {project.version}</p>
                          </div>
                        </div>
                      </div>

                      <div className="z-1 grid gap-2 md:flex md:gap-4">
                        {project.type !== 'backend' && project.stack.react !== '-' && (
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-neutral-800 dark:text-neutral-200" width="1em" height="1em" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89c0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7c-.52-.59-1.03-1.23-1.51-1.9a23 23 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86c.27.06.57.11.88.16zm6.54-.76l.81-1.5l-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47c.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7c.52.59 1.03 1.23 1.51 1.9c.82.08 1.63.2 2.4.36c.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86c-.27-.06-.57-.11-.88-.16zm1.45-7.05c1.47.84 1.63 3.05 1.01 5.63c2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63c-1.46.84-3.45-.12-5.37-1.95c-1.92 1.83-3.91 2.79-5.38 1.95c-1.46-.84-1.62-3.05-1-5.63c-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63c1.47-.84 3.46.12 5.38 1.95c1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26c2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26c-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16c-.07-.28-.18-.57-.29-.86zm-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7c.64-.35.83-1.82.32-3.96c-.77.16-1.58.28-2.4.36c-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16c.07.28.18.57.29.86zm2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a23 23 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9" />
                            </svg>
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                              React {project.stack.react}
                            </p>
                          </div>
                        )}
                        {project.type !== 'backend' && project.stack.next !== '-' && (
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-neutral-800 dark:text-neutral-200" width="1em" height="1em" viewBox="0 0 24 24">
                              <g fill="none">
                                <g clipPath="url(#iconifyReact31)">
                                  <path fill="currentColor" d="M11.214.006c-.052.005-.216.022-.364.033c-3.408.308-6.6 2.147-8.624 4.974a11.9 11.9 0 0 0-2.118 5.243c-.096.66-.108.854-.108 1.748s.012 1.089.108 1.748c.652 4.507 3.86 8.293 8.209 9.696c.779.251 1.6.422 2.533.526c.364.04 1.936.04 2.3 0c1.611-.179 2.977-.578 4.323-1.265c.207-.105.247-.134.219-.157a212 212 0 0 1-1.955-2.62l-1.919-2.593l-2.404-3.559a343 343 0 0 0-2.422-3.556c-.009-.003-.018 1.578-.023 3.51c-.007 3.38-.01 3.516-.052 3.596a.43.43 0 0 1-.206.213c-.075.038-.14.045-.495.045H7.81l-.108-.068a.44.44 0 0 1-.157-.172l-.05-.105l.005-4.704l.007-4.706l.073-.092a.6.6 0 0 1 .174-.143c.096-.047.133-.051.54-.051c.478 0 .558.018.682.154c.035.038 1.337 2 2.895 4.362l4.734 7.172l1.9 2.878l.097-.063a12.3 12.3 0 0 0 2.465-2.163a11.95 11.95 0 0 0 2.825-6.135c.096-.66.108-.854.108-1.748s-.012-1.088-.108-1.748C23.24 5.75 20.032 1.963 15.683.56a12.6 12.6 0 0 0-2.498-.523c-.226-.024-1.776-.05-1.97-.03m4.913 7.26a.47.47 0 0 1 .237.276c.018.06.023 1.365.018 4.305l-.007 4.218l-.743-1.14l-.746-1.14V10.72c0-1.983.009-3.097.023-3.151a.48.48 0 0 1 .232-.296c.097-.05.132-.054.5-.054c.347 0 .408.005.486.047" />
                                </g>
                                <defs>
                                  <clipPath id="iconifyReact31">
                                    <path fill="#fff" d="M0 0h24v24H0z" />
                                  </clipPath>
                                </defs>
                              </g>
                            </svg>
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                              NextJS {project.stack.next}
                            </p>
                          </div>
                        )}
                        {project.type !== 'backend' && project.stack.tailwind !== '-' && (
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-neutral-800 dark:text-neutral-200" width="1em" height="1em" viewBox="0 0 15 15">
                              <path fill="currentColor" d="M7.5 2.5c-1.026 0-1.908.277-2.6.87c-.688.59-1.137 1.447-1.387 2.516a.5.5 0 0 0 .897.4c.316-.452.632-.723.936-.863c.294-.135.611-.162.975-.065c.366.098.65.386 1.095.87l.015.016c.336.365.745.81 1.305 1.156c.582.359 1.305.6 2.264.6c1.026 0 1.908-.277 2.6-.87c.688-.59 1.138-1.447 1.387-2.516a.5.5 0 0 0-.897-.4c-.316.452-.632.723-.936.863c-.294.135-.611.162-.975.065c-.366-.098-.65-.386-1.095-.87l-.015-.016c-.336-.365-.745-.81-1.305-1.156c-.582-.359-1.305-.6-2.264-.6M4 7c-1.026 0-1.908.277-2.6.87C.712 8.46.263 9.317.013 10.386a.5.5 0 0 0 .897.4c.316-.452.632-.723.936-.863c.294-.135.611-.162.975-.065c.366.098.65.386 1.095.87l.015.016c.336.365.745.81 1.305 1.156c.582.359 1.305.6 2.264.6c1.026 0 1.908-.277 2.6-.87c.688-.59 1.138-1.447 1.387-2.516a.5.5 0 0 0-.897-.4c-.316.452-.632.723-.936.863c-.294.135-.611.162-.975.065c-.366-.098-.65-.386-1.095-.87l-.015-.016c-.335-.365-.745-.81-1.305-1.156C5.682 7.24 4.959 7 4 7" />
                            </svg>
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                              Tailwind {project.stack.tailwind}
                            </p>
                          </div>
                        )}
                        {project.stack.bun !== '-' && (
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-neutral-800 dark:text-neutral-200" width="1em" height="1em" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m-1-13h2v6h-2zm0 8h2v2h-2z"/>
                            </svg>
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                              Bun {project.stack.bun}
                            </p>
                          </div>
                        )}
                        {project.stack.elysia !== '-' && (
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-neutral-800 dark:text-neutral-200" width="1em" height="1em" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m-1-13h2v6h-2zm0 8h2v2h-2z"/>
                            </svg>
                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                              Elysia {project.stack.elysia}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="z-1 grid items-center gap-4 md:flex md:gap-8">
                        <div className="flex items-center gap-2">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="text-lg" 
                            width="1em" 
                            height="1em" 
                            viewBox="0 0 24 24" 
                            style={{ color: project.status.color }}
                          >
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                              <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                              <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                              <path d="M6 6h.01M6 18h.01"></path>
                            </g>
                          </svg>
                          <p className="text-[12px] font-semibold" style={{ color: project.status.color }}>
                            {project.status.text}
                          </p>
                        </div>
                        {!project.sourceCode && (
                          <div className="flex items-center gap-2">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="text-lg text-red-500" 
                              width="1em" 
                              height="1em" 
                              viewBox="0 0 24 24"
                            >
                              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"></path>
                                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                              </g>
                            </svg>
                            <p className="text-[12px] font-semibold text-red-500">Source code closed</p>
                          </div>
                        )}
                      </div>

                      <p className="z-1 text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">
                        {project.description}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 