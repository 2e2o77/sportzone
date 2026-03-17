import { useState } from 'react'
import { useApp } from '../context/AppContext'
import './Contact.css'

const BOT_REPLIES = {
  en: [
    "Thank you for reaching out! Our team will get back to you within 24 hours.",
    "Great question! Let me connect you with a specialist right away.",
    "We appreciate your message. A support agent will contact you soon.",
    "Thanks! Is there anything else I can help you with?",
    "We're happy to help! Our working hours are daily 9AM–9PM.",
  ],
  ar: [
    "شكراً لتواصلك معنا! سيرد عليك فريقنا خلال 24 ساعة.",
    "سؤال رائع! سأوصلك بأحد المختصين على الفور.",
    "نقدر رسالتك. سيتواصل معك أحد ممثلي الدعم قريباً.",
    "شكراً! هل هناك شيء آخر يمكنني مساعدتك به؟",
    "يسعدنا مساعدتك! ساعات عملنا يومياً من 9 صباحاً حتى 9 مساءً.",
  ]
}

export default function Contact() {
  const { lang, t, showToast } = useApp()
  const [chatMsgs, setChatMsgs] = useState([
    { role: 'bot', text: lang === 'ar' ? 'مرحباً! 👋 أنا مساعد SportZone. كيف يمكنني مساعدتك اليوم؟' : "Hi! 👋 I'm SportZone's assistant. How can I help you today?" }
  ])
  const [chatInput, setChatInput] = useState('')

  const sendChat = () => {
    const msg = chatInput.trim()
    if (!msg) return
    const newMsgs = [...chatMsgs, { role: 'user', text: msg }]
    setChatMsgs(newMsgs)
    setChatInput('')
    setTimeout(() => {
      const replies = BOT_REPLIES[lang]
      setChatMsgs(prev => [...prev, {
        role: 'bot',
        text: replies[Math.floor(Math.random() * replies.length)]
      }])
    }, 900)
  }

  const contactInfo = [
    { icon: '📍', label: t('address_label'), val: lang === 'ar' ? '١٢٣ شارع الرياضة، المعادي، القاهرة' : '123 Sports St, Maadi, Cairo' },
    { icon: '📞', label: t('phone_label'),   val: '+20 100 000 0000' },
    { icon: '✉️', label: t('email_label'),   val: 'info@sportzone.com' },
    { icon: '🕐', label: t('hours_label'),   val: t('daily_hours') },
  ]

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">{t('contact_title')}</h1>
        <p className="page-sub">{t('contact_sub')}</p>

        <div className="contact-layout">
          {/* Info Card */}
          <div className="contact-info-card">
            <h3>{lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}</h3>
            {contactInfo.map((item, i) => (
              <div key={i} className="contact-item">
                <div className="contact-icon-box">{item.icon}</div>
                <div>
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-val">{item.val}</div>
                </div>
              </div>
            ))}
            <div className="contact-socials">
              {['📘 Facebook', '📷 Instagram', '🐦 Twitter'].map(s => (
                <button key={s} className="social-tag">{s}</button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="contact-right">
            {/* Message Form */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <h3 style={{ fontWeight: 800, marginBottom: 20 }}>
                {lang === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h3>
              <div className="form-row">
                <div className="form-group"><label>{t('your_name')}</label><input placeholder={t('your_name')} /></div>
                <div className="form-group"><label>{t('email')}</label><input type="email" placeholder="email@example.com" /></div>
              </div>
              <div className="form-group">
                <label>{t('message')}</label>
                <textarea
                  placeholder={t('how_help')}
                  style={{ width: '100%', height: 110, background: 'var(--bg2)', border: '1.5px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'inherit', fontSize: 14, resize: 'none' }}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => showToast(lang === 'ar' ? 'تم إرسال رسالتك!' : 'Message sent!')}
              >
                📤 {t('send_msg')}
              </button>
            </div>

            {/* Live Chat */}
            <div className="chat-widget card">
              <div className="chat-header">
                <div className="chat-status-dot" />
                <h4>💬 {t('chat_title')}</h4>
              </div>
              <div className="chat-messages" id="chatBox">
                {chatMsgs.map((m, i) => (
                  <div key={i} className={`chat-bubble ${m.role}`}>{m.text}</div>
                ))}
              </div>
              <div className="chat-input-row">
                <input
                  className="chat-input"
                  placeholder={t('chat_placeholder')}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                />
                <button className="btn btn-primary" style={{ padding: '9px 16px' }} onClick={sendChat}>
                  {t('send')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
