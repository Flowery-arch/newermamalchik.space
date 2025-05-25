'use client'

import { useState, useEffect } from 'react';
import { LucideFolder, Monitor, ShoppingCart, Database, Code2, Check, Trash2, Search, X, Lock, Unlock, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import FallingSymbols from '@/components/FallingSymbols';
import { useLanguage } from '@/contexts/LanguageContext';
import DynamicTitle from '../../components/DynamicTitle';

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
    discordjs?: string;
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
    displayName: 'Biography',
    version: 'v1',
    url: 'https://neweramamalchik.space/',
    description: 'projects.descriptions.biography',
    image: '/img/projects/bio.png',
    logo: '/popa.png',
    glowColor: 'bg-red-600',
    stack: {},
    status: {
      color: '#07b97a',
      text: 'projects.status.done'
    },
    sourceCode: false,
    type: 'my',
    showIn: ['my', 'frontend']
  },
  {
    name: 'biography-api',
    displayName: 'Biography API',
    version: 'v1',
    url: 'https://neweramamalchik.space/',
    description: 'projects.descriptions.biographyApi',
    logo: '/popa.png',
    stack: {
      bun: 'v1.2',
      elysia: 'v1.2'
    },
    status: {
      color: '#07b97a',
      text: 'projects.status.production'
    },
    sourceCode: false,
    type: 'backend',
    showIn: ['backend']
  },
  {
    name: 'flowery',
    displayName: 'Flowery',
    version: 'v4',
    url: 'https://flowerymc.online/',
    description: 'projects.descriptions.flowery',
    logo: 'https://images-ext-1.discordapp.net/external/rR0y_v-Ghc1rCpIt91lgqrbD5KL9Ba3c2jofWqIZ8XU/%3Fsize%3D1024/https/cdn.discordapp.com/icons/1144350058964336724/0a0c7ce9a2307601f5cfeb81ee8199fa.webp?format=webp&width=780&height=780',
    stack: {},
    status: {
      color: '#07b97a',
      text: 'projects.status.done'
    },
    sourceCode: false,
    type: 'my',
    showIn: ['my', 'frontend']
  },
  {
    name: 'flowery-api',
    displayName: 'Flowery API',
    version: 'v4',
    url: 'https://neweramamalchik.space/',
    description: 'projects.descriptions.floweryApi',
    logo: 'https://images-ext-1.discordapp.net/external/rR0y_v-Ghc1rCpIt91lgqrbD5KL9Ba3c2jofWqIZ8XU/%3Fsize%3D1024/https/cdn.discordapp.com/icons/1144350058964336724/0a0c7ce9a2307601f5cfeb81ee8199fa.webp?format=webp&width=780&height=780',
    stack: {
      bun: 'v1.2',
      elysia: 'v1.2'
    },
    status: {
      color: '#07b97a',
      text: 'projects.status.production'
    },
    sourceCode: false,
    type: 'backend',
    showIn: ['backend']
  },
  {
    name: 'flowery-order',
    displayName: 'Flowery (Order)',
    version: 'v4',
    url: 'https://flowerymc.online/',
    description: 'projects.descriptions.floweryOrder',
    logo: 'https://images-ext-1.discordapp.net/external/rR0y_v-Ghc1rCpIt91lgqrbD5KL9Ba3c2jofWqIZ8XU/%3Fsize%3D1024/https/cdn.discordapp.com/icons/1144350058964336724/0a0c7ce9a2307601f5cfeb81ee8199fa.webp?format=webp&width=780&height=780',
    stack: {},
    status: {
      color: '#07b97a',
      text: 'projects.status.done'
    },
    sourceCode: false,
    type: 'orders',
    showIn: ['orders', 'frontend']
  },
  {
    name: 'bloomia',
    displayName: 'Bloomia',
    version: 'v1',
    url: 'https://neweramamalchik.space/',
    description: 'projects.descriptions.bloomia',
    logo: '/img/7921a645b3f27c092ef637a48b4d8814ecef54d29e4e8834f1d51bab9729b88e.png',
    stack: {},
    status: {
      color: '#ef4444', // Красный цвет для заброшенного статуса
      text: 'projects.status.abandoned'
    },
    sourceCode: false,
    type: 'orders',
    showIn: ['orders', 'frontend', 'backend']
  },
  {
    name: 'flowery-discord-bot',
    displayName: 'Flowery Discord Bot',
    version: 'v1',
    url: 'https://neweramamalchik.space/',
    description: 'projects.descriptions.floweryDiscordBot',
    logo: 'https://images-ext-1.discordapp.net/external/rR0y_v-Ghc1rCpIt91lgqrbD5KL9Ba3c2jofWqIZ8XU/%3Fsize%3D1024/https/cdn.discordapp.com/icons/1144350058964336724/0a0c7ce9a2307601f5cfeb81ee8199fa.webp?format=webp&width=780&height=780',
    stack: {
      next: 'v13.4.18',
      discordjs: 'v15.0.0',
    },
    status: {
      color: '#07b97a',
      text: 'projects.status.development'
    },
    sourceCode: false,
    type: 'other',
    showIn: ['other']
  }
];

