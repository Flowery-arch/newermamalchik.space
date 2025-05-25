'use client';

import React, { useState, useEffect, useCallback } from 'react';

// Определение типов и констант
type TetrisPiece = {
  shape: number[][];
  color: string;
  x: number;
  y: number;
};

const TETROMINOS = [
  { // I
    shape: [[1, 1, 1, 1]],
    color: '#00f0f0'
  },
  { // J
    shape: [[1, 0, 0], [1, 1, 1]],
    color: '#0000f0'
  },
  { // L
    shape: [[0, 0, 1], [1, 1, 1]],
    color: '#f0a000'
  },
  { // O
    shape: [[1, 1], [1, 1]],
    color: '#f0f000'
  },
  { // S
    shape: [[0, 1, 1], [1, 1, 0]],
    color: '#00f000'
  },
  { // T
    shape: [[0, 1, 0], [1, 1, 1]],
    color: '#a000f0'
  },
  { // Z
    shape: [[1, 1, 0], [0, 1, 1]],
    color: '#f00000'
  }
];

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 16;
const EMPTY_CELL = '#1a1a1a';

export default function TetrisDemo() {
  const [board, setBoard] = useState<string[][]>(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL)));
  const [currentPiece, setCurrentPiece] = useState<TetrisPiece | null>(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Проверка мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        // На мобильных устройствах только демо-режим
        setDemoMode(true);
        
        // Если это мобильное устройство, сразу запускаем демо
        if (!gameStarted) {
          startDemoMode();
        }
      } else {
        setDemoMode(false);
      }
    };
    
    // Проверяем при загрузке
    checkMobile();
    
    // Слушаем изменение размера окна
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [gameStarted]);

  // Создать новую фигуру
  const createNewPiece = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * TETROMINOS.length);
    const tetromino = TETROMINOS[randomIndex];
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2),
      y: 0
    };
  }, []);

  // Проверить, можно ли разместить фигуру
  const isValidMove = useCallback((piece: TetrisPiece, boardState: string[][]) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const boardX = piece.x + x;
          const boardY = piece.y + y;

          // Проверка на выход за границы поля
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY < 0 || boardY >= BOARD_HEIGHT) {
            return false;
          }

          // Проверка на столкновение с уже размещенными блоками
          if (boardY >= 0 && boardState[boardY][boardX] !== EMPTY_CELL) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  // Разместить фигуру на поле
  const placePiece = useCallback((piece: TetrisPiece, boardState: string[][]) => {
    const newBoard = boardState.map(row => [...row]);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      }
    }
    return newBoard;
  }, []);

  // Проверить и удалить заполненные строки
  const clearLines = useCallback((boardState: string[][]) => {
    let newBoard = [...boardState];
    let linesCleared = 0;

    newBoard = newBoard.filter(row => {
      const isRowFull = row.every(cell => cell !== EMPTY_CELL);
      if (isRowFull) {
        linesCleared++;
        return false;
      }
      return true;
    });

    // Добавить новые пустые строки сверху
    const newRows = Array(linesCleared).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL));
    newBoard = [...newRows, ...newBoard];

    return { newBoard, linesCleared };
  }, []);

  // Запуск демо-режима
  const startDemoMode = useCallback(() => {
    setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL)));
    setCurrentPiece(createNewPiece());
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    setDemoMode(true);
  }, [createNewPiece]);

  // Начать игру
  const startGame = () => {
    if (isMobile) {
      startDemoMode();
      return;
    }
    
    setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL)));
    setCurrentPiece(createNewPiece());
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    setDemoMode(false);
  };

  // Пауза/возобновление
  const togglePause = () => {
    if (demoMode) return;
    setIsPaused(!isPaused);
  };

  // Обработчики клавиш
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!gameStarted || isGameOver || isPaused || !currentPiece || demoMode) return;

    const piece = { ...currentPiece };
    
    switch (e.key) {
      case 'ArrowLeft':
        piece.x -= 1;
        if (isValidMove(piece, board)) {
          setCurrentPiece(piece);
        }
        break;
      case 'ArrowRight':
        piece.x += 1;
        if (isValidMove(piece, board)) {
          setCurrentPiece(piece);
        }
        break;
      case 'ArrowDown':
        piece.y += 1;
        if (isValidMove(piece, board)) {
          setCurrentPiece(piece);
        }
        break;
      case 'ArrowUp':
        // Вращение фигуры
        const rotatedShape = piece.shape[0].map((_, i) => 
          piece.shape.map(row => row[i]).reverse()
        );
        const rotatedPiece = { ...piece, shape: rotatedShape };
        if (isValidMove(rotatedPiece, board)) {
          setCurrentPiece(rotatedPiece);
        }
        break;
      default:
        break;
    }
  }, [board, currentPiece, gameStarted, isGameOver, isPaused, isValidMove, demoMode]);

  // Автоматический ход для демо-режима
  const makeAutomatedMove = useCallback(() => {
    if (!currentPiece) return;
    
    const randomMove = Math.floor(Math.random() * 4);
    const piece = { ...currentPiece };
    
    switch (randomMove) {
      case 0: // Влево
        piece.x -= 1;
        if (isValidMove(piece, board)) {
          setCurrentPiece(piece);
        }
        break;
      case 1: // Вправо
        piece.x += 1;
        if (isValidMove(piece, board)) {
          setCurrentPiece(piece);
        }
        break;
      case 2: // Вниз
        piece.y += 1;
        if (isValidMove(piece, board)) {
          setCurrentPiece(piece);
        }
        break;
      case 3: // Вращение
        const rotatedShape = piece.shape[0].map((_, i) => 
          piece.shape.map(row => row[i]).reverse()
        );
        const rotatedPiece = { ...piece, shape: rotatedShape };
        if (isValidMove(rotatedPiece, board)) {
          setCurrentPiece(rotatedPiece);
        }
        break;
    }
  }, [board, currentPiece, isValidMove]);

  // Игровой цикл
  useEffect(() => {
    if (!gameStarted || isGameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      if (currentPiece) {
        // В демо-режиме иногда делаем случайный ход
        if (demoMode && Math.random() < 0.3) {
          makeAutomatedMove();
        }
        
        const newPiece = { ...currentPiece, y: currentPiece.y + 1 };
        
        if (isValidMove(newPiece, board)) {
          setCurrentPiece(newPiece);
        } else {
          // Разместить фигуру на поле
          const newBoard = placePiece(currentPiece, board);
          const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
          
          setBoard(clearedBoard);
          setScore(prev => prev + linesCleared * 100);
          
          // Создать новую фигуру
          const nextPiece = createNewPiece();
          if (!isValidMove(nextPiece, clearedBoard)) {
            if (demoMode) {
              // В демо-режиме перезапускаем игру
              setTimeout(() => {
                setBoard(Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH).fill(EMPTY_CELL)));
                setCurrentPiece(createNewPiece());
                setScore(0);
              }, 1000);
            } else {
              setIsGameOver(true);
            }
          } else {
            setCurrentPiece(nextPiece);
          }
        }
      }
    }, demoMode ? 300 : 500); // В демо-режиме быстрее

    return () => clearInterval(gameLoop);
  }, [board, clearLines, createNewPiece, currentPiece, gameStarted, isGameOver, isPaused, isValidMove, placePiece, demoMode, makeAutomatedMove]);

  // Обработчик клавиш
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Отрисовка игрового поля
  const renderBoard = () => {
    let displayBoard = board.map(row => [...row]);
    
    // Добавить текущую фигуру на отображаемое поле
    if (currentPiece && !isGameOver) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] !== 0) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return (
      <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)` }}>
        {displayBoard.flat().map((color, index) => (
          <div 
            key={index} 
            className="w-6 h-6 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  };

  // Кнопки управления для мобильных устройств
  const renderControls = () => {
    if (demoMode) return null;
    
    return (
      <div className="grid grid-cols-3 gap-2 mt-4">
        <button 
          onClick={() => {
            if (!gameStarted || isGameOver || isPaused || !currentPiece) return;
            const piece = { ...currentPiece, x: currentPiece.x - 1 };
            if (isValidMove(piece, board)) setCurrentPiece(piece);
          }}
          className="p-2 bg-neutral-700/50 rounded-lg hover:bg-neutral-700/70 transition-colors"
        >
          ←
        </button>
        <button 
          onClick={() => {
            if (!gameStarted || isGameOver || isPaused || !currentPiece) return;
            const piece = { ...currentPiece, y: currentPiece.y + 1 };
            if (isValidMove(piece, board)) setCurrentPiece(piece);
          }}
          className="p-2 bg-neutral-700/50 rounded-lg hover:bg-neutral-700/70 transition-colors"
        >
          ↓
        </button>
        <button 
          onClick={() => {
            if (!gameStarted || isGameOver || isPaused || !currentPiece) return;
            const piece = { ...currentPiece, x: currentPiece.x + 1 };
            if (isValidMove(piece, board)) setCurrentPiece(piece);
          }}
          className="p-2 bg-neutral-700/50 rounded-lg hover:bg-neutral-700/70 transition-colors"
        >
          →
        </button>
        <button 
          onClick={() => {
            if (!gameStarted || isGameOver || isPaused || !currentPiece) return;
            const rotatedShape = currentPiece.shape[0].map((_, i) => 
              currentPiece.shape.map(row => row[i]).reverse()
            );
            const rotatedPiece = { ...currentPiece, shape: rotatedShape };
            if (isValidMove(rotatedPiece, board)) setCurrentPiece(rotatedPiece);
          }}
          className="col-span-3 p-2 bg-neutral-700/50 rounded-lg hover:bg-neutral-700/70 transition-colors"
        >
          Rotate
        </button>
      </div>
    );
  };

  return (
    <div className="rounded-xl p-6 shadow-lg ring-2 ring-neutral-500/20 dark:bg-neutral-900/10 dark:ring-neutral-300/10 w-full flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">Tetris Demo</h2>
      
      <div className="flex flex-col items-center">
        <div className="bg-neutral-900 p-2 rounded-lg mb-4">
          {renderBoard()}
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="text-neutral-800 dark:text-neutral-100">Score: {score}</div>
          {isGameOver && !demoMode && <div className="text-red-500">Game Over</div>}
        </div>
        
        {!demoMode && (
          <div className="flex gap-2">
            {!gameStarted || isGameOver ? (
              <button 
                onClick={startGame}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                {isGameOver ? 'Play Again' : 'Start Game'}
              </button>
            ) : (
              <button 
                onClick={togglePause}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            )}
          </div>
        )}
        
        {isMobile && (
          <p className="text-center mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Demo mode: the game plays automatically on mobile devices.<br/>
            For full gameplay experience, please visit on desktop.
          </p>
        )}
        
        {renderControls()}
      </div>
    </div>
  );
} 