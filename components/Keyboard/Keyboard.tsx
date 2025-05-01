import React, { useState } from 'react'; // Import useState
import { LettersWithDiacritics } from '@/models/LettersWithDiacritics';
import DiacriticModal from '../DiacriticModal/DiacriticModal'; // Added static import
import './Keyboard.scss';

interface KeyboardProps {
  letters: LettersWithDiacritics[];
  onKeyPress: (letter: string) => void;
  useDiacritics: boolean; // Add prop to control modal behavior
}

const Keyboard: React.FC<KeyboardProps> = ({ letters, onKeyPress, useDiacritics }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<LettersWithDiacritics | null>(null);

  const handleButtonClick = (letterObj: LettersWithDiacritics) => {
    // Show modal only if useDiacritics is true AND the letter has diacritics
    if (useDiacritics && letterObj.diacritics && letterObj.diacritics.length > 0) {
      setSelectedLetter(letterObj);
      setShowModal(true);
    } else {
      // Otherwise, directly call onKeyPress with the base letter
      onKeyPress(letterObj.key);
    }
  };

  const handleModalSelect = (selectedChar: string) => {
    onKeyPress(selectedChar);
    // Modal closes itself via its onClose prop triggered by handleModalClose
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedLetter(null);
  };

  return (
    <div className="keyboard-container">
      {letters.map((letterObj) => (
        <button 
          key={letterObj.key}
          className="keyboard-button" 
          // Update onClick to use the new handler
          onClick={() => handleButtonClick(letterObj)} 
        >
          {letterObj.key}
        </button>
      ))}
      {/* Conditionally render the modal */}
      {showModal && selectedLetter && (
        <DiacriticModal 
          letterObj={selectedLetter} 
          onSelect={handleModalSelect} 
          onClose={handleModalClose} 
        />
      )}
    </div>
  );
};

export default Keyboard;
