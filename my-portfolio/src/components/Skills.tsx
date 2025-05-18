'use client'

import { AlignLeft, CheckSquare } from 'lucide-react';
import { skills } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';

const getStatusColor = (status: 'active' | 'learning') => {
  switch (status) {
    case 'active':
      return '#07b97a';
    case 'learning':
      return '#db7c29';
    default:
      return '#db7c29';
  }
};

const getStatusText = (status: 'active' | 'learning') => {
  switch (status) {
    case 'active':
      return 'Active use';
    case 'learning':
      return 'Learning';
    default:
      return 'Learning';
  }
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <div className="relative easy-in-out grid grid-rows-[auto_1fr] gap-4 rounded-xl p-6 shadow-lg ring-2 ring-card bg-card overflow-hidden">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-md bg-black/40">
        <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg select-none animate-pulse">
          {t('skills.inDevelopment')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <AlignLeft className="text-lg icon-primary" />
        <h1 className="text-sm text-primary">skills.md</h1>
      </div>

      <h1 className="heading font-bold">{t('skills.title')}</h1>

      <div className="grid gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            style={{
              willChange: 'transform',
              transition: '2000ms cubic-bezier(0.215, 0.61, 0.355, 1)',
              transform: 'perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            }}
          >
            <a
              className="button-base grid gap-2 p-5"
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-lg icon-primary"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d={skill.icon} />
                </svg>
                <p className="text-md font-semibold text-primary">{skill.name}</p>
              </div>
              
              <div className="relative flex items-center gap-2">
                <svg
                  className="glowing-circle pointer-events-none"
                  height="15"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="3"
                    fill={getStatusColor(skill.status)}
                  />
                </svg>
                <p
                  className="text-sm"
                  style={{ color: getStatusColor(skill.status) }}
                >
                  {t(`skills.status.${skill.status}`)}
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="size-20 rounded-full opacity-25 blur-[50px]"
                    style={{ backgroundColor: getStatusColor(skill.status) }}
                  />
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="grid items-start">
        <h1 className="heading font-bold">{t('skills.fullList')}</h1>
      </div>

      <a
        className="button-base grid gap-3 p-5"
        href="/skills"
      >
        <div className="flex items-center gap-3">
          <CheckSquare className="text-lg icon-primary" />
          <p className="font-semibold text-primary">{t('skills.viewAll')}</p>
        </div>
        <p className="text-sm font-semibold text-secondary">
          {t('skills.description')}
        </p>
      </a>
    </div>
  );
} 