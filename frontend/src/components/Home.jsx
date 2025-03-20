import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productsSlice';

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Price: Low to High", value: "lowToHigh" },
  { name: "Price: High to Low", value: "highToLow" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState(""); // Added state for sorting type

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white shadow-[0_-4px_3px_rgba(0,0,0,0.1)]">
      <div className="max-w-10xl mx-auto">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>

          <Menu as="div" className="relative ml-auto flex justify-end">
            <div>
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option.value}>
                    {({ active }) => (
                      <button
                        onClick={() => handleSort(option.value)}
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {sortedProducts.map((product, index) => (
              <div
                key={product._id || product.id || `product-${index}`}
                className="group relative p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <Link to={`/products/${product._id || product.id}`}>
                  <img
                    alt={product.imageAlt || "Product Image"}
                    src={product.imageSrc || "/fallback-image.jpg"}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 truncate sm:line-clamp-2 md:line-clamp-3">
                      {product.description}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {product.price}
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