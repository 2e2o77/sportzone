import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { lang, addToCart, t, fmt } = useApp()
  const navigate = useNavigate()

  const name = lang === 'ar' ? product.name_ar : product.name_en
  const cat  = lang === 'ar' ? product.cat_ar  : product.cat_en

  return (
    <div className="product-card card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-img">
        {product.image ? (
          <img
            src={product.image}
            alt={name}
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <span className="product-emoji">{product.emoji}</span>
        )}
        {!product.stock && (
          <span className="out-badge badge badge-warning">{t('out_stock')}</span>
        )}
      </div>
      <div className="product-info">
        <div className="product-cat">{cat}</div>
        <div className="product-name">{name}</div>
        <div className="product-bottom">
          <span className="product-price">{fmt(product.price)}</span>
          {product.stock ? (
            <button
              className="add-btn"
              onClick={e => { e.stopPropagation(); addToCart(product) }}
              title={t('add_cart')}
            >+</button>
          ) : (
            <span className="no-stock">—</span>
          )}
        </div>
      </div>
    </div>
  )
}