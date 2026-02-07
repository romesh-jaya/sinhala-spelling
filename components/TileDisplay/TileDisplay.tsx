import React from 'react';
import './TileDisplay.scss';

interface TileDisplayProps {
  input: string[];
  answerLength: number;
  correctAnswer: string[]; // Changed type to string[]
  onBackspace: () => void;
  isPreviouslyCorrect?: boolean;
  audioPath?: string;
}

const TileDisplay: React.FC<TileDisplayProps> = ({ 
  input, 
  answerLength, 
  correctAnswer, 
  onBackspace,
  isPreviouslyCorrect = false,
  audioPath
}) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };
  // Create an array of tiles based on the answer length
  const tiles = Array(answerLength).fill(null).map((_, index) => {
    const letter = input[index] || '';
    
    // Determine if the letter is correct or incorrect
    let statusClass = '';
    if (letter) {
      if (letter === correctAnswer[index]) {
        statusClass = 'correct';
      } else {
        statusClass = 'incorrect';
      }
    }
    
    return (
      <div key={index} className={`tile ${letter ? 'filled' : 'empty'} ${statusClass}`}>
        {letter}
      </div>
    );
  });

  // Compare arrays element by element
  const isCorrect = input.length === answerLength && input.every((inputElem, index) => inputElem === correctAnswer[index]);

  return (
    <div className="tile-container mb-4">
      {tiles}
      <div className="action-icon">
        {audioPath && (
          <>
            <audio ref={audioRef} src={audioPath} />
            <button 
              className="audio-button"
              onClick={playAudio}
              title="Play audio"
              aria-label="Play audio for this word"
            >
              🔊
            </button>
          </>
        )}
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
    </div>
  );
};

export default TileDisplay;