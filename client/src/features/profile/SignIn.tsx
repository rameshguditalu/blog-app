import InputBox from "../../common/components/InputBox";
import googleIcon from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../../common/components/PageAnimation";
import { useState } from "react";
import { UserAccount, loginUser } from "./services/profileService";
import toast from "react-hot-toast";
import {
  profileState,
  setActiveProfile,
  setAuthToken,
} from "./services/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { authWithGoogle } from "./firebase";
import axios from "axios";
import { AppRoutePaths, appConfig } from "../../common/model/route.model";

const Login = () => {
  const authToken = useSelector(profileState).authToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserAccount>({
    personal_info: {
      email: "",
      password: "",
    },
  });
  const { email, password } = formData.personal_info;

  const handlChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginUser(formData)
      .then((res) => {
        if (res.success && res.authToken && res.data) {
          toast.success(res.message);
          dispatch(setAuthToken({ value: res.authToken }));
          dispatch(setActiveProfile({ profile: res.data }));
          navigate(AppRoutePaths.HOME);
        } else toast.error(res.message);
      })
      .catch((err) => {
        if (!err?.message)
          toast.error("Something Went Wrong! Please try after sometime");
        else toast.error(err.message);
      });
  };

  const handleGoogleAuth = (e: any) => {
    e.preventDefault();
    authWithGoogle()
      .then(() =>
        axios.post(`${appConfig.REACT_API_BASE_URL}api/user/google-auth`, {
          authToken,
        })
      )
      .catch(() =>
        toast.error("Trouble login through google. Please try after sometime")
      );
  };

  return (
    <AnimationWrapper keyValue={"Login"}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[450px] border-2 border-grey p-12 rounded-2xl mt-10">
          <h1 className="text-3xl font-gelasio text-left mb-6 font-semibold">
            Log in
          </h1>
          <label className="text-xl font-medium">Email</label>
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            value={email || ""}
            handleChange={handlChange}
            icon="fi-sr-envelope"
          />
          <label className="text-xl font-medium">Password</label>
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            value={password ?? ""}
            handleChange={handlChange}
            icon="fi-sr-lock"
          />
          <button className="btn-dark center mt-5" onClick={handleSubmit}>
            Log in
          </button>
          <div className="relative w-full flex items-center gap-2 my-5 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            className="btn-dark flex items-center justify-center gap-4 w-[80%] center"
            onClick={handleGoogleAuth}
          >
            <img src={googleIcon} className="w-5" alt="google" />
            Continue with google
          </button>
          <p className="mt-2 text-dark-grey text-l text-center">
            Don't have an account ?
            <Link to="/register" className="underline text-black text-l ml-1">
              Join us today
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default Login;
