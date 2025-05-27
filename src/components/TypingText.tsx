import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  nameHighlight?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ text, className = '', nameHighlight }) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Убираем курсор после завершения анимации печатания (3.5 секунды)
    const timer = setTimeout(() => {
      setShowCursor(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (nameHighlight && text.includes(nameHighlight)) {
    const parts = text.split(nameHighlight);
    const before = parts[0];
    const after = parts.slice(1).join(nameHighlight);
    
    return (
      <div className={`relative inline-block ${className}`}>
        <span className="inline-block whitespace-nowrap overflow-hidden animate-typing">
          {before}
          <span className="gradient-text bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-float">
            {nameHighlight}
          </span>
          {after}
          {showCursor && <span className="inline-block w-[2px] h-[1em] ml-[2px] bg-current animate-blink" />}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="inline-block whitespace-nowrap overflow-hidden animate-typing">
        {text}
        {showCursor && <span className="inline-block w-[2px] h-[1em] ml-[2px] bg-current animate-blink" />}
      </span>
    </div>
  );
};

export default TypingText; 