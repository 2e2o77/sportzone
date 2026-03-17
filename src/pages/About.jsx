import { useApp } from '../context/AppContext'
import './About.css'

const TEAM = [
  { name: 'Ahmed Hassan',  role_en: 'Founder & CEO',       role_ar: 'المؤسس والمدير التنفيذي', init: 'A' },
  { name: 'Sara Nour',     role_en: 'Head of Marketing',   role_ar: 'رئيسة التسويق',           init: 'S' },
  { name: 'Omar Farid',    role_en: 'Lead Developer',      role_ar: 'المطور الرئيسي',           init: 'O' },
  { name: 'Nada Ali',      role_en: 'Customer Success',    role_ar: 'نجاح العملاء',             init: 'N' },
  { name: 'Karim Samir',   role_en: 'Operations Manager',  role_ar: 'مدير العمليات',            init: 'K' },
  { name: 'Layla Mostafa', role_en: 'Brand Designer',      role_ar: 'مصممة العلامة التجارية',  init: 'L' },
]

const VALUES = [
  { icon: '🏆', en: 'Excellence',  ar: 'التميز',   desc_en: 'Only top-quality sports gear', desc_ar: 'أعلى جودة في المعدات الرياضية' },
  { icon: '🤝', en: 'Trust',       ar: 'الثقة',    desc_en: 'Transparent & honest service', desc_ar: 'خدمة شفافة وصادقة دائماً' },
  { icon: '⚡', en: 'Speed',       ar: 'السرعة',   desc_en: 'Fast delivery across Egypt',   desc_ar: 'توصيل سريع لجميع المحافظات' },
  { icon: '💚', en: 'Community',   ar: 'المجتمع',  desc_en: 'Supporting athletes at every level', desc_ar: 'دعم الرياضيين في كل المستويات' },
]

export default function About() {
  const { lang, t } = useApp()
  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Hero */}
        <div className="about-hero">
          <div className="about-logo">⚽</div>
          <h1>{t('about_title')}</h1>
          <p>{t('about_sub')}</p>
          <div className="about-stats">
            <div className="about-stat"><strong>2018</strong><span>{lang === 'ar' ? 'سنة التأسيس' : 'Founded'}</span></div>
            <div className="about-stat"><strong>50K+</strong><span>{lang === 'ar' ? 'عميل سعيد' : 'Happy Customers'}</span></div>
            <div className="about-stat"><strong>500+</strong><span>{lang === 'ar' ? 'منتج' : 'Products'}</span></div>
            <div className="about-stat"><strong>27</strong><span>{lang === 'ar' ? 'محافظة' : 'Governorates'}</span></div>
          </div>
        </div>

        {/* Story */}
        <div className="about-story card">
          <div className="story-text">
            <h2>{lang === 'ar' ? 'قصتنا' : 'Our Story'}</h2>
            <p>{lang === 'ar'
              ? 'بدأت SportZone كحلم صغير في القاهرة عام 2018 — رؤية واحدة لتوفير أفضل المعدات الرياضية لكل المصريين بأسعار معقولة. من متجر صغير إلى منصة رقمية تخدم عشرات الآلاف من الرياضيين والمحبين للرياضة في جميع أنحاء مصر.'
              : 'SportZone started as a small dream in Cairo in 2018 — one vision to provide the best sports gear to every Egyptian at fair prices. From a small shop to a digital platform serving tens of thousands of athletes and sports enthusiasts across Egypt.'
            }</p>
          </div>
          <div className="story-img">🏟️</div>
        </div>

        {/* Values */}
        <h2 className="section-title" style={{ margin: '40px 0 20px' }}>{t('our_values')}</h2>
        <div className="values-grid">
          {VALUES.map(v => (
            <div key={v.en} className="value-card card">
              <div className="value-icon">{v.icon}</div>
              <div className="value-title">{lang === 'ar' ? v.ar : v.en}</div>
              <div className="value-desc">{lang === 'ar' ? v.desc_ar : v.desc_en}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="section-title" style={{ margin: '40px 0 20px' }}>{t('our_team')}</h2>
        <div className="team-grid">
          {TEAM.map(m => (
            <div key={m.name} className="team-card card">
              <div className="team-avatar">{m.init}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{lang === 'ar' ? m.role_ar : m.role_en}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
