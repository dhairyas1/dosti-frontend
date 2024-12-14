import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportState {
  isLoading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  isLoading: false,
  error: null,
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
  },
});

export const {
  setLoading,
  setError,
} = reportSlice.actions;

export default reportSlice.reducer;
