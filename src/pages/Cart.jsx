import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PRODUCTS } from '../data/data'
import './Cart.css'

export default function Cart() {
  const { lang, cart, removeFromCart, changeQty, t, fmt } = useApp()
  const navigate = useNavigate()

  const cartItems = cart.map(i => ({ ...i, product: PRODUCTS.find(p => p.id === i.id) })).filter(i => i.product)
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0)

  if (cart.length === 0) return (
    <div className="page-wrapper">
      <div className="container">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>{t('cart_empty')}</h2>
          <p>{lang === 'ar' ? 'أضف بعض المنتجات أولاً' : 'Add some products first'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            {t('start_shopping')}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">{t('cart_title')}</h1>
        <p className="page-sub">{cartItems.length} {lang === 'ar' ? 'منتج في السلة' : 'items in your cart'}</p>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cartItems.map(({ product, qty }) => {
              const name = lang === 'ar' ? product.name_ar : product.name_en
              return (
                <div key={product.id} className="cart-item card">
                  <div
                    className="cart-item-img"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.emoji}
                  </div>
                  <div className="cart-item-body">
                    <div
                      className="cart-item-name"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {name}
                    </div>
                    <div className="cart-item-price">{fmt(product.price)}</div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => changeQty(product.id, -1)}>−</button>
                      <span className="qty-num">{qty}</span>
                      <button className="qty-btn" onClick={() => changeQty(product.id, 1)}>+</button>
                    </div>
                    <div className="cart-item-total">{fmt(product.price * qty)}</div>
                    <button className="remove-btn" onClick={() => removeFromCart(product.id)}>🗑</button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          <div className="cart-summary card">
            <h3>{lang === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h3>
            <div className="summary-row">
              <span>{t('subtotal')}</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>{t('shipping')}</span>
              <span className="free-text">{t('free')} 🚚</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>{t('total')}</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <button
              className="btn btn-primary checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              {t('checkout_btn')} →
            </button>
            <button
              className="btn btn-ghost continue-btn"
              onClick={() => navigate('/products')}
            >
              {lang === 'ar' ? '← متابعة التسوق' : '← Continue Shopping'}
            </button>
            <div className="secure-note">
              🔒 {lang === 'ar' ? 'دفع آمن ومشفر' : 'Secure & encrypted checkout'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
