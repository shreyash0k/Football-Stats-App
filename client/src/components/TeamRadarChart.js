import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const TeamRadarChart = ({ team }) => {
  if (!team || !team.Goal) {
    return null; // Do not render until the team and stats are available
  }

  const data = [
    { attribute: 'Wins', value: team.wins_total },
    { attribute: 'Draws', value: team.draws_total },
    { attribute: 'Losses', value: team.loses_total },
  ];

  return (
    <div className="w-full">
      {team ? (
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
        <p className="text-center">Select a team to view stats</p>
      )}
    </div>
  );
};

export default TeamRadarChart;
