import React, { useState, useEffect } from 'react';

const TeamComparisonBar = ({ team1Stats, team2Stats }) => {
  const [team1Widths, setTeam1Widths] = useState({
    played: { team1Percentage: 0, team2Percentage: 0 },
    wins: { team1Percentage: 0, team2Percentage: 0 },
    draws: { team1Percentage: 0, team2Percentage: 0 },
    losses: { team1Percentage: 0, team2Percentage: 0 },
    goalsFor: { team1Percentage: 0, team2Percentage: 0 },
    goalsAgainst: { team1Percentage: 0, team2Percentage: 0 },
  });

  useEffect(() => {
    if (team1Stats && team2Stats) {
      const calculateWidths = (team1Value, team2Value) => {
        const total = (team1Value || 0) + (team2Value || 0);
        const team1Percentage = total ? (team1Value / total) * 100 : 0;
        const team2Percentage = total ? (team2Value / total) * 100 : 0;
        return { team1Percentage, team2Percentage };
      };

      setTeam1Widths({
        played: calculateWidths(team1Stats.played_total, team2Stats.played_total),
        wins: calculateWidths(team1Stats.wins_total, team2Stats.wins_total),
        draws: calculateWidths(team1Stats.draws_total, team2Stats.draws_total),
        losses: calculateWidths(team1Stats.loses_total, team2Stats.loses_total),
        goalsFor: calculateWidths(
          team1Stats.Goal ? team1Stats.Goal.goals_for_total : 0,
          team2Stats.Goal ? team2Stats.Goal.goals_for_total : 0
        ),
        goalsAgainst: calculateWidths(
          team1Stats.Goal ? team1Stats.Goal.goals_against_total : 0,
          team2Stats.Goal ? team2Stats.Goal.goals_against_total : 0
        ),
      });
    }
  }, [team1Stats, team2Stats]);

  if (!team1Stats || !team2Stats) {
    return null;
  }

  return (
    <div className="my-4">
  {/* Played Comparison */}
  <div className="flex justify-between items-center my-4">
    <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">
      {team1Stats.played_total || 0}
    </div>
    <div className="w-2/4 relative flex items-center">
      <div
        className="bg-blue-500 h-6"
        style={{
          width: `${team1Widths.played.team1Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      <div
        className="bg-orange-500 h-6"
        style={{
          width: `${team1Widths.played.team2Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      {/* Center the label */}
      <div className="absolute inset-0 flex justify-center items-center z-10 text-lg font-semibold text-white">
        Played
      </div>
    </div>
    <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">
      {team2Stats.played_total || 0}
    </div>
  </div>

  {/* Wins Comparison */}
  <div className="flex justify-between items-center my-4">
    <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">
      {team1Stats.wins_total || 0}
    </div>
    <div className="w-2/4 relative flex items-center">
      <div
        className="bg-blue-500 h-6"
        style={{
          width: `${team1Widths.wins.team1Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      <div
        className="bg-orange-500 h-6"
        style={{
          width: `${team1Widths.wins.team2Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      {/* Center the label */}
      <div className="absolute inset-0 flex justify-center items-center z-10 text-lg font-semibold text-white">
        Wins
      </div>
    </div>
    <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">
      {team2Stats.wins_total || 0}
    </div>
  </div>

  {/* Draws Comparison */}
  <div className="flex justify-between items-center my-4">
    <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">
      {team1Stats.draws_total || 0}
    </div>
    <div className="w-2/4 relative flex items-center">
      <div
        className="bg-blue-500 h-6"
        style={{
          width: `${team1Widths.draws.team1Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      <div
        className="bg-orange-500 h-6"
        style={{
          width: `${team1Widths.draws.team2Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      {/* Center the label */}
      <div className="absolute inset-0 flex justify-center items-center z-10 text-lg font-semibold text-white">
        Draws
      </div>
    </div>
    <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">
      {team2Stats.draws_total || 0}
    </div>
  </div>

  {/* Losses Comparison */}
  <div className="flex justify-between items-center my-4">
    <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">
      {team1Stats.loses_total || 0}
    </div>
    <div className="w-2/4 relative flex items-center">
      <div
        className="bg-blue-500 h-6"
        style={{
          width: `${team1Widths.losses.team1Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      <div
        className="bg-orange-500 h-6"
        style={{
          width: `${team1Widths.losses.team2Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      {/* Center the label */}
      <div className="absolute inset-0 flex justify-center items-center z-10 text-lg font-semibold text-white">
        Losses
      </div>
    </div>
    <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">
      {team2Stats.loses_total || 0}
    </div>
  </div>

  {/* Goals For Comparison */}
  <div className="flex justify-between items-center my-4">
    <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">
      {team1Stats.Goal ? team1Stats.Goal.goals_for_total : 0}
    </div>
    <div className="w-2/4 relative flex items-center">
      <div
        className="bg-blue-500 h-6"
        style={{
          width: `${team1Widths.goalsFor.team1Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      <div
        className="bg-orange-500 h-6"
        style={{
          width: `${team1Widths.goalsFor.team2Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      {/* Center the label */}
      <div className="absolute inset-0 flex justify-center items-center z-10 text-lg font-semibold text-white">
        Goals For
      </div>
    </div>
    <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">
      {team2Stats.Goal ? team2Stats.Goal.goals_for_total : 0}
    </div>
  </div>

  {/* Goals Against Comparison */}
  <div className="flex justify-between items-center my-4">
    <div className="w-1/4 text-right pr-4 text-lg font-semibold text-gray-700">
      {team1Stats.Goal ? team1Stats.Goal.goals_against_total : 0}
    </div>
    <div className="w-2/4 relative flex items-center">
      <div
        className="bg-blue-500 h-6"
        style={{
          width: `${team1Widths.goalsAgainst.team1Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      <div
        className="bg-orange-500 h-6"
        style={{
          width: `${team1Widths.goalsAgainst.team2Percentage}%`,
          transition: 'width 1s ease',
        }}
      />
      {/* Center the label */}
      <div className="absolute inset-0 flex justify-center items-center z-10 text-lg font-semibold text-white">
        Goals Against
      </div>
    </div>
    <div className="w-1/4 text-left pl-4 text-lg font-semibold text-gray-700">
      {team2Stats.Goal ? team2Stats.Goal.goals_against_total : 0}
    </div>
  </div>
</div>

  );
};

export default TeamComparisonBar;
