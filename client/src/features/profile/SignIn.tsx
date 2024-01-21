import InputBox from "../../common/components/InputBox";
import googleIcon from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../../common/components/PageAnimation";
import { useState } from "react";
import { User, loginUser } from "./services/profileService";
import toast from "react-hot-toast";
import {
  profileState,
  setActiveProfile,
  setAuthToken,
} from "./services/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { authWithGoogle } from "./firebase";
import axios from "axios";

const Login = () => {
  const authToken = useSelector(profileState).authToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handlChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    loginUser(formData)
      .then((res) => {
        if (res.success && res.authToken && res.data) {
          toast.success(res.message);
          dispatch(setAuthToken({ value: res.authToken }));
          dispatch(setActiveProfile({ profile: res.data }));
          navigate("/home");
        } else toast.error(res.message);
      })
      .catch((err) => {
        if (!err?.message)
          toast.error("Something Went Wrong! Please try after sometime");
        else toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleAuth = (e: any) => {
    e.preventDefault();
    authWithGoogle()
      .then((user) =>
        axios.post("http://localhost:8080/api/user/google-auth", { authToken })
      )
      .catch(() =>
        toast.error("Trouble login through google. Please try after sometime")
      );
  };

  return (
    <AnimationWrapper keyValue={"Login"}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-14">
            Welcome back
          </h1>
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            value={email || ""}
            handleChange={handlChange}
            icon="fi-sr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            value={password ?? ""}
            handleChange={handlChange}
            icon="fi-sr-lock"
          />
          <button className="btn-dark center mt-5" onClick={handleSubmit}>
            Sign In
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
