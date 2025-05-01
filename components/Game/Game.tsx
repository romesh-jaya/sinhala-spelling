import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
// Import specific keyboard layouts and the config
import { sinhalaLettersLevelBasic, sinhalaLettersLevelBasicForDiacritics } from '@/keyboards';
import keyboardConfig from '@/keyboardConfig.json'; // Import keyboard config
import { MAX_GAME_SLIDES } from '@/constants';
import gameData from '@/input.json';
import levelConfig from '@/levelConfig.json';
import { LettersWithDiacritics } from '@/models/LettersWithDiacritics'; // Import the type
import './Game.scss';

// Dynamically import components with loading states
const KeyboardComponent = dynamic(() => import('../Keyboard/Keyboard'));

const CarouselComponent = dynamic(() => import('../Carousel/Carousel'));

const TileDisplayComponent = dynamic(() => import('../TileDisplay/TileDisplay'));

const CelebrationPopupComponent = dynamic(() => import('../CelebrationPopup/CelebrationPopup'));

// Map keyboard names from config to actual layout variables
const keyboardLayouts: { [key: string]: LettersWithDiacritics[] } = {
  basic: sinhalaLettersLevelBasic,
  basicWithDiacritics: sinhalaLettersLevelBasicForDiacritics,
  // Add other layouts here as needed
};

const Game: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelNum = searchParams.get('levelNum');
  const [typedInput, setTypedInput] = useState<string[]>([]); // Changed type and initial value
  const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);
  const [correctlyAnsweredIndices, setCorrectlyAnsweredIndices] = useState<number[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);
  const [answeredInputs, setAnsweredInputs] = useState<Record<number, string[]>>({}); // Changed type
  const [randomizedGameData, setRandomizedGameData] = useState<typeof gameData>([]);
  const [showInvalidLevelWarning, setShowInvalidLevelWarning] = useState(false);
  const [validLevel, setValidLevel] = useState(1);

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
    setValidLevel(validLevel);
    const filteredData = filterGameDataByLevel(gameData, validLevel);
    const shuffledData = shuffleArray(filteredData).slice(0, MAX_GAME_SLIDES);
    setRandomizedGameData(shuffledData);
    setCorrectAnswer(shuffledData[0]?.correctAnswer || []);
    setCarouselKey(prev => prev + 1);
    setCurrentSlideIndex(0);
    setTypedInput([]); // Reset typedInput
  }, [levelNum, getValidLevelNum]);

  const resetGame = () => {
    setShowCelebration(false);
    setTypedInput([]); // Reset to empty array
    setCorrectlyAnsweredIndices([]);
    setAnsweredInputs({});
    setCarouselKey(prev => prev + 1);
    setCurrentSlideIndex(0);
    const filteredData = filterGameDataByLevel(gameData, validLevel);
    const shuffledData = shuffleArray(filteredData).slice(0, MAX_GAME_SLIDES);
    setRandomizedGameData(shuffledData);
    setCorrectAnswer(shuffledData[0]?.correctAnswer || []);
  };

  const playNextLevel = () => {
    setShowCelebration(false);
    setTypedInput([]); // Reset to empty array
    router.push(`/game?levelNum=${validLevel + 1}`);
  }
  
  const handleKeyPress = (letter: string) => {
    if (correctlyAnsweredIndices.includes(currentSlideIndex)) {
      return; // Don't allow typing on already answered slides
    }
    if (typedInput.length < correctAnswer.length) {
      setTypedInput((prev) => [...prev, letter]); // Add letter to array
    }
  };

  const handleBackspace = () => {
    if (correctlyAnsweredIndices.includes(currentSlideIndex)) {
      return; // Don't allow backspace on already answered slides
    }
    setTypedInput((prev) => prev.slice(0, -1)); // Remove last element from array
  };

  const onSlideChanged = (currentSlide: number) => {
    setCorrectAnswer(randomizedGameData[currentSlide].correctAnswer);
    setCurrentSlideIndex(currentSlide);
    
    if (correctlyAnsweredIndices.includes(currentSlide)) {
      // Restore the previously answered input
      setTypedInput(answeredInputs[currentSlide] || []); // Restore array
    } else {
      setTypedInput([]); // Reset to empty array
    }
  };

  // Check if the current answer is correct and update the list
  useEffect(() => {
    if (typedInput.length > 0) { // Check if array is not empty
      // Compare arrays by joining them or element by element
      const isCorrect = typedInput.length === correctAnswer.length && typedInput.every((val, index) => val === correctAnswer[index]);

      if (isCorrect && !correctlyAnsweredIndices.includes(currentSlideIndex)) {
        console.log('correct answer', typedInput, correctAnswer);

        // Store the correct answer array
        setAnsweredInputs(prev => ({
          ...prev,
          [currentSlideIndex]: [...typedInput] // Store a copy of the array
        }));

        setCorrectlyAnsweredIndices((prev) => [...prev, currentSlideIndex]);
        if (correctlyAnsweredIndices.length + 1 === randomizedGameData.length) {
          setShowCelebration(true);
        }
      }
    }
  }, [typedInput, correctAnswer, currentSlideIndex, correctlyAnsweredIndices, randomizedGameData.length]);

  // Memoize the current keyboard layout and config based on the valid level
  const currentKeyboardConfig = useMemo(() => {
    const config = keyboardConfig.find(config => config.levelNum === validLevel);
    // Default to level 1 config if not found
    return config || keyboardConfig.find(c => c.levelNum === 1) || { levelNum: 1, keyboard: 'basic', useDiacritics: false };
  }, [validLevel]);

  const currentKeyboardLayout = useMemo(() => {
    const keyboardName = currentKeyboardConfig.keyboard;
    return keyboardLayouts[keyboardName] || sinhalaLettersLevelBasic; // Fallback to basic
  }, [currentKeyboardConfig]);

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
        <span className="level-display">Level {validLevel}</span>
        <span className="answered-display">Answered: {correctlyAnsweredIndices.length} / {randomizedGameData.length}</span>
      </div>
      <CarouselComponent 
        key={carouselKey}
        images={randomizedGameData.map((item) => item.imagePath)} 
        onSlideChanged={onSlideChanged} 
      />
      <TileDisplayComponent
        input={typedInput} // Pass the array
        answerLength={correctAnswer.length}
        correctAnswer={correctAnswer}
        onBackspace={handleBackspace}
        isPreviouslyCorrect={correctlyAnsweredIndices.includes(currentSlideIndex)}
      />
      {/* Ensure KeyboardComponent uses the imported constant */}
      <KeyboardComponent 
        letters={currentKeyboardLayout} 
        onKeyPress={handleKeyPress} 
        useDiacritics={currentKeyboardConfig.useDiacritics || false} // Pass the flag
      />
      {showCelebration && (
        <CelebrationPopupComponent 
          onStartAgain={resetGame}
          playNextLevel={playNextLevel}
          currentLevel={validLevel}
        />
      )}
    </div>
  );
};

export default Game;
