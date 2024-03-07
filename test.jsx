import React from "react";

const test = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-login-background bg-cover bg-no-repeat">
        <div className="absolute w-96 rounded bg-base-200 p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">
            {t("Login.headline") || "Student Login"}
          </h1>
          <form onSubmit={handleSubmit(handleLogin)}>
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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
              {status.signin === "loading" ? (
                <button className="btn flex-grow">
                  <span className="loading loading-spinner"></span>
                  loading
                </button>
              ) : (
                <button type="submit" className={`btn btn-primary flex-grow`}>
                  Sign In
                </button>
              )}

              <button type="button" className="btn btn-ghost">
                Forgot Password
              </button>
            </div>
          </form>
          <div>
            <label className="label-text">No account?</label>
            <Link to="/signup" className="link-primary link">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default test;
