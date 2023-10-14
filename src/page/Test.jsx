import { useDispatch, useSelector } from "react-redux";
import { signIn, signOutUser } from "../feature/auth/AuthSlice";
import { useEffect } from "react";
import { fetchSingleStudent } from "../feature/student/StudentSlice";
const Test = () => {
  const { user, status: userStatus } = useSelector((state) => state.user);
  const { student, status: studentStatus } = useSelector(
    (state) => state.students,
  );

  const dispatch = useDispatch();
  const userauth = sessionStorage.getItem("user");
  // const handleSignup = async (e) => {
  //   e.preventDefault();

  //   const userInput = {
  //     email: "admin@gmail.com",
  //     password: "111222",
  //     firstname: "a",
  //     lastname: "b",
  //   };
  //   try {
  //     await dispatch(signUp(userInput));
  //   } catch (error) {
  //     console.error("Sign-up error", error);
  //   }
  // };

  const handleSingin = async (e) => {
    e.preventDefault();

    const userInput = {
      email: "adminton@gmail.com",
      password: "111222",
    };
    try {
      await dispatch(signIn(userInput));
    } catch (error) {
      console.error("Sign-up error", error);
    }
  };
  const handleSingOut = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signOutUser());
    } catch (error) {
      console.error("Sign out error", error);
    }
  };
  useEffect(() => {
    dispatch(fetchSingleStudent());
    console.log(student, studentStatus);
  }, []);

  return (
    <>
      <div className="container mx-auto flex min-h-screen items-center justify-center border">
        <div>
          {/* <div className="border p-10">
            <h1>SIGN UP</h1>
            <form onSubmit={handleSignup} className="bg-dark ">
              <button
                className={`btn btn-primary ${
                  status === "loading" && "loading"
                }`}
                type="submit"
              >
                SIGN UP
              </button>
            </form>
            <p>{JSON.stringify(user)}</p>
          </div> */}
          <div className="border p-10">
            <h1>SIGN IN</h1>
            <form onSubmit={handleSingin} className="bg-dark ">
              <button
                className={`btn btn-accent ${
                  status === "loading" && "loading"
                }`}
                type="submit"
              >
                SIGN IN
              </button>
            </form>
          </div>
          <div className="border p-10">
            <h1>SIGN OUT</h1>
            <form onSubmit={handleSingOut} className="bg-dark ">
              <button
                className={`btn btn-secondary ${
                  status === "loading" && "loading"
                }`}
                type="submit"
              >
                SIGN OUT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
