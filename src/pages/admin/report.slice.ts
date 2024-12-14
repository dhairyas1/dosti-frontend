import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportState {
  isLoading: boolean;
  error: string | null;
  chartName: string;
  previousDaysSelected: number;
  totalRevenue: number;
  totalUsers: number;
  totalCourses: number;
  recentOrders: any[];
}

const initialState: ReportState = {
  isLoading: false,
  error: null,
  chartName: 'sales',
  previousDaysSelected: 7,
  totalRevenue: 0,
  totalUsers: 0,
  totalCourses: 0,
  recentOrders: [],
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    selectPreviousDays(state, action: PayloadAction<number>) {
      state.previousDaysSelected = action.payload;
    },
    showChart(state, action: PayloadAction<string>) {
      state.chartName = action.payload;
    },
    setTotalRevenue(state, action: PayloadAction<number>) {
      state.totalRevenue = action.payload;
    },
    setTotalUsers(state, action: PayloadAction<number>) {
      state.totalUsers = action.payload;
    },
    setTotalCourses(state, action: PayloadAction<number>) {
      state.totalCourses = action.payload;
    },
    setRecentOrders(state, action: PayloadAction<any[]>) {
      state.recentOrders = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  selectPreviousDays,
  showChart,
  setTotalRevenue,
  setTotalUsers,
  setTotalCourses,
  setRecentOrders,
} = reportSlice.actions;

export default reportSlice.reducer; 