import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Success.css'

export default function Success() {
  const { lang, t } = useApp()
  const navigate = useNavigate()
  const orderId = `SZ${Date.now().toString().slice(-6)}`

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="success-page">
          <div className="success-animation">🎉</div>
          <h1 className="success-title">{t('success_title')}</h1>
          <p className="success-msg">{t('success_msg')}</p>

          <div className="order-details">
            <div className="order-detail-row">
              <span>{t('order_id')}</span>
              <span className="order-id-val">#{orderId}</span>
            </div>
            <div className="order-detail-row">
              <span>{lang === 'ar' ? 'الحالة' : 'Status'}</span>
              <span className="badge badge-success">{lang === 'ar' ? '✓ تم التأكيد' : '✓ Confirmed'}</span>
            </div>
            <div className="order-detail-row">
              <span>{lang === 'ar' ? 'التوصيل' : 'Delivery'}</span>
              <span>{t('est_delivery')}</span>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              🏠 {t('go_home')}
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/products')}>
              🛍 {lang === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
