import React from 'react';
import { NavLink } from 'react-router-dom';
import { urlConsts } from "../../consts"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-bold border-b-2 border-yellow-500'
                : 'text-gray-300 hover:text-white'
            }
          >
            Dashboard
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
          >
            Add Product
          </NavLink>
        </li>
        <li>
          <a className='text-gray-300 hover:text-white' href={urlConsts.MAIN}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
