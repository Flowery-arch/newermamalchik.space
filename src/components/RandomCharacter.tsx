import React, { useEffect, useState } from 'react';

interface RandomCharacterProps {
  char: string;
  duration?: number;
  delay?: number;
}

const RandomCharacter: React.FC<RandomCharacterProps> = ({ char, duration = 50, delay = 0 }) => {
  const [displayChar, setDisplayChar] = useState('');
  const characters = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  useEffect(() => {
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        setDisplayChar(randomChar);
        requestAnimationFrame(animate);
      } else {
        setDisplayChar(char);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [char, duration, delay]);

  return <span className="inline-block">{displayChar || char}</span>;
};

export default RandomCharacter; 