import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Link to="/">Book Tracker - Ribka</Link>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : '')}>
              Statistik
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;