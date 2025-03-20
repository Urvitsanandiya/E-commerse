import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Productslist() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? `http://localhost:5005`
      : `https://e-commerse-2jqj.onrender.com`);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_URL}/api/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-teal-800">Products</h2>
          <button
            className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
            onClick={() => navigate("/addproducts")}
          >
            + Add Product
          </button>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-gradient-to-r from-teal-50 to-gray-50 border border-teal-200">
            <thead className="bg-teal-100 text-teal-800">
              <tr>
                <th className="border p-3 text-left">Product Id</th>
                <th className="border p-3 text-left">Product</th>
                <th className="border p-3 text-left">Price</th>
                <th className="border p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-teal-50 transition">
                    <td className="border p-3 text-teal-800">{product._id}</td>
                    <td className="border p-3 text-teal-800">{product.name}</td>
                    <td className="border p-3 text-teal-800">
                      ${product.price}
                    </td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-coral-500 text-red-900 px-4 py-1 rounded-lg font-semibold hover:bg-coral-600 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-teal-800">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile-friendly message */}
        <div className="text-teal-800 text-center mt-4 md:hidden">
          Scroll horizontally to see more →
        </div>
      </div>
    </div>
  );
}
