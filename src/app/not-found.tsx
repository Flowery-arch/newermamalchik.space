'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import RandomText from '@/components/ui/RandomText';

export default function NotFound() {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${currentTheme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <div className="word">
            <RandomText
              text="404"
              className="flex gap-[0.1em] text-[#ffa500] dark:text-[#ffa500]"
              charDuration={1500}
              delayBetweenChars={200}
            />
            <span className="dot-animated">.</span>
          </div>
          <div className="w-full max-w-[300px] -ml-8">
            <Link href="/">
              <button className="home-button">
                <span className="font-mono text-neutral-500 dark:text-neutral-600 select-none">$</span>
                <span className="text-emerald-600 dark:text-emerald-500 select-none">cd</span>
                <span className="text-neutral-800 dark:text-neutral-300">
                  <RandomText
                    text="./home"
                    charDuration={800}
                    delayBetweenChars={100}
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="overlay"></div>

      <style jsx>{`
        .theme-dark {
          background: #0a0a0a;
        }

        .theme-light {
          background: #f0f0f0;
        }

        .word {
          position: relative;
          font-size: 8em;
          line-height: 1em;
          font-family: 'Source Code Pro', monospace;
          white-space: nowrap;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.1em;
          margin: 0;
          padding: 0;
        }

        .theme-dark .word,
        .theme-light .word {
          text-shadow: 0 0 10px rgba(255, 165, 0, 0.5), 0 0 5px rgba(255, 140, 0, 0.5);
        }

        .word span {
          display: inline-block;
          opacity: 1;
        }

        .word span.dot-animated {
          display: inline-block;
          opacity: 1;
          animation: blink 1s ease-in-out infinite;
          margin-left: -0.2em;
          color: #ffa500;
        }

        .home-button {
          display: flex;
          align-items: center;
          gap: 0.5em;
          font-family: 'Source Code Pro', monospace;
          font-size: 1.2em;
          padding: 0.8em 1.5em;
          border-radius: 0.75rem;
          background: transparent;
          transition: all 0.3s ease;
          border: 2px solid rgba(128, 128, 128, 0.2);
          margin: 0;
          width: 100%;
          justify-content: flex-start;
        }

        .theme-dark .home-button {
          background: rgba(10, 10, 10, 0.3);
        }

        .theme-light .home-button {
          background: rgba(240, 240, 240, 0.3);
        }

        .home-button:hover {
          transform: scale(0.98);
          opacity: 0.8;
        }

        .home-button:active {
          transform: scale(0.95);
          opacity: 0.7;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(transparent 50%, rgba(10, 10, 10, 0.3) 50%);
          background-size: 100% 2px;
          pointer-events: none;
        }

        .theme-light .overlay {
          background-image: linear-gradient(transparent 50%, rgba(200, 200, 200, 0.3) 50%);
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .word {
            font-size: 6em;
          }
        }
      `}</style>
    </div>
  );
} 