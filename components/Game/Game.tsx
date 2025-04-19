import React, { useState, useEffect } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import Carousel from '../Carousel/Carousel';
import { sinhalaLettersLevel1, MAX_GAME_SLIDES } from '@/constants';
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
  const [answeredInputs, setAnsweredInputs] = useState<Record<number, string>>({});
  const [randomizedGameData, setRandomizedGameData] = useState<typeof gameData>([]);

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Initialize randomized game data when component mounts
  useEffect(() => {
    setCorrectlyAnsweredIndices([]);
    setAnsweredInputs({});
    const shuffledData = shuffleArray(gameData).slice(0, MAX_GAME_SLIDES);
    setRandomizedGameData(shuffledData);
    setCorrectAnswer(shuffledData[0].correctAnswer);
  }, []);

  const resetGame = () => {
    setShowCelebration(false);
    setTypedInput('');
    setCorrectlyAnsweredIndices([]);
    setAnsweredInputs({});
    setCarouselKey(prev => prev + 1);
    setCurrentSlideIndex(0)
    const shuffledData = shuffleArray(gameData).slice(0, MAX_GAME_SLIDES);
    setRandomizedGameData(shuffledData);
    setCorrectAnswer(shuffledData[0].correctAnswer);
  };

  const handleKeyPress = (letter: string) => {
    if (correctlyAnsweredIndices.includes(currentSlideIndex)) {
      return; // Don't allow typing on already answered slides
    }
    if (typedInput.length < correctAnswer.length) {
      setTypedInput((prev) => prev + letter);
    }
  };

  const handleBackspace = () => {
    if (correctlyAnsweredIndices.includes(currentSlideIndex)) {
      return; // Don't allow backspace on already answered slides
    }
    setTypedInput((prev) => prev.slice(0, -1));
  };

  const onSlideChanged = (currentSlide: number) => {
    setCorrectAnswer(randomizedGameData[currentSlide].correctAnswer);
    setCurrentSlideIndex(currentSlide);
    
    if (correctlyAnsweredIndices.includes(currentSlide)) {
      // Restore the previously answered input
      setTypedInput(answeredInputs[currentSlide] || '');
    } else {
      setTypedInput('');
    }
  };

  // Check if the current answer is correct and update the list
  useEffect(() => {
    if (typedInput) {
      if (typedInput === correctAnswer && !correctlyAnsweredIndices.includes(currentSlideIndex)) {
        console.log('correct answer', typedInput, correctAnswer);
        
        // Store the correct answer
        setAnsweredInputs(prev => ({
          ...prev,
          [currentSlideIndex]: typedInput
        }));

        setCorrectlyAnsweredIndices((prev) => [...prev, currentSlideIndex]);
        if (correctlyAnsweredIndices.length + 1 === randomizedGameData.length) {
          setShowCelebration(true);
          onGameComplete?.();
        }
      }
    }
  }, [typedInput, correctAnswer, currentSlideIndex, correctlyAnsweredIndices, onGameComplete, randomizedGameData.length]);

  return (
    <div className="game-container">
      <h1 className="game-title">Sinhala Spelling Game</h1>
      <div className="score-display">
        Answered: {correctlyAnsweredIndices.length} / {randomizedGameData.length}
      </div>
      <Carousel 
        key={carouselKey}
        images={randomizedGameData.map((item) => item.imagePath)} 
        onSlideChanged={onSlideChanged} 
      />
      <TileDisplay
        input={typedInput}
        answerLength={correctAnswer.length}
        correctAnswer={correctAnswer}
        onBackspace={handleBackspace}
        isPreviouslyCorrect={correctlyAnsweredIndices.includes(currentSlideIndex)}
      />
      <Keyboard letters={sinhalaLettersLevel1} onKeyPress={handleKeyPress} />
      {showCelebration && (
        <CelebrationPopup 
          onStartAgain={resetGame}
        />
      )}
    </div>
  );
};

export default Game;
