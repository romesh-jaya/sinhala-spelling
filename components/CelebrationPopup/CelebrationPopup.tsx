import React, { useState } from 'react';
import styles from './CelebrationPopup.module.css';

interface CelebrationPopupProps {
  onClose: () => void;
  onStartAgain: () => void;
}

const CelebrationPopup: React.FC<CelebrationPopupProps> = ({ onClose, onStartAgain }) => {
  const [show, setShow] = useState(true);

  return (
    <div className={`${styles.overlay} ${show ? styles.show : ''}`}>
      <div className={styles.popup}>
        <div className={styles.balloons}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className={styles.balloon} style={{
              '--delay': `${i * 0.2}s`,
              '--color': `hsl(${i * 36}, 100%, 50%)`
            } as React.CSSProperties} />
          ))}
        </div>
        <h1 className={styles.title}>Well done! 🎉</h1>
        <p className={styles.message}>You've completed all the levels!</p>
        <button className={styles.startAgainButton} onClick={onStartAgain}>
          Start Again
        </button>
      </div>
    </div>
  );
};

export default CelebrationPopup; 