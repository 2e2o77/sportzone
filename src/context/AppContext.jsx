import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [theme, setTheme] = useState('light')
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sz_cart')) || [] } catch { return [] }
  })
  const [comments, setComments] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sz_comments')) || {} } catch { return {} }
  })
  const [toast, setToast] = useState({ msg: '', show: false })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  useEffect(() => {
    localStorage.setItem('sz_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('sz_comments', JSON.stringify(comments))
  }, [comments])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en')

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true })
    setTimeout(() => setToast({ msg: '', show: false }), 2500)
  }, [])

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { id: product.id, qty }]
    })
    showToast(lang === 'ar' ? `تمت الإضافة: ${product.name_ar}` : `Added: ${product.name_en}`)
  }, [lang, showToast])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const changeQty = useCallback((id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const addComment = useCallback((productId, comment) => {
    setComments(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), { ...comment, date: new Date().toLocaleDateString() }]
    }))
  }, [])

  const t = useCallback((key) => translations[lang][key] || key, [lang])
  const fmt = (n) => `${n.toLocaleString()} EGP`

  return (
    <AppContext.Provider value={{
      lang, theme, cart, comments, toast,
      toggleTheme, toggleLang, showToast,
      addToCart, removeFromCart, changeQty, clearCart,
      cartCount, addComment, t, fmt
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

const translations = {
  en: {
    home: 'Home', products: 'Products', blog: 'Blog', about: 'About', contact: 'Contact Us',
    hero_title: 'Your Ultimate Sports Store', hero_sub: 'Premium gear for every sport. Top brands, unbeatable prices.',
    shop_now: 'Shop Now', view_all: 'View All', featured: 'Featured Products', new_arrivals: 'New Arrivals',
    in_stock: 'In Stock', out_stock: 'Out of Stock', add_cart: 'Add to Cart', added: 'Added!',
    all: 'All', back_products: '← Back to Products',
    qty: 'Qty', free_ship: 'Free Shipping', easy_return: 'Easy Returns', reviews: 'Customer Reviews',
    write_review: 'Write a Review', your_name: 'Your Name', your_review: 'Your Review',
    rating: 'Rating', submit: 'Submit Review', no_reviews: 'No reviews yet. Be the first!',
    cart_title: 'Shopping Cart', cart_empty: 'Your cart is empty', start_shopping: 'Start Shopping',
    remove: 'Remove', subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free', total: 'Total',
    checkout_btn: 'Proceed to Checkout',
    checkout_title: 'Checkout', order_summary: 'Order Summary', personal_info: 'Personal Information',
    first: 'First Name', last: 'Last Name', email: 'Email', phone: 'Phone',
    address: 'Street Address', city: 'City', country: 'Country', zip: 'ZIP Code',
    payment: 'Payment Method', pay_card: 'Credit / Debit Card', pay_paypal: 'PayPal / Fawry',
    pay_cod: 'Cash on Delivery', card_num: 'Card Number', expiry: 'Expiry Date', cvv: 'CVV',
    place_order: 'Place Order', pay_when_delivered: 'Pay when delivered',
    blog_title: 'Sports Blog', blog_sub: 'Tips, news & training guides', read_more: 'Read More',
    about_title: 'About SportZone', about_sub: 'We are passionate about sports and committed to providing the best gear for athletes of all levels.',
    our_team: 'Our Team', our_values: 'Our Values',
    contact_title: 'Contact Us', contact_sub: 'We\'re here to help — reach out anytime',
    send_msg: 'Send Message', message: 'Message', how_help: 'How can we help?',
    chat_title: 'Live Chat Support', chat_placeholder: 'Type a message...', send: 'Send',
    success_title: 'Order Placed Successfully!', success_msg: 'Thank you for your order. We will contact you soon.',
    go_home: 'Back to Home', order_id: 'Order ID', est_delivery: 'Estimated delivery: 2-4 business days',
    address_label: 'Address', phone_label: 'Phone', email_label: 'Email', hours_label: 'Working Hours',
    daily_hours: 'Daily 9AM – 9PM',
  },
  ar: {
    home: 'الرئيسية', products: 'المنتجات', blog: 'المدونة', about: 'عن المتجر', contact: 'تواصل معنا',
    hero_title: 'متجرك الرياضي الأول', hero_sub: 'أفضل المعدات لكل الرياضات. أشهر الماركات وأسعار لا تُقاوم.',
    shop_now: 'تسوق الآن', view_all: 'عرض الكل', featured: 'منتجات مميزة', new_arrivals: 'وصل حديثاً',
    in_stock: 'متوفر', out_stock: 'غير متوفر', add_cart: 'أضف للسلة', added: 'تمت الإضافة!',
    all: 'الكل', back_products: '→ العودة للمنتجات',
    qty: 'الكمية', free_ship: 'شحن مجاني', easy_return: 'إرجاع سهل', reviews: 'تقييمات العملاء',
    write_review: 'اكتب تقييماً', your_name: 'اسمك', your_review: 'تقييمك',
    rating: 'التقييم', submit: 'إرسال التقييم', no_reviews: 'لا توجد تقييمات بعد. كن الأول!',
    cart_title: 'سلة التسوق', cart_empty: 'السلة فارغة', start_shopping: 'ابدأ التسوق',
    remove: 'حذف', subtotal: 'المجموع الجزئي', shipping: 'الشحن', free: 'مجاني', total: 'الإجمالي',
    checkout_btn: 'إتمام الطلب',
    checkout_title: 'إتمام الشراء', order_summary: 'ملخص الطلب', personal_info: 'المعلومات الشخصية',
    first: 'الاسم الأول', last: 'الاسم الأخير', email: 'البريد الإلكتروني', phone: 'رقم الهاتف',
    address: 'عنوان الشارع', city: 'المدينة', country: 'الدولة', zip: 'الرمز البريدي',
    payment: 'طريقة الدفع', pay_card: 'بطاقة ائتمانية', pay_paypal: 'باي بال / فوري',
    pay_cod: 'الدفع عند الاستلام', card_num: 'رقم البطاقة', expiry: 'تاريخ الانتهاء', cvv: 'CVV',
    place_order: 'تأكيد الطلب', pay_when_delivered: 'الدفع عند وصول الطلب',
    blog_title: 'مدونة سبورت زون', blog_sub: 'نصائح، أخبار وأدلة تدريبية', read_more: 'اقرأ المزيد',
    about_title: 'عن SportZone', about_sub: 'نحن شغوفون بالرياضة وملتزمون بتقديم أفضل المعدات لكل الرياضيين.',
    our_team: 'فريقنا', our_values: 'قيمنا',
    contact_title: 'تواصل معنا', contact_sub: 'نحن هنا للمساعدة — تواصل معنا في أي وقت',
    send_msg: 'إرسال الرسالة', message: 'الرسالة', how_help: 'كيف نساعدك؟',
    chat_title: 'الدعم المباشر', chat_placeholder: 'اكتب رسالة...', send: 'إرسال',
    success_title: 'تم تأكيد طلبك!', success_msg: 'شكراً لطلبك. سنتواصل معك قريباً.',
    go_home: 'العودة للرئيسية', order_id: 'رقم الطلب', est_delivery: 'التوصيل المتوقع: 2-4 أيام عمل',
    address_label: 'العنوان', phone_label: 'الهاتف', email_label: 'البريد', hours_label: 'ساعات العمل',
    daily_hours: 'يومياً ٩ص – ٩م',
  }
}
