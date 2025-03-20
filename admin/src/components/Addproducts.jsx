import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

export default function Addproducts() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageAlt: "",
    description: "",
    imageSrc: "", // Stores image URL
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? `http://localhost:5005`
      : `https://e-commerse-2jqj.onrender.com`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.imageAlt ||
      !formData.description ||
      !formData.imageSrc
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/products`, formData);
      console.log("Product Added:", data);
      navigate("/");
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="max-w-3xl mx-auto p-6 md:p-10 bg-gradient-to-r from-teal-50 to-gray-50 shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold text-center text-teal-800 mb-8">
            Add New Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-teal-800 font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-teal-800 font-medium">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-teal-800 font-medium">
                Image Alt Text
              </label>
              <input
                type="text"
                name="imageAlt"
                className="w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Image Alt Text"
                value={formData.imageAlt}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-teal-800 font-medium">
                Product Description
              </label>
              <textarea
                name="description"
                className="w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter product description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-teal-800 font-medium">
                Image URL
              </label>
              <input
                type="text"
                name="imageSrc"
                className="w-full p-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Image URL"
                value={formData.imageSrc}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
