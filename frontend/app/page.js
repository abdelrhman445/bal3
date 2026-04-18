"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navScrolled = scrollY > 40;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Cairo:wght@400;500;700;900&display=swap');
        :root{--ink:#0a0a08;--cream:#f5f0e8;--gold:#c9a84c;--gold-light:#e8d5a0;--smoke:#1e1e1a;--smoke-2:#2a2a25;--rust:#b84c36;--border:rgba(201,168,76,0.12);--text-muted:rgba(245,240,232,0.4);--text-mid:rgba(245,240,232,0.65);--mist:rgba(245,240,232,0.06);}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{direction:rtl;scroll-behavior:smooth;}
        body{background:var(--ink);color:var(--cream);font-family:'Cairo',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
        ::selection{background:var(--gold);color:var(--ink);}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");opacity:.03;pointer-events:none;z-index:9999;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--ink);}::-webkit-scrollbar-thumb{background:var(--gold);}

        /* NAV */
        .nav{position:fixed;top:0;width:100%;z-index:100;padding:28px 48px;display:flex;align-items:center;justify-content:space-between;transition:all .5s cubic-bezier(.16,1,.3,1);}
        .nav.scrolled{padding:18px 48px;background:rgba(10,10,8,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
        .nav-logo{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--cream);text-decoration:none;letter-spacing:-.02em;display:flex;align-items:center;gap:10px;}
        .logo-dot{width:8px;height:8px;background:var(--gold);border-radius:50%;display:inline-block;animation:pulse-dot 2.5s ease-in-out infinite;}
        @keyframes pulse-dot{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.5);opacity:.6;}}
        .nav-links{display:flex;align-items:center;gap:40px;list-style:none;}
        .nav-links a{font-size:13px;font-weight:700;color:rgba(245,240,232,.5);text-decoration:none;letter-spacing:.12em;text-transform:uppercase;transition:color .3s;}
        .nav-links a:hover{color:var(--gold);}
        .nav-cta{display:flex;align-items:center;gap:20px;}
        .btn-ghost{font-size:13px;font-weight:700;color:rgba(245,240,232,.5);text-decoration:none;letter-spacing:.1em;transition:color .3s;}
        .btn-ghost:hover{color:var(--cream);}
        .btn-primary{padding:12px 28px;background:var(--gold);color:var(--ink);font-size:13px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all .3s;}
        .btn-primary:hover{background:var(--cream);transform:translateY(-2px);}

        /* HERO */
        .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;}
        .hero-left{padding:160px 64px 80px;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2;}
        .hero-eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:40px;}
        .eyebrow-line{width:48px;height:1px;background:var(--gold);}
        .eyebrow-text{font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);}
        .hero-title{font-family:'Playfair Display',serif;font-size:clamp(3.5rem,6vw,6.5rem);font-weight:900;line-height:.95;letter-spacing:-.03em;color:var(--cream);margin-bottom:36px;}
        .hero-title em{font-style:italic;color:var(--gold);}
        .hero-title .outline{color:transparent;-webkit-text-stroke:1px rgba(245,240,232,.2);}
        .hero-desc{font-size:17px;font-weight:400;line-height:1.8;color:var(--text-muted);max-width:420px;margin-bottom:52px;}
        .hero-actions{display:flex;align-items:center;gap:28px;}
        .btn-hero-main{display:flex;align-items:center;gap:14px;padding:20px 44px;background:var(--gold);color:var(--ink);font-size:15px;font-weight:900;text-decoration:none;clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);transition:all .4s cubic-bezier(.16,1,.3,1);}
        .btn-hero-main:hover{background:var(--cream);transform:translateY(-3px);box-shadow:0 20px 60px rgba(201,168,76,.3);}
        .btn-hero-main svg{transition:transform .3s;}
        .btn-hero-main:hover svg{transform:translateX(-6px);}
        .hero-count strong{display:block;font-size:20px;font-weight:900;color:var(--cream);letter-spacing:-.02em;}
        .hero-count{font-size:12px;font-weight:700;color:rgba(245,240,232,.35);letter-spacing:.05em;}

        /* HERO RIGHT */
        .hero-right{position:relative;overflow:hidden;}
        .hero-right::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#1a1508 0%,#0a0a08 60%);z-index:0;}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,168,76,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.08) 1px,transparent 1px);background-size:48px 48px;z-index:1;}
        .hero-big-num{position:absolute;bottom:-30px;left:-20px;font-family:'Playfair Display',serif;font-size:clamp(200px,30vw,380px);font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.1);line-height:1;z-index:2;user-select:none;letter-spacing:-.05em;}
        .hero-card{position:absolute;z-index:3;}
        .card-msg{top:22%;right:60px;background:rgba(42,42,37,.85);border:1px solid rgba(201,168,76,.2);backdrop-filter:blur(12px);padding:24px 28px;max-width:280px;animation:float 6s ease-in-out infinite;}
        .card-stat{bottom:15%;left:40px;background:var(--gold);padding:20px 28px;animation:float 6s 2s ease-in-out infinite;}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
        .card-msg-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:10px;}
        .card-msg-text{font-size:14px;color:var(--cream);line-height:1.6;font-weight:500;}
        .card-msg-time{font-size:10px;color:rgba(245,240,232,.3);margin-top:10px;font-weight:700;letter-spacing:.1em;}
        .card-stat-num{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:900;color:var(--ink);line-height:1;letter-spacing:-.03em;}
        .card-stat-label{font-size:11px;font-weight:900;color:var(--ink);opacity:.6;letter-spacing:.15em;text-transform:uppercase;margin-top:4px;}
        .hero-vtext{position:absolute;top:50%;left:24px;transform:translateY(-50%) rotate(90deg);transform-origin:center;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(201,168,76,.3);font-weight:700;z-index:4;white-space:nowrap;}

        /* MARQUEE */
        .marquee-section{border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:18px 0;overflow:hidden;background:rgba(201,168,76,.03);}
        .marquee-track{display:flex;animation:marquee 25s linear infinite;width:max-content;}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .marquee-item{display:flex;align-items:center;gap:20px;padding:0 40px;white-space:nowrap;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(201,168,76,.5);}
        .marquee-sep{width:4px;height:4px;background:var(--gold);border-radius:50%;opacity:.4;}

        /* FEATURES */
        .features-section{padding:160px 64px;max-width:1400px;margin:0 auto;}
        .section-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:100px;}
        .section-label{font-size:11px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:20px;}
        .section-title{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,5vw,5rem);font-weight:900;color:var(--cream);line-height:1;letter-spacing:-.03em;}
        .section-title em{font-style:italic;color:var(--gold);}
        .section-note{font-size:15px;color:var(--text-muted);max-width:280px;line-height:1.7;font-weight:500;text-align:left;}
        .features-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:2px;}
        .feat-card{padding:52px 48px;position:relative;overflow:hidden;transition:all .5s cubic-bezier(.16,1,.3,1);}
        .feat-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--gold);transform:scaleX(0);transform-origin:right;transition:transform .5s;}
        .feat-card:hover::after{transform:scaleX(1);transform-origin:left;}
        .feat-1{grid-column:span 7;background:var(--smoke-2);}
        .feat-2{grid-column:span 5;background:var(--gold);}
        .feat-3{grid-column:span 4;background:rgba(245,240,232,.04);border:1px solid rgba(245,240,232,.06);}
        .feat-4{grid-column:span 4;background:var(--rust);}
        .feat-5{grid-column:span 4;background:var(--smoke-2);}
        .feat-num{font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:900;color:rgba(201,168,76,.18);line-height:1;margin-bottom:32px;letter-spacing:-.04em;}
        .feat-2 .feat-num{color:rgba(10,10,8,.15);}
        .feat-4 .feat-num{color:rgba(245,240,232,.15);}
        .feat-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:var(--cream);line-height:1.2;margin-bottom:16px;letter-spacing:-.02em;}
        .feat-2 .feat-title{color:var(--ink);}
        .feat-desc{font-size:14px;color:var(--text-muted);line-height:1.8;font-weight:500;}
        .feat-2 .feat-desc{color:rgba(10,10,8,.6);}
        .feat-icon{position:absolute;bottom:28px;left:36px;opacity:.1;transition:opacity .4s;font-size:80px;line-height:1;color:var(--gold);}
        .feat-2 .feat-icon{color:rgba(10,10,8,.3);}
        .feat-card:hover .feat-icon{opacity:.25;}

        /* HOW IT WORKS */
        .how-section{padding:160px 64px;background:var(--smoke);position:relative;overflow:hidden;}
        .how-section::before{content:'بلِّغ';position:absolute;top:-60px;right:-40px;font-family:'Playfair Display',serif;font-size:420px;font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.04);user-select:none;line-height:1;}
        .how-inner{max-width:1400px;margin:0 auto;position:relative;z-index:2;}
        .steps-container{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;margin-top:80px;}
        .step{padding:60px 48px;border-top:2px solid transparent;transition:border-color .4s;position:relative;}
        .step:hover{border-top-color:var(--gold);}
        .step-num{font-family:'Playfair Display',serif;font-size:5rem;font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.25);line-height:1;margin-bottom:28px;letter-spacing:-.05em;}
        .step-title{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:var(--cream);margin-bottom:16px;letter-spacing:-.02em;}
        .step-desc{font-size:14px;color:var(--text-muted);line-height:1.9;font-weight:500;}

        /* TESTIMONIALS */
        .testi-section{padding:160px 64px;max-width:1400px;margin:0 auto;}
        .testi-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:80px;}
        .testi-card{padding:52px;}
        .testi-main{background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);}
        .testi-alt{background:var(--smoke);}
        .testi-quote{font-family:'Playfair Display',serif;font-size:4rem;color:var(--gold);opacity:.35;line-height:.5;margin-bottom:24px;}
        .testi-text{font-size:16px;color:var(--text-mid);line-height:1.9;font-weight:500;margin-bottom:36px;}
        .testi-author{display:flex;align-items:center;gap:14px;}
        .testi-avatar{width:44px;height:44px;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);object-fit:cover;}
        .testi-name{font-size:13px;font-weight:900;color:var(--cream);}
        .testi-role{font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;margin-top:3px;}

        /* CTA */
        .cta-section{margin:0 64px 120px;background:var(--gold);padding:100px;position:relative;overflow:hidden;clip-path:polygon(0 0,100% 0,97% 100%,3% 100%);}
        .cta-section::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(10,10,8,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(10,10,8,.08) 1px,transparent 1px);background-size:40px 40px;}
        .cta-inner{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;}
        .cta-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,4rem);font-weight:900;color:var(--ink);line-height:1.1;letter-spacing:-.03em;}
        .cta-title em{font-style:italic;}
        .cta-sub{font-size:15px;color:rgba(10,10,8,.55);margin-top:12px;font-weight:600;}
        .btn-cta{padding:22px 52px;background:var(--ink);color:var(--gold);font-size:14px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .4s;white-space:nowrap;flex-shrink:0;margin-right:60px;}
        .btn-cta:hover{background:var(--smoke-2);transform:translateY(-3px);}

        /* FOOTER */
        .footer{border-top:1px solid var(--border);padding:80px 64px 48px;}
        .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:64px;margin-bottom:64px;}
        .footer-brand{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;text-decoration:none;display:flex;align-items:center;gap:8px;margin-bottom:20px;}
        .footer-desc{font-size:13px;color:rgba(245,240,232,.3);line-height:1.8;font-weight:500;margin-bottom:32px;}
        .social-links{display:flex;gap:12px;}
        .social-link{width:40px;height:40px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;text-decoration:none;color:var(--text-muted);font-size:12px;font-weight:900;clip-path:polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);transition:all .3s;}
        .social-link:hover{background:var(--gold);color:var(--ink);border-color:var(--gold);}
        .footer-col-title{font-size:11px;font-weight:900;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:28px;}
        .footer-links{list-style:none;display:flex;flex-direction:column;gap:16px;}
        .footer-links a{font-size:13px;font-weight:700;color:rgba(245,240,232,.3);text-decoration:none;transition:color .3s;}
        .footer-links a:hover{color:var(--gold);}
        .footer-contact-box{background:var(--smoke-2);padding:28px;border:1px solid var(--border);}
        .footer-contact-label{font-size:10px;font-weight:900;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;display:block;}
        .footer-contact-email{font-size:14px;font-weight:900;color:var(--cream);text-decoration:none;transition:color .3s;}
        .footer-contact-email:hover{color:var(--gold);}
        .footer-bottom{border-top:1px solid rgba(245,240,232,.05);padding-top:32px;display:flex;justify-content:space-between;align-items:center;}
        .footer-copy{font-size:11px;font-weight:700;color:rgba(245,240,232,.18);letter-spacing:.15em;text-transform:uppercase;}

        /* RESPONSIVE */
        @media(max-width:1024px){
          .hero{grid-template-columns:1fr;}.hero-right{display:none;}.hero-left{padding:140px 32px 80px;}
          .features-section,.testi-section{padding:80px 32px;}
          .features-grid{gap:8px;}.feat-1,.feat-2{grid-column:span 12;}.feat-3,.feat-4,.feat-5{grid-column:span 12;}
          .steps-container{grid-template-columns:1fr;}.testi-grid{grid-template-columns:1fr;}
          .cta-section{margin:0 20px 80px;padding:60px 32px;clip-path:none;}.cta-inner{flex-direction:column;align-items:flex-start;gap:36px;}.btn-cta{margin-right:0;}
          .footer{padding:60px 32px 40px;}.footer-top{grid-template-columns:1fr 1fr;gap:40px;}
          .how-section{padding:80px 32px;}
          .nav{padding:20px 24px;}.nav.scrolled{padding:16px 24px;}.nav-links{display:none;}
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${navScrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="nav-logo">بلِّغ<span className="logo-dot"/></Link>
        <ul className="nav-links">
          <li><Link href="#features">المميزات</Link></li>
          <li><Link href="#how-it-works">كيف يعمل</Link></li>
          <li><Link href="/safety">الأمان</Link></li>
        </ul>
        <div className="nav-cta">
          {isLoggedIn ? (
            <Link href="/dashboard" className="btn-primary">لوحة التحكم</Link>
          ) : (
            <>
              <Link href="/login" className="btn-ghost">دخول</Link>
              <Link href="/register" className="btn-primary">ابدأ مجاناً</Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="eyebrow-line"/>
            <span className="eyebrow-text">المنصة العربية للمصارحة</span>
          </div>
          <h1 className="hero-title">
            الحقيقة<br/>
            <em>تستحق</em><br/>
            <span className="outline">أن تُقال.</span>
          </h1>
          <p className="hero-desc">
            بلِّغ تتيح لمن حولك مشاركة رأيهم الحقيقي فيك بشكل مجهول تام. رابط واحد، صراحة بلا قيود، وسرية مضمونة بالهندسة لا بالوعود.
          </p>
          <div className="hero-actions">
            <Link href={isLoggedIn ? '/dashboard' : '/register'} className="btn-hero-main">
              احصل على رابطك
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <strong className="hero-count">+150,000</strong>
              <span className="hero-count">مستخدم نشط</span>
            </div>
          </div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <div className="hero-grid"/>
          <div className="hero-big-num">1</div>
          <div className="hero-card card-msg">
            <div className="card-msg-label">رسالة مجهولة جديدة</div>
            <div className="card-msg-text">أسلوبك في الكلام بيريّح جداً وده اللي خلاني أثق فيك من أول يوم.</div>
            <div className="card-msg-time">منذ لحظة · مجهول</div>
          </div>
          <div className="hero-card card-stat">
            <div className="card-stat-num">98%</div>
            <div className="card-stat-label">نسبة الرضا</div>
          </div>
          <div className="hero-vtext">BALLEGH · AR PLATFORM · 2025</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {[...Array(2)].map((_,i) => (
            <div key={i} style={{display:'flex'}}>
              {['سرية تامة','بلا هوية','صراحة حقيقية','آمن ومحمي','اعرف رأيهم','بلا قيود','سرية تامة','بلا هوية','صراحة حقيقية'].map((t,j) => (
                <div className="marquee-item" key={j}>{t}<span className="marquee-sep"/></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="features-section">
        <div className="section-header">
          <div>
            <div className="section-label">ما يميّزنا</div>
            <h2 className="section-title">بُنيت للصراحة.<br/><em>بالتفصيل.</em></h2>
          </div>
          <p className="section-note">كل تفصيلة في المنصة صُممت بعناية لضمان تجربة مصارحة حقيقية وآمنة.</p>
        </div>
        <div className="features-grid">
          <div className="feat-card feat-1">
            <div className="feat-num">01</div>
            <h3 className="feat-title">سرية مضمونة<br/>بالهندسة</h3>
            <p className="feat-desc">الخصوصية ليست وعداً — هي تصميم. لا يوجد سجل لهوية المرسل في قاعدة البيانات أصلاً. حتى نحن لا نستطيع معرفة من أرسل.</p>
            <div className="feat-icon">⬡</div>
          </div>
          <div className="feat-card feat-2">
            <div className="feat-num">02</div>
            <h3 className="feat-title">رابط يُشارَك<br/>في ثانية</h3>
            <p className="feat-desc">رابطك جاهز فوراً. ضعه في الستوري أو البايو ويفتح بشكل مثالي على كل الأجهزة.</p>
            <div className="feat-icon" style={{color:'rgba(10,10,8,.2)'}}>↑</div>
          </div>
          <div className="feat-card feat-3">
            <div className="feat-num">03</div>
            <h3 className="feat-title">تحكم<br/>كامل</h3>
            <p className="feat-desc">احذف ما تريد، أغلق الاستقبال متى شئت.</p>
          </div>
          <div className="feat-card feat-4">
            <div className="feat-num">04</div>
            <h3 className="feat-title">بلا<br/>إعلانات</h3>
            <p className="feat-desc">تجربة نظيفة بدون ضوضاء بصرية.</p>
          </div>
          <div className="feat-card feat-5">
            <div className="feat-num">05</div>
            <h3 className="feat-title">عربي<br/>خالص</h3>
            <p className="feat-desc">صُمّم للمستخدم العربي، بكل تفاصيله.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="how-section">
        <div className="how-inner">
          <div className="section-label">في ثلاث خطوات</div>
          <h2 className="section-title">الطريق إلى<br/><em>الصراحة</em></h2>
          <div className="steps-container">
            {[
              { n:'١', t:'أنشئ حسابك', d:'سجّل في ثوانٍ واحصل على رابطك الفريد. لا بيانات حساسة، لا تعقيد.' },
              { n:'٢', t:'شارك رابطك', d:'ضع الرابط في ستوريهات إنستجرام أو سناب أو أي مكان. كلما زاد الانتشار زادت الصراحة.' },
              { n:'٣', t:'استقبل الحقيقة', d:'الرسائل تصلك في لوحة تحكم أنيقة. اقرأ، احتفظ بما يهمك، احذف ما لا تريده.' },
            ].map((s,i) => (
              <div className="step" key={i}>
                <div className="step-num">{s.n}</div>
                <h3 className="step-title">{s.t}</h3>
                <p className="step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="section-label">يقولون عنّا</div>
        <h2 className="section-title">الصراحة<br/><em>تُغيّر.</em></h2>
        <div className="testi-grid">
          {[
            { cls:'testi-main', text:'أول مرة في حياتي أعرف إن ناس كانوا شايفين فيّا حاجة معينة من زمان ومش قادرين يقولوها. بلِّغ فتح باباً كنت مستنيه من سنين.', name:'سارة محمود', role:'طالبة جامعية · القاهرة', img:21 },
            { cls:'testi-alt', text:'استخدمته مع فريق العمل عشان نعرف آراؤهم الحقيقية في أسلوب الإدارة. النتائج كانت مفيدة جداً وغيرت طريقة تفكيري كمدير.', name:'أحمد الشريف', role:'مدير مشاريع · الرياض', img:55 },
          ].map((t,i) => (
            <div className={`testi-card ${t.cls}`} key={i}>
              <div className="testi-quote">"</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <img src={`https://i.pravatar.cc/100?img=${t.img}`} alt={t.name} className="testi-avatar"/>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-inner">
          <div>
            <h2 className="cta-title">جاهز تسمع<br/><em>الحقيقة؟</em></h2>
            <p className="cta-sub">رابطك جاهز في أقل من دقيقة. مجاناً تماماً.</p>
          </div>
          <Link href={isLoggedIn ? '/dashboard' : '/register'} className="btn-cta">ابدأ الآن — مجاناً</Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-brand">بلِّغ<span className="logo-dot"/></Link>
            <p className="footer-desc">المنصة العربية الأولى للمصارحة المجهولة. نبني جسور الصدق في بيئة آمنة وإنسانية.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/elsayedabdulrahman685" className="social-link" aria-label="إنستجرام">IG</a>
              <a href="https://www.facebook.com/profile.php?id=61583357297391" className="social-link" aria-label="فيسبوك">FB</a>
              <a href="https://www.tiktok.com/@abdulrhmanelbaty" className="social-link" aria-label="تيك توك">TK</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">المنصة</div>
            <ul className="footer-links">
              <li><Link href="/">الرئيسية</Link></li>
              <li><Link href="#features">المميزات</Link></li>
              <li><Link href="/register">إنشاء حساب</Link></li>
              <li><Link href="/faq">الأسئلة الشائعة</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">قانوني</div>
            <ul className="footer-links">
              <li><Link href="/privacy">سياسة الخصوصية</Link></li>
              <li><Link href="/terms">شروط الاستخدام</Link></li>
              <li><Link href="/safety">الأمان</Link></li>
              <li><Link href="/cookies">سياسة الكوكيز</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">تواصل معنا</div>
            <div className="footer-contact-box">
              <span className="footer-contact-label">الدعم الفني</span>
              <a href="mailto:gamotek8@gmail.com" className="footer-contact-email">gamotek8@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} بلِّغ — جميع الحقوق محفوظة</span>
        </div>
      </footer>
    </>
  );
}
