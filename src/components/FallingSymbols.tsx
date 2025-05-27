import React, { useEffect, useRef, useState } from 'react';

const symbols = ['{', '}', '[', ']', ';', '/', '<', '>', '=', '&', '|', '!'];

interface SymbolProps {
  symbol: string;
  style: React.CSSProperties;
}

const FallingSymbol: React.FC<SymbolProps> = ({ symbol, style }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: '50%', // Default left, will be overridden by style
      color: 'rgba(128, 128, 128, 0.3)', // Semi-transparent gray
      fontSize: '1.5rem',
      pointerEvents: 'none', // Don't interfere with clicks
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {symbol}
  </div>
);

const FallingSymbols: React.FC = () => {
  const [fallingElements, setFallingElements] = useState<Array<{ id: number; element: React.ReactElement<any> }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createSymbol = () => {
      const id = Date.now() + Math.random();
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const left = Math.random() * 100 + 'vw';
      const duration = Math.random() * 5 + 10; // Fall for 10-15 seconds (slower)
      const delay = Math.random() * 3; // Start with 0-3 seconds delay
      const startTop = -10; // Start 10vh above the viewport

      const style: React.CSSProperties = {
        left,
        top: `${startTop}vh`,
        animation: `fall ${duration}s linear forwards, fadeOut ${duration}s linear forwards`,
        // We will handle cleanup based on animationend
      };

      return { id, element: <FallingSymbol key={id} symbol={symbol} style={style} /> };
    };

    const interval = setInterval(() => {
      const newSymbol = createSymbol();
      setFallingElements(prev => [...prev, newSymbol]);
    }, 500); // Create a new symbol every 500ms (adjust for density)

    // Cleanup function to remove symbols after animation
    const handleAnimationEnd = (event: AnimationEvent) => {
        const id = parseInt((event.target as HTMLElement).parentElement?.getAttribute('data-id') || '0', 10);
        if (id) {
            setFallingElements(prev => prev.filter(el => el.id !== id));
        }
    };

    // Add event listener to the container, using capture phase
    const container = containerRef.current;
    if (container) {
        container.addEventListener('animationend', handleAnimationEnd, true);
    }

    return () => {
      clearInterval(interval);
       if (container) {
        container.removeEventListener('animationend', handleAnimationEnd, true);
       }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1, // Ensure it's above content but below modals/popups
      }}
    >
      {fallingElements.map(({ id, element }) => React.cloneElement(element, { 'data-id': id }))}
      {/* Add keyframes directly in a style tag or in global CSS */}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0vh); opacity: 0.8; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes fadeOut {
           0% { opacity: 0.8; }
           50% { opacity: 0.4; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FallingSymbols;