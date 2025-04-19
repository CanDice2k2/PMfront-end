import { format } from 'date-fns';

export const prepareCategoryData = (projects) => {
  const categoryCounts = {};

  projects.forEach((project) => {
    const category = project.category || 'Uncategorized';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));
};

export const prepareStatusData = (projects) => {
  const statusCounts = {
    completed: 0,
    inProgress: 0,
    onHold: 0,
  };

  projects.forEach((project) => {
    if (project.status === 'completed') {
      statusCounts.completed += 1;
    } else if (project.status === 'inProgress') {
      statusCounts.inProgress += 1;
    } else if (project.status === 'onHold') {
      statusCounts.onHold += 1;
    }
  });

  return [
    { status: 'Completed', count: statusCounts.completed },
    { status: 'In Progress', count: statusCounts.inProgress },
    { status: 'On Hold', count: statusCounts.onHold },
  ];
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'MMMM dd, yyyy');
};