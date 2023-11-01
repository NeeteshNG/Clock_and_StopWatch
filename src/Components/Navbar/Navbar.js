import React from "react";
import { Outlet } from "react-router-dom";
import "../Navbar/Navbar.css"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="body-navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-buttons">
            <i class="fa-solid fa-clock"></i>
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-buttons">
            Time
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Navbar;
