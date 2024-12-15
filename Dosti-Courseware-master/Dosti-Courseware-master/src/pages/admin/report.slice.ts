import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportState {
  chartName: string | undefined;
  previousDaysSelected: number | undefined;
}

const initialState: ReportState = {
  chartName: undefined,
  previousDaysSelected: undefined
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    selectPreviousDays(state, action: PayloadAction<number>) {
      state.previousDaysSelected = action.payload;
    },
    showChart(state, action: PayloadAction<string>) {
      state.chartName = action.payload;
    }
  }
});

export const { selectPreviousDays, showChart } = reportSlice.actions;
export default reportSlice.reducer;
