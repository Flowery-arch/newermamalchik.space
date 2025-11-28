'use client'

import { LucideGithub, LucideCode, LucideGitCommit, LucideStar, LucideGitPullRequest, LucideUsers, LucideLoader, LucideInfo } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GitHubStats {
  totalContributions: number;
  totalRepositories: number;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalFollowers: number;
  commitsByDay: number[];
}

// Резервные данные на основе скриншота профиля
const FALLBACK_STATS: GitHubStats = {
  totalContributions: 154,
  totalRepositories: 2,
  totalStars: 2,
  totalCommits: 112,
  totalPRs: 14,
  totalFollowers: 0,
  commitsByDay: [2, 5, 3, 8, 12, 4, 7, 2, 6, 10, 4, 6, 8, 5]
};

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats>(FALLBACK_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        setIsLoading(true);
        // Используем API роут для обхода ограничений CORS
        const response = await fetch('/api/github-stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        
        const data = await response.json();
        setStats(data);
        setIsError(false);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setIsError(true);
        // Используем резервные данные в случае ошибки
        setStats(FALLBACK_STATS);
      } finally {
        setIsLoading(false);
      }
    }

    // Получаем данные при монтировании компонента
    fetchGitHubStats();

    // Настраиваем периодическое обновление каждые 30 минут
    const intervalId = setInterval(fetchGitHubStats, 30 * 60 * 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  // Найти максимальное значение для нормализации графика
  const maxCommits = Math.max(...stats.commitsByDay, 1); // Минимум 1, чтобы избежать деления на ноль

  // Форматирование чисел для более читаемого отображения
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const commitStats = [
    {
      title: "Repos",
      value: stats.totalRepositories,
      icon: <LucideCode className="size-3.5 text-neutral-600 dark:text-neutral-400" />
    },
    {
      title: "Commits",
      value: stats.totalCommits,
      icon: <LucideGitCommit className="size-3.5 text-neutral-600 dark:text-neutral-400" />
    },
    {
      title: "Stars",
      value: stats.totalStars,
      icon: <LucideStar className="size-3.5 text-neutral-600 dark:text-neutral-400" />
    }
  ];

  return (
    <div className="easy-in-out flex flex-col gap-3 rounded-xl p-5 shadow-lg ring-2 ring-neutral-500/20 dark:ring-neutral-300/10 bg-card w-full" style={{height: '290px'}}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideGithub className="text-lg icon-primary" />
          <h1 className="text-sm text-neutral-800 dark:text-neutral-100/70">github.tsx</h1>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && (
            <LucideLoader className="size-3 text-neutral-500 dark:text-neutral-400 animate-spin" />
          )}
          <a 
            href="https://github.com/Flowery-arch" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
          >
            @Flowery-arch
          </a>
        </div>
      </div>

      {/* Основные показатели */}
      <div className="grid grid-cols-3 gap-2">
        {commitStats.map((stat, index) => (
          <div key={index} className={`flex flex-col gap-1 p-2 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/30 relative ${index === 1 ? "transition-all" : ""}`}
               onMouseEnter={index === 1 ? () => setShowTooltip(true) : undefined}
               onMouseLeave={index === 1 ? () => setShowTooltip(false) : undefined}>
            <div className="flex items-center gap-1">
              {stat.icon}
              <span className="text-xs text-neutral-600 dark:text-neutral-400">{stat.title}</span>
              {index === 1 && <LucideInfo className="size-3 text-neutral-400/70 cursor-help" />}
            </div>
            <span className={`text-base font-medium text-neutral-800 dark:text-neutral-200 ${index === 1 ? "transition-all" : ""}`}>
              {isLoading ? '...' : formatNumber(stat.value)}
            </span>
            {index === 1 && showTooltip && (
              <div className="absolute -bottom-20 -left-2 w-48 p-2 bg-neutral-800/90 dark:bg-black/90 text-white text-xs rounded-md shadow-lg z-10">
                Общее количество коммитов за год
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Визуализация активности */}
      <div className="flex flex-col gap-1 flex-grow">
        <h2 className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Commit Activity</h2>
        <div className="flex items-end gap-1 h-24">
          {stats.commitsByDay.map((count, index) => (
            <div 
              key={index} 
              className="flex-1 bg-emerald-500/80 dark:bg-emerald-500/60 rounded-t-sm"
              style={{ 
                height: `${Math.max((count / maxCommits) * 100, 4)}%`, // Минимальная высота 4%
                opacity: isLoading ? '0.5' : '1',
                transform: isLoading ? 'scaleY(0.8)' : 'scaleY(1)',
                transition: `all 600ms ease-out ${index * 50}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Информация в футере */}
      <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400 mt-auto">
        <div className="flex items-center gap-1">
          <LucideGitPullRequest className="size-3.5" />
          <span>{isLoading ? '...' : formatNumber(stats.totalPRs)} PRs</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideUsers className="size-3.5" />
          <span>{isLoading ? '...' : formatNumber(stats.totalContributions)} contributions</span>
        </div>
      </div>
    </div>
  );
}