import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/typography/ErrorMessage";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../feature/auth/AuthSlice";
import toast from "react-hot-toast";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const { user, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialState });
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (data) => {
    const userInput = { ...data };
    try {
      await dispatch(signIn(userInput));
      if (status === "succeeded") {
        navigate("/");
      }
    } catch (error) {
      console.error("Sign-in error =>", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="w-96 rounded bg-base-200 p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Student Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
                  min: 6,
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
            <button type="submit" className="btn btn-primary flex-grow">
              Sign In
            </button>

            <button type="button" className="btn btn-ghost">
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
