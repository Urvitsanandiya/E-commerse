import { useState, useEffect } from "react";
import { Menu, ShoppingCart, User, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./authSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors for state
  const cartItems = useSelector((state) => state.cart?.items || []);
  const products = useSelector((state) => state.products?.items || []);
  const isAuthenticated = !!localStorage.getItem("token"); // Check token presence

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(logout()); // Clear user state in Redux
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-700 to-teal-800 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          E-Commerce
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          <Link
            to="/"
            className="text-gray-200 hover:text-coral-400 font-semibold uppercase"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-200 hover:text-coral-400 font-semibold uppercase"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-200 hover:text-coral-400 font-semibold uppercase"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center bg-teal-700 rounded-full px-4 py-2 w-96">
          <Search size={18} className="text-gray-300" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-transparent px-2 py-1 text-gray-200 focus:outline-none placeholder-gray-400"
          />
        </div>

        {/* Icons: Cart and Authentication */}
        <div className="hidden md:flex space-x-4">
          <button
            className="relative p-2 rounded-full bg-teal-700 hover:bg-teal-600 transition-colors"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={22} className="text-gray-200" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile / Logout */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-teal-700 hover:bg-teal-600 transition-colors text-gray-200"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="p-2 rounded-full bg-teal-700 hover:bg-teal-600 transition-colors"
            >
              <User size={22} className="text-gray-200" />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full bg-teal-700 hover:bg-teal-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={24} className="text-gray-200" />
          ) : (
            <Menu size={24} className="text-gray-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-800 shadow-lg rounded-md mx-4 p-4 space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-semibold text-gray-200 hover:text-coral-400"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-semibold text-gray-200 hover:text-coral-400"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-semibold text-gray-200 hover:text-coral-400"
          >
            Contact
          </Link>

          <div className="flex space-x-4 pt-4 border-t border-teal-700">
            <button
              className="relative p-2 rounded-full bg-teal-700 hover:bg-teal-600 transition-colors"
              onClick={() => {
                navigate("/cart");
                setIsOpen(false);
              }}
            >
              <ShoppingCart size={22} className="text-gray-200" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-teal-700 hover:bg-teal-600 transition-colors text-gray-200"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="p-2 rounded-full bg-teal-700 hover:bg-teal-600 transition-colors"
              >
                <User size={22} className="text-gray-200" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {searchQuery && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-teal-800 shadow-lg rounded-md z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product._id || product.id}
                to={`/products/${product._id || product.id}`}
                className="block px-4 py-2 text-gray-200 hover:bg-teal-700"
                onClick={() => setSearchQuery("")}
              >
                {product.name}
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-400">No results found.</p>
          )}
        </div>
      )}
    </nav>
  );
}