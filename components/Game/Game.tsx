import React, { useState, useEffect } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import Carousel from '../Carousel/Carousel';
import { sinhalaLettersLevel1 } from '@/constants';
import gameData from '@/input.json';
import TileDisplay from '../TileDisplay/TileDisplay';
import CelebrationPopup from '../CelebrationPopup/CelebrationPopup';
import './Game.scss';

interface GameProps {
  onGameComplete?: () => void;
}

const Game: React.FC<GameProps> = ({ onGameComplete }) => {
  const [typedInput, setTypedInput] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [correctlyAnsweredIndices, setCorrectlyAnsweredIndices] = useState<number[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);
  const images = gameData.map((item) => item.imagePath);

  const resetGame = () => {
    setTypedInput('');
    setCorrectAnswer('');
    setCorrectlyAnsweredIndices([]);
    setCurrentSlideIndex(0);
    setShowCelebration(false);
    setCarouselKey(prev => prev + 1);
    onSlideChanged(0);
  };

  // Clear all state when component mounts
  useEffect(() => {
    console.log('clearing state');
    setCorrectlyAnsweredIndices([]);
    onSlideChanged(0)
  }, []);

  const handleKeyPress = (letter: string) => {
    if (typedInput.length < correctAnswer.length) {
      setTypedInput((prev) => prev + letter);
    }
  };

  const handleBackspace = () => {
    setTypedInput((prev) => prev.slice(0, -1));
  };

  const onSlideChanged = (currentSlide: number) => {
    setTypedInput('');
    setCorrectAnswer(gameData[currentSlide].correctAnswer);
    setCurrentSlideIndex(currentSlide);
  };

  // Check if the current answer is correct and update the list
  useEffect(() => {
    if (typedInput) {
      if (typedInput === correctAnswer && !correctlyAnsweredIndices.includes(currentSlideIndex)) {
        console.log('correct answer', typedInput, correctAnswer);

        setCorrectlyAnsweredIndices((prev) => [...prev, currentSlideIndex]);
        if (correctlyAnsweredIndices.length + 1 === gameData.length) {
          setShowCelebration(true);
          onGameComplete?.();
        }
      }
    }
  }, [typedInput, correctAnswer, currentSlideIndex, correctlyAnsweredIndices, onGameComplete]);

  return (
    <div className="game-container">
      <h1 className="game-title">Sinhala Spelling Game</h1>
      <div className="score-display">
        Correctly answered: {correctlyAnsweredIndices.length} / {gameData.length}
      </div>
      <Carousel 
        key={carouselKey}
        images={images} 
        onSlideChanged={onSlideChanged} 
      />
      <TileDisplay
        input={typedInput}
        answerLength={correctAnswer.length}
        correctAnswer={correctAnswer}
        onBackspace={handleBackspace}
      />
      <Keyboard letters={sinhalaLettersLevel1} onKeyPress={handleKeyPress} />
      {showCelebration && (
        <CelebrationPopup 
          onClose={() => setShowCelebration(false)} 
          onStartAgain={resetGame}
        />
      )}
    </div>
  );
};

export default Game;
