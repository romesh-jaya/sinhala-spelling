import React, { useState, useEffect } from "react";
import Keyboard from "../Keyboard/Keyboard";
import Carousel from "../Carousel/Carousel";
import { sinhalaLettersLevel1 } from "@/constants";
import gameData from "@/input.json";
import TileDisplay from "../TileDisplay/TileDisplay";

interface GameProps {
  onGameComplete?: () => void;
}

const Game: React.FC<GameProps> = ({ onGameComplete }) => {
  const [typedInput, setTypedInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctlyAnsweredIndices, setCorrectlyAnsweredIndices] = useState<number[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Clear all state when component mounts
  useEffect(() => {
    console.log('clearing state');
    setTypedInput("");
    setCorrectAnswer("");
    setCorrectlyAnsweredIndices([]);
    setCurrentSlideIndex(0);
  }, []);

  const handleKeyPress = (letter: string) => {
    if (typedInput.length < correctAnswer.length) {
      setTypedInput((prev) => prev + letter);
    }
  };

  const handleBackspace = () => {
    setTypedInput((prev) => prev.slice(0, -1));
  };

  const images = gameData.map(item => item.imagePath);

  const onSlideChanged = (currentSlide: number) => {
    setTypedInput("");
    setCorrectAnswer(gameData[currentSlide].correctAnswer);
    setCurrentSlideIndex(currentSlide);
  };

  // Check if the current answer is correct and update the list
  useEffect(() => {
    if (typedInput === correctAnswer && !correctlyAnsweredIndices.includes(currentSlideIndex)) {
      setCorrectlyAnsweredIndices(prev => [...prev, currentSlideIndex]);
      if (correctlyAnsweredIndices.length + 1 === gameData.length) {
        onGameComplete?.();
      }
    }
  }, [typedInput, correctAnswer, currentSlideIndex, correctlyAnsweredIndices, onGameComplete]);

  return (
    <div className="game-container">
      <h1 className="game-title">Sinhala Spelling Game</h1>
      <div className="score-display">
        Correctly answered: {correctlyAnsweredIndices.length} / {gameData.length}
      </div>
      <Carousel images={images} onSlideChanged={onSlideChanged} />
      <TileDisplay 
        input={typedInput} 
        answerLength={correctAnswer.length} 
        correctAnswer={correctAnswer}
        onBackspace={handleBackspace}
      />
      <Keyboard letters={sinhalaLettersLevel1} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Game; 