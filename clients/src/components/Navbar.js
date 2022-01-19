import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Navbar = () => {
  const cookies = new Cookies();

  return (
    <>
      <nav
        className="navbar navbar-expand-md  navbar-dark sticky-top"
        style={{ backgroundColor: "#1abc9c" }}
      >
        <Link className="navbar-brand" to="/">
          BANKING SYSTEM
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navb"
          aria-expanded="true"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navb" className="navbar-collapse collapse hide">
          <ul className="navbar-nav ml-auto ">
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/transaction">
                Transaction
              </Link>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">
            <div>
              {cookies.get("isLogin") ? (
                ""
              ) : (
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/register">
                    <span className="fas fa-user "></span> Sign Up
                  </Link>
                </li>
              )}
            </div>

            {/* login logout toggle */}
            {cookies.get("isLogin") ? (
              <li className="nav-item">
                <Link className="nav-link text-danger" to="/signout">
                  <span className="fas fa-sign-in-alt "></span> Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/signin">
                  <span className="fas fa-sign-in-alt "></span> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
