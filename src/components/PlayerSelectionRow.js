import React from 'react';

const PlayerSelectionRow = () => {
  return (
    <div className="flex justify-around bg-gray-100 p-4">
      <div className="p-4">
        <div className="bg-gray-300 w-16 h-16 rounded-full"></div>
        <p className="text-center">Player 1</p>
      </div>
      <div className="p-4">
        <div className="bg-gray-300 w-16 h-16 rounded-full"></div>
        <p className="text-center">Player 2</p>
      </div>
    </div>
  );
};

export default PlayerSelectionRow;
