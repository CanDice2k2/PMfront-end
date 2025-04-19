import { createAction } from '@reduxjs/toolkit';
import { FETCH_PROJECT_STATS, FETCH_PROJECT_CHARTS } from './Dashboard.Type';

// Action to fetch project statistics
export const fetchProjectStats = createAction(FETCH_PROJECT_STATS);

// Action to fetch project charts data
export const fetchProjectCharts = createAction(FETCH_PROJECT_CHARTS);