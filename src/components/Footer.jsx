import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Footer.css'

export default function Footer() {
  const { lang } = useApp()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Sport<span>Zone</span></div>
            <p className="footer-tagline">
              {lang === 'ar' ? 'متجرك الرياضي الأول في مصر' : 'Egypt\'s #1 Sports Store'}
            </p>
            <div className="footer-socials">
              {['📘','📷','🐦','📱'].map((icon, i) => (
                <button key={i} className="social-btn">{icon}</button>
              ))}
            </div>
          </div>
          <div>
            <h4>{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul>
              {[
                { to: '/',         ar: 'الرئيسية',   en: 'Home' },
                { to: '/products', ar: 'المنتجات',   en: 'Products' },
                { to: '/blog',     ar: 'المدونة',     en: 'Blog' },
                { to: '/about',    ar: 'عن المتجر',  en: 'About' },
              ].map(l => (
                <li key={l.to}><Link to={l.to}>{lang === 'ar' ? l.ar : l.en}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{lang === 'ar' ? 'خدمة العملاء' : 'Customer Service'}</h4>
            <ul>
              {[
                { to: '/contact', ar: 'تواصل معنا',   en: 'Contact Us' },
                { to: '/cart',    ar: 'سلة التسوق',  en: 'Cart' },
              ].map(l => (
                <li key={l.to}><Link to={l.to}>{lang === 'ar' ? l.ar : l.en}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h4>
            <div className="footer-contact">
              <span>📍 {lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
              <span>📞 +20 100 000 0000</span>
              <span>✉️ info@sportzone.com</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 SportZone. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
          <div className="payment-icons">💳 🅿 💵</div>
        </div>
      </div>
    </footer>
  )
}
