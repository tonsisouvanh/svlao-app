import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/typography/ErrorMessage";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../feature/auth/AuthSlice";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const initialState = {
  email: "",
  username: "",
  password: "",
  role: "student",
};
// email, password, username,role
const Signup = () => {
  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialState });
  const [showPass, setShowPass] = useState(false);
  const handleLogin = async (data) => {
    const userInput = { ...data };
    try {
      await dispatch(signUp(userInput));
    } catch (error) {
      console.error("Sign-up error =>", error);
    }
  };

  useEffect(() => {
    if (status === "success") {
      reset();
    }
  }, [status, reset]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-login-background bg-cover bg-no-repeat">
      <div className="absolute h-full w-full bg-gradient-to-b from-black via-black/70 to-transparent"></div>
      <div className="absolute w-96 rounded bg-base-200 p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Student Signup</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <ErrorMessage
                styling="mt-3 sm:text-md"
                error={errors?.username}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email format",
                  },
                })}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <ErrorMessage styling="mt-3 sm:text-md" error={errors?.email} />
            </div>
          </div>
          <div className="mb-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer"
                >
                  {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                type={showPass ? "text" : "password"}
                className="input input-bordered w-full max-w-xs"
              />
              <ErrorMessage
                styling="mt-3 sm:text-md"
                error={errors?.password}
              />
            </div>
          </div>
          <div className="mb-4 flex justify-end gap-3">
            {status === "loading" ? (
              <button className="btn flex-grow">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button type="submit" className={`btn btn-primary flex-grow`}>
                sign up
              </button>
            )}
          </div>
        </form>
        <div>
          <label className="label-text">Already have an account?</label>
          <Link to="/signin" className="link-primary link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
