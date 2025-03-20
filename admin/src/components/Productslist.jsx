import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Productslist() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5005/api/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 md:ml-64">
        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              onClick={() => navigate("/addproducts")}
            >
              + Add Product
            </button>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full bg-white border border-gray-200">
              <thead className="bg-gray-200 text-gray-700">
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
                    <tr
                      key={product._id}
                      className="hover:bg-gray-100 transition"
                    >
                      <td className="border p-3">{product._id}</td>
                      <td className="border p-3">{product.name}</td>
                      <td className="border p-3">${product.price}</td>
                      <td className="border p-3">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile-friendly message */}
          <div className="text-gray-500 text-center mt-4 md:hidden">
            Scroll horizontally to see more →
          </div>
        </div>
      </div>
    </div>
  );
}
