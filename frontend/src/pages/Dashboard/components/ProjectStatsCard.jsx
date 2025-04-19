import React from 'react';

const ProjectStatsCard = ({ totalProjects, completedProjects, ongoingProjects }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <h2 className="text-xl font-semibold mb-4">Project Statistics</h2>
      <div className="flex justify-between">
        <div className="text-center">
          <h3 className="text-lg font-medium">Total Projects</h3>
          <p className="text-2xl font-bold">{totalProjects}</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium">Completed Projects</h3>
          <p className="text-2xl font-bold">{completedProjects}</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium">Ongoing Projects</h3>
          <p className="text-2xl font-bold">{ongoingProjects}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatsCard;