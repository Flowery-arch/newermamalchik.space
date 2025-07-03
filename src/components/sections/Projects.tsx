'use client'

import {
  LucideFolder,
  LucideGithub,
  LucideGlobe,
  LucideArrowRight,
  Star,
  GitBranch,
  Calendar,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Project {
  name: string
  displayName?: string
  url: string
  githubUrl?: string
  type: 'frontend' | 'backend' | 'fullstack'
  stack: string[]
  status: {
    color: string
    text: string
    type: 'active' | 'development' | 'done' | 'planned'
  }
  descriptionKey: string
  logoUrl?: string
  stars?: number
  lastUpdated?: string
  features?: string[]
}

const projects: Project[] = [
  {
    name: 'biography',
    displayName: 'Portfolio',
    url: 'https://neweramamalchik.space/',
    githubUrl: 'https://github.com/Flowery-arch/newermamalchik.space',
    type: 'frontend',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: {
      color: '#07b97a',
      text: 'projects.status.done',
      type: 'done',
    },
    descriptionKey: 'projects.descriptions.biography_frontend',
    logoUrl: '/favicon.ico',
    stars: 15,
    lastUpdated: '2025-01-25',
    features: ['Responsive Design', 'Dark Mode', 'Multi-language', 'PWA Ready'],
  },
]

// Иконки технологий в формате SVG с улучшенными цветами
const TechIcons: Record<string, React.ReactNode> = {
  'Next.js': (
    <svg viewBox='0 0 24 24' className='w-3.5 h-3.5 mr-1' fill='currentColor'>
      <path d='M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z' />
    </svg>
  ),
  TypeScript: (
    <svg viewBox='0 0 24 24' className='w-3.5 h-3.5 mr-1' fill='currentColor'>
      <path d='M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z' />
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox='0 0 24 24' className='w-3.5 h-3.5 mr-1' fill='currentColor'>
      <path d='M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z' />
    </svg>
  ),
}

export default function Projects() {
  const { t } = useLanguage()
  const [gitVersion, setGitVersion] = useState('v0.0.0')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Функция для получения версии из API
    async function fetchGitVersion() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/git-version')
        if (!response.ok) throw new Error('Failed to fetch version')

        const data = await response.json()
        setGitVersion(data.version)
      } catch (error) {
        console.error('Failed to fetch git version:', error)
        setGitVersion('v1.0.0')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGitVersion()
  }, [])

  return (
    <div className='easy-in-out grid gap-4 rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-card w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <LucideFolder className='text-lg icon-primary' />
          <h1 className='text-sm text-neutral-800 dark:text-neutral-100/70'>projects.tsx</h1>
        </div>
        <Link
          href='/projects'
          className='flex items-center gap-2 rounded-xl bg-neutral-100/20 ring-2 ring-neutral-400/30 duration-500 ease-in-out hover:scale-98 hover:opacity-80 active:scale-94 active:opacity-90 dark:bg-neutral-900/20 dark:ring-neutral-600/30 px-4 py-1'
        >
          <p className='font-semibold text-sm'>{t('projects.viewAll')}</p>
          <LucideArrowRight className='size-4' />
        </Link>
      </div>

      <div className='grid gap-6'>
        {projects.map(project => (
          <div key={project.name} className='grid gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {project.logoUrl && (
                  <div className='relative'>
                    <Image
                      src={project.logoUrl}
                      alt={project.name}
                      width={24}
                      height={24}
                      className='rounded-full'
                    />
                  </div>
                )}
                <h3 className='text-lg font-medium'>{project.displayName || project.name}</h3>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#4ade80] animate-pulse' />
              <span className='text-sm text-emerald-500'>{t(project.status.text)}</span>
            </div>

            <div className='flex flex-wrap gap-2'>
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className='inline-flex items-center px-2.5 py-1 rounded-lg bg-neutral-100/20 ring-1 ring-neutral-400/30 dark:bg-neutral-900/20 dark:ring-neutral-600/30 text-sm hover:opacity-80 transition-opacity'
                >
                  {TechIcons[tech]}
                  {tech}
                </span>
              ))}
            </div>

            <p className='text-sm text-neutral-800 dark:text-neutral-100/70'>
              {t(project.descriptionKey)}
            </p>

            <div className='flex gap-4 text-sm'>
              <Link
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 rounded-lg px-3 py-1.5 text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100 transition-colors'
              >
                <LucideGlobe className='size-4' />
                website
              </Link>
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 rounded-lg px-3 py-1.5 text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100 transition-colors'
                >
                  <LucideGithub className='size-4' />
                  github
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
