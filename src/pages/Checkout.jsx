import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Checkout.css'

export default function Checkout() {
  const { lang, cart, products, clearCart, addOrder, t, fmt } = useApp()
  const navigate = useNavigate()
  const [payMethod, setPayMethod] = useState('cod')
  const [form, setForm] = useState({ first:'', last:'', email:'', phone:'', address:'', city:'', country:'Egypt' })

  const cartItems = cart.map(i => ({ ...i, product: products.find(p => p.id === i.id) })).filter(i => i.product)
  const subtotal  = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0)

  if (cart.length === 0) { navigate('/cart'); return null }

  const handleOrder = async () => {
    await addOrder({
      customer: `${form.first} ${form.last}`.trim() || 'Customer',
      email: form.email,
      phone: form.phone,
      address: `${form.address}, ${form.city}, ${form.country}`,
      total: subtotal,
      payMethod,
      items: cartItems.map(i => ({ name: i.product.name_en, qty: i.qty, price: i.product.price }))
    })
    clearCart()
    navigate('/success')
  }

  const payMethods = [
    { id:'card',   icon:'💳', label:t('pay_card'),   sub:'Visa, Mastercard, Meeza' },
    { id:'paypal', icon:'🅿',  label:t('pay_paypal'), sub:'PayPal / Fawry / Vodafone Cash' },
    { id:'cod',    icon:'💵',  label:t('pay_cod'),    sub:t('pay_when_delivered') },
  ]

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">{t('checkout_title')}</h1>
        <div className="checkout-layout">
          <div className="checkout-forms">
            <div className="checkout-section card">
              <h3 className="checkout-section-title"><span className="step-num">1</span> {t('personal_info')}</h3>
              <div className="form-row">
                <div className="form-group"><label>{t('first')}</label><input value={form.first} onChange={e=>setForm(f=>({...f,first:e.target.value}))} placeholder={t('first')} /></div>
                <div className="form-group"><label>{t('last')}</label><input value={form.last} onChange={e=>setForm(f=>({...f,last:e.target.value}))} placeholder={t('last')} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>{t('email')}</label><input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="example@email.com" /></div>
                <div className="form-group"><label>{t('phone')}</label><input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+20 1xx xxx xxxx" /></div>
              </div>
              <div className="form-group"><label>{t('address')}</label><input value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} placeholder={lang==='ar'?'رقم الشارع، الحي':'Street number, district'} /></div>
              <div className="form-row">
                <div className="form-group"><label>{t('city')}</label><input value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} placeholder={lang==='ar'?'القاهرة':'Cairo'} /></div>
                <div className="form-group"><label>{t('country')}</label>
                  <select value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))}>
                    <option>{lang==='ar'?'مصر':'Egypt'}</option>
                    <option>Saudi Arabia</option><option>UAE</option><option>Kuwait</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="checkout-section card">
              <h3 className="checkout-section-title"><span className="step-num">2</span> {t('payment')}</h3>
              <div className="payment-methods">
                {payMethods.map(m => (
                  <div key={m.id} className={`pay-method ${payMethod===m.id?'selected':''}`} onClick={() => setPayMethod(m.id)}>
                    <div className="pay-radio"><div className={`radio-dot ${payMethod===m.id?'active':''}`} /></div>
                    <span className="pay-icon">{m.icon}</span>
                    <div className="pay-info"><div className="pay-label">{m.label}</div><div className="pay-sub">{m.sub}</div></div>
                    {payMethod===m.id && <span className="pay-check">✓</span>}
                  </div>
                ))}
              </div>
              {payMethod==='card' && (
                <div className="card-fields">
                  <div className="form-group"><label>{t('card_num')}</label><input placeholder="1234  5678  9012  3456" /></div>
                  <div className="form-row">
                    <div className="form-group"><label>{t('expiry')}</label><input placeholder="MM / YY" /></div>
                    <div className="form-group"><label>{t('cvv')}</label><input placeholder="•••" type="password" /></div>
                  </div>
                </div>
              )}
              <button className="btn btn-primary place-order-btn" onClick={handleOrder}>
                ✓ {t('place_order')} — {fmt(subtotal)}
              </button>
            </div>
          </div>

          <div className="order-summary card">
            <h3>{t('order_summary')}</h3>
            <div className="order-items">
              {cartItems.map(({ product, qty }) => {
                const name = lang==='ar' ? product.name_ar : product.name_en
                return (
                  <div key={product.id} className="order-item">
                    <span className="order-item-emoji">{product.emoji}</span>
                    <span className="order-item-name">{name}</span>
                    <span className="order-item-qty">×{qty}</span>
                    <span className="order-item-price">{fmt(product.price*qty)}</span>
                  </div>
                )
              })}
            </div>
            <div className="order-divider" />
            <div className="order-row"><span>{t('shipping')}</span><span style={{color:'var(--success)',fontWeight:700}}>{t('free')}</span></div>
            <div className="order-divider" />
            <div className="order-row order-total"><span>{t('total')}</span><span>{fmt(subtotal)}</span></div>
            <div className="order-secure">🔒 {lang==='ar'?'جميع المدفوعات آمنة':'All payments are secure & encrypted'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
