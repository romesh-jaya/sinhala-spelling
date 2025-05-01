import React from 'react';
import { LettersWithDiacritics } from '@/models/LettersWithDiacritics';
import './DiacriticModal.scss';

interface DiacriticModalProps {
  letterObj: LettersWithDiacritics;
  onSelect: (selectedLetter: string) => void;
  onClose: () => void;
}

const DiacriticModal: React.FC<DiacriticModalProps> = ({ letterObj, onSelect, onClose }) => {
  const handleSelect = (selected: string) => {
    onSelect(selected);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button mb-2" onClick={onClose}>X</button>
        <div className="diacritic-options">
          {/* Button for the base letter */}
          <button 
            className="diacritic-button" 
            onClick={() => handleSelect(letterObj.key)}
          >
            {letterObj.key}
          </button>
          {/* Buttons for diacritics */}
          {letterObj.diacritics?.map((diacritic) => (
            <button 
              key={diacritic} 
              className="diacritic-button" 
              onClick={() => handleSelect(diacritic)}
            >
              {diacritic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiacriticModal;
