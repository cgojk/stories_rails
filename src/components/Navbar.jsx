import React, { useState}from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6"

export default function Navbar() {
  const[menuOpen,setMenuOpen]=useState(false);
  // close the menu when clicking outside



  function handleLinkClick(){
    setMenuOpen(false);
  }
  

  return(
    <header className="header">
      
      <Link to="/">
        <img src="./images/logo4.png" className="nav-logo" alt="APP logo" />
     </Link>

     {/* hamburguer button only visible on mobile */}
     

     <button
      className="menu-btn"
      aria-label="toggle menu"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <FaXmark  /> : <FaBars  />}
    </button>


 {/* Nav list, toggled open on mobile */}
      <nav>
        <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
<li className="nav-list-item">
      <NavLink 
        to="/" 
        onClick={handleLinkClick}
        className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
      >
        Home
      </NavLink>
    </li>
    <li className="nav-list-item">
      <NavLink 
        to="/about" 
        onClick={handleLinkClick}
        className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
        // if the link is active then add the class active 
      >
        About
      </NavLink>
    </li>
    <li className="nav-list-item">
      <NavLink 
        to="/podcasts" 
        onClick={handleLinkClick}
        className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
      >
        Podcasts Community
      </NavLink>
    </li>
    <li className="nav-list-item">
      <NavLink 
        to="/historical" 
        onClick={handleLinkClick}
        className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
      >
        Historical events
      </NavLink>
    </li>
    <li className="nav-list-item">
      <NavLink 
        to="/press" 
        onClick={handleLinkClick}
        className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
      >
        Events & Gallery
      </NavLink>
    </li>
    <li className="nav-list-item">
      <NavLink 
        to="/contact" 
        onClick={handleLinkClick}
        className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
      >
        Contact Us
      </NavLink>
    </li>

          
        </ul>
      </nav>
    </header>
  );
}
  

