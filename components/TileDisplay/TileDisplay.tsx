import React from 'react';
import './TileDisplay.scss';

interface TileDisplayProps {
  input: string;
  answerLength: number;
}

const TileDisplay: React.FC<TileDisplayProps> = ({ input, answerLength }) => {
  // Create an array of tiles based on the answer length
  const tiles = Array(answerLength).fill(null).map((_, index) => {
    const letter = input[index] || '';
    return (
      <div key={index} className={`tile ${letter ? 'filled' : 'empty'}`}>
        {letter}
      </div>
    );
  });

  return (
    <div className="tile-container">
      {tiles}
    </div>
  );
};

export default TileDisplay; 