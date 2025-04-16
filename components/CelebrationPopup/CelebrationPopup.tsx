import React, { useEffect, useState } from 'react';
import styles from './CelebrationPopup.module.css';

interface CelebrationPopupProps {
  onClose: () => void;
}

const CelebrationPopup: React.FC<CelebrationPopupProps> = ({ onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 5000); // Show for 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

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
      </div>
    </div>
  );
};

export default CelebrationPopup; 