import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl sm:text-2xl text-gray-600">
          Oops! Page Not Found
        </p>
        <p className="mt-2 text-md sm:text-lg text-gray-500">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 text-white bg-blue-400 hover:bg-blue-500 rounded-md text-lg sm:text-xl"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
