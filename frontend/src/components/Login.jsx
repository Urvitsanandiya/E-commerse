import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./authSlice"; // Import the login action

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/login",
        formData,
        { withCredentials: true }
      );

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data);

      // Dispatch the login action to update Redux state
      dispatch(login(response.data.user));

      // Redirect to checkout
      navigate("/checkout");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              onChange={handleChange}
              value={formData.email}
              id="email"
              name="email"
              type="email"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              value={formData.password}
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white shadow-sm hover:bg-indigo-500"
          >
            Sign in
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}