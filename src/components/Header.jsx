import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon"></div>
        </Link>

        <nav className="nav-links">
          <Link to="/" className={`nav-item ${isActive('/')}`}>
            <span>Descobrir</span>
            {location.pathname === '/' && <div className="active-bg"></div>}
          </Link>
          <Link to="/browse" className={`nav-item ${isActive('/browse')}`}>
            <span>Navegar</span>
            {location.pathname === '/browse' && <div className="active-bg"></div>}
          </Link>
          <Link to="/blog" className={`nav-item ${isActive('/blog')}`}>
            <span>Blog</span>
          </Link>
          <Link to="/about" className={`nav-item ${isActive('/about')}`}>
            <span>Sobre</span>
          </Link>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} color="var(--text-secondary)" />
          </button>
          <button className="icon-btn menu-btn" aria-label="Menu">
            <div className="menu-lines">
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
