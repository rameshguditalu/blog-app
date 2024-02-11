import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { UserAccount } from "./profileService";
import { RootState } from "../../../app/rootReducer";

const initialState: { profile: UserAccount; authToken: string } = {
  profile: {
    personal_info: {
      id: "",
      fullName: "",
      email: "",
      userName: "",
      profile_img: "",
    },
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
      state.profile.personal_info = {};
    },
    setActiveProfile: (
      state,
      action: PayloadAction<{ profile: UserAccount }>
    ) => {
      if (action.payload.profile.personal_info) {
        state.profile.personal_info = {
          ...state.profile.personal_info,
          ...action.payload.profile.personal_info,
        };
      }
    },
  },
});

export const { setAuthToken, setActiveProfile, logout } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
export const profileState = (state: RootState): RootState["profile"] =>
  state.profile;
export const profileData = createSelector(profileState, (state) => state);
