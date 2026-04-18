import Link from 'next/link';

export const metadata = {
  title: 'الأسئلة الشائعة — بلِّغ',
  description: 'إجابات على أكثر الأسئلة شيوعاً حول منصة بلِّغ',
};

const faqs = [
  { q: 'هل بلِّغ مجاني تماماً؟', a: 'نعم. بلِّغ مجاني بالكامل ولا توجد أي رسوم مخفية. يمكنك إنشاء حسابك واستقبال رسائل غير محدودة دون دفع أي شيء.' },
  { q: 'هل يستطيع المستقبل معرفة هويتي؟', a: 'لا. المنصة مصممة هندسياً بحيث لا يتم حفظ هوية المرسل في قاعدة البيانات أصلاً. حتى نحن كمشغلين للمنصة لا نستطيع معرفة من أرسل رسالة معينة.' },
  { q: 'كيف أشارك رابطي مع أصدقائي؟', a: 'بعد إنشاء حسابك، ستجد رابطك الشخصي في لوحة التحكم. انسخه وضعه في قصصك (ستوري) على إنستجرام أو سناب أو في البايو، وسيبدأ الناس في إرسال الرسائل إليك.' },
  { q: 'هل يمكنني حذف الرسائل المسيئة؟', a: 'بالتأكيد. يمكنك حذف أي رسالة من صندوق رسائلك في أي وقت بضغطة زر واحدة.' },
  { q: 'هل يمكنني تغيير اسم المستخدم الخاص بي؟', a: 'نعم. يمكنك تغيير اسم المستخدم من صفحة الإعدادات. تذكر أن الرابط القديم لن يعمل بعد التغيير.' },
  { q: 'ماذا يحدث إذا أردت حذف حسابي؟', a: 'يمكنك حذف حسابك نهائياً من صفحة الإعدادات. سيتم مسح جميع رسائلك وبياناتك بشكل دائم ولا يمكن استرجاعها.' },
  { q: 'هل المنصة متاحة على الجوال؟', a: 'نعم. بلِّغ يعمل بشكل مثالي على جميع الأجهزة والمتصفحات. لا تحتاج لتنزيل أي تطبيق.' },
  { q: 'ما الذي يحدث لو تلقيت رسائل مزعجة أو مسيئة؟', a: 'يمكنك حذف أي رسالة لا تريدها. نحن نوفر أيضاً إمكانية الإبلاغ عن المحتوى المنتهك لسياسة الاستخدام عبر التواصل معنا على البريد الإلكتروني.' },
];

export default function FAQ() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=Cairo:wght@400;500;700;900&display=swap');
        :root{--ink:#0a0a08;--cream:#f5f0e8;--gold:#c9a84c;--smoke:#1e1e1a;--border:rgba(201,168,76,0.12);--text-muted:rgba(245,240,232,0.4);--text-mid:rgba(245,240,232,0.65);}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{direction:rtl;}
        body{background:var(--ink);color:var(--cream);font-family:'Cairo',sans-serif;-webkit-font-smoothing:antialiased;}
        ::selection{background:var(--gold);color:var(--ink);}
        body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");opacity:.03;pointer-events:none;z-index:9999;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--ink);}::-webkit-scrollbar-thumb{background:var(--gold);}

        nav{position:sticky;top:0;z-index:50;padding:20px 48px;display:flex;justify-content:space-between;align-items:center;background:rgba(10,10,8,.85);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);}
        .brand{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:900;color:var(--cream);text-decoration:none;letter-spacing:-.03em;display:flex;align-items:center;gap:8px;}
        .dot{width:7px;height:7px;background:var(--gold);border-radius:50%;animation:pulse 2.5s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.6);opacity:.5;}}
        .nav-cta{padding:10px 24px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:12px;font-weight:900;letter-spacing:.08em;text-decoration:none;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);transition:all .3s;}
        .nav-cta:hover{background:var(--cream);}

        .hero{padding:100px 48px 60px;max-width:900px;margin:0 auto;}
        .hero-label{font-size:11px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;display:flex;align-items:center;gap:10px;}
        .hero-label::before{content:'';width:32px;height:1px;background:var(--gold);}
        .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:900;color:var(--cream);letter-spacing:-.03em;line-height:1;margin-bottom:20px;}
        .hero-title em{font-style:italic;color:var(--gold);}

        .content{max-width:900px;margin:0 auto;padding:0 48px 120px;}

        .faq-item{border-bottom:1px solid var(--border);padding:28px 0;}
        .faq-q{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:var(--cream);letter-spacing:-.01em;margin-bottom:14px;display:flex;align-items:flex-start;gap:12px;}
        .faq-num{font-size:.85rem;font-weight:900;color:var(--gold);font-family:monospace;opacity:.6;flex-shrink:0;margin-top:3px;}
        .faq-a{font-size:14px;color:var(--text-mid);line-height:1.9;font-weight:500;padding-right:24px;}

        .cta-box{background:var(--smoke);border:1px solid var(--border);padding:48px;text-align:center;margin-top:60px;position:relative;}
        .cta-box::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
        .cta-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;margin-bottom:10px;}
        .cta-desc{font-size:14px;color:var(--text-muted);margin-bottom:28px;font-weight:500;}
        .cta-btn{display:inline-flex;padding:14px 36px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:13px;font-weight:900;letter-spacing:.08em;text-decoration:none;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all .3s;}
        .cta-btn:hover{background:var(--cream);}

        footer{border-top:1px solid var(--border);padding:40px 48px;display:flex;justify-content:space-between;align-items:center;}
        .ft{font-size:12px;color:var(--text-muted);font-weight:700;letter-spacing:.1em;}
        .ft a{color:var(--gold);text-decoration:none;}

        @media(max-width:768px){nav,footer{padding:16px 20px;}.hero,.content{padding-right:20px;padding-left:20px;}}
      `}</style>

      <nav>
        <Link href="/" className="brand">بلِّغ<span className="dot"/></Link>
        <Link href="/register" className="nav-cta">ابدأ مجاناً</Link>
      </nav>

      <div className="hero">
        <div className="hero-label">الأسئلة الشائعة</div>
        <h1 className="hero-title">كل ما تريد<br/><em>معرفته.</em></h1>
      </div>

      <div className="content">
        {faqs.map((item, i) => (
          <div className="faq-item" key={i}>
            <div className="faq-q">
              <span className="faq-num">0{i+1}</span>
              {item.q}
            </div>
            <p className="faq-a">{item.a}</p>
          </div>
        ))}

        <div className="cta-box">
          <h2 className="cta-title">لم تجد إجابتك؟</h2>
          <p className="cta-desc">تواصل معنا على البريد الإلكتروني وسنرد عليك في أسرع وقت.</p>
          <a href="mailto:gamotek8@gmail.com" className="cta-btn">gamotek8@gmail.com</a>
        </div>
      </div>

      <footer>
        <span className="ft">© {new Date().getFullYear()} بلِّغ</span>
        <span className="ft"><Link href="/safety">الأمان</Link> · <Link href="/privacy">الخصوصية</Link></span>
      </footer>
    </>
  );
}
