import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/rootReducer";
import { BlogType } from "./blogEditorService";

const initialBlogState = {
  title: "",
  image: "",
  content: {
    time: new Date().getTime(),
    blocks: [],
  },
  tags: [],
  description: "",
  author: {},
};

const initialState: {
  blogState: BlogType;
  isEditorState: boolean;
} = {
  blogState: initialBlogState,
  isEditorState: true,
};

export const blogEditorSlice = createSlice({
  name: "blogEditor",
  initialState,
  reducers: {
    setIsEditorState: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isEditorState = action.payload.value;
    },
    setBlogState: (state, action: PayloadAction<{ blogData: BlogType }>) => {
      state.blogState = { ...state.blogState, ...action.payload.blogData };
    },
    clearBlogData: (state) => {
      state.isEditorState = true;
      state.blogState = initialBlogState;
    },
  },
});

export const { setIsEditorState, setBlogState, clearBlogData } =
  blogEditorSlice.actions;

export const blogEditorReducer = blogEditorSlice.reducer;
export const blogEditorState = (state: RootState): RootState["blogEditor"] =>
  state.blogEditor;
export const blogEditorData = createSelector(blogEditorState, (state) => state);
