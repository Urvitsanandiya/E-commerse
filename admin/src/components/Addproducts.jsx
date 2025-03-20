import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageAlt || !formData.description || !formData.imageSrc) {
      alert("All fields are required!");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5005/api/products", formData);
      console.log("Product Added:", data);
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:ml-64">
        <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Image Alt Text</label>
              <input
                type="text"
                name="imageAlt"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Image Alt Text"
                value={formData.imageAlt}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Product Description</label>
              <textarea
                name="description"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Image URL</label>
              <input
                type="text"
                name="imageSrc"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Image URL"
                value={formData.imageSrc}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
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
