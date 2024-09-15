import React from 'react';

const PlayerSelectionRow = ({ players, onPlayerClick }) => {
  return (
    <div className="flex justify-around bg-gray-100 p-4">
      {players.map((player, index) => (
        <div
          key={index}
          className="p-4 cursor-pointer"
          onClick={() => onPlayerClick(player)}
        >
          <div className="bg-gray-300 w-16 h-16 rounded-full"></div>
          <p className="text-center">{player.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerSelectionRow;