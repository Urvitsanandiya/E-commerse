import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import NotFound from "./components/Pagenotfound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/Protectroute";
import OrderDone from "./components/OrderDone";
import Footer from "./components/Footer";
import AuthSync from "./components/AuthSync"; // Import the AuthSync component

function App() {
  return (
    <>
      <AuthSync /> {/* Sync localStorage token with Redux state */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderdone"
          element={
            <ProtectedRoute>
              <OrderDone />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
