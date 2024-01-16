import InputBox from "../../components/InputBox";
import googleIcon from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../../components/PageAnimation";
import { useState } from "react";
import { User, registerUser } from "./services/profileService";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<User>({
    fullName: "",
    email: "",
    password: "",
  });
  const { fullName, email, password } = formData;

  const handlChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    registerUser(formData)
      .then((res) => {
        toast.success(res.message);
        navigate("/login");
      })
      .catch(() => toast.error("Something Went Wrong, please try again later"))
      .finally(() => setLoading(false));
  };

  return (
    <AnimationWrapper keyValue={"Register"}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-14">
            Join us today
          </h1>
          <InputBox
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName || ""}
            handleChange={handlChange}
            icon="fi-sr-user"
          />
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
            value={password || ""}
            handleChange={handlChange}
            icon="fi-sr-lock"
          />
          <button className="btn-dark center mt-5" onClick={handleSubmit}>
            Sign Up
          </button>
          <div className="relative w-full flex items-center gap-2 my-5 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button className="btn-dark flex items-center justify-center gap-4 w-[80%] center">
            <img src={googleIcon} className="w-5" alt="google" />
            Continue with google
          </button>
          <p className="mt-2 text-dark-grey text-l text-center">
            Already have an account ?
            <Link to="/login" className="underline text-black text-l ml-1">
              Sign in here.
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default SignUp;
