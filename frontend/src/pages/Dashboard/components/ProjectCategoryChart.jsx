import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const ProjectCategoryChart = () => {
  const projectData = useSelector((state) => state.dashboard.projectCategories);

  const data = {
    labels: projectData.map((category) => category.name),
    datasets: [
      {
        label: 'Number of Projects',
        data: projectData.map((category) => category.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Project Distribution by Category</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProjectCategoryChart;