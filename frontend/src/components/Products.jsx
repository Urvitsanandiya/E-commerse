import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productsSlice';
import { addToCart } from './cartSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);
  const [selectedColor, setSelectedColor] = useState("black");

  // Get product ID from URL
  const { id } = useParams();
  console.log("Product ID from URL:", id); // Debugging

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!id) {
    return <p className="text-center text-red-500">Invalid Product ID!</p>;
  }

  const product = products.find((p) => p._id === id || p.id === id);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (!product) {
    return (
      <div className="text-red-500 text-center mt-10">
        Product not found!{" "}
        <Link to="/" className="text-blue-500 underline">
          Go back to the product list
        </Link>
      </div>
    );
  }

  return (
    <div className="my-[80px] flex flex-col md:flex-row items-center p-6 md:p-12 max-w-5xl mx-auto gap-6">

      {/* Product Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="w-48 md:w-56 lg:w-64 rounded-lg shadow-md object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-lg font-medium text-gray-700 mt-2">
          {product.price}
        </p>

        {/* Responsive Description */}
        <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed sm:line-clamp-2 md:line-clamp-4">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Add to bag
        </button>

        {/* View Cart Button */}
        <Link
          to="/cart"
          className="mt-3 w-full text-center bg-gray-200 text-gray-800 py-2 rounded-lg text-lg font-semibold hover:bg-gray-300 transition block"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
};

export default Products;