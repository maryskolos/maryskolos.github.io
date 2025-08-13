'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Close, RadioButtonUnchecked } from '@mui/icons-material';
import { commonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';

export default function TicTacToe() {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<"X" | "O" | "Draw" | null>(null);
  const [aiThinking, setAiThinking] = useState(false);

  const calculateWinner = (squares: ("X" | "O" | null)[]): "X" | "O" | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || gameOver || aiThinking) return;

    const newBoard = board.slice();
    newBoard[i] = 'X';
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

  const pickAiMove = (squares: ("X" | "O" | null)[]): number | null => {
    // Check if AI can win
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === null) {
        const testSquares = squares.slice();
        testSquares[idx] = 'O';
        if (calculateWinner(testSquares) === 'O') {
          return idx;
        }
      }
    }

    // Block player from winning
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === null) {
        const testSquares = squares.slice();
        testSquares[idx] = 'X';
        if (calculateWinner(testSquares) === 'X') {
          return idx;
        }
      }
    }

    // Take center
    if (squares[4] === null) return 4;

    // Take a corner
    const corners = [0, 2, 6, 8];
    for (const corner of corners) {
      if (squares[corner] === null) return corner;
    }

    // Take a side
    const sides = [1, 3, 5, 7];
    for (const side of sides) {
      if (squares[side] === null) return side;
    }

    return null;
  };

  useEffect(() => {
    if (gameOver) return;

    if (!xIsNext) {
      setAiThinking(true);
      const timer = setTimeout(() => {
        setBoard(prev => {
          const copy = prev.slice();
          const move = pickAiMove(copy);
          if (move !== null) {
            copy[move] = 'O';
          }
          const w = calculateWinner(copy);
          if (w) {
            setWinner(w);
            setGameOver(true);
          } else if (copy.every(s => s !== null)) {
            setWinner('Draw');
            setGameOver(true);
          } else {
            setXIsNext(true);
          }
          return copy;
        });
        setAiThinking(false);
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [xIsNext, gameOver]);

  const getStatusText = () => {
    if (winner) return `Winner: ${winner}`;
    return xIsNext ? 'Your turn' : 'Computer is thinking...';
  };

  const getCellColor = (cell: "X" | "O" | null) => {
    if (cell === 'X') return theme.colors.accent.purple;
    if (cell === 'O') return theme.colors.primary.light;
    return theme.colors.primary.light;
  };

  return (
    <Box sx={commonStyles.section}>
      <Typography variant="h2" component="h2" gutterBottom>
        Interactive Tic-Tac-Toe
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        Take a break and play a quick game! This demonstrates my ability to create interactive elements.
      </Typography>
      
      <Paper 
        sx={{ 
          ...commonStyles.paper,
          p: 4,
          textAlign: 'center',
          border: '2px solid',
          borderColor: theme.colors.border.primary,
          maxWidth: 400,
          mx: 'auto',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: theme.colors.text.primary, mb: 3 }}>
          {getStatusText()}
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 2, 
          mb: 3,
          width: 'fit-content',
          mx: 'auto'
        }}>
          {board.map((cell, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleClick(index)}
              disabled={cell !== null || winner !== null}
              sx={{
                width: 70,
                height: 70,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: getCellColor(cell),
                borderColor: theme.colors.border.primary,
                bgcolor: theme.colors.background.paper,
                minWidth: 'unset',
                '&:hover': {
                  borderColor: theme.colors.primary.main,
                  bgcolor: theme.colors.background.default,
                }
              }}
            >
              {cell === 'X' ? (
                <Close sx={{ fontSize: commonStyles.icon.small, color: theme.colors.accent.purple }} />
              ) : cell === 'O' ? (
                <RadioButtonUnchecked sx={{ fontSize: commonStyles.icon.small, color: theme.colors.primary.light }} />
              ) : null}
            </Button>
          ))}
        </Box>
        
        <Button 
          variant="contained" 
          onClick={resetGame}
          sx={{ 
            ...commonStyles.button.primary,
            px: 3,
            py: 1.5,
          }}
        >
          Reset Game
        </Button>
      </Paper>
    </Box>
  );
} 