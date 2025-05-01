import React from 'react';
import { LettersWithDiacritics } from '@/models/LettersWithDiacritics'; // Import the type
import './Keyboard.scss';

interface KeyboardProps {
  letters: LettersWithDiacritics[]; // Update prop type
  onKeyPress: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ letters, onKeyPress }) => {
  return (
    <div className="keyboard-container">
      {letters.map((letterObj) => ( // Iterate over objects
        <button 
          key={letterObj.key} // Use the key property
          className="keyboard-button" 
          onClick={() => onKeyPress(letterObj.key)} // Pass the key property
        >
          {letterObj.key} {/* Display the key property */}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
