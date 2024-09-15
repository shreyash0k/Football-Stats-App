import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const PlayerRadarChart = ({ player }) => {
  const data = [
    {
      attribute: 'Goals',
      value: player ? player.goals : 0,
    },
    {
      attribute: 'Assists',
      value: player ? player.assists : 0,
    },
    {
      attribute: 'Wins',
      value: player ? player.wins : 0,
    },
  ];

  return (
    <div className="w-full">
      <h3 className="text-center">{player ? player.name : 'No Player'}</h3>
      {player ? (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="attribute" />
            <PolarRadiusAxis />
            <Tooltip />
            <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center">Select a player to view stats</p>
      )}
    </div>
  );
};

export default PlayerRadarChart;
