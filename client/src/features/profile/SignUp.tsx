import InputBox from "../../common/components/InputBox";
import googleIcon from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../../common/components/PageAnimation";
import { useState } from "react";
import { UserAccount, registerUser } from "./services/profileService";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserAccount>({
    personal_info: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const { fullName, email, password } = formData.personal_info;

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
        <form className="w-[80%] max-w-[450px] border-2 border-grey p-12 rounded-2xl mt-10">
          <h1 className="text-3xl font-gelasio text-left mb-6 font-semibold">
            Sign up
          </h1>
          <label className="text-xl font-medium">Full Name</label>
          <InputBox
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName || ""}
            handleChange={handlChange}
            icon="fi-sr-user"
          />
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
              Log in here.
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default SignUp;
