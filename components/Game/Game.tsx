import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Keyboard from '../Keyboard/Keyboard';
import Carousel from '../Carousel/Carousel';
import { sinhalaLettersLevelBasic, MAX_GAME_SLIDES } from '@/constants';
import gameData from '@/input.json';
import levelConfig from '@/levelConfig.json';
import TileDisplay from '../TileDisplay/TileDisplay';
import CelebrationPopup from '../CelebrationPopup/CelebrationPopup';
import './Game.scss';

interface GameProps {
  onGameComplete?: () => void;
}

const Game: React.FC<GameProps> = ({ onGameComplete }) => {
  const searchParams = useSearchParams();
  const levelNum = searchParams.get('levelNum');
  const [typedInput, setTypedInput] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [correctlyAnsweredIndices, setCorrectlyAnsweredIndices] = useState<number[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);
  const [answeredInputs, setAnsweredInputs] = useState<Record<number, string>>({});
  const [randomizedGameData, setRandomizedGameData] = useState<typeof gameData>([]);
  const [showInvalidLevelWarning, setShowInvalidLevelWarning] = useState(false);

  // Function to get valid level number from query params
  const getValidLevelNum = useCallback(() => {
    const parsedLevel = parseInt(levelNum as string);
    const isValidLevel = levelConfig.some(config => config.levelNum === parsedLevel);
    setShowInvalidLevelWarning(!isValidLevel && levelNum !== null);
    return parsedLevel;
  }, [levelNum]);

  // Function to filter game data by level
  const filterGameDataByLevel = (data: typeof gameData, level: number) => {
    return data.filter(item => item.levelNum === level);
  };

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Initialize randomized game data when component mounts or level changes
  useEffect(() => {
    setCorrectlyAnsweredIndices([]);
    setAnsweredInputs({});
    const validLevel = getValidLevelNum();
    const filteredData = filterGameDataByLevel(gameData, validLevel);
    const shuffledData = shuffleArray(filteredData).slice(0, MAX_GAME_SLIDES);
    setRandomizedGameData(shuffledData);
    setCorrectAnswer(shuffledData[0]?.correctAnswer || '');
  }, [levelNum, getValidLevelNum]);

  const resetGame = () => {
    setShowCelebration(false);
    setTypedInput('');
    setCorrectlyAnsweredIndices([]);
    setAnsweredInputs({});
    setCarouselKey(prev => prev + 1);
    setCurrentSlideIndex(0);
    const validLevel = getValidLevelNum();
    const filteredData = filterGameDataByLevel(gameData, validLevel);
    const shuffledData = shuffleArray(filteredData).slice(0, MAX_GAME_SLIDES);
    setRandomizedGameData(shuffledData);
    setCorrectAnswer(shuffledData[0]?.correctAnswer || '');
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
      <div className="game-header">
        <Link href="/" className="home-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <h1 className="game-title">Sinhala Spelling Game</h1>
      </div>
      {showInvalidLevelWarning && (
        <div className="warning-message">
          Invalid level
        </div>
      )}
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
      <Keyboard letters={sinhalaLettersLevelBasic} onKeyPress={handleKeyPress} />
      {showCelebration && (
        <CelebrationPopup 
          onStartAgain={resetGame}
        />
      )}
    </div>
  );
};

export default Game;
