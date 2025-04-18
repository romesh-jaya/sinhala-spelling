import React from 'react';
import './TileDisplay.scss';

interface TileDisplayProps {
  input: string;
  answerLength: number;
  correctAnswer: string;
  onBackspace: () => void;
  isPreviouslyCorrect?: boolean;
}

const TileDisplay: React.FC<TileDisplayProps> = ({ 
  input, 
  answerLength, 
  correctAnswer, 
  onBackspace,
  isPreviouslyCorrect = false 
}) => {
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
      {(isCorrect || isPreviouslyCorrect) && (
        <span className="checkmark">✓</span>
      )}
      {!isPreviouslyCorrect && (
        <button 
          className="backspace-button"
          onClick={onBackspace}
          disabled={input.length === 0}
        >
          ⌫
        </button>
      )}
    </div>
  );
};

export default TileDisplay; 