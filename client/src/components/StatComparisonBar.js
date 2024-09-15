import React, { useState, useEffect } from 'react';

const StatComparisonBar = ({ player1Stats, player2Stats }) => {
  const [player1Widths, setPlayer1Widths] = useState({ goals: 0, assists: 0, wins: 0 });
  const [player2Widths, setPlayer2Widths] = useState({ goals: 0, assists: 0, wins: 0 });

  // Animate the bar widths when stats change
  useEffect(() => {
    setTimeout(() => {
      setPlayer1Widths({
        goals: player1Stats.goals * 10,
        assists: player1Stats.assists * 10,
        wins: player1Stats.wins * 10,
      });
      setPlayer2Widths({
        goals: player2Stats.goals * 10,
        assists: player2Stats.assists * 10,
        wins: player2Stats.wins * 10,
      });
    }, 100); // Delay to allow for smooth transition
  }, [player1Stats, player2Stats]);

  return (
    <div className="my-4">
      {/* Goals Comparison */}
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">{player1Stats.goals}</div>
        <div className="w-2/4 relative flex items-center">
          <div 
            className="bg-green-500 h-6 rounded-l-lg" 
            style={{ width: `${player1Widths.goals}px`, transition: 'width 1s ease', position: 'absolute', left: '0' }}>
          </div>
          <div 
            className="bg-red-500 h-6 rounded-r-lg" 
            style={{ width: `${player2Widths.goals}px`, transition: 'width 1s ease', position: 'absolute', right: '0' }}>
          </div>
          <div className="w-full flex justify-center items-center z-10 text-lg font-semibold text-gray-600">
            Goals
          </div>
        </div>
        <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">{player2Stats.goals}</div>
      </div>

      {/* Assists Comparison */}
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">{player1Stats.assists}</div>
        <div className="w-2/4 relative flex items-center">
          <div 
            className="bg-green-500 h-6 rounded-l-lg" 
            style={{ width: `${player1Widths.assists}px`, transition: 'width 1s ease', position: 'absolute', left: '0' }}>
          </div>
          <div 
            className="bg-red-500 h-6 rounded-r-lg" 
            style={{ width: `${player2Widths.assists}px`, transition: 'width 1s ease', position: 'absolute', right: '0' }}>
          </div>
          <div className="w-full flex justify-center items-center z-10 text-lg font-semibold text-gray-600">
            Assists
          </div>
        </div>
        <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">{player2Stats.assists}</div>
      </div>

      {/* Wins Comparison */}
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">{player1Stats.wins}</div>
        <div className="w-2/4 relative flex items-center">
          <div 
            className="bg-green-500 h-6 rounded-l-lg" 
            style={{ width: `${player1Widths.wins}px`, transition: 'width 1s ease', position: 'absolute', left: '0' }}>
          </div>
          <div 
            className="bg-red-500 h-6 rounded-r-lg" 
            style={{ width: `${player2Widths.wins}px`, transition: 'width 1s ease', position: 'absolute', right: '0' }}>
          </div>
          <div className="w-full flex justify-center items-center z-10 text-lg font-semibold text-gray-600">
            Wins
          </div>
        </div>
        <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">{player2Stats.wins}</div>
      </div>
    </div>
  );
};

export default StatComparisonBar;
