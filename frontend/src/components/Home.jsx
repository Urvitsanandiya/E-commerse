import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productsSlice";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Price: Low to High", value: "lowToHigh" },
  { name: "Price: High to Low", value: "highToLow" },
];

export default function Home() {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (sortType) {
      const sorted = [...products].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (sortType === "lowToHigh") return priceA - priceB;
        if (sortType === "highToLow") return priceB - priceA;
        return 0;
      });
      setSortedProducts(sorted);
    }
  }, [sortType, products]);

  const handleSort = (value) => {
    setSortType(value);
  };

  if (loading) return <p className="text-center text-teal-600">Loading...</p>;
  if (error)
    return <p className="text-center text-coral-500">Error: {error}</p>;

  return (
    <div className="bg-gradient-to-b from-teal-50 to-gray-50 min-h-screen">
      <div className="max-w-10xl mx-auto">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-teal-800">Our Products</h2>

            <Menu as="div" className="relative">
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-teal-800 hover:text-teal-900 bg-teal-100 px-4 py-2 rounded-lg">
                Sort
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1 size-5 shrink-0 text-teal-800 group-hover:text-teal-900"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-teal-100 focus:outline-none"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => handleSort(option.value)}
                          className={`block w-full px-4 py-2 text-sm ${
                            active
                              ? "bg-teal-50 text-teal-900"
                              : "text-teal-800"
                          }`}
                        >
                          {option.name}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {sortedProducts.map((product, index) => (
              <div
                key={product._id || product.id || `product-${index}`}
                className="group relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <Link to={`/products/${product._id || product.id}`}>
                  <div className="aspect-square w-full rounded-lg bg-gray-100 overflow-hidden">
                    <img
                      alt={product.imageAlt || "Product Image"}
                      src={product.imageSrc || "/fallback-image.jpg"}
                      className="w-full h-full object-cover group-hover:opacity-90"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-teal-700">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-800 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="mt-2 text-lg font-bold text-coral-500">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
