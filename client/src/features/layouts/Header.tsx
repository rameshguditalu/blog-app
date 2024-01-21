import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/blog-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { profileState } from "../profile/services/profileSlice";
import ProfileIcon from "../../assets/user.png";
import UserNavigation from "../../common/components/UserNavigation";
import { AppRoutePaths } from "../../common/model/route.model";
import {
  blogEditorState,
  setIsEditorState,
} from "../pages/addStory/services/blogEditorSlice";
import toast from "react-hot-toast";

const Header = () => {
  const authToken = useSelector(profileState).authToken;
  const editorData = useSelector(blogEditorState).blogState;
  const isEditorState = useSelector(blogEditorState).isEditorState;

  const dispatch = useDispatch();
  const profileData = useSelector(profileState).profile.personal_info;
  const pathName = useLocation().pathname;
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNav, setUserNav] = useState(false);
  const navigate = useNavigate();

  const handleBlur = () => {
    setTimeout(() => {
      setUserNav(false);
    }, 200);
  };

  const handlePublishEvent = () => {
    if (!editorData.image.length)
      return toast.error("Upload an image to publish it");
    if (!editorData.title.length)
      return toast.error("Write blog title to publish it");
    dispatch(setIsEditorState({ value: false }));
  };

  return (
    <nav className="navbar">
      <Link to="/" className="flex-none w-10">
        <img src={Logo} alt="Blogger Logo" />
      </Link>
      <div
        className={
          "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
          (searchBoxVisibility ? "show" : "hide")
        }
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-auto bg-grey p-3 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button
          className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => setSearchBoxVisibility((curr) => !curr)}
        >
          <i className="fi fi-rr-search text-xl"></i>
        </button>
        {pathName != AppRoutePaths.NEW_STORY && authToken && (
          <Link
            to={AppRoutePaths.NEW_STORY}
            className="hidden md:flex gap-2 link bg-none"
          >
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>
        )}

        {pathName == AppRoutePaths.NEW_STORY && authToken && (
          <>
            {isEditorState && (
              <button className="btn-dark py-2" onClick={handlePublishEvent}>
                Publish
              </button>
            )}
            <button className="btn-light hidden md:block py-2">
              Save Draft
            </button>
          </>
        )}

        {authToken && (
          <>
            <Link to="/dashboard/notification">
              <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                <i className="fi fi-rr-bell text-2xl block mt-1"></i>
              </button>
            </Link>
            <div
              className="relative"
              onClick={() => setUserNav((curr) => !curr)}
              onBlur={handleBlur}
            >
              <button className="w-12 h-12 mt-1">
                {profileData.profileImage ? (
                  <img
                    src={ProfileIcon}
                    className="w-8 h-8 object-cover rounded-full"
                    alt="profile"
                  />
                ) : (
                  <i className="fi fi-sr-user text-2xl block mt-1"></i>
                )}
              </button>
              {userNav ? <UserNavigation /> : ""}
            </div>
          </>
        )}
        {!authToken && (
          <>
            <Link to="/login" className="btn-dark py-2">
              Sign In
            </Link>
            <Link to="/register" className="btn-light hidden md:block py-2">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
