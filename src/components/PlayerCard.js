import React from 'react';

const PlayerCard = ({ playerName }) => {
  return (
    <div className="border rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center">
      {playerName ? (
        <p>{playerName}</p>
      ) : (
        <div className="text-4xl">+</div>
      )}
    </div>
  );
};

export default PlayerCard;
