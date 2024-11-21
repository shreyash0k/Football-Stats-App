import React, { useState, useEffect } from 'react';
import FiltersSection from './components/FiltersSection';
import TeamSelectionRow from './components/TeamSelectionRow';
import TeamCard from './components/TeamCard';
import TeamComparisonBar from './components/TeamComparisonBar';
import TeamRadarChart from './components/TeamRadarChart';
import axios, { AxiosError } from 'axios';

// Define the shape of a Team object
interface Team {
  id: number;
  name: string;
  [key: string]: any;
}

const App: React.FC = () => {
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [leagueId, setLeagueId] = useState<string>('');
  const [season, setSeason] = useState<string>('');

  const fetchTeams = async (): Promise<void> => {
    try {
      if (!leagueId || !season) return;

      setLoading(true);
      const response = await axios.get<Team[]>(
        `${process.env.REACT_APP_BACKEND_URL}/api/statistics`,
        { params: { leagueId, season } }
      );
      setTeams(response.data || []);
      setError(null);
      setLoading(false);
    } catch (err: AxiosError | any) {
      console.error('Error fetching team stats:', err);
      if (err.response?.status === 404) {
        setTeams([]);
        setError(null);
      } else {
        setError('Failed to fetch data');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [leagueId, season]);

  const handleFilterChange = (type: 'league' | 'season', value: string): void => {
    if (type === 'league') {
      setLeagueId(value);
    } else if (type === 'season') {
      setSeason(value);
    }
  };

  const handleTeamClick = (team: Team): void => {
    if (!team1) {
      setTeam1(team);
      setTeams((prevTeams) => prevTeams.filter((t) => t.id !== team.id));
    } else if (!team2 && team1.id !== team.id) {
      setTeam2(team);
      setTeams((prevTeams) => prevTeams.filter((t) => t.id !== team.id));
    }
  };

  const handleRemove = (position: 'team1' | 'team2'): void => {
    let removedTeam: Team | null = null;
  
    if (position === 'team1') {
      removedTeam = team1;
      setTeam1(null);
    } else if (position === 'team2') {
      removedTeam = team2;
      setTeam2(null);
    }
  
    if (removedTeam) {
      // Safely add the removed team back to the array
      setTeams((prevTeams) => [...prevTeams, removedTeam as Team]);
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
      <TeamSelectionRow teams={teams} onTeamClick={handleTeamClick} />
      <div className="flex justify-around my-4">
        <TeamCard team={team1} teamPosition="team1" onRemove={handleRemove} />
        <TeamCard team={team2} teamPosition="team2" onRemove={handleRemove} />
      </div>
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
