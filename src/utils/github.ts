import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

export interface Repository {
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  stars: number;
  forks: number;
  isArchived: boolean;
}

export interface Language {
  name: string;
  color: string;
  percentage: number;
}

export async function getRepositories(username: string): Promise<Repository[]> {
  try {
    console.log('Fetching repositories for:', username);
    console.log('Token exists:', !!process.env.NEXT_PUBLIC_GITHUB_TOKEN);
    
    const { data } = await octokit.rest.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
    });

    console.log('Found repositories:', data.length);

    return data.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      homepage: repo.homepage || '',
      language: repo.language || '',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      isArchived: repo.archived || false,
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

export async function getLanguages(username: string): Promise<Language[]> {
  const repos = await getRepositories(username);
  const languageMap = new Map<string, { size: number; color: string }>();
  let totalSize = 0;

  for (const repo of repos) {
    if (repo.language) {
      const { data } = await octokit.rest.repos.listLanguages({
        owner: username,
        repo: repo.name,
      });

      Object.entries(data).forEach(([lang, size]) => {
        const current = languageMap.get(lang) || { size: 0, color: getLanguageColor(lang) };
        languageMap.set(lang, {
          size: current.size + size,
          color: current.color,
        });
        totalSize += size;
      });
    }
  }

  return Array.from(languageMap.entries())
    .map(([name, { size, color }]) => ({
      name,
      color,
      percentage: Math.round((size / totalSize) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    Rust: '#dea584',
    // Add more as needed
  };
  return colors[language] || '#858585';
} 