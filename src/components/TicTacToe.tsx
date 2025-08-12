'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Close, RadioButtonUnchecked } from '@mui/icons-material';

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

    setXIsNext(false); // AI's turn
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setWinner(null);
  };

  // AI move logic
  const pickAiMove = (squares: ("X" | "O" | null)[]): number | null => {
    // 1) Check if AI can win
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === null) {
        const testSquares = squares.slice();
        testSquares[idx] = 'O';
        if (calculateWinner(testSquares) === 'O') {
          return idx;
        }
      }
    }

    // 2) Block player from winning
    for (let idx = 0; idx < squares.length; idx++) {
      if (squares[idx] === null) {
        const testSquares = squares.slice();
        testSquares[idx] = 'X';
        if (calculateWinner(testSquares) === 'X') {
          return idx;
        }
      }
    }

    // 3) Take center
    if (squares[4] === null) return 4;

    // 4) Take a corner
    const corners = [0, 2, 6, 8];
    for (const corner of corners) {
      if (squares[corner] === null) return corner;
    }

    // 5) Take a side
    const sides = [1, 3, 5, 7];
    for (const side of sides) {
      if (squares[side] === null) return side;
    }

    return null;
  };

  // Trigger AI move after user's move
  useEffect(() => {
    if (gameOver) return;

    // If it's O's turn, have AI move
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

  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Interactive Tic-Tac-Toe
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        Take a break and play a quick game! This demonstrates my ability to create interactive elements.
      </Typography>
      
      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          border: '2px solid',
          borderColor: '#496c99', // Deep steel blue border
          bgcolor: '#0a0a1a', // Slightly lighter navy background
          maxWidth: 400, // Limit the width
          mx: 'auto', // Center the game board
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#ffffff', mb: 3 }}>
          {winner ? `Winner: ${winner}` : xIsNext ? 'Your turn' : 'Computer is thinking...'}
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
                color: cell === 'X' ? '#8a2be2' : '#9ca0b9', // Vibrant purple for X, light lavender-gray for O
                borderColor: '#496c99', // Deep steel blue border
                bgcolor: '#0a0a1a', // Slightly lighter navy background
                minWidth: 'unset', // Override Material-UI default min-width
                '&:hover': {
                  borderColor: '#6d809f', // Medium slate blue on hover
                  bgcolor: '#04040c', // Deep navy on hover
                }
              }}
            >
              {cell === 'X' ? (
                <Close sx={{ fontSize: 32, color: '#8a2be2' }} /> // Vibrant purple for X
              ) : cell === 'O' ? (
                <RadioButtonUnchecked sx={{ fontSize: 32, color: '#9ca0b9' }} /> // Light lavender-gray for O
              ) : null}
            </Button>
          ))}
        </Box>
        
        <Button 
          variant="contained" 
          onClick={resetGame}
          sx={{ 
            bgcolor: '#6d809f', // Medium slate blue background
            color: '#ffffff', // White text
            px: 3, // Add horizontal padding
            py: 1.5, // Add vertical padding
            '&:hover': {
              bgcolor: '#9ca0b9', // Light lavender-gray on hover
            }
          }}
        >
          Reset Game
        </Button>
      </Paper>
    </Box>
  );
} 