import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? `http://localhost:5000/`
      : `https://e-commerse-2jqj.onrender.com`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center bg-gradient-to-r from-teal-50 to-gray-50 px-6 py-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-teal-800">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <p className="text-coral-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-teal-800"
            >
              Name
            </label>
            <input
              value={formData.name}
              onChange={handleChange}
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 block w-full rounded-md border-teal-200 px-3 py-2 text-teal-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-teal-800"
            >
              Email address
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 block w-full rounded-md border-teal-200 px-3 py-2 text-teal-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-teal-800"
            >
              Password
            </label>
            <input
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 block w-full rounded-md border-teal-200 px-3 py-2 text-teal-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700 transition"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-teal-600 hover:text-teal-500"
          >
            Sign in to your account
          </Link>
        </p>
      </div>
    </div>
  );
}
