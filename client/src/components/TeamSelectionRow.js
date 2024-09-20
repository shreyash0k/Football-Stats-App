import React from 'react';

const TeamSelectionRow = ({ teams, onTeamClick }) => {
  return (
    <div className="flex justify-around bg-gray-100 p-4">
      {teams.map((team, index) => (
        <div
          key={index}
          className="p-4 cursor-pointer flex flex-col items-center"
          onClick={() => onTeamClick(team)}
        >
          {/* Display team logo */}
          <img src={team.Team.logo} alt={`${team.Team.teamName} logo`} className="w-16 h-16 rounded-full" />
          {/* Display team name */}
          <p className="text-center mt-2">{team.Team.teamName}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamSelectionRow;
