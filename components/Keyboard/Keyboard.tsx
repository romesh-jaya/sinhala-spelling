import React from "react";
import "./Keyboard.scss"; // Import the SCSS file for styling

interface KeyboardProps {
  letters: string[];
  onKeyPress: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ letters, onKeyPress }) => {
  return (
    <div className="keyboard-container">
      {letters.map((letter, index) => (
        <button
          key={index}
          onClick={() => onKeyPress(letter)}
          className="keyboard-button"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
