import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedSquares, setSelectedSquares] = useState([]); // Track selected squares
  const [resetting, setResetting] = useState(false); // Track if squares are resetting

  const handleSquareClick = (index) => {
    // Only add if the square isn't already selected and we're not resetting
    if (!selectedSquares.includes(index) && !resetting) {
      setSelectedSquares([...selectedSquares, index]);
    }
  };

  useEffect(() => {
    if (selectedSquares.length === 9) {
      // Start reset process after all squares are selected
      const resetTimer = setTimeout(() => {
        setResetting(true); // Begin reset mode
        resetSquaresInSequence(0); // Start resetting squares in sequence
      }, 1000);

      return () => clearTimeout(resetTimer);
    }
  }, [selectedSquares]);

  const resetSquaresInSequence = (currentIndex) => {
    if (currentIndex < selectedSquares.length) {
      // Remove the square from selectedSquares in the sequence it was selected
      setSelectedSquares((prev) => prev.slice(1));

      // Call the next reset after a delay
      setTimeout(() => resetSquaresInSequence(currentIndex + 1), 500);
    } else {
      // End reset mode once all squares are reverted
      setResetting(false);
    }
  };

  return (
    <div className="grid">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className={`square ${selectedSquares.includes(index) ? 'selected' : ''}`}
          onClick={() => handleSquareClick(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default App;
