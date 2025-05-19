import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] p-6">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-neutral-800 dark:text-neutral-200">
          404
        </h1>
        <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
          Страница не найдена
        </p>
        <Link href="/">
          <button className="button-base">
            Вернуться на главную
          </button>
        </Link>
      </div>
    </div>
  );
} 