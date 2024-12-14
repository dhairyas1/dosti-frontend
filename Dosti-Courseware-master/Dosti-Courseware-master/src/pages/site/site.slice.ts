import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SiteState {
  isAuthModalOpen: boolean;
}

const initialState: SiteState = {
  isAuthModalOpen: false
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    openAuthModal(state) {
      state.isAuthModalOpen = true;
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    }
  }
});

export const { openAuthModal, closeAuthModal } = siteSlice.actions;
export default siteSlice.reducer; 