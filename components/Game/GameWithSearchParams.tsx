import React, { Suspense } from 'react';
import Game from './Game';

const GameWithSearchParams: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Game />
    </Suspense>
  );
};

export default GameWithSearchParams; 