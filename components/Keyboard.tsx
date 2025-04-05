import React from "react";

interface KeyboardProps {
  letters: string[];
  onKeyPress: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ letters, onKeyPress }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {letters.map((letter, index) => (
        <button
          key={index}
          onClick={() => onKeyPress(letter)}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
