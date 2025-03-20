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
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          E-Commerce
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          <Link to="/" className="hover:text-blue-600 font-semibold uppercase">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 font-semibold uppercase"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600 font-semibold uppercase"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-transparent px-2 py-1 focus:outline-none"
          />
        </div>

        {/* Icons: Cart and Authentication */}
        <div className="hidden md:flex space-x-4">
          <button
            className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile / Logout */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <User size={22} />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-md mx-4 p-4 space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-semibold hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-semibold hover:text-blue-600"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-semibold hover:text-blue-600"
          >
            Contact
          </Link>

          <div className="flex space-x-4 pt-4 border-t">
            <button
              className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => {
                navigate("/cart");
                setIsOpen(false);
              }}
            >
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <User size={22} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {searchQuery && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white shadow-lg rounded-md z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product._id || product.id}
                to={`/products/${product._id || product.id}`}
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setSearchQuery("")}
              >
                {product.name}
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </nav>
  );
}
