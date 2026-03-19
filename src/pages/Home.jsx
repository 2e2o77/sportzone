import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { ProductSkeletonGrid } from '../components/Skeleton'
import './Home.css'

export default function Home() {
  const { t, lang, products, dbLoading } = useApp()
  const navigate = useNavigate()

  const featured   = products.filter(p => p.stock).slice(0, 4)
  const newArrivals = products.slice(4, 8)

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <span className="hero-tag">
                {lang === 'ar' ? '🏆 الأفضل في مصر' : "🏆 Egypt's #1 Sports Store"}
              </span>
              <h1>
                {lang === 'ar'
                  ? <><span className="hero-highlight">متجرك</span> الرياضي الأول</>
                  : <>Your <span className="hero-highlight">Ultimate</span> Sports Store</>}
              </h1>
              <p>{t('hero_sub')}</p>
              <div className="hero-btns">
                <button className="btn btn-primary" onClick={() => navigate('/products')}>{t('shop_now')} →</button>
                <button className="btn btn-outline hero-outline" onClick={() => navigate('/blog')}>
                  {lang === 'ar' ? 'مدونتنا' : 'Our Blog'}
                </button>
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><strong>500+</strong><span>{lang === 'ar' ? 'منتج' : 'Products'}</span></div>
                <div className="hero-stat"><strong>50K+</strong><span>{lang === 'ar' ? 'عميل' : 'Customers'}</span></div>
                <div className="hero-stat"><strong>4.9★</strong><span>{lang === 'ar' ? 'تقييم' : 'Rating'}</span></div>
                <div className="hero-stat"><strong>24/7</strong><span>{lang === 'ar' ? 'دعم' : 'Support'}</span></div>
              </div>
            </div>
            <div className="hero-visual">🏆</div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="cats-section">
        <div className="container">
          <div className="cats-grid">
            {[
              { emoji:'⚽', en:'Football',  ar:'كرة القدم', bg:'#1e3a5f' },
              { emoji:'🏋️', en:'Fitness',   ar:'لياقة',     bg:'#1e3a2f' },
              { emoji:'👟', en:'Footwear',  ar:'أحذية',     bg:'#3a1e1e' },
              { emoji:'🎽', en:'Clothing',  ar:'ملابس',     bg:'#2d1e3a' },
            ].map(cat => (
              <div key={cat.en} className="cat-card" style={{ background: cat.bg }} onClick={() => navigate('/products')}>
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-name">{lang === 'ar' ? cat.ar : cat.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">{t('featured')}</h2>
          <button className="btn btn-ghost" onClick={() => navigate('/products')}>{t('view_all')} →</button>
        </div>
        {dbLoading ? (
          <ProductSkeletonGrid count={4} />
        ) : (
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* PROMO */}
      <section className="promo-banner container">
        <div className="promo-inner">
          <div>
            <h3>{lang === 'ar' ? '🚚 شحن مجاني على جميع الطلبات' : '🚚 Free Shipping on All Orders'}</h3>
            <p>{lang === 'ar' ? 'لجميع أنحاء مصر — التوصيل في 2-4 أيام عمل' : 'Across Egypt — Delivery in 2-4 business days'}</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>{t('shop_now')}</button>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">{t('new_arrivals')}</h2>
        </div>
        {dbLoading ? null : (
          <div className="products-grid">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  )
}
