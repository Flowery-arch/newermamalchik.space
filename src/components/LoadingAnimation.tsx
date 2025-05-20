import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';

const LoadingAnimation: React.FC = () => {
  const word = "L OADING"; // Word without dots
  const dotsCount = 3;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\'":<>?,./`~'.split('');
  const cycleCount = 15; // How many times each letter cycles through random chars

  // Initialize state: First letter 'L' is done, others are '-' or space, dots are periods
  const [lettersState, setLettersState] = useState<Array<{ char: string; done: boolean; isDot?: boolean; animated?: boolean; dotIndex?: number }>>(
    word.split('').map((char, index) => ({
      char: index === 0 ? char : (char === ' ' ? ' ' : ''), // 'L' is initial, others are empty or space
      done: index === 0 || char === ' ' // 'L' and spaces are initially done
    }))
    // Add initial state for dots (periods, not done, isDot: true, animated: false)
    .concat(Array.from({ length: dotsCount }).map((_, dotIndex) => ({
        char: '.',
        done: false,
        isDot: true,
        animated: false,
        dotIndex: dotIndex,
    })))
  );

  const wordLength = word.length;
  const letterCount = wordLength + dotsCount;
  // Start from the second letter of the word (index 1)
  const letterCurrent = useRef(1);
  const cycleCurrent = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const dotsAnimationTimeout = useRef<number | null>(null);

  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('dark'); // Default to dark

  useEffect(() => {
    if (resolvedTheme) {
      setCurrentTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const getChar = () => chars[Math.floor(Math.random() * chars.length)];

  const startDotsAnimation = () => {
      setLettersState(prevState =>
          prevState.map((item, index) => {
              // Find dot elements and set animated flag
              if (item.isDot) {
                  return { ...item, animated: true };
              }
              return item;
          })
      );
      // No further timeouts needed here, animation is handled by CSS
  };

  const loop = () => {
    setLettersState(prevState =>
      prevState.map((item, index) => {
        // Only scramble letters that are part of the word and not yet done
        if (!item.isDot && index >= letterCurrent.current && !item.done) {
             return { ...item, char: getChar() };
        }
        return item;
      })
    );

    if (cycleCurrent.current < cycleCount) {
      cycleCurrent.current++;
    } else if (letterCurrent.current < wordLength) { // Check against wordLength, not total length
      // Mark current letter as done and reset cycle
      setLettersState(prevState =>
        prevState.map((item, index) => {
          if (index === letterCurrent.current) {
            return { ...item, char: word[index], done: true };
          }
          return item;
        })
      );
      cycleCurrent.current = 0;
      letterCurrent.current++;
    }

    // Continue word animation if not all letters of the word are done
    if (letterCurrent.current < wordLength) {
       animationFrameId.current = requestAnimationFrame(loop);
    } else {
        // Word animation complete, start dots animation
        startDotsAnimation();
    }
  };

  useEffect(() => {
    // Start the animation loop after a small delay
    const timeoutId = setTimeout(() => {
        loop();
    }, 500); // Small delay before starting animation

    return () => {
      // Cleanup animation frame and dots animation timeout on component unmount
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
       if (dotsAnimationTimeout.current) {
          clearTimeout(dotsAnimationTimeout.current);
      }
       clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={`loading-container ${currentTheme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      <div className="word">
        {lettersState.map((item, index) => (
          <span key={index} className={`${item.done ? 'done' : ''} ${item.isDot && item.animated ? 'dot-animated' : ''}`} style={item.isDot && item.animated && item.dotIndex !== undefined ? { animationDelay: `${item.dotIndex * 0.2}s` } : {}}>
            {item.char}
          </span>
        ))}
      </div>
      <div className="overlay"></div>

      {/* Adapted CSS */} 
      <style jsx global>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-family: 'Source Code Pro', monospace;
          font-weight: 400;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999; /* Ensure it's on top */
        }

        .theme-dark {
            background: #0a0a0a; /* Darker background */
        }

        .theme-light {
            background: #f0f0f0; /* Lighter background */
        }

        .word {
          position: relative;
          font-size: 2.5em;
          line-height: 1em;
          white-space: nowrap;
        }

        .theme-dark .word {
            color: #ffffff; /* White text */
            text-shadow: 0 0 10px rgba(255, 165, 0, 0.5), 0 0 5px rgba(255, 140, 0, 0.5); /* Orange glow */
        }

         .theme-light .word {
            color: #333333; /* Dark text */
            text-shadow: 0 0 10px rgba(0, 128, 0, 0.5), 0 0 5px rgba(0, 100, 0, 0.5); /* Green glow */
        }

        .word span {
          display: inline-block;
          transform: translateX(100%) scale(0.9); /* Keep for letter animation */
          transition: transform 500ms;
          /* Add initial state for dot animation */
          opacity: 1; /* Dots should be visible when their turn comes */
          transform: translateY(0) scale(1); /* Reset transform for dots */
        }

        .word span.done {
          transform: translateX(0) scale(1); /* Keep for letter animation */
        }
         .theme-dark .word span.done {
            color: #ffa500; /* Orange for done letters */
        }

        .theme-light .word span.done {
            color: #008000; /* Green for done letters */
        }

         /* Specific style for the animated dots */
        .word span.dot-animated {
             display: inline-block;
             opacity: 1;
             animation: jump 0.6s ease-in-out infinite alternate;
        }

        .theme-dark .word span.dot-animated {
            color: #ffa500; /* Orange color for dots */
        }

        .theme-light .word span.dot-animated {
            color: #008000; /* Green color for dots */
        }

        .word span.dot-animated:nth-child(odd) {
             animation-delay: 0s;
        }
         .word span.dot-animated:nth-child(even) {
             animation-delay: 0.3s;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(transparent 50%, rgba(10, 10, 10, 0.3) 50%); /* Subtle scan line effect */
          background-size: 100% 2px; /* Horizontal lines */
          pointer-events: none;
        }
        
        .theme-light .overlay {
             background-image: linear-gradient(transparent 50%, rgba(200, 200, 200, 0.3) 50%); /* Subtle scan line effect for light theme */
        }
        
        /* Keyframes for jumping animation */
        @keyframes jump {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px); /* Adjust jump height */
            }
        }

      `}</style>
    </div>
  );
};

export default LoadingAnimation; 
