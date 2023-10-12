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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Student Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">
              Password:
            </label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex justify-end gap-3">
            <Link to={"/"}>
              <button className="btn btn-active btn-primary">Sign In</button>
            </Link>

            <button className="btn btn-active btn-secondary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
