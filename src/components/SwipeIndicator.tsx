'use client';

import React, { useState, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SwipeIndicatorProps {
  position?: 'right' | 'left';
  onPageChange?: (showTetris: boolean) => void;
}

export default function SwipeIndicator({ 
  position = 'right',
  onPageChange
}: SwipeIndicatorProps) {
  const [currentPosition, setCurrentPosition] = useState(position);
  
  const handleSwipe = useCallback(() => {
    // Переключаем позицию
    if (currentPosition === 'right') {
      setCurrentPosition('left');
      // Сообщаем родительскому компоненту, что нужно показать страницу с Tetris
      if (onPageChange) {
        onPageChange(true);
      }
    } else {
      setCurrentPosition('right');
      // Сообщаем родительскому компоненту, что нужно показать главную страницу
      if (onPageChange) {
        onPageChange(false);
      }
    }
  }, [currentPosition, onPageChange]);

  const positionClasses = currentPosition === 'right' 
    ? 'right-2 sm:right-4 md:right-8' 
    : 'left-2 sm:left-4 md:left-8';

  return (
    <div 
      className={`fixed top-1/2 -translate-y-1/2 z-50 flex items-center gap-1 sm:gap-2 cursor-pointer transition-all duration-300 ${positionClasses} hover:scale-105 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm py-2 px-3 rounded-full shadow-md`}
      onClick={handleSwipe}
    >
      {currentPosition === 'left' && (
        <div className="flex animate-pulse">
          <ChevronLeft className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300" />
          <ChevronLeft className="text-lg sm:text-xl -ml-3 sm:-ml-4 text-neutral-700 dark:text-neutral-300" />
        </div>
      )}
      <p className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300">
        Swipe
      </p>
      {currentPosition === 'right' && (
        <div className="flex animate-pulse">
          <ChevronRight className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300" />
          <ChevronRight className="text-lg sm:text-xl -ml-3 sm:-ml-4 text-neutral-700 dark:text-neutral-300" />
        </div>
      )}
    </div>
  );
} 