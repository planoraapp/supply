import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Compass, LayoutGrid, Info } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef(null);
  const itemsRef = useRef({});

  const navItems = [
    { path: '/', label: 'Descobrir', icon: Compass },
    { path: '/browse', label: 'Navegar', icon: LayoutGrid },
    { path: '/about', label: 'Sobre', icon: Info }
  ];

  useEffect(() => {
    const activePath = location.pathname;
    const activeElement = itemsRef.current[activePath];

    if (activeElement && navRef.current) {
      const { offsetLeft, offsetWidth } = activeElement;
      setPillStyle({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1
      });
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/acervo.png" alt="Acervo Logo" className="logo-img" />
        </Link>

        <nav className="nav-links" ref={navRef}>
          <div
            className="nav-active-pill"
            style={{
              transform: `translateX(${pillStyle.left}px)`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity
            }}
          ></div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                ref={el => itemsRef.current[item.path] = el}
                className={`nav-item ${isActive(item.path)}`}
              >
                <Icon size={18} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} color="var(--text-secondary)" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
