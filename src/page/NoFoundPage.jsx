import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-black p-10 text-white">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="text-2xl">Oops! Page not found.</p>
      <p className="mt-4 text-center text-lg">
        The page you are looking for might have been removed or doesn't exist.
      </p>
      <Link to="/" className="mt-8 text-cyan-300 hover:underline">
        Go back to the home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
