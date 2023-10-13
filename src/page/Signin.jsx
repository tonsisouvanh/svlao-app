import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here, such as API calls or authentication checks
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Student Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mb-2 block font-semibold text-gray-600">
              Email:
            </label>
            <input
              type="email"
              className="w-full rounded border px-3 py-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-semibold text-gray-600">
              Password:
            </label>
            <input
              type="password"
              className="w-full rounded border px-3 py-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex justify-end gap-3">
            <Link to={"/"}>
              <button className="btn btn-primary btn-active">Sign In</button>
            </Link>

            <button className="btn btn-secondary btn-active">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
