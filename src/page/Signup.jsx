import { useState } from "react";

const StudentSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here, such as API calls or form validation
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Student Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                First Name:
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Last Name:
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2">
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
            <div className="col-span-2">
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
          </div>
          <div className="mt-4 flex justify-end">
            <button className="btn btn-active btn-secondary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
