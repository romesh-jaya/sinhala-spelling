import React from 'react';
import './TileDisplay.scss';

interface TileDisplayProps {
  input: string;
  answerLength: number;
  correctAnswer: string;
  onBackspace: () => void;
}

const TileDisplay: React.FC<TileDisplayProps> = ({ input, answerLength, correctAnswer, onBackspace }) => {
  // Create an array of tiles based on the answer length
  const tiles = Array(answerLength).fill(null).map((_, index) => {
    const letter = input[index] || '';
    return (
      <div key={index} className={`tile ${letter ? 'filled' : 'empty'}`}>
        {letter}
      </div>
    );
  });

  const isCorrect = input && (input === correctAnswer);

  return (
    <div className="tile-container mb-4">
      {tiles}
      {isCorrect && (
        <span className="checkmark">✓</span>
      )}
      <button 
        className="backspace-button"
        onClick={onBackspace}
        disabled={input.length === 0}
      >
        ⌫
      </button>
    </div>
  );
};

export default TileDisplay; 