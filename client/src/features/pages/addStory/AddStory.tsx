import { useDispatch, useSelector } from "react-redux";
import BlogEditor from "../../../common/components/BlogEditor";

import { Navigate, useLocation } from "react-router-dom";
import PublishForm from "../../../common/components/PublishForm";
import { profileState } from "../../profile/services/profileSlice";
import { blogEditorState, clearBlogData } from "./services/blogEditorSlice";
import { useEffect } from "react";

const AddStory = () => {
  const profileData = useSelector(profileState).profile.personal_info;
  const isEditorState = useSelector(blogEditorState).isEditorState;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearBlogData());
  }, [location.pathname]);

  return !profileData.id ? (
    <Navigate to={"/login"} />
  ) : isEditorState ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
};

export default AddStory;
