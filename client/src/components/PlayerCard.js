import React from 'react';

const PlayerCard = ({ player, onDrop, playerPosition, onRemove }) => {

  const handleDrop = (e) => {
    const droppedPlayer = JSON.parse(e.dataTransfer.getData('player'));
    onDrop(playerPosition, droppedPlayer);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // This enables the drop event to occur
  };

  return (
    <div 
      className="border rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {player ? (
        <div className="flex flex-col items-center">
          <p>{player.name}</p>
          <button 
            className="mt-2 p-1 bg-red-500 text-white rounded" 
            onClick={() => onRemove(playerPosition)}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="text-4xl">+</div>
      )}
    </div>
  );
};

export default PlayerCard;

