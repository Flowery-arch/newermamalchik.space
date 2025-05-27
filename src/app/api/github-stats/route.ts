import { NextResponse } from 'next/server';

// GitHub API URLs
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'Flowery-arch';
const REPO_NAME = 'newermamalchik.space';

// Функция для безопасного выполнения fetch запроса с повторными попытками
async function safeFetch(url: string, options = {}, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(options as any).headers
        },
        next: { revalidate: 3600 } // Кэшировать на 1 час
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      // Пауза перед повторной попыткой
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error('Failed after retries');
}

export async function GET() {
  try {
    // Получаем данные о репозитории
    const [repoResponse, commitsResponse] = await Promise.all([
      safeFetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}`),
      safeFetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${REPO_NAME}/commits?per_page=100`)
    ]);

    const repoData = await repoResponse.json();
    const commitsData = await commitsResponse.json();

    // Рассчитываем статистику
    const totalRepositories = 1; // Только один репозиторий
    const totalStars = repoData.stargazers_count;
    const totalCommits = commitsData.length;
    const totalPRs = 12; // Можно реализовать позже, если нужно
    const totalContributions = 384; // Фиксированное значение
    const totalFollowers = repoData.watchers_count;
    
    // Создаем график активности коммитов
    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    // Инициализируем массив с нулями для последних 14 дней
    const activityByDay: number[] = Array(14).fill(0);
    
    // Распределяем коммиты по дням
    commitsData.forEach((commit: any) => {
      const commitDate = new Date(commit.commit.author.date);
      if (commitDate >= twoWeeksAgo) {
        const dayDiff = Math.floor((now.getTime() - commitDate.getTime()) / (24 * 60 * 60 * 1000));
        if (dayDiff >= 0 && dayDiff < 14) {
          const dayIndex = 13 - dayDiff;
          activityByDay[dayIndex]++;
        }
      }
    });

    // Собираем данные в единый объект
    const stats = {
      totalContributions,
      totalRepositories,
      totalStars,
      totalCommits,
      totalPRs,
      totalFollowers,
      commitsByDay: activityByDay,
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    
    // Возвращаем резервные данные в случае ошибки
    return NextResponse.json({
      totalContributions: 0,
      totalRepositories: 0,
      totalStars: 0,
      totalCommits: 0,
      totalPRs: 0,
      totalFollowers: 0,
      commitsByDay: Array(14).fill(0)
    }, { status: 200 });
  }
} 