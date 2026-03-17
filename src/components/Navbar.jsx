import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Navbar.css'

export default function Navbar() {
  const { lang, theme, cartCount, toggleTheme, toggleLang, t } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/',          key: 'home' },
    { to: '/products',  key: 'products' },
    { to: '/blog',      key: 'blog' },
    { to: '/about',     key: 'about' },
    { to: '/contact',   key: 'contact' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            Sport<span>Zone</span>
          </Link>

          <div className="nav-links">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="lang-btn" onClick={toggleLang}>
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <Link to="/cart" className="icon-btn cart-btn">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link to="/cart" className="mobile-link cart-mobile" onClick={() => setMenuOpen(false)}>
            🛒 {t('cart_title')} {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      )}
    </>
  )
}
