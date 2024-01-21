import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "../features/profile/services/profileSlice";
import { blogEditorReducer } from "../features/pages/addStory/services/blogEditorSlice";

export const rootReducer = combineReducers({
  profile: profileReducer,
  blogEditor: blogEditorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
