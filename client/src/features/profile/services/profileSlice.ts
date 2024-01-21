import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { User } from "./profileService";
import { RootState } from "../../../app/rootReducer";

const initialState: { profile: User; authToken: string } = {
  profile: {
    id: "",
    fullName: "",
    email: "",
  },
  authToken: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<{ value: string }>) => {
      state.authToken = action.payload.value;
    },
    logout: (state) => {
      state.authToken = "";
      state.profile = {};
    },
    setActiveProfile: (state, action: PayloadAction<{ profile: User }>) => {
      state.profile = { ...state.profile, ...action.payload.profile };
    },
  },
});

export const { setAuthToken, setActiveProfile, logout } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
export const profileState = (state: RootState): RootState["profile"] =>
  state.profile;
export const profileData = createSelector(profileState, (state) => state);
