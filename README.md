# 🏆 SportZone — E-Commerce React App

A full-featured sports e-commerce website built with React + localStorage.

## ✅ Features
- 🌙 Dark / Light Mode toggle
- 🌍 Arabic / English bilingual (full RTL support)
- 🛒 Shopping Cart (localStorage)
- ⭐ Product Reviews & Star Ratings
- 💳 Checkout with 3 payment methods (Card, PayPal, COD)
- 💬 Live Chat (Customer Service)
- 📝 Sports Blog
- 📱 Fully Responsive (Mobile, Tablet, Desktop)
- 🔍 Product Search & Filter by Category

## 🗂 Project Structure
```
sportzone/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── ProductCard.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   └── Toast.jsx
│   ├── context/
│   │   └── AppContext.jsx    ← State management (cart, lang, theme)
│   ├── data/
│   │   └── data.js           ← Products & Blog data
│   ├── pages/
│   │   ├── Home.jsx / .css
│   │   ├── Products.jsx / .css
│   │   ├── ProductDetail.jsx / .css
│   │   ├── Cart.jsx / .css
│   │   ├── Checkout.jsx / .css
│   │   ├── Blog.jsx / .css
│   │   ├── About.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   └── Success.jsx / .css
│   ├── App.jsx               ← Router setup
│   ├── main.jsx              ← Entry point
│   └── index.css             ← Global styles
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 How to Run
```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

## 🏗 Build for Production
```bash
npm run build
```

## 🌐 Technologies
- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Vite** — Build tool
- **localStorage** — Data persistence (cart, comments)
- **CSS Variables** — Theming (dark/light mode)

## 📄 Pages
| Route | Page |
|---|---|
| `/` | Home |
| `/products` | All Products |
| `/product/:id` | Product Detail |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/blog` | Sports Blog |
| `/about` | About Us |
| `/contact` | Contact & Live Chat |
| `/success` | Order Confirmation |

## 🎓 Final Project — SportZone
Built by: [Your Name]
School: WE School for Applied Technology
Year: 2025-2026
# sportzone
