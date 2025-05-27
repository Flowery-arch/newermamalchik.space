import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

// Кэш для версии, чтобы не вызывать Git при каждом запросе
let cachedVersion: string | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 3600000; // 1 час в миллисекундах

// Константные значения на случай, если не получится выполнить git команды
const FALLBACK_VERSION = 'v0.20.b05a03c';

function getGitVersion(): string {
  try {
    // Пытаемся получить информацию из git
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
    const commitCount = execSync('git rev-list --count HEAD').toString().trim();
    
    return `v0.${commitCount}.${commitHash}`;
  } catch (error) {
    console.error('Error getting git version:', error);
    return FALLBACK_VERSION;
  }
}

export async function GET() {
  try {
    const now = Date.now();
    
    // Используем кэшированную версию, если она есть и не устарела
    if (cachedVersion && now - lastFetchTime < CACHE_TTL) {
      return NextResponse.json({ version: cachedVersion });
    }
    
    // Получаем новую версию
    const version = getGitVersion();
    
    // Обновляем кэш
    cachedVersion = version;
    lastFetchTime = now;
    
    return NextResponse.json({ version }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error in git-version API:', error);
    return NextResponse.json(
      { version: FALLBACK_VERSION, error: 'Failed to get git version' },
      { status: 200 }
    );
  }
} 