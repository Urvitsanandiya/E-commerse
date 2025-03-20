import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearCart } from "./cartSlice"; // Import the clearCart action

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cartItems
    .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? `http://localhost:5005`
      : `https://e-commerse-2jqj.onrender.com`);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const requiredFields = [
      "name",
      "email",
      "address",
      "city",
      "state",
      "postalCode",
    ];
    const missingField = requiredFields.find(
      (field) => !formData[field]?.trim()
    );

    if (missingField) {
      setError(`Please fill in all required fields: ${missingField}`);
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      ...formData,
      productsPurchased: cartItems.map((product) => ({
        productId: product.id || product._id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        imageSrc: product.imageSrc,
      })),
      totalAmount: subtotal,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/users/register`,
        payload,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Confirm order and clear cart
      dispatch(clearCart());
      navigate("/orderdone", {
        state: { orderDetails: response.data },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Order submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-gray-50 flex justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-gradient-to-r from-teal-100 to-gray-100 shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-teal-800 mb-6">
          Order Summary
        </h2>
        {cartItems.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex items-center">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <span className="text-teal-800">
                {product.name} (x{product.quantity})
              </span>
            </div>
            <span className="font-semibold text-teal-800">
              ${(Number(product.price) * product.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-teal-200 mt-4 pt-4 text-lg font-semibold flex justify-between">
          <span className="text-teal-800">Total</span>
          <span className="text-teal-800">${subtotal}</span>
        </div>

        <h2 className="text-2xl font-semibold text-teal-800 mt-8 mb-6">
          Contact Information
        </h2>
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-3 border border-teal-200 rounded-md mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            required={field !== "apartment"}
          />
        ))}

        {error && (
          <div className="text-coral-500 text-sm mt-4 text-center">{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold mt-6 hover:bg-teal-700 transition disabled:bg-teal-400"
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
