"use client";

import React, { useState } from "react";
import Keyboard from "../../../components/Keyboard";
import "./page.scss"; // Import the SCSS file for styling
import Carousel from "@/components/Carousel";

const Home: React.FC = () => {
  const [input, setInput] = useState("");
  const sinhalaLetters = ["අ", "ආ", "ඇ", "ඈ", "ඉ", "ඊ", "උ", "ඌ", "එ", "ඒ"];

  const handleKeyPress = (letter: string) => {
    setInput((prev) => prev + letter);
  };

  const images = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg",
  ]; // Replace with your actual image paths

  return (
    <div className="game-container">
      <h1 className="game-title">Sinhala Spelling Game</h1>
      <Carousel images={images} />
      <input type="text" value={input} readOnly className="game-input" />
      <Keyboard letters={sinhalaLetters} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Home;
