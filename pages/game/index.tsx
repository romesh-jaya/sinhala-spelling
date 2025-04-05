import React, { useState } from "react";
import Keyboard from "../../components/Keyboard";
import "./index.scss"; // Import the SCSS file for styling

const Home: React.FC = () => {
  const [input, setInput] = useState("");
  const sinhalaLetters = ["අ", "ආ", "ඇ", "ඈ", "ඉ", "ඊ", "උ", "ඌ", "එ", "ඒ"];

  const handleKeyPress = (letter: string) => {
    setInput((prev) => prev + letter);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Sinhala Keyboard</h1>
      <input type="text" value={input} readOnly className="game-input" />
      <Keyboard letters={sinhalaLetters} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Home;
