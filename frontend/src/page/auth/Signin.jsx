import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/typography/ErrorMessage";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authReset, signIn } from "../../feature/auth/AuthSlice";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
const initialState = {
  emailAddress: "",
  password: "",
};

const Signin = () => {
  const [t, i18n] = useTranslation("global");

  const { auth, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialState });
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (data) => {
    const userInput = { ...data };
    dispatch(signIn(userInput));
  };

  useEffect(() => {
    if (status.signin === "succeeded") {
      toast.success("Login successful");
      dispatch(authReset());
      navigate("/admin/restaurantlist");
    } else if (status.signin === "failed") {
      toast.error(error);
      dispatch(authReset());
    }
  }, [status, dispatch, navigate, error]);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [navigate, auth]);
  if (status.signin === "loading") return <Spinner />;
  return (
    <>
      <div className="flex w-full flex-wrap">
        <div className="flex w-full flex-col md:w-1/2 lg:w-1/3">
          <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <a
              href="#"
              className="border-b-4 border-b-blue-700 pb-2 text-2xl font-bold text-gray-900"
            >
              {" "}
              Lao Consulate - HCM.{" "}
            </a>
          </div>
          <div className="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12">
            <p className="text-center text-3xl font-bold">Welcome</p>
            <p className="mt-2 text-center">Login to access your account.</p>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-lg border transition focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <svg
                      width={15}
                      height={15}
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z" />
                    </svg>
                  </span>
                  <input
                    {...register("emailAddress", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Invalid emailAddress format",
                      },
                    })}
                    type="text"
                    id="login-email"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                    placeholder="Email"
                  />
                </div>
                <ErrorMessage
                  styling="mt-3 sm:text-md"
                  error={errors?.emailAddress}
                />
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-lg border transition focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-600">
                  <span className="inline-flex items-center border-r border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                    <svg
                      width={15}
                      height={15}
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z" />
                    </svg>
                  </span>

                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type={showPass ? "text" : "password"}
                    id="login-password"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400  focus:outline-none"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
                <ErrorMessage
                  styling="mt-3 sm:text-md"
                  error={errors?.password}
                />
              </div>
              {status.signin === "loading" ? (
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2"
                >
                  <span className="loading loading-spinner"></span>
                  loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition ease-in hover:bg-blue-600 focus:outline-none focus:ring-2"
                >
                  <span className="w-full"> Submit </span>
                </button>
              )}
            </form>
            <div className="pb-12 pt-12 text-center">
              <p className="whitespace-nowrap">
                Don't have an account?
                <Link to="/signup" className="font-semibold underline">
                  {" "}
                  Register here.{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none hidden select-none bg-black shadow-2xl md:block md:w-1/2 lg:w-2/3">
          <img
            className="h-screen w-full object-cover opacity-90"
            src="https://res.cloudinary.com/devton/image/upload/v1709797538/laostudenthcm/consule_uy1nca.jpg"
          />
        </div>
      </div>
    </>
  );
};

export default Signin;
