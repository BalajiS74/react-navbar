import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logo } from "../assets/Gallery";
function Navbar() {
  const navigater = useNavigate();
  return (
    <div className="container-fluid  position-absolute navbar-container">
      <div className="row  p-2 ">
        <div className="col-4 d-flex align-items-center justify-content-center">
          <h2 className="text-white">React Router</h2>
          <img
            src={logo}
            alt="logo"
            className="mb-1"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div className="col-4 d-flex align-items-center justify-content-center ">
          <ul className="d-flex gap-5 m-0 bg-white shadow px-5 py-2 navlinks ">
            <NavLink to="/" className="text-decoration-none ">
              <li>Home</li>
            </NavLink>
            <NavLink to="/about" className="text-decoration-none ">
              <li>About</li>
            </NavLink>
            <NavLink to="/blogs" className="text-decoration-none">
              <li>Blogs</li>
            </NavLink>
            <NavLink to="/contact" className="text-decoration-none ">
              <li>Contact</li>
            </NavLink>
          </ul>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-center ">
          <button
            className="btn btn-light px-5"
            onClick={() => navigater("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
