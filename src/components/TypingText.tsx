import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ text, className = '' }) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Убираем курсор после завершения анимации печатания (3.5 секунды)
    const timer = setTimeout(() => {
      setShowCursor(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

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