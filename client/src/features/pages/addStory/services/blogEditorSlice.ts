import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/rootReducer";
import { BlogType, LatestBlogs } from "./blogEditorService";

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
  latestBlogs: LatestBlogs[] | undefined;
} = {
  blogState: initialBlogState,
  isEditorState: true,
  latestBlogs: undefined,
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
    setLatestBlogs: (
      state,
      action: PayloadAction<{ value: LatestBlogs[] | undefined }>
    ) => {
      state.latestBlogs = action.payload.value;
    },
  },
});

export const { setIsEditorState, setBlogState, clearBlogData, setLatestBlogs } =
  blogEditorSlice.actions;

export const blogEditorReducer = blogEditorSlice.reducer;
export const blogEditorState = (state: RootState): RootState["blogEditor"] =>
  state.blogEditor;
export const blogEditorData = createSelector(blogEditorState, (state) => state);
