import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '@/redux/Dashboard/Dashboard.Action';
import ProjectStatsCard from './components/ProjectStatsCard';
import ProjectCategoryChart from './components/ProjectCategoryChart';
import ProjectStatusChart from './components/ProjectStatusChart';
import RecentProjects from './components/RecentProjects';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { projectStats, categoryData, statusData } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        <ProjectStatsCard stats={projectStats} />
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Project Categories</h2>
        <ProjectCategoryChart data={categoryData} />
      </div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Project Status</h2>
        <ProjectStatusChart data={statusData} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Projects</h2>
        <RecentProjects />
      </div>
    </div>
  );
};

export default Dashboard;