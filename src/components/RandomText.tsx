import React from 'react';
import RandomCharacter from './RandomCharacter';

interface RandomTextProps {
  text: string;
  className?: string;
  charDuration?: number;
  delayBetweenChars?: number;
}

const RandomText: React.FC<RandomTextProps> = ({
  text,
  className = '',
  charDuration = 1000,
  delayBetweenChars = 100
}) => {
  return (
    <div className={className}>
      {text.split('').map((char, index) => (
        <RandomCharacter
          key={index}
          char={char}
          duration={charDuration}
          delay={index * delayBetweenChars}
        />
      ))}
    </div>
  );
};

export default RandomText; 