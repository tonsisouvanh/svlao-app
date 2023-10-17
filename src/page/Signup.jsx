import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../feature/auth/AuthSlice";

const StudentSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic
    const inputUser = {
      email: "tom@gmail.com",
      password: "111222",
      username: "testuser",
      role: "student",
    };
    dispatch(signUp(inputUser));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Student Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-semibold text-gray-600">
                First Name:
              </label>
              <input
                type="text"
                className="w-full rounded border px-3 py-2"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block font-semibold text-gray-600">
                Last Name:
              </label>
              <input
                type="text"
                className="w-full rounded border px-3 py-2"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {/* <div className="col-span-2">
              <label className="mb-2 block font-semibold text-gray-600">
                Email:
              </label>
              <input
                type="text"
                className="w-full rounded border px-3 py-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div> */}
            <div className="col-span-2">
              <label className="mb-2 block font-semibold text-gray-600">
                Password:
              </label>
              <input
                type="password"
                className="w-full rounded border px-3 py-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn btn-secondary btn-active">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
