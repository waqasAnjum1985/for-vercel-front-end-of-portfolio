import { createSlice } from "@reduxjs/toolkit";
const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
    reloadData: false,
    isAuthenticated: false,
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
    SetPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    Logout: (state) => {
      state.isAuthenticated = false;
    },
    Login: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const {
  ShowLoading,
  Logout,
  Login,
  HideLoading,
  SetPortfolioData,
  ReloadData,
} = rootSlice.actions;
export default rootSlice.reducer;
