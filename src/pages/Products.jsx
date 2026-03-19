import { useState } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { ProductSkeletonGrid } from '../components/Skeleton'
import './Products.css'

export default function Products() {
  const { lang, t, products, dbLoading } = useApp()
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const allCats = [...new Set(products.map(p => lang === 'ar' ? p.cat_ar : p.cat_en))].filter(Boolean)
  const allLabel = lang === 'ar' ? 'الكل' : 'All'

  const filtered = products.filter(p => {
    const cat  = lang === 'ar' ? p.cat_ar : p.cat_en
    const name = lang === 'ar' ? p.name_ar : p.name_en
    const matchCat    = active === 'All' || active === 'الكل' || cat === active
    const matchSearch = (name || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  if (dbLoading) return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">{t('products')}</h1>
        <ProductSkeletonGrid count={8} />
      </div>
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">{t('products')}</h1>
        <p className="page-sub">{lang === 'ar' ? `${products.length} منتج متوفر` : `${products.length} products available`}</p>

        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder={lang === 'ar' ? 'ابحث عن منتج...' : 'Search products...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="clear-search" onClick={() => setSearch('')}>✕</button>}
        </div>

        <div className="filter-bar">
          <button className={`filter-btn ${active === 'All' || active === 'الكل' ? 'active' : ''}`} onClick={() => setActive('All')}>
            {allLabel}
          </button>
          {allCats.map(cat => (
            <button key={cat} className={`filter-btn ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="no-results">
            <div style={{ fontSize:56, marginBottom:12 }}>🔍</div>
            <h3>{lang === 'ar' ? 'لا توجد نتائج' : 'No results found'}</h3>
            <p>{lang === 'ar' ? 'جرب كلمة بحث مختلفة' : 'Try a different search term'}</p>
          </div>
        ) : (
          <>
            <p className="results-count">{lang === 'ar' ? `${filtered.length} نتيجة` : `${filtered.length} results`}</p>
            <div className="products-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
