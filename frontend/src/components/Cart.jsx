import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./cartSlice";
import { useState } from "react";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Example authentication state (replace this with actual auth check)
  const isSignedIn = localStorage.getItem("token") !== null;

  const subtotal = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  return (
    <div className="my-[100px] p-6 md:p-12 max-w-4xl mx-auto bg-gradient-to-r from-teal-50 to-gray-50 rounded-lg shadow-lg">
      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <h2 className="text-lg md:text-xl font-medium">Your cart is empty.</h2>
          <Link
            to="/"
            className="text-teal-600 hover:text-teal-500 text-sm md:text-base mt-4 inline-block"
          >
            Continue Shopping &rarr;
          </Link>
        </div>
      ) : (
        <>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-teal-200">
              {cart.map((product) => (
                <li key={product.id} className="flex items-center py-6 gap-4">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-20 w-20 md:h-24 md:w-24 rounded-md border border-teal-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-medium text-teal-800">
                      {product.name}
                    </h3>
                    <p className="text-sm md:text-base text-teal-700">
                      ${product.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleDecrement(product.id)}
                        className="px-3 py-1 bg-teal-100 rounded-md hover:bg-teal-200 text-lg text-teal-800"
                      >
                        -
                      </button>
                      <span className="text-base md:text-lg text-teal-800">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(incrementQuantity(product.id))}
                        className="px-3 py-1 bg-teal-100 rounded-md hover:bg-teal-200 text-lg text-teal-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-teal-200 px-4 py-6 text-center">
            <p className="text-lg md:text-xl font-medium text-teal-800">
              Subtotal: ${subtotal}
            </p>
          </div>

          <div className="flex justify-center">
            {isSignedIn ? (
              <Link
                to="/checkout"
                className="w-full max-w-xs rounded-md bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 text-center"
              >
                Checkout
              </Link>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full max-w-xs rounded-md bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 text-center"
              >
                Sign in to Checkout
              </button>
            )}
          </div>

          <div className="mt-6 flex justify-center text-center text-sm md:text-base text-gray-500">
            <Link to="/">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer font-medium text-teal-600 hover:text-teal-500"
              >
                Continue Shopping <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}