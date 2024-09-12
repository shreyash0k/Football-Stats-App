import React from 'react';

const FiltersSection = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <select className="p-2 border rounded">
        <option>League</option>
        <option>Premier League</option>
        <option>La Liga</option>
        <option>Serie A</option>
        <option>Bundesliga</option>

      </select>
      <select className="p-2 border rounded">
        <option>Team</option>
        <option>Manchester United</option>
        <option>Real Madrid</option>
        <option>Barcelona</option>
        <option>Bayern Munich</option>

      </select>
      <input type="text" placeholder="Search" className="p-2 border rounded" />
    </div>
  );
};

export default FiltersSection;
