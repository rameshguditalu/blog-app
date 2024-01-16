import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "./PageAnimation";
import { useDispatch, useSelector } from "react-redux";
import { logout, profileState } from "../features/profile/profileSlice";

const UserNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(profileState).profile;
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200">
        <Link to="/add-story" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${profile.userName}`} className="link pl-8 py-4">
          <p>Profile</p>
        </Link>
        <Link to="/dashboard/blogs" className="link pl-8 py-4">
          <p>Dashboard</p>
        </Link>
        <Link to="/settings/edit-profile" className="link pl-8 py-4">
          <p>Settings</p>
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={handleLogout}
        >
          <h1 className="font-bold text-xl mb-1">Sign Out</h1>
          <p className="text-dark-grey">@{profile.userName}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigation;
