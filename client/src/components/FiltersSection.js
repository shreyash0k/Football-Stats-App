import React from 'react';

const FiltersSection = ({ onFilterChange, selectedLeague, selectedSeason }) => {
  const handleLeagueChange = (e) => {
    onFilterChange('league', e.target.value);
  };

  const handleSeasonChange = (e) => {
    onFilterChange('season', e.target.value);
  };

  return (
    <div className="flex justify-center items-center p-4 bg-gray-200">
      <div className="mr-4">
        <select 
          className="p-2 border rounded" 
          onChange={handleLeagueChange}
          value={selectedLeague}  // Set the selected value to the current leagueId
        >
          <option value="">Select League</option>
          <option value="39">Premier League</option>
          <option value="140">La Liga</option>
          <option value="135">Serie A</option>
          <option value="78">Bundesliga</option>
        </select>
      </div>

      <div>
        <select 
          className="p-2 border rounded" 
          onChange={handleSeasonChange}
          value={selectedSeason}  // Set the selected value to the current season
        >
          <option value="">Select Season</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default FiltersSection;
