import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "@mui/material";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import StyleIcon from "@mui/icons-material/Style";
import "assets/css/Header.css";

const Header: React.FC = () => {
  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    setMenu(true);
  };

  const handleClose = () => {
    setMenu(false);
  };

  return (
    <Container className="header flex items-center justify-between">
      <NavLink to="/" className="flex items-center">
        <img src="logo.png" alt="logo" width={80} />
        Iceberg
      </NavLink>
      <div className="nav-items">
        <NavLink to="/" className="flex items-center">
          <HomeIcon />
          Home
        </NavLink>
        <NavLink to="/base" className="flex items-center">
          <StyleIcon />
          Base
        </NavLink>
        <NavLink to="/custom" className="flex items-center">
          <PersonIcon />
          Custom
        </NavLink>
      </div>
      <button className="collapse" onClick={handleClick}>
        <svg
          width="25"
          height="21"
          viewBox="0 0 25 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.1074 1.57141H0.893066M24.1074 10.5H0.893066M24.1074 19.4286H0.893066"
            stroke="#DDDBD5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Menu id="basic-menu" open={menu} onClose={handleClose}>
        <div className="basic-menu">
          <NavLink to="/" className="flex items-center">
            <HomeIcon />
            Home
          </NavLink>
          <NavLink to="/base" className="flex items-center">
            <StyleIcon />
            Base
          </NavLink>
          <NavLink to="/custom" className="flex items-center">
            <PersonIcon />
            Custom
          </NavLink>
        </div>
      </Menu>
    </Container>
  );
};

export default Header;
