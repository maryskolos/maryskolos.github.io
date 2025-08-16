'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Close, RadioButtonUnchecked } from '@mui/icons-material';
import { getCommonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getCurrentTheme, getHeaderColor } from '@/utils/theme';

type CellValue = "X" | "O" | null;
type GameStatus = "X" | "O" | "Draw" | null;

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const CORNER_POSITIONS = [0, 2, 6, 8];
const SIDE_POSITIONS = [1, 3, 5, 7];

const getGameContainerStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    textAlign: 'center' as const,
    py: 4,
    px: 2,
    bgcolor: currentTheme.background.paper,
    border: '2px solid',
    borderColor: currentTheme.border.primary,
    borderRadius: theme.borderRadius.medium,
    maxWidth: 500,
    mx: 'auto',
  };
};

const getBoardStyles = () => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 1,
  mb: 4,
  maxWidth: 300,
  mx: 'auto',
});

const getCellStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    width: 80,
    height: 80,
    bgcolor: currentTheme.background.default,
    border: '2px solid',
    borderColor: currentTheme.border.primary,
    borderRadius: theme.borderRadius.small,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      bgcolor: currentTheme.primary.light,
      transform: 'scale(1.05)',
      border: '2px solid',
      borderColor: currentTheme.border.primary,
    },
    '&.Mui-disabled': {
      border: '2px solid',
      borderColor: currentTheme.border.primary,
    },
  };
};

const getIconStyles = (isDarkMode: boolean, cellValue: CellValue) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  
  if (cellValue === 'X') {
    if (isDarkMode) {
      return {
        fontSize: 40,
        color: theme.colors.accent.purple, // Purple for X in dark mode
      };
    } else {
      return {
        fontSize: 40,
        color: theme.lightColors.accent.green, // Green for X in light mode
      };
    }
  }
  if (cellValue === 'O') {
    if (isDarkMode) {
      return {
        fontSize: 40,
        color: theme.colors.primary.dark, // Dark blue for O in dark mode
      };
    } else {
      return {
        fontSize: 40,
        color: theme.lightColors.accent.blue, // Light blue for O in light mode
      };
    }
  }
  return {
    fontSize: 40,
    color: currentTheme.text.primary,
  };
};

const getResetButtonStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    bgcolor: currentTheme.primary.main,
    color: '#ffffff', // Always white text
    py: 2,
    px: 4,
    fontSize: '1.1rem',
    fontWeight: 600,
    '&:hover': {
      bgcolor: currentTheme.primary.dark,
      transform: 'scale(1.05)',
    },
    transition: 'all 0.2s ease',
  };
};

export default function TicTacToe() {
  const { themeMode, isTransitioning, pendingTheme } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const commonStyles = getCommonStyles(isDarkMode);
  
  const displayTheme = isTransitioning && pendingTheme ? pendingTheme : themeMode;
  const displayIsDarkMode = displayTheme === 'dark';

  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<GameStatus>(null);
  const [aiThinking, setAiThinking] = useState(false);

  const calculateWinner = (squares: CellValue[]): CellValue => {
    for (const [a, b, c] of WINNING_LINES) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver || aiThinking) return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      return;
    }

    if (newBoard.every(square => square !== null)) {
      setWinner('Draw');
      setGameOver(true);
      return;
    }

    setXIsNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setWinner(null);
  };

  const pickAiMove = (squares: CellValue[]): number | null => {
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === null) {
        const testSquares = squares.slice();
        testSquares[idx] = 'O';
        if (calculateWinner(testSquares) === 'O') {
          return idx;
        }
      }
    }

    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === null) {
        const testSquares = squares.slice();
        testSquares[idx] = 'X';
        if (calculateWinner(testSquares) === 'X') {
          return idx;
        }
      }
    }

    if (squares[4] === null) return 4;

    const availableCorners = CORNER_POSITIONS.filter(pos => squares[pos] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    const availableSides = SIDE_POSITIONS.filter(pos => squares[pos] === null);
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)];
    }

    return null;
  };

  useEffect(() => {
    if (!xIsNext && !gameOver && !aiThinking) {
      setAiThinking(true);
      
      setTimeout(() => {
        const aiMove = pickAiMove(board);
        if (aiMove !== null) {
          const newBoard = board.slice();
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          
          const gameWinner = calculateWinner(newBoard);
          if (gameWinner) {
            setWinner(gameWinner);
            setGameOver(true);
          } else if (newBoard.every(square => square !== null)) {
            setWinner('Draw');
            setGameOver(true);
          } else {
            setXIsNext(true);
          }
        }
        setAiThinking(false);
      }, 500);
    }
  }, [xIsNext, gameOver, aiThinking, board]);

  const getStatusText = () => {
    if (aiThinking) return 'Computer is thinking...';
    if (winner) return `Winner: ${winner}`;
    return xIsNext ? 'Your turn' : 'Computer is thinking...';
  };

  const getCellColor = (cell: CellValue) => {
    const currentTheme = getCurrentTheme(displayIsDarkMode);
    
    if (cell === 'X') {
      if (displayIsDarkMode) {
        return theme.colors.accent.purple; // Purple for X in dark mode
      } else {
        return theme.lightColors.accent.green; // Green for X in light mode
      }
    }
    if (cell === 'O') {
      if (displayIsDarkMode) {
        return theme.colors.primary.dark; // Dark blue for O in dark mode
      } else {
        return theme.lightColors.accent.blue; // Light blue for O in light mode
      }
    }
    return currentTheme.primary.light;
  };

  return (
    <Box sx={{ ...commonStyles.section, pt: 3 }}>
      <Typography 
        variant="h2" 
        component="h2" 
        gutterBottom
        sx={{ color: getHeaderColor(displayIsDarkMode), mb: 4 }}
      >
        Interactive Tic-Tac-Toe
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 4,
          color: getCurrentTheme(displayIsDarkMode).text.body
        }}
      >
        Take a break and play a quick game! This demonstrates my ability to create interactive elements.
      </Typography>
      
      <Paper sx={getGameContainerStyles(displayIsDarkMode)}>
        <Typography sx={{ variant: 'h5', component: 'p', color: getCurrentTheme(displayIsDarkMode).text.secondary, mb: 3 }}>
          {getStatusText()}
        </Typography>
        
        <Box sx={getBoardStyles()}>
          {board.map((cell, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleClick(index)}
              disabled={cell !== null || winner !== null}
              sx={getCellStyles(displayIsDarkMode)}
            >
              {cell === 'X' ? (
                <Close sx={getIconStyles(displayIsDarkMode, 'X')} />
              ) : cell === 'O' ? (
                <RadioButtonUnchecked sx={getIconStyles(displayIsDarkMode, 'O')} />
              ) : null}
            </Button>
          ))}
        </Box>
        
        <Button 
          variant="contained" 
          onClick={resetGame}
          sx={getResetButtonStyles(displayIsDarkMode)}
        >
          Reset Game
        </Button>
      </Paper>
    </Box>
  );
} 