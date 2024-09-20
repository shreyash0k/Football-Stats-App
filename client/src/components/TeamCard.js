import React from 'react';

const TeamCard = ({ team, teamPosition, onRemove }) => {
  return (
    <div 
      className="border rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center"
    >
      {team ? (
        <div className="flex flex-col items-center">
          <img src={team.Team.logo} alt={`${team.Team.teamName} logo`} className="w-16 h-16 rounded-full" />
          <p>{team.Team.teamName}</p>
          <button 
            className="mt-2 p-1 bg-black text-white rounded" 
            onClick={() => onRemove(teamPosition)}
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

export default TeamCard;
