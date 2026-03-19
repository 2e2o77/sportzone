import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const { lang, t, fmt, addToCart, comments, addComment, products, dbLoading } = useApp()
  const navigate = useNavigate()
  const [qty, setQty]             = useState(1)
  const [selRating, setSelRating] = useState(5)
  const [reviewName, setReviewName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [hoverStar, setHoverStar]   = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [imgError, setImgError]     = useState(false)

  if (dbLoading) return (
    <div className="page-wrapper container" style={{ textAlign:'center', paddingTop:80 }}>
      <div style={{ fontSize:48, marginBottom:12 }}>⏳</div>
      <p style={{ color:'var(--text3)' }}>{t('loading')}</p>
    </div>
  )

  const product = products.find(p => p.id === id)
  if (!product) return (
    <div className="page-wrapper container" style={{ textAlign:'center', padding:'80px 0' }}>
      <div style={{ fontSize:64 }}>😕</div>
      <h2>{lang === 'ar' ? 'المنتج غير موجود' : 'Product not found'}</h2>
      <button className="btn btn-primary" style={{ marginTop:20 }} onClick={() => navigate('/products')}>
        {lang === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
      </button>
    </div>
  )

  const name = lang === 'ar' ? product.name_ar : product.name_en
  const cat  = lang === 'ar' ? product.cat_ar  : product.cat_en
  const desc = lang === 'ar' ? product.desc_ar : product.desc_en
  const revs = comments[product.id] || []
  const avgRating = revs.length ? Math.round(revs.reduce((s,r) => s + r.rating, 0) / revs.length) : 0

  const handleSubmitReview = async () => {
    if (!reviewName.trim() || !reviewText.trim()) return
    setSubmitting(true)
    await addComment(product.id, { name: reviewName, text: reviewText, rating: selRating, productId: product.id })
    setReviewName(''); setReviewText(''); setSelRating(5)
    setSubmitting(false)
  }

  const related = products.filter(p => p.id !== product.id && p.cat_en === product.cat_en).slice(0, 4)

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => navigate('/')}>{t('home')}</button>
          <span>/</span>
          <button onClick={() => navigate('/products')}>{t('products')}</button>
          <span>/</span>
          <span className="bc-current">{name}</span>
        </div>

        {/* Main Layout */}
        <div className="detail-layout">

          {/* Image */}
          <div className="detail-img-wrap">
            <div className="detail-img">
              {product.image && !imgError ? (
                <img
                  src={product.image}
                  alt={name}
                  style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:14 }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <span style={{ fontSize:120 }}>{product.emoji}</span>
              )}
            </div>
            {!product.stock && <div className="detail-out-overlay">{t('out_stock')}</div>}
          </div>

          {/* Info */}
          <div className="detail-info">
            <span className={`badge ${product.stock ? 'badge-success' : 'badge-warning'}`}>
              {product.stock ? t('in_stock') : t('out_stock')}
            </span>
            <h1 className="detail-title">{name}</h1>
            <div className="detail-rating">
              <div className="stars">{'★'.repeat(avgRating)}{'☆'.repeat(5 - avgRating)}</div>
              <span className="rating-count">({revs.length} {lang === 'ar' ? 'تقييم' : 'reviews'})</span>
            </div>
            <div className="detail-price">{fmt(product.price)}</div>
            {desc && <p className="detail-desc">{desc}</p>}
            <div className="detail-tags">
              <span className="badge badge-gray">{cat}</span>
              <span className="badge badge-gray">🚚 {t('free_ship')}</span>
              <span className="badge badge-gray">↩ {t('easy_return')}</span>
            </div>
            {product.stock && (
              <>
                <div className="qty-row">
                  <span className="qty-label">{t('qty')}:</span>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span className="qty-num">{qty}</span>
                    <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
                  </div>
                </div>
                <button className="btn btn-primary add-to-cart-btn" onClick={() => addToCart(product, qty)}>
                  🛒 {t('add_cart')}
                </button>
              </>
            )}
            <div className="detail-meta">
              <div className="meta-item"><span className="meta-icon">🔒</span><span>{lang === 'ar' ? 'دفع آمن ومشفر' : 'Secure encrypted payment'}</span></div>
              <div className="meta-item"><span className="meta-icon">📦</span><span>{lang === 'ar' ? 'توصيل 2-4 أيام' : '2-4 day delivery'}</span></div>
              <div className="meta-item"><span className="meta-icon">↩</span><span>{lang === 'ar' ? 'إرجاع مجاني 30 يوم' : '30-day free returns'}</span></div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section">
          <h2 className="section-title">{t('reviews')}</h2>
          <div className="review-form card">
            <h3>{t('write_review')}</h3>
            <input
              className="review-input"
              placeholder={t('your_name')}
              value={reviewName}
              onChange={e => setReviewName(e.target.value)}
            />
            <div className="star-selector">
              <span className="star-label">{t('rating')}:</span>
              {[1,2,3,4,5].map(s => (
                <button
                  key={s}
                  className={`star-btn ${s <= (hoverStar || selRating) ? 'filled' : ''}`}
                  onClick={() => setSelRating(s)}
                  onMouseEnter={() => setHoverStar(s)}
                  onMouseLeave={() => setHoverStar(0)}
                >★</button>
              ))}
            </div>
            <textarea
              className="review-textarea"
              placeholder={t('your_review')}
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSubmitReview} disabled={submitting}>
              {submitting ? '⏳...' : t('submit')}
            </button>
          </div>

          {revs.length === 0 ? (
            <p className="no-reviews">{t('no_reviews')}</p>
          ) : (
            <div className="reviews-list">
              {revs.map((r, i) => (
                <div key={i} className="review-item card">
                  <div className="review-header">
                    <div className="reviewer-avatar">{r.name?.[0]?.toUpperCase()}</div>
                    <div>
                      <div className="reviewer-name">{r.name}</div>
                      <div className="stars" style={{ fontSize:13 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                    </div>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <p className="review-text">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="related-section">
            <h2 className="section-title">{lang === 'ar' ? 'منتجات مشابهة' : 'Related Products'}</h2>
            <div className="products-grid">
              {related.map(p => {
                const rname = lang === 'ar' ? p.name_ar : p.name_en
                return (
                  <div
                    key={p.id}
                    className="product-card card"
                    onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0,0) }}
                  >
                    <div className="product-img" style={{ height:140 }}>
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={rname}
                          style={{ width:'100%', height:'100%', objectFit:'cover' }}
                          onError={e => { e.target.style.display='none' }}
                        />
                      ) : (
                        <span style={{ fontSize:56 }}>{p.emoji}</span>
                      )}
                    </div>
                    <div className="product-info">
                      <div className="product-name">{rname}</div>
                      <div className="product-bottom">
                        <span className="product-price">{fmt(p.price)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}