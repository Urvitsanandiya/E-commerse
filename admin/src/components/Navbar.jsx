import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-2xl font-bold text-teal-100">
          Admin Panel
        </Link>

        {/* Dropdown Menu for Navigation */}
        <Menu as="div" className="relative">
          <MenuButton className="inline-flex justify-center items-center bg-teal-700 px-4 py-2 rounded-lg hover:bg-teal-600 transition">
            Menu
            <ChevronDownIcon className="w-5 h-5 ml-2" />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-teal-700 rounded-lg shadow-lg focus:outline-none">
            <div className="p-1">
              <MenuItem>
                {({ active }) => (
                  <Link
                    to="/productslist"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-teal-600 text-white" : "text-teal-100"
                    } rounded-lg`}
                  >
                    Products List
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <Link
                    to="/addproducts"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-teal-600 text-white" : "text-teal-100"
                    } rounded-lg`}
                  >
                    Add Product
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <Link
                    to="/userslist"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-teal-600 text-white" : "text-teal-100"
                    } rounded-lg`}
                  >
                    User List
                  </Link>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </nav>
  );
}
