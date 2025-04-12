"use client";

import React, { useState } from "react";
import Keyboard from "../../../components/Keyboard/Keyboard";
import "./page.scss"; // Import the SCSS file for styling
import Carousel from "../../../components/Carousel/Carousel";
import { sinhalaLetters } from "@/constants";
import gameData from "@/input.json";

const Home: React.FC = () => {
  const [input, setInput] = useState("");

  const handleKeyPress = (letter: string) => {
    setInput((prev) => prev + letter);
  };

  const images = gameData.map(item => item.imagePath);

  const onSlideChanged = (currentSlide: number) => {
    setInput("");
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Sinhala Spelling Game</h1>
      <Carousel images={images} onSlideChanged={onSlideChanged} />
      <input type="text" value={input} readOnly className="game-input" />
      <Keyboard letters={sinhalaLetters} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Home;
