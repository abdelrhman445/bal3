import Link from 'next/link';

export const metadata = {
  title: 'شروط الاستخدام — بلِّغ',
  description: 'شروط وأحكام استخدام منصة بلِّغ',
};

export default function Terms() {
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
        @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.6);opacity:.5;}}
        .nav-cta{padding:10px 24px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:12px;font-weight:900;text-decoration:none;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);transition:all .3s;}
        .nav-cta:hover{background:var(--cream);}
        .hero{padding:100px 48px 40px;max-width:860px;margin:0 auto;}
        .hero-label{font-size:11px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;display:flex;align-items:center;gap:10px;}
        .hero-label::before{content:'';width:32px;height:1px;background:var(--gold);}
        .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,4vw,3.8rem);font-weight:900;color:var(--cream);letter-spacing:-.03em;line-height:1;margin-bottom:16px;}
        .hero-title em{font-style:italic;color:var(--gold);}
        .hero-date{font-size:12px;color:var(--text-muted);font-weight:700;letter-spacing:.1em;}
        .content{max-width:860px;margin:0 auto;padding:40px 48px 100px;}
        .section{margin-bottom:48px;}
        .sec-title{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--cream);letter-spacing:-.02em;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;}
        .sec-num{font-size:.9rem;font-weight:900;color:var(--gold);font-family:monospace;opacity:.5;}
        .sec-text{font-size:14px;color:var(--text-mid);line-height:1.9;font-weight:500;}
        .sec-text+.sec-text{margin-top:12px;}
        .warn{background:rgba(184,76,54,.07);border:1px solid rgba(184,76,54,.2);padding:16px 20px;margin-top:14px;font-size:13px;color:rgba(224,112,96,.85);font-weight:700;line-height:1.7;}
        footer{border-top:1px solid var(--border);padding:32px 48px;display:flex;justify-content:space-between;align-items:center;}
        .ft{font-size:12px;color:var(--text-muted);font-weight:700;}
        .ft a{color:var(--gold);text-decoration:none;}
        @media(max-width:768px){nav,footer{padding:16px 20px;}.hero,.content{padding-right:20px;padding-left:20px;}}
      `}</style>
      <nav>
        <Link href="/" className="brand">بلِّغ<span className="dot"/></Link>
        <Link href="/register" className="nav-cta">ابدأ مجاناً</Link>
      </nav>
      <div className="hero">
        <div className="hero-label">الوثيقة القانونية</div>
        <h1 className="hero-title">شروط <em>الاستخدام</em></h1>
        <p className="hero-date">آخر تحديث: أبريل 2025</p>
      </div>
      <div className="content">
        <div className="section">
          <h2 className="sec-title"><span className="sec-num">01</span>القبول بالشروط</h2>
          <p className="sec-text">باستخدامك لمنصة بلِّغ، فأنت توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.</p>
        </div>
        <div className="section">
          <h2 className="sec-title"><span className="sec-num">02</span>الاستخدام المقبول</h2>
          <p className="sec-text">بلِّغ منصة للمصارحة البنّاءة والآراء الصادقة. يُسمح باستخدام المنصة لإرسال واستقبال رسائل ذات طابع شخصي وبنّاء.</p>
          <p className="sec-text">يلتزم المستخدم باستخدام المنصة وفق القوانين المعمول بها في بلده وعدم انتهاك حقوق الآخرين.</p>
        </div>
        <div className="section">
          <h2 className="sec-title"><span className="sec-num">03</span>المحتوى المحظور</h2>
          <p className="sec-text">يُحظر تماماً إرسال أي محتوى يتضمن:</p>
          <div className="warn">التهديد أو التحرش أو الإساءة الجنسية · نشر بيانات شخصية للآخرين دون إذنهم · محتوى يحرض على الكراهية أو العنف · التشهير والتحقير الممنهج · أي محتوى يخالف القوانين المحلية أو الدولية</div>
        </div>
        <div className="section">
          <h2 className="sec-title"><span className="sec-num">04</span>إخلاء المسؤولية</h2>
          <p className="sec-text">بلِّغ منصة وسيطة لنقل الرسائل ولا تتحمل مسؤولية محتوى الرسائل المرسلة بين المستخدمين. صاحب الرسالة هو المسؤول القانوني الوحيد عن محتواها.</p>
          <p className="sec-text">نحتفظ بالحق في حذف أي محتوى ينتهك هذه الشروط وتعليق الحسابات المخالفة دون إشعار مسبق.</p>
        </div>
        <div className="section">
          <h2 className="sec-title"><span className="sec-num">05</span>تعديل الشروط</h2>
          <p className="sec-text">نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعار المستخدمين بالتغييرات الجوهرية عبر البريد الإلكتروني أو عند تسجيل الدخول.</p>
        </div>
        <div className="section">
          <h2 className="sec-title"><span className="sec-num">06</span>التواصل</h2>
          <p className="sec-text">للإبلاغ عن أي انتهاك أو للاستفسار: gamotek8@gmail.com</p>
        </div>
      </div>
      <footer>
        <span className="ft">© {new Date().getFullYear()} بلِّغ</span>
        <span className="ft"><Link href="/privacy">الخصوصية</Link> · <Link href="/safety">الأمان</Link></span>
      </footer>
    </>
  );
}
