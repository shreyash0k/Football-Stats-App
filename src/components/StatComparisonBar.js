import React from 'react';

const StatComparisonBar = () => {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="bg-green-500 h-4 w-24"></div>
      <p className="mx-2">Stat</p>
      <div className="bg-red-500 h-4 w-24"></div>
    </div>
  );
};

export default StatComparisonBar;
