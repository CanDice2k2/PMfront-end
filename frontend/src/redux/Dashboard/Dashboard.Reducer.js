import { FETCH_PROJECT_STATS, FETCH_PROJECT_CHART_DATA } from './Dashboard.Type';

const initialState = {
  projectStats: {},
  projectChartData: {},
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_STATS:
      return {
        ...state,
        projectStats: action.payload,
      };
    case FETCH_PROJECT_CHART_DATA:
      return {
        ...state,
        projectChartData: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;