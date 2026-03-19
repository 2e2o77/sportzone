import { useApp } from '../context/AppContext'
import './Blog.css'

export default function Blog() {
  const { lang, t, showToast, posts, dbLoading } = useApp()

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">{t('blog_title')}</h1>
        <p className="page-sub">{t('blog_sub')}</p>

        {dbLoading ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text3)' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>⏳</div>
            <p>{t('loading')}</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text3)' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📝</div>
            <p>{lang === 'ar' ? 'لا توجد مقالات بعد' : 'No posts yet'}</p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map(post => {
              const title   = lang === 'ar' ? post.title_ar   : post.title_en
              const excerpt = lang === 'ar' ? post.excerpt_ar : post.excerpt_en
              const cat     = lang === 'ar' ? post.cat_ar     : post.cat_en
              return (
                <article key={post.id} className="blog-card card">
                  <div className="blog-thumb">{post.emoji}</div>
                  <div className="blog-body">
                    <span className="blog-cat">{cat}</span>
                    <h3 className="blog-title">{title}</h3>
                    <p className="blog-excerpt">{excerpt}</p>
                    <div className="blog-footer">
                      <span className="blog-date">📅 {post.date}</span>
                      <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 14px' }}
                        onClick={() => showToast(lang === 'ar' ? 'المقال قريباً!' : 'Full article coming soon!')}>
                        {t('read_more')}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <div className="newsletter">
          <div className="newsletter-inner">
            <div>
              <h3>{lang === 'ar' ? '📧 اشترك في نشرتنا' : '📧 Subscribe to Our Newsletter'}</h3>
              <p>{lang === 'ar' ? 'احصل على أحدث النصائح والعروض' : 'Get the latest tips and offers'}</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'} />
              <button className="btn btn-primary" onClick={() => showToast(lang === 'ar' ? 'تم الاشتراك!' : 'Subscribed!')}>
                {lang === 'ar' ? 'اشترك' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
