import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice"; // Import the login action

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

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
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data);

      // Dispatch the login action to update Redux state
      dispatch(login(response.data.user));

      // Redirect based on cart status
      if (cartItems.length === 0) {
        navigate("/"); // Redirect to home if cart is empty
      } else {
        navigate("/checkout"); // Redirect to checkout if cart has items
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center bg-gradient-to-r from-teal-50 to-gray-50 px-6 py-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-teal-800">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-teal-800"
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
              className="block w-full rounded-md border-teal-200 px-3 py-2 text-teal-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              onChange={handleChange}
              value={formData.password}
              id="password"
              name="password"
              type="password"
              required
              className="block w-full rounded-md border-teal-200 px-3 py-2 text-teal-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-teal-600 px-3 py-2 text-white font-semibold shadow-sm hover:bg-teal-700 transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-600 hover:text-teal-500 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}