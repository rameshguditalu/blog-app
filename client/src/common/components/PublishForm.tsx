import { useDispatch, useSelector } from "react-redux";
import AnimationWrapper from "./PageAnimation";
import {
  blogEditorState,
  setBlogState,
  setIsEditorState,
} from "../../features/pages/addStory/services/blogEditorSlice";
import Tag from "./Tag";
import toast from "react-hot-toast";
import { createBlog } from "../../features/pages/addStory/services/blogEditorService";
import { useNavigate } from "react-router-dom";
import { profileState } from "../../features/profile/services/profileSlice";
import { AppRoutePaths } from "../model/route.model";

let charactersLimit = 200;
let tagLimit = 10;

const PublishForm = () => {
  const profileData = useSelector(profileState).profile.personal_info;
  const blogData = useSelector(blogEditorState).blogState;
  const authToken = useSelector(profileState).authToken;
  const { title, description, image, tags, content } = blogData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(setIsEditorState({ value: true }));
  };

  const handleTitle = (e: { target: any }) => {
    let input = e.target;
    dispatch(
      setBlogState({
        blogData: { ...blogData, title: input.value },
      })
    );
  };

  const handleDescription = (e: { target: any }) => {
    let input = e.target;
    dispatch(
      setBlogState({
        blogData: { ...blogData, description: input.value },
      })
    );
  };

  const handleTitleKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          dispatch(
            setBlogState({ blogData: { ...blogData, tags: [...tags, tag] } })
          );
        }
      } else {
        toast.error(`You can add max ${tagLimit} Tags`);
      }
      e.target.value = "";
    }
  };

  const handlePublish = (e: any) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!blogData.title.length)
      return toast.error("Write blog title to publish it");
    if (
      !blogData.description.length ||
      blogData.description.length > charactersLimit
    )
      return toast.error(
        `Write a description about your blog within ${charactersLimit} character to publish it`
      );
    if (!tags.length)
      return toast.error("Enter atleast 1 tag to help us rank your blog");
    let loadingToast = toast.loading("Publishing...");
    let blogObj = { title, image, content, tags, description, draft: false };
    if (profileData.id)
      createBlog(blogObj, authToken, profileData.id)
        .then(() => {
          toast.dismiss(loadingToast);
          toast.success("Blog Created Successfully");
          navigate(AppRoutePaths.HOME);
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          if (!err?.message)
            toast.error("Something Went Wrong! Please try after sometime");
          else toast.error(err.message);
        });
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <button
          className="w-12 h-12 absolute right-[5vw] top-[5%] lg:top-[20%]"
          onClick={handleClose}
        >
          <i className="fi fi-sr-cross"></i>
        </button>
        <div className="max-w-[550px] center ">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={image} alt="Image" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-1">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-4xl mt-4">
            {description}
          </p>
        </div>
        <div className="border-grey lg:border-1">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            className="input-box pl-4 "
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={handleTitle}
          />
          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>
          <textarea
            maxLength={charactersLimit}
            value={description}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleDescription}
            onKeyDown={handleTitleKeyDown}
          ></textarea>
          <p className="mt-1 text-dark-grey text-sm text-right">
            {charactersLimit - description.length} characters left
          </p>
          <p className="text-dark-grey mb-2 mt-9">
            Topics - ( Helps in searching and ranking your blog post )
          </p>
          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              className="sticky input-box bg-white top-0 left-0  pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />
            <>
              {tags.map((tag, i) => {
                return <Tag tag={tag} key={i} />;
              })}
            </>
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-sm text-right">
            {tagLimit - tags.length} tags left
          </p>
          <button className="btn-dark px-8" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
