import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBottom.css";
import { HeartIcon } from "../../Icons/Icons";
import { HouseIcon } from "../../Icons/Icons";
import { ListIcon } from "../../Icons/Icons";
import { MoonIcon } from "../../Icons/Icons";

const NavBottom = ({ disableNav }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    if (!disableNav) {
      setActiveLink(path);
    }
  };

  return (
    <nav className={`nav-bottom ${disableNav ? "disabled" : ""}`}>
      <div className="spa-bet">
        <Link to="/" onClick={() => handleClick("/")}>
          <div
            aria-disabled={disableNav}
            className={`icon-wrapper ${activeLink === "/" ? "active" : ""}`}
          >
            <HouseIcon />
          </div>
        </Link>
        <Link to="/list" onClick={() => handleClick("/list")}>
          <div
            aria-disabled={disableNav}
            className={`icon-wrapper ${activeLink === "/list" ? "active" : ""}`}
          >
            <ListIcon />
          </div>
        </Link>
        <Link to="/favourites" onClick={() => handleClick("/favourites")}>
          <div
            aria-disabled={disableNav}
            className={`icon-wrapper ${
              activeLink === "/favourites" ? "active" : ""
            }`}
          >
            <HeartIcon />
          </div>
        </Link>
        <Link to="/generate" onClick={() => handleClick("/generate")}>
          <div
            aria-disabled={disableNav}
            className={`icon-wrapper ${
              activeLink === "/generate" ? "active" : ""
            }`}
          >
            <MoonIcon />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBottom;
