import React from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from '@/components/ui/ProjectCard';

const RecentProjects = () => {
  const { projects } = useSelector((state) => state.project);

  return (
    <div className="recent-projects">
      <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
      <div className="grid grid-cols-1 gap-4">
        {projects.slice(-5).map((project) => (
          <ProjectCard key={project.id} item={project} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;