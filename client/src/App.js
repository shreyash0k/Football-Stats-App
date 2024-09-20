import React, { useState, useEffect } from 'react';
import FiltersSection from './components/FiltersSection';
import TeamSelectionRow from './components/TeamSelectionRow';
import TeamCard from './components/TeamCard';
import TeamComparisonBar from './components/TeamComparisonBar';
import TeamRadarChart from './components/TeamRadarChart';
import axios from 'axios';

const App = () => {
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for selected league and season
  const [leagueId, setLeagueId] = useState('');  // Set initial state for leagueId
  const [season, setSeason] = useState('');      // Set initial state for season

  // Fetch team stats based on leagueId and season
  const fetchTeams = async () => {
    try {
      if (!leagueId || !season) {
        return;
      }
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/statistics`, {
        params: { leagueId, season },
      });
      setTeams(response.data || []);  // Set the teams; default to empty if no data
      setError(null);  // Reset error when data is successfully fetched
      setLoading(false);
    } catch (err) {
      console.error('Error fetching team stats:', err);
      if (err.response && err.response.status === 404) {
        // Silently handle 404 error - No data found
        setTeams([]);  // Reset teams to an empty list, no error message shown
        setError(null);  // Do not set any error message
      } else {
        // Handle other errors
        setError('Failed to fetch data');  // Show error for non-404 issues
      }
      setLoading(false);
    }
  };

  // Trigger fetch whenever leagueId or season changes
  useEffect(() => {
    fetchTeams();
  }, [leagueId, season]);

  const handleFilterChange = (type, value) => {
    if (type === 'league') {
      setLeagueId(value);  // Store selected leagueId in state
    } else if (type === 'season') {
      setSeason(value);  // Store selected season in state
    }
  };

  const handleTeamClick = (team) => {
    if (!team1) {
      setTeam1(team);
      setTeams((prevTeams) => prevTeams.filter((t) => t.id !== team.id));
    } else if (!team2 && team1.id !== team.id) {
      setTeam2(team);
      setTeams((prevTeams) => prevTeams.filter((t) => t.id !== team.id));
    }
  };

  const handleRemove = (position) => {
    let removedTeam;
    if (position === 'team1') {
      removedTeam = team1;
      setTeam1(null);
    } else if (position === 'team2') {
      removedTeam = team2;
      setTeam2(null);
    }

    if (removedTeam) {
      setTeams((prevTeams) => [...prevTeams, removedTeam]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <FiltersSection 
        onFilterChange={handleFilterChange} 
        selectedLeague={leagueId} 
        selectedSeason={season} 
      />

      {/* Only show team selection row if there is data */}
      <TeamSelectionRow teams={teams} onTeamClick={handleTeamClick} />

      <div className="flex justify-around my-4">
        <TeamCard team={team1} teamPosition="team1" onRemove={handleRemove} />
        <TeamCard team={team2} teamPosition="team2" onRemove={handleRemove} />
      </div>

      {/* Show comparison and radar charts only if both teams are selected */}
      {team1 && team2 ? (
        <>
          <TeamComparisonBar team1Stats={team1} team2Stats={team2} />
          <div className="flex justify-around my-4">
            <div className="w-1/2 p-4">
              <TeamRadarChart team={team1} />
            </div>
            <div className="w-1/2 p-4">
              <TeamRadarChart team={team2} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center my-10">
          <p className="text-lg text-gray-600 font-semibold">Select two teams to compare their stats</p>
        </div>
      )}
    </div>
  );
};

export default App;
