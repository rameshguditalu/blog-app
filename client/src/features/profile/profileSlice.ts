import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { User } from "./services/profileService";
import { RootState } from "../../app/rootReducer";

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
    },
    setActiveProfile: (state, action: PayloadAction<{ profile: User }>) => {
      state.profile.id = action.payload.profile.id;
      state.profile.email = action.payload.profile.email;
      state.profile.userName = action.payload.profile.userName;
      state.profile.fullName = action.payload.profile.fullName;
      state.profile.profileImage = action.payload.profile.profileImage;
    },
  },
});

export const { setAuthToken, setActiveProfile, logout } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
export const profileState = (state: RootState): RootState["profile"] =>
  state.profile;
export const profileData = createSelector(profileState, (state) => state);
