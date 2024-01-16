import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "../features/profile/profileSlice";

export const rootReducer = combineReducers({
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
