'use client'

import { LucideGithub, LucideCode, LucideGitCommit, LucideStar, LucideGitPullRequest, LucideUsers, LucideLoader } from 'lucide-react';
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

// Резервные данные, если API недоступен
const FALLBACK_STATS: GitHubStats = {
  totalContributions: 385,
  totalRepositories: 17,
  totalStars: 0,
  totalCommits: 142,
  totalPRs: 12,
  totalFollowers: 0,
  commitsByDay: [2, 5, 3, 7, 9, 4, 6, 2, 8, 5, 3, 7, 4, 2]
};

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats>(FALLBACK_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
  const maxCommits = Math.max(...stats.commitsByDay);

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
        <div className="flex flex-col gap-1 p-2 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/30">
          <div className="flex items-center gap-1">
            <LucideCode className="size-3.5 text-neutral-600 dark:text-neutral-400" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Repos</span>
          </div>
          <span className="text-base font-medium text-neutral-800 dark:text-neutral-200">{stats.totalRepositories}</span>
        </div>
        
        <div className="flex flex-col gap-1 p-2 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/30">
          <div className="flex items-center gap-1">
            <LucideGitCommit className="size-3.5 text-neutral-600 dark:text-neutral-400" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Commits</span>
          </div>
          <span className="text-base font-medium text-neutral-800 dark:text-neutral-200">{stats.totalCommits}</span>
        </div>
        
        <div className="flex flex-col gap-1 p-2 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/30">
          <div className="flex items-center gap-1">
            <LucideStar className="size-3.5 text-neutral-600 dark:text-neutral-400" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Stars</span>
          </div>
          <span className="text-base font-medium text-neutral-800 dark:text-neutral-200">{stats.totalStars}</span>
        </div>
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
                height: `${(count / maxCommits) * 100}%`,
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
          <span>{stats.totalPRs} PRs</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideUsers className="size-3.5" />
          <span>{stats.totalContributions} contributions</span>
        </div>
      </div>
    </div>
  );
}