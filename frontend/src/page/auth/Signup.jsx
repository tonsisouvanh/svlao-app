import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authReset, signUp } from "../../feature/auth/AuthSlice";
import ErrorMessage from "../../components/typography/ErrorMessage";
const initialState = {
  firstname: "",
  lastname: "",
  emailAddress: "",
  password: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const { auth, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialState });
  const [showPass, setShowPass] = useState(false);

  const handleSignup = async (data) => {
    const userInput = {
      ...data,
      fullname: {
        englishFirstname: data.firstname,
        englishLastname: data.lastname,
      },
    };
    dispatch(signUp(userInput));
  };

  useEffect(() => {
    if (status.signup === "succeeded") {
      toast.success("Sign up successful");
      dispatch(authReset());
      navigate("/signin");
    } else if (status.signup === "failed") {
      toast.error(error);
      dispatch(authReset());
    }
  }, [status, dispatch, navigate, error]);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [navigate, auth]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-login-background bg-cover bg-no-repeat">
      <div className="absolute h-full w-full bg-gradient-to-b from-black via-black/70 to-transparent"></div>
      <div className="z-[1] mx-auto w-96 rounded bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Student Signup</h1>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="mb-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                {...register("firstname", {
                  required: "Firstname is required",
                })}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <ErrorMessage
                styling="mt-3 sm:text-md"
                error={errors?.firstname}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                {...register("lastname", {
                  required: "Lastname is required",
                })}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <ErrorMessage
                styling="mt-3 sm:text-md"
                error={errors?.lastname}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("emailAddress", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid emailAddress format",
                  },
                })}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              <ErrorMessage
                styling="mt-3 sm:text-md"
                error={errors?.emailAddress}
              />
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
              {/* <ErrorMessage
                styling="mt-3 sm:text-md"
                error={errors?.password}
              /> */}
              {errors.password && (
                <span className="mt-3 text-xs italic text-red-400">
                  Password must be at least 6 character
                </span>
              )}
            </div>
          </div>
          <div className="mb-4 flex justify-end gap-3">
            {status.signup === "loading" ? (
              <button className="btn flex-grow">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button type="submit" className={`btn btn-primary flex-grow`}>
                Sign up
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
