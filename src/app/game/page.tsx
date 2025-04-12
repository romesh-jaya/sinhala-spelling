"use client";

import React, { useState } from "react";
import Keyboard from "../../../components/Keyboard/Keyboard";
import "./page.scss"; // Import the SCSS file for styling
import Carousel from "../../../components/Carousel/Carousel";
import { sinhalaLetters } from "@/constants";

const Home: React.FC = () => {
  const [input, setInput] = useState("");

  const handleKeyPress = (letter: string) => {
    setInput((prev) => prev + letter);
  };

  const images = [
    "/images/carousel/ear.jpg",
    "/images/carousel/mouth.jpg",
    "/images/carousel/stomach.jpg",
  ]; // Replace with your actual image paths

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
