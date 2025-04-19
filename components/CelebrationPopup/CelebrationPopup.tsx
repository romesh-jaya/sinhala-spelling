import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CelebrationPopup.module.css';

interface CelebrationPopupProps {
  onStartAgain: () => void;
  currentLevel: number;
}

const CelebrationPopup: React.FC<CelebrationPopupProps> = ({ onStartAgain, currentLevel }) => {
  const router = useRouter();
  const nextLevel = currentLevel + 1;
  const hasNextLevel = nextLevel <= 2; // Based on levelConfig.json having levels 1 and 2

  const handleNextLevel = () => {
    router.push(`/game?levelNum=${nextLevel}`);
  };

  return (
    <div className={`${styles.overlay} ${styles.show}`}>
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
        <p className={styles.message}>You&apos;ve completed all the levels!</p>
        <button className={styles.startAgainButton} onClick={onStartAgain}>
          Start Again
        </button>
        {hasNextLevel && (
          <button className={styles.nextLevelButton} onClick={handleNextLevel}>
            Play Next Level
          </button>
        )}
      </div>
    </div>
  );
};

export default CelebrationPopup; 