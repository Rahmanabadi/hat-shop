import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavbarItems = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const handleLogoutClick = () => {
    onLogout(); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 z-50  w-full flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link to={`/`}>
          <img
            src={`https://i.pinimg.com/236x/54/e0/50/54e0508c75792e4c6a5476240b9e560b.jpg`}
            width={60}
            className="rounded-full"
            alt="logoImg"
          />
        </Link>
        <div className="ml-4 md:hidden">
          {isLoggedIn ? (
            <div>
              <button
              className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
            <Link
            to={`userdetail`}
            className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out ml-4"
          >
            cart
          </Link>
              </div>
          ) : (
            <button
              className="px-2 py-1 border rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out"
              onClick={handleLoginClick}
            >
              Login/Signup
            </button>
          )}
        </div>
      </div>

      <button
        className="md:hidden text-gray-500 focus:outline-none"
        onClick={toggleMobileMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <ul className=" w-2/3 hidden md:flex justify-around items-center gap-4">
        <div className="flex gap-4">
        
        <li>
          <Link
            to={`men-hats`}
            className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
          >
            men
          </Link>
        </li>
        <li>
          <Link
            to={`women-hats`}
            className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
          >
            women
          </Link>
        </li>
        <li>
          <Link
            to={`children-hats`}
            className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
          >
            kids
          </Link>
        </li>
        </div>
        {isLoggedIn ? (
          <li>
            <button
              className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
            <Link
            to={`userdetail`}
            className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out ml-4"
          >
            cart
          </Link>
          </li>
        ) : (
          <li>
            <button
              className="px-2 py-1 border rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out"
              onClick={handleLoginClick}
            >
              Login/Signup
            </button>
          </li>
        )}
      </ul>

      
      {isMobileMenuOpen && (
        <ul className="absolute top-14 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-4 md:hidden z-50 transition-all duration-300 ease-in-out">
          <li>
            <Link
              to={`shop`}
              className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
              onClick={toggleMobileMenu}
            >
              shop
            </Link>
          </li>
          <li>
            <Link
              to={`men-hats`}
              className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
              onClick={toggleMobileMenu}
            >
              men
            </Link>
          </li>
          <li>
            <Link
              to={`women-hats`}
              className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
              onClick={toggleMobileMenu}
            >
              women
            </Link>
          </li>
          <li>
            <Link
              to={`children-hats`}
              className="text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out"
              onClick={toggleMobileMenu}
            >
              kids
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavbarItems;
