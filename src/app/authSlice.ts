import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/auth";

type initialState = {
  user: User | null;
  accessToken: string | null;
  tempToken: string | null;
  nextStep: string | null;
};

const initialState: initialState = {
  user: null,
  accessToken: null,
  tempToken: null,
  nextStep: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setTempAuth: (
      state,
      action: PayloadAction<{ tempToken: string; nextStep: string }>,
    ) => {
      state.tempToken = action.payload.tempToken;
      state.nextStep = action.payload.nextStep;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout, setTempAuth } = authSlice.actions;
export default authSlice.reducer;
