import React, { useState } from 'react';
import FiltersSection from './components/FiltersSection';
import PlayerSelectionRow from './components/PlayerSelectionRow.js';
import PlayerCard from './components/PlayerCard.js';
import StatComparisonBar from './components/StatComparisonBar.js';
import PlayerRadarChart from './components/PlayerRadarChart.js';

const App = () => {
  const initialPlayers = [
    { name: 'Player 1', goals: 20, assists: 25, wins: 3 },
    { name: 'Player 2', goals: 15, assists: 10, wins: 13 },
    { name: 'Player 3', goals: 10, assists: 18, wins: 7 },
  ];

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [players, setPlayers] = useState(initialPlayers);

  const handleDrop = (position, droppedPlayer) => {
    if (position === 'player1') {
      setPlayer1(droppedPlayer);
    } else if (position === 'player2') {
      setPlayer2(droppedPlayer);
    }
    setPlayers(prevPlayers => prevPlayers.filter(p => p.name !== droppedPlayer.name));
  };

  const handleRemove = (position) => {
    let removedPlayer;
    if (position === 'player1') {
      removedPlayer = player1;
      setPlayer1(null);
    } else if (position === 'player2') {
      removedPlayer = player2;
      setPlayer2(null);
    }

    if (removedPlayer) {
      setPlayers(prevPlayers => {
        const updatedPlayers = [...prevPlayers, removedPlayer];
        return updatedPlayers.sort((a, b) => a.name.localeCompare(b.name));
      });
    }
  };

  const handlePlayerClick = (player) => {
    if (!player1) {
      setPlayer1(player);
      setPlayers(prevPlayers => prevPlayers.filter(p => p.name !== player.name));
    } else if (!player2 && player1 !== player) {
      setPlayer2(player);
      setPlayers(prevPlayers => prevPlayers.filter(p => p.name !== player.name));
    }
  };

  return (
    <div>
      <FiltersSection />
      <PlayerSelectionRow players={players} onPlayerClick={handlePlayerClick} />
      
      <div className="flex justify-around my-4">
        <PlayerCard 
          player={player1} 
          onDrop={handleDrop} 
          playerPosition="player1" 
          onRemove={handleRemove} 
        />
        <PlayerCard 
          player={player2} 
          onDrop={handleDrop} 
          playerPosition="player2" 
          onRemove={handleRemove} 
        />
      </div>

      {player1 && player2 ? (
        <>
          <StatComparisonBar player1Stats={player1} player2Stats={player2} />
          <div className="flex justify-around my-4">
            <div className="w-1/2 p-4">
              <PlayerRadarChart player={player1} />
            </div>
            <div className="w-1/2 p-4">
              <PlayerRadarChart player={player2} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center my-10">
          <p className="text-lg text-gray-600 font-semibold">
            Select two players to compare their stats
          </p>
        </div>
      )}

      
    </div>
  );
};

export default App;