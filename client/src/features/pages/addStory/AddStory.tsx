import { useSelector } from "react-redux";
import BlogEditor from "../../../common/components/BlogEditor";

import { Navigate } from "react-router-dom";
import PublishForm from "../../../common/components/PublishForm";
import { profileState } from "../../profile/services/profileSlice";
import { blogEditorState } from "./services/blogEditorSlice";
import { useState } from "react";
import { OutputData } from "@editorjs/editorjs";

const initialData: OutputData = {
  time: new Date().getTime(),
  blocks: [],
};

const AddStory = () => {
  const profileData = useSelector(profileState).profile.personal_info;
  const isEditorState = useSelector(blogEditorState).isEditorState;
  const [editorData, setEditorData] = useState(initialData);

  return !profileData.id ? (
    <Navigate to={"/login"} />
  ) : isEditorState ? (
    <BlogEditor editorData={editorData} setEditorData={setEditorData} />
  ) : (
    <PublishForm />
  );
};

export default AddStory;
