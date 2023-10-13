import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../feature/auth/AuthSlice";
const Test = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInput = {
      email: "test@gmail.com",
      password: "111222",
      role: "admin",
    };
    try {
      await dispatch(signUp(userInput));
      if (status === "succeeded") {
        // navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Sign-in error =>", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-red-500 ">
        <button className="btn btn-primary" type="submit">submit</button>
      </form>
    </>
  );
};

export default Test;
