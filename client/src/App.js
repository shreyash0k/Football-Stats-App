import logo from './logo.svg';
import './App.css';
import React from 'react';
import FiltersSection from './components/FiltersSection';
import PlayerSelectionRow from './components/PlayerSelectionRow';
import PlayerCard from './components/PlayerCard';
import StatComparisonBar from './components/StatComparisonBar';


function App() {
  return (
    <div className="App">
      <FiltersSection />
      <PlayerSelectionRow />
      <div className="flex justify-around my-8">
        <PlayerCard playerName="Player 1" />
        <PlayerCard playerName="Player 2" />
      </div>
      <div className="mx-auto w-1/2">
        {/* Placeholder Stat Comparison Bars */}
        <StatComparisonBar />
        <StatComparisonBar />
        <StatComparisonBar />
      </div>
    </div>
  );
}

export default App;
