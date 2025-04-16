"use client";

import React, { useState } from "react";
import Keyboard from "../../../components/Keyboard/Keyboard";
import "./page.scss"; // Import the SCSS file for styling
import Carousel from "../../../components/Carousel/Carousel";
import { sinhalaLettersLevel1 } from "@/constants";
import gameData from "@/input.json";
import TileDisplay from "../../../components/TileDisplay/TileDisplay";

const Home: React.FC = () => {
  const [typedInput, setTypedInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleKeyPress = (letter: string) => {
    if (typedInput.length < correctAnswer.length) {
      setTypedInput((prev) => prev + letter);
    }
  };

  const images = gameData.map(item => item.imagePath);

  const onSlideChanged = (currentSlide: number) => {
    setTypedInput("");
    setCorrectAnswer(gameData[currentSlide].correctAnswer);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Sinhala Spelling Game</h1>
      <Carousel images={images} onSlideChanged={onSlideChanged} />
      <TileDisplay input={typedInput} answerLength={correctAnswer.length} />
      <Keyboard letters={sinhalaLettersLevel1} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Home;
