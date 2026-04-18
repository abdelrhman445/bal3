import Link from 'next/link';

export const metadata = {
  title: 'الأمان والخصوصية — بلِّغ',
  description: 'كيف تحمي بلِّغ هوية المرسل وخصوصية المستخدمين بشكل كامل',
};

export default function Safety() {
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
        .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:900;color:var(--cream);letter-spacing:-.03em;line-height:1;margin-bottom:20px;}
        .hero-title em{font-style:italic;color:var(--gold);}
        .hero-desc{font-size:16px;color:var(--text-muted);line-height:1.8;font-weight:500;max-width:560px;}

        .content{max-width:900px;margin:0 auto;padding:0 48px 120px;}

        .section{margin-bottom:60px;padding:40px;background:var(--smoke);border:1px solid var(--border);position:relative;}
        .section::before{content:'';position:absolute;top:0;right:0;width:40px;height:2px;background:var(--gold);}
        .section-num{font-family:'Playfair Display',serif;font-size:3rem;font-weight:900;color:rgba(201,168,76,.1);letter-spacing:-.05em;line-height:1;margin-bottom:12px;}
        .section-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:var(--cream);letter-spacing:-.02em;margin-bottom:16px;}
        .section-text{font-size:14px;color:var(--text-mid);line-height:1.9;font-weight:500;}
        .section-text + .section-text{margin-top:12px;}

        .points{margin-top:20px;display:flex;flex-direction:column;gap:12px;}
        .point{display:flex;gap:12px;font-size:14px;color:var(--text-mid);font-weight:500;line-height:1.6;}
        .point-icon{color:var(--gold);font-size:1rem;margin-top:2px;flex-shrink:0;}

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
        <div className="hero-label">الأمان والخصوصية</div>
        <h1 className="hero-title">
          الحماية ليست<br/>وعداً. هي <em>تصميم.</em>
        </h1>
        <p className="hero-desc">
          في بلِّغ، الخصوصية ليست ميزة إضافية — هي الأساس الذي بُني عليه كل شيء من الصفر.
        </p>
      </div>

      <div className="content">
        <div className="section">
          <div className="section-num">01</div>
          <h2 className="section-title">هوية المرسل مجهولة بشكل هيكلي</h2>
          <p className="section-text">
            عند إرسال رسالة عبر بلِّغ، لا يتم حفظ أي بيانات تعريفية للمرسل في قاعدة البيانات. لا اسم، لا عنوان IP، لا وقت دقيق للإرسال يمكن ربطه بأي شخص.
          </p>
          <p className="section-text">
            هذا يعني أن المستقبل — حتى لو أراد — لا يملك أي وسيلة لمعرفة من أرسل له الرسالة. الأمر ليس وعداً، بل هو قيد تقني حقيقي.
          </p>
        </div>

        <div className="section">
          <div className="section-num">02</div>
          <h2 className="section-title">ماذا نجمع وماذا لا نجمع</h2>
          <div className="points">
            <div className="point"><span className="point-icon">✓</span>نجمع فقط: اسم المستخدم، البريد الإلكتروني، وكلمة المرور المشفرة عند التسجيل.</div>
            <div className="point"><span className="point-icon">✓</span>نجمع محتوى الرسائل الواردة لعرضها لصاحب الحساب فقط.</div>
            <div className="point"><span className="point-icon">✗</span>لا نجمع: هوية مرسلي الرسائل، عناوين IP لمرسلي الرسائل، بيانات الجهاز أو الموقع الجغرافي.</div>
            <div className="point"><span className="point-icon">✗</span>لا نبيع أي بيانات لأي طرف ثالث بأي شكل من الأشكال.</div>
          </div>
        </div>

        <div className="section">
          <div className="section-num">03</div>
          <h2 className="section-title">المحتوى المسموح به والمحظور</h2>
          <p className="section-text">
            المنصة مخصصة للمصارحة البنّاءة والآراء الصادقة. المحتوى التالي محظور تماماً ويُحذف فوراً:
          </p>
          <div className="points">
            <div className="point"><span className="point-icon">✗</span>التهديدات أو التحريض على العنف</div>
            <div className="point"><span className="point-icon">✗</span>التحرش الجنسي أو إرسال محتوى إباحي</div>
            <div className="point"><span className="point-icon">✗</span>نشر المعلومات الشخصية للآخرين دون إذنهم</div>
            <div className="point"><span className="point-icon">✗</span>التشهير والإساءة الممنهجة</div>
          </div>
        </div>

        <div className="section">
          <div className="section-num">04</div>
          <h2 className="section-title">حقوقك في التحكم ببياناتك</h2>
          <div className="points">
            <div className="point"><span className="point-icon">✓</span>يمكنك حذف أي رسالة من صندوقك في أي وقت.</div>
            <div className="point"><span className="point-icon">✓</span>يمكنك حذف حسابك بالكامل وجميع بياناته بشكل نهائي من صفحة الإعدادات.</div>
            <div className="point"><span className="point-icon">✓</span>يمكنك تغيير اسم المستخدم والبريد الإلكتروني في أي وقت.</div>
          </div>
        </div>
      </div>

      <footer>
        <span className="ft">© {new Date().getFullYear()} بلِّغ — جميع الحقوق محفوظة</span>
        <span className="ft"><Link href="/privacy">سياسة الخصوصية</Link> · <Link href="/terms">الشروط</Link></span>
      </footer>
    </>
  );
}
