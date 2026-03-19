import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function NotFound() {
  const { lang } = useApp()
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', padding: 20
    }}>
      <div>
        <div style={{ fontSize: 100, marginBottom: 16 }}>🏚️</div>
        <h1 style={{ fontSize: 80, fontWeight: 900, color: 'var(--primary)', margin: 0 }}>404</h1>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: '12px 0 8px' }}>
          {lang === 'ar' ? 'الصفحة مش موجودة!' : 'Page Not Found!'}
        </h2>
        <p style={{ color: 'var(--text2)', marginBottom: 28, fontSize: 15 }}>
          {lang === 'ar'
            ? 'الصفحة اللي بتدور عليها مش موجودة أو اتنقلت'
            : "The page you're looking for doesn't exist or has been moved"}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            🏠 {lang === 'ar' ? 'الرئيسية' : 'Go Home'}
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/products')}>
            🏀 {lang === 'ar' ? 'المنتجات' : 'Browse Products'}
          </button>
        </div>
      </div>
    </div>
  )
}
