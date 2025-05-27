'use client'

import { LucideFolder, LucideGithub, LucideGlobe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Project {
  name: string;
  displayName?: string;
  url: string;
  githubUrl?: string;
  type: 'frontend' | 'backend' | 'fullstack';
  stack: string[];
  status: {
    color: string;
    text: string;
    type: 'active' | 'development' | 'done' | 'planned';
  };
  descriptionKey: string;
}

const projects: Project[] = [
  {
    name: 'biography',
    displayName: 'Portfolio',
    url: 'https://neweramamalchik.space/',
    githubUrl: 'https://github.com/Flowery-arch/newermamalchik.space',
    type: 'frontend',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    status: {
      color: '#07b97a',
      text: 'projects.status.done',
      type: 'done'
    },
    descriptionKey: 'projects.descriptions.biography'
  }
];

export default function Projects() {
  const { t } = useLanguage();
  const [gitVersion, setGitVersion] = useState('v0.0.0');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Функция для получения версии из API
    async function fetchGitVersion() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/git-version');
        if (!response.ok) throw new Error('Failed to fetch version');
        
        const data = await response.json();
        setGitVersion(data.version);
      } catch (error) {
        console.error('Failed to fetch git version:', error);
        setGitVersion('v1.0.0');
      } finally {
        setIsLoading(false);
      }
    }

    fetchGitVersion();
  }, []);

  return (
    <div className="easy-in-out grid gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-card w-full">
      <div className="flex items-center gap-2">
        <LucideFolder className="text-lg icon-primary" />
        <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">projects.tsx</h1>
      </div>
      
      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.name} className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium">
                  {project.displayName || project.name}
                </h3>
                <span className="text-sm text-neutral-500">
                  {isLoading ? '...' : gitVersion}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#4ade80] animate-pulse" />
              <span className="text-sm text-emerald-500">
                {t(project.status.text)}
              </span>
              </div>
              
            <div className="flex flex-nowrap gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="button-base text-[15px] whitespace-nowrap px-2.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-sm text-neutral-800 dark:text-neutral-100/70">
              {t(project.descriptionKey)}
            </p>

            <div className="flex gap-4 text-sm">
              <Link 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100 transition-colors"
              >
                <LucideGlobe className="size-4" />
                website
              </Link>
              {project.githubUrl && (
                <Link 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100 transition-colors"
                >
                  <LucideGithub className="size-4" />
                  github
                </Link>
              )}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
} 