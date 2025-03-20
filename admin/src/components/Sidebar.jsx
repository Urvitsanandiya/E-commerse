import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰ Menu
      </button>
      <aside
        className={`w-64 bg-gray-900 text-white min-h-screen p-5 fixed md:relative transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="text-white md:hidden mb-4"
          onClick={() => setSidebarOpen(false)}
        >
          ❌ Close
        </button>
        <h2 className="text-2xl font-bold mb-5">Admin</h2>
        <nav>
          <ul>
            <li className="py-2 hover:bg-gray-700 px-3 rounded cursor-pointer">
              <Link to="/productslist">Products</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 px-3 rounded cursor-pointer">
              <Link to="/addproducts">Add Product</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 px-3 rounded cursor-pointer">
              <Link to="/userslist">User Details</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
