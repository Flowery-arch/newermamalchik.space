'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeTransition = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-500 ${
        resolvedTheme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
      style={{
        opacity: 0,
        animation: 'themeTransition 500ms ease-in-out',
      }}
    />
  );
};

export default ThemeTransition; 