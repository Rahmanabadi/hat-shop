import React from "react";
import NavbarItems from "../Navbar/NavbarItems";
function Header({ isLoggedIn, onLogout }) {
  return (
    <div className="flex justify-between items-center h-14 bg-white">
      <NavbarItems isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div></div>
    </div>
  );
}

export default Header;
