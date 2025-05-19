'use client'

import { LucideFolder, LucideList } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface Project {
  name: string;
  version: string;
  url: string;
  status: {
    color: string;
    text: string;
  };
}

const projects: Project[] = [
  {
    name: 'Биография',
    version: 'v1',
    url: 'https://neweramamalchik.space/',
    status: {
      color: '#07b97a',
      text: 'Done, getting updates'
    }
  },
  {
    name: 'Flowery',
    version: 'v4',
    url: 'https://flowerymc.online',
    status: {
      color: '#07b97a',
      text: 'Done, getting updates'
    }
  }
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <div className="easy-in-out grid gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-card h-full">
      <div className="flex items-center gap-2">
        <LucideFolder className="text-lg icon-primary" />
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">projects.tsx</h1>
      </div>
      
      {/* Main Block Title */}
      <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-2xl">{t('projects.title')}</h1>

      {/* Project List */}
      <div className="grid gap-4 flex-grow">
        {projects.map((project) => (
          <div
            key={project.name}
            style={{
              willChange: 'transform',
              transition: '2000ms cubic-bezier(0.215, 0.61, 0.355, 1)',
              transform: 'perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            }}
          >
            <a
              className="easy-in-out rounded-xl shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 active:scale-98 active:opacity-80 dark:bg-neutral-950 dark:ring-neutral-300/10 grid gap-2 p-4 sm:p-5"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm sm:text-md font-semibold text-neutral-800 dark:text-neutral-100">{project.name}</p>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400">/ {project.version}</p>
              </div>
              
              <div className="relative flex items-center gap-2">
                <svg
                  className="glowing-circle pointer-events-none"
                  height="12"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="3"
                    fill={project.status.color}
                  />
                </svg>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: project.status.color }}
                >
                  {project.status.text}
                </p>
                <div className="absolute">
                  <div
                    className="size-16 sm:size-20 rounded-full opacity-25 blur-[50px]"
                    style={{ backgroundColor: project.status.color }}
                  />
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Full List Section */}
      <div className="grid items-start">
        <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-2xl">{t('projects.fullList')}</h1>
      </div>

      <div className="flex flex-row gap-4">
        <Link
          href="/projects"
          className="easy-in-out rounded-xl shadow-lg ring-2 ring-neutral-500/20 duration-600 hover:scale-101 active:scale-98 active:opacity-80 dark:bg-neutral-950 dark:ring-neutral-300/10 grid gap-3 p-4 sm:p-5"
        >
          <div className="flex items-center gap-3">
            <LucideList className="text-lg text-neutral-800 dark:text-neutral-100/70" />
            <p className="font-semibold text-neutral-800 dark:text-neutral-100">{t('projects.viewAll')}</p>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-400">
            {t('projects.description')}
          </p>
        </Link>
      </div>
    </div>
  );
} 