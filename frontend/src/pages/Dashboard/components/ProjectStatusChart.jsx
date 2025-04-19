import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const ProjectStatusChart = () => {
  const projectData = useSelector((state) => state.dashboard.projectStatus);

  const data = {
    labels: ['Completed', 'In Progress', 'On Hold'],
    datasets: [
      {
        label: 'Project Status',
        data: [
          projectData.completed || 0,
          projectData.inProgress || 0,
          projectData.onHold || 0,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Status Overview',
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProjectStatusChart;