import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none"
      >
        {isOpen ? ' ' : 'Menu'}
      </button>

      {/* Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col space-y-4 p-4">
          
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-bold border-b-2 border-yellow-500'
                  : 'text-gray-300 hover:text-white'
              }
              onClick={() => setIsOpen(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-product"
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-bold border-b-2 border-yellow-500'
                  : 'text-gray-300 hover:text-white'
              }
              onClick={() => setIsOpen(false)}
            >
              Add Product
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