type FilterType = 'my' | 'orders' | 'frontend' | 'backend' | 'other';

interface FilterIcon {
  active: typeof Check;
  inactive: typeof Check;
}

const filterIcons: Record<FilterType, FilterIcon> = {
  my: {
    active: Check,
    inactive: LucideFolder
  },
  orders: {
    active: Check,
    inactive: ShoppingCart
  },
  frontend: {
    active: Check,
    inactive: Monitor
  },
  backend: {
    active: Check,
    inactive: Database
  },
  other: {
    active: Check,
    inactive: Code2
  }
};

export default function ProjectsPage() {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['my', 'frontend']);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const isOrdersActive = activeFilters.includes('orders');
  const isMyActive = activeFilters.includes('my');
  const isFrontendActive = activeFilters.includes('frontend');
  const isBackendActive = activeFilters.includes('backend');
  const isOtherActive = activeFilters.includes('other');

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev => {
      const filterType = filter; // The filter being clicked

      // Group filters
      const isMyOrOrders = filterType === 'my' || filterType === 'orders';
      // Technical filters
      const isTechnical = filterType === 'frontend' || filterType === 'backend' || filterType === 'other';

      let newFilters = [...prev]; // Start with current active filters

      // If the clicked filter is already active, do nothing
      if (newFilters.includes(filterType)) {
        return prev;
      }

      if (isMyOrOrders) {
        // Deselect the other group filter and select the clicked one
        newFilters = newFilters.filter(f => f !== 'my' && f !== 'orders');
        newFilters.push(filterType);
      } else if (isTechnical) {
        const isMyActive = newFilters.includes('my');
        const isOrdersActive = newFilters.includes('orders');

        if (isMyActive || isOrdersActive) {
           // If my or orders is active, deselect other technical filters and select the clicked one
           newFilters = newFilters.filter(f => f !== 'frontend' && f !== 'backend' && f !== 'other');
           newFilters.push(filterType);
        } else {
           // If neither my nor orders is active, deselect other technical filters and select the clicked one
           newFilters = newFilters.filter(f => f !== 'frontend' && f !== 'backend' && f !== 'other');
           newFilters.push(filterType);
        }
      }

      return newFilters;
    });
  };

  const filteredProjects = projects.filter(project => {
    // First apply search filter
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery) ||
      project.displayName.toLowerCase().includes(searchQuery) ||
      project.description.toLowerCase().includes(searchQuery);

    if (!matchesSearch) return false;

    // Then apply existing filters
    const isMyActive = activeFilters.includes('my');
    const isOrdersActive = activeFilters.includes('orders');
    const isFrontendActive = activeFilters.includes('frontend');
    const isBackendActive = activeFilters.includes('backend');
    const isOtherActive = activeFilters.includes('other');

    const anyTechnicalFilterActive = isFrontendActive || isBackendActive || isOtherActive;
    const anyGroupFilterActive = isMyActive || isOrdersActive;

    // If no filters are active, show default 'my' projects
    if (!anyTechnicalFilterActive && !anyGroupFilterActive) {
        return project.name === 'biography' || (project.name === 'flowery' && project.type === 'my') ||
               project.name === 'biography-api' || project.name === 'flowery-api';
    }

    let passesGroupFilter = true;
    if (anyGroupFilterActive) {
        passesGroupFilter = false;
        if (isMyActive && (
            project.name === 'biography' || 
            (project.name === 'flowery' && project.type === 'my') ||
            project.name === 'biography-api' ||
            project.name === 'flowery-api' ||
            (isOtherActive && project.name === 'flowery-discord-bot')
        )) {
            passesGroupFilter = true;
        }
        if (isOrdersActive && (
            project.name === 'flowery-order' || 
            project.name === 'bloomia' ||
            (isBackendActive && project.name === 'flowery-api')
        )) {
            passesGroupFilter = true;
        }
    }

    let passesTechnicalFilter = true;
    if (anyTechnicalFilterActive) {
        passesTechnicalFilter = false;
        if (isFrontendActive && project.showIn?.includes('frontend')) {
            passesTechnicalFilter = true;
        }
        if (isBackendActive && (project.showIn?.includes('backend') || project.name === 'flowery-api')) {
            passesTechnicalFilter = true;
        }
        if (isOtherActive && project.showIn?.includes('other')) {
             passesTechnicalFilter = true;
        }
         // If group filters are active, technical filters act as an additional filter
         // If only technical filters are active, they determine what is shown
         if (anyGroupFilterActive) {
             return passesGroupFilter && passesTechnicalFilter;
         } else {
             return passesTechnicalFilter;
         }
    }

    // If only group filters are active, return based on group filter result
    if (anyGroupFilterActive && !anyTechnicalFilterActive) {
        return passesGroupFilter;
    }

     // This case should be covered by the initial check, but as a fallback
    return false;
  });

  const renderFilterButton = (filter: FilterType) => {
    const { t } = useLanguage();
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
        <p className="font-semibold capitalize text-neutral-700 dark:text-neutral-300">
          {t(`projects.types.${filter}`)}
        </p>
      </button>
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-[#0a0a0a] md:px-8 py-4 md:py-12">
      <DynamicTitle titleRu="Проекты · newermamalchik" titleEn="Projects · newermamalchik" />
      <FallingSymbols />
      <div className="flex-grow flex items-center py-12 relative z-10">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8">
          <div className="grid gap-6">
            <div className="flex items-center gap-2">
              <motion.button 
                onClick={handleHomeClick}
                className="group p-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </motion.button>
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-mono">./</span>
                <span className="font-medium">home/projects.tsx</span>
              </div>
            </div>

            <div className="relative flex items-center gap-2 font-mono text-sm">
              <div className="text-neutral-500 dark:text-neutral-600 select-none">$</div>
              <div className="text-emerald-600 dark:text-emerald-500 select-none">find</div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={t('projects.search.placeholder')}
                  value={searchQuery}
                  onChange={handleSearch}
                  spellCheck={false}
                  className="w-full bg-transparent border-none outline-none text-neutral-800 dark:text-neutral-300 placeholder-neutral-500 dark:placeholder-neutral-600 font-mono"
                />
              </div>
            </div>

            <div className="grid justify-center gap-4 py-4 sm:justify-between lg:flex">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4">
                {['my', 'orders'].map((filter) => renderFilterButton(filter as FilterType))}
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4">
                {['frontend', 'backend', 'other'].map((filter) => renderFilterButton(filter as FilterType))}
              </div>
            </div>

            <div className="grid gap-4 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div
                    key={project.name}
                    style={{
                      willChange: 'transform',
                      transition: '2000ms cubic-bezier(0.215, 0.61, 0.355, 1)',
                      transform: 'perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    }}
                  >
                    <div
                      className="easy-in-out group rounded-xl bg-white/80 shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-[1.02] active:scale-98 active:opacity-80 dark:bg-neutral-900/10 dark:ring-neutral-300/10 relative grid gap-4 p-6 overflow-hidden cursor-pointer"
                    >
                      <div className="z-1 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="grid items-center gap-5 md:flex">
                            {project.logo && (
                              <div className="relative size-8">
                                <div className="absolute inset-[-4px] -z-10 rounded-full opacity-50 blur-sm" style={{ 
                                  backgroundColor: project.glowColor || project.status.color,
                                  boxShadow: `0 0 20px ${project.glowColor || project.status.color}`
                                }} />
                                <Image
                                  src={project.logo}
                                  alt={project.name}
                                  fill
                                  className="rounded-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                              <p className="text-md font-semibold text-neutral-800 dark:text-neutral-100">
                                {project.name.toLowerCase().includes('api') || project.name.toLowerCase().includes('discord') 
                                  ? project.displayName // Оставляем оригинальное название для API и Discord проектов
                                  : t(`projects.displayNames.${project.name.replace(/-/g, '')}`)}
                              </p>
                              <p className="text-sm text-neutral-700 dark:text-neutral-400">/ {project.version}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="z-1 grid gap-2 md:flex md:gap-4">
                        {project.name === 'flowery-discord-bot' ? (
                          <>
                            {project.stack.next && (
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-neutral-800 dark:text-neutral-200" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><g clipPath="url(#iconifyReact31)"><path fill="currentColor" d="M11.214.006c-.052.005-.216.022-.364.033c-3.408.308-6.6 2.147-8.624 4.974a11.9 11.9 0 0 0-2.118 5.243c-.096.66-.108.854-.108 1.748s.012 1.089.108 1.748c.652 4.507 3.86 8.293 8.209 9.696c.779.251 1.6.422 2.533.526c.364.04 1.936.04 2.3 0c1.611-.179 2.977-.578 4.323-1.265c.207-.105.247-.134.219-.157a212 212 0 0 1-1.955-2.62l-1.919-2.593l-2.404-3.559a343 343 0 0 0-2.422-3.556c-.009-.003-.018 1.578-.023 3.51c-.007 3.38-.01 3.516-.052 3.596a.43.43 0 0 1-.206.213c-.075.038-.14.045-.495.045H7.81l-.108-.068a.44.44 0 0 1-.157-.172l-.05-.105l.005-4.704l.007-4.706l.073-.092a.6.6 0 0 1 .174-.143c.096-.047.133-.051.54-.051c.478 0 .558.018.682.154c.035.038 1.337 2 2.895 4.362l4.734 7.172l1.9 2.878l.097-.063a12.3 12.3 0 0 0 2.465-2.163a11.95 11.95 0 0 0 2.825-6.135c.096-.66.108-.854.108-1.748s-.012-1.088-.108-1.748C23.24 5.75 20.032 1.963 15.683.56a12.6 12.6 0 0 0-2.498-.523c-.226-.024-1.776-.05-1.97-.03m4.913 7.26a.47.47 0 0 1 .237.276c.018.06.023 1.365.018 4.305l-.007 4.218l-.743-1.14l-.746-1.14V10.72c0-1.983.009-3.097.023-3.151a.48.48 0 0 1 .232-.296c.097-.05.132-.054.5-.054c.347 0 .408.005.486.047"/></g><defs><clipPath id="iconifyReact31"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g></svg>
                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                  NextJS {project.stack.next}
                                </p>
                              </div>
                            )}
                            {project.stack.discordjs && (
                              <div className="flex items-center gap-2">
                                <svg width="1em" height="1em" viewBox="0 0 24 24" className="text-xl text-neutral-800 dark:text-neutral-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11 12.5C11 13.8807 10.1046 15 9 15C7.89543 15 7 13.8807 7 12.5C7 11.1193 7.89543 10 9 10C10.1046 10 11 11.1193 11 12.5ZM8.22293 12.5C8.22293 13.0365 8.57084 13.4713 9 13.4713C9.42916 13.4713 9.77707 13.0365 9.77707 12.5C9.77707 11.9635 9.42916 11.5287 9 11.5287C8.57084 11.5287 8.22293 11.9635 8.22293 12.5Z" fill="currentColor"/>
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15 15C16.1046 15 17 13.8807 17 12.5C17 11.1193 16.1046 10 15 10C13.8954 10 13 11.1193 13 12.5C13 13.8807 13.8954 15 15 15ZM15 13.4713C14.5708 13.4713 14.2229 13.0365 14.2229 12.5C14.2229 11.9635 14.5708 11.5287 15 11.5287C15.4292 11.5287 15.7771 11.9635 15.7771 12.5C15.7771 13.0365 15.4292 13.4713 15 13.4713Z" fill="currentColor"/>
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9864 3.33561C9.94083 3.06219 9.78382 2.81995 9.55284 2.66671C9.32186 2.51347 9.03764 2.46298 8.76801 2.52729C6.61476 3.04085 5.39826 3.471 3.47772 4.64723C3.33168 4.73668 3.21105 4.86214 3.1274 5.01158C1.9368 7.13867 1.14514 8.97344 0.657859 10.9416C0.171558 12.9058 1.51992e-05 14.9565 0 17.5C0 17.7652 0.105353 18.0196 0.292888 18.2071C1.35191 19.2661 2.45067 20.1002 3.71884 20.6638C4.99135 21.2294 6.3833 21.5 8 21.5C8.43043 21.5 8.81257 21.2246 8.94868 20.8162L9.62339 18.7921C10.3731 18.918 11.1769 19 12 19C12.8231 19 13.6269 18.918 14.3766 18.7921L15.0513 20.8162C15.1874 21.2246 15.5696 21.5 16 21.5C17.6167 21.5 19.0086 21.2294 20.2812 20.6638C21.5493 20.1002 22.6481 19.2661 23.7071 18.2071C23.8946 18.0196 24 17.7652 24 17.5C24 14.9565 23.8284 12.9058 23.3421 10.9416C22.8549 8.97344 22.0632 7.13867 20.8726 5.01158C20.789 4.86214 20.6683 4.73668 20.5223 4.64723C18.6017 3.471 17.3852 3.04085 15.232 2.52729C14.9624 2.46298 14.6781 2.51347 14.4472 2.66671C14.2162 2.81995 14.0592 3.06219 14.0136 3.33561L13.6356 5.60381C13.129 5.53843 12.5832 5.49994 12 5.49994C11.4168 5.49994 10.8709 5.53843 10.3644 5.60381L9.9864 3.33561ZM16.7135 19.4783L16.3365 18.3471C17.2221 18.0953 18.1008 17.7971 18.9331 17.4013C19.4309 17.1622 19.6405 16.5647 19.4014 16.0669C19.1622 15.5692 18.5647 15.3597 18.0669 15.5986C17.4725 15.8793 16.8456 16.1 16.2191 16.2953C15.0702 16.6535 13.5516 17 12 17C10.4484 17 8.92975 16.6535 7.78088 16.2953C7.15483 16.1001 6.53092 15.8781 5.93607 15.6C5.44219 15.3668 4.83698 15.5709 4.59864 16.0669C4.36123 16.561 4.57887 17.1681 5.0722 17.4039C5.90316 17.7978 6.77969 18.0958 7.66354 18.3471L7.28647 19.4783C6.22623 19.4118 5.33457 19.1933 4.53112 18.8362C3.65215 18.4455 2.83779 17.8709 2.00169 17.0797C2.02016 14.8272 2.19155 13.069 2.59925 11.4223C3.01458 9.74468 3.68586 8.13987 4.7452 6.2178C6.0043 5.46452 6.90106 5.0901 8.19227 4.73633L8.40706 6.02507C7.53196 6.29408 6.64115 6.64982 5.903 7.1977C5.46929 7.52129 5.37507 8.1667 5.7 8.59994C6.03024 9.04026 6.6539 9.1307 7.09547 8.80332C7.4639 8.53958 7.89071 8.34569 8.30889 8.17842C9.14624 7.84348 10.3952 7.49994 12 7.49994C13.6048 7.49994 14.8538 7.84348 15.6911 8.17842C16.1093 8.34568 16.5361 8.53955 16.9045 8.8033C17.3461 9.1307 17.9698 9.04027 18.3 8.59994C18.6241 8.16782 18.526 7.51604 18.0932 7.19491C17.3475 6.65617 16.4693 6.29447 15.5929 6.02507L15.8077 4.73633C17.0989 5.0901 17.9957 5.46452 19.2548 6.2178C20.3141 8.13987 20.9854 9.74468 21.4008 11.4223C21.8085 13.069 21.9798 14.8272 21.9983 17.0797C21.1622 17.8709 20.3479 18.4455 19.4689 18.8362C18.6654 19.1933 17.7738 19.4118 16.7135 19.4783ZM9 15C10.1046 15 11 13.8807 11 12.5C11 11.1193 10.1046 10 9 10C7.89543 10 7 11.1193 7 12.5C7 13.8807 7.89543 15 9 15ZM17 12.5C17 13.8807 16.1046 15 15 15C13.8954 15 13 13.8807 13 12.5C13 11.1193 13.8954 10 15 10C16.1046 10 17 11.1193 17 12.5ZM9 13.4713C8.57084 13.4713 8.22293 13.0365 8.22293 12.5C8.22293 11.9635 8.57084 11.5287 9 11.5287C9.42916 11.5287 9.77707 11.9635 9.77707 12.5C9.77707 13.0365 9.42916 13.4713 9 13.4713ZM15 13.4713C14.5708 13.4713 14.2229 13.0365 14.2229 12.5C14.2229 11.9635 14.5708 11.5287 15 11.5287C15.4292 11.5287 15.7771 11.9635 15.7771 12.5C15.7771 13.0365 15.4292 13.4713 15 13.4713Z" fill="currentColor"/>
                                </svg>
                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                  Discord.js {project.stack.discordjs}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {project.stack.react && project.stack.react !== '-' && (
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
                                  <path fill="currentColor" d="M7.5 2.5c-1.026 0-1.908.277-2.6.87c-.688.59-1.137 1.447-1.387 2.516a.5.5 0 0 0 .897.4c.316-.452.632-.723.936-.863c.294-.135.611-.162.975-.065c.366.098.65.386 1.095.87l.015.016c.336.365.745.81 1.305 1.156c.582.359 1.305.6 2.264.6c1.026 0 1.908-.277 2.6-.87c.688-.59 1.138-1.447 1.387-2.516a.5.5 0 0 0-.897-.4c-.316.452-.632.723-.936.863c-.294.135-.611.162-.975.065c-.366-.098-.65-.386-1.095-.87l-.015-.016c-.336-.365-.745-.81-1.305-1.156c-.582-.359-1.305-.6-2.264-.6M4 7c-1.026 0-1.908.277-2.6.87C.712 8.46.263 9.317.013 10.386a.5.5 0 0 0 .897.4c.316-.452.632-.723.936-.863c.294-.135.611-.162.975-.065c.366.098.65.386 1.095.87l.015.016c.336.365.745.81 1.305 1.156c.582.359 1.305.6 2.264.6c1.026 0 1.908-.277 2.6-.87c.688-.59 1.138-1.447 1.387-2.516a.5.5 0 0 0-.897-.4c-.316.452-.632.723-.936.863c-.294.135-.611.162-.975.065c-.366-.098-.65-.386-1.095-.87l-.015-.016c-.336-.365-.745-.81-1.305-1.156C5.682 7.24 4.959 7 4 7" />
                                </svg>
                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                  Tailwind {project.stack.tailwind}
                                </p>
                              </div>
                            )}
                            {project.type === 'backend' && project.stack.bun !== '-' && (
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-neutral-800 dark:text-neutral-200" width="1em" height="1em" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m-1-13h2v6h-2zm0 8h2v2h-2z"/>
                                </svg>
                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                  Bun {project.stack.bun}
                                </p>
                              </div>
                            )}
                            {project.type === 'backend' && project.stack.elysia !== '-' && (
                              <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-neutral-800 dark:text-neutral-200" width="1em" height="1em" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m-1-13h2v6h-2zm0 8h2v2h-2z"/>
                                </svg>
                                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                  Elysia {project.stack.elysia}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="z-1 grid items-center gap-4 md:flex md:gap-8">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div 
                              className="absolute inset-[-2px] rounded-full blur-[2px]" 
                              style={{ 
                                backgroundColor: (() => {
                                  switch (project.status.text) {
                                    case 'projects.status.done':
                                    case 'projects.status.production':
                                    case 'projects.status.development':
                                      return '#10b981'; // зеленый
                                    case 'projects.status.abandoned':
                                      return '#ef4444'; // красный
                                    default:
                                      return project.status.color;
                                  }
                                })(),
                                opacity: 0.5 
                              }} 
                            />
                            <div 
                              className="relative size-2 rounded-full" 
                              style={{ 
                                backgroundColor: (() => {
                                  switch (project.status.text) {
                                    case 'projects.status.done':
                                    case 'projects.status.production':
                                    case 'projects.status.development':
                                      return '#10b981'; // зеленый
                                    case 'projects.status.abandoned':
                                      return '#ef4444'; // красный
                                    default:
                                      return project.status.color;
                                  }
                                })()
                              }} 
                            />
                          </div>
                          <span 
                            className={(() => {
                              switch (project.status.text) {
                                case 'projects.status.done':
                                case 'projects.status.production':
                                case 'projects.status.development':
                                  return 'text-emerald-600 dark:text-emerald-500 text-sm';
                                case 'projects.status.abandoned':
                                  return 'text-red-600 dark:text-red-500 text-sm';
                                default:
                                  return 'text-neutral-600 dark:text-neutral-400 text-sm';
                              }
                            })()}
                          >
                            {t(project.status.text)}
                          </span>
                        </div>
                        {!project.sourceCode && (
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <div className="absolute inset-[-2px] rounded-full blur-[2px] bg-red-500/50" />
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="relative text-lg text-red-500" 
                                width="1em" 
                                height="1em" 
                                viewBox="0 0 24 24"
                              >
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"></path>
                                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </g>
                              </svg>
                            </div>
                            <p className="text-[12px] font-semibold text-red-500">
                              {t('projects.sourceCode.closed')}
                            </p>
                          </div>
                        )}
                      </div>

                      <p className="z-1 text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">
                        {t(project.description)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center p-8">
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                    {t('projects.search.noResults')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 