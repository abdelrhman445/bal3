"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '../../utils/axios';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false); // حالة الشيك بوكس الجديدة

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return; // حماية إضافية

    setLoading(true);
    try {
      const response = await api.post('/auth/register', formData);
      toast.success(response.data.message || 'تم التسجيل! تفقد بريدك للكود.');
      localStorage.setItem('tempEmail', formData.email);
      router.push('/verify-otp');
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء التسجيل');
    } finally {
      setLoading(false);
    }
  };

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

        .page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;}
        .left{padding:80px 64px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
        .left::before{content:'';position:absolute;inset:0;background:linear-gradient(rgba(201,168,76,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.05) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;}
        .brand{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:900;color:var(--cream);text-decoration:none;letter-spacing:-.03em;display:flex;align-items:center;gap:10px;margin-bottom:60px;position:relative;z-index:2;}
        .dot{width:8px;height:8px;background:var(--gold);border-radius:50%;animation:pulse 2.5s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.6);opacity:.5;}}
        .tagline{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.5vw,3.2rem);font-weight:900;color:var(--cream);line-height:1.05;letter-spacing:-.03em;margin-bottom:20px;position:relative;z-index:2;}
        .tagline em{font-style:italic;color:var(--gold);}
        .sub{font-size:14px;color:var(--text-muted);line-height:1.8;font-weight:500;position:relative;z-index:2;max-width:340px;}
        .bg-num{position:absolute;bottom:-80px;left:-20px;font-family:'Playfair Display',serif;font-size:280px;font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.06);line-height:1;user-select:none;pointer-events:none;}

        .perks{display:flex;flex-direction:column;gap:16px;margin-top:40px;position:relative;z-index:2;}
        .perk{display:flex;align-items:center;gap:12px;font-size:13px;font-weight:700;color:var(--text-mid);}
        .perk-dot{width:6px;height:6px;background:var(--gold);border-radius:50%;flex-shrink:0;}

        .right{padding:80px 64px;background:var(--smoke);border-right:1px solid var(--border);display:flex;flex-direction:column;justify-content:center;}
        .card-label{font-size:11px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
        .card-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;margin-bottom:6px;}
        .card-desc{font-size:13px;color:var(--text-muted);margin-bottom:36px;line-height:1.7;font-weight:500;}

        .form-group{margin-bottom:18px;}
        .form-label{display:block;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-mid);margin-bottom:8px;}
        .form-input{width:100%;padding:14px 18px;background:rgba(245,240,232,.04);border:1px solid var(--border);color:var(--cream);font-family:'Cairo',sans-serif;font-size:14px;font-weight:500;outline:none;transition:all .3s;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);}
        .form-input:focus{border-color:var(--gold);background:rgba(201,168,76,.04);}
        .form-input::placeholder{color:rgba(245,240,232,.2);}

        /* ستايل الشيك بوكس الجديد */
        .checkbox-wrapper{display:flex;align-items:flex-start;gap:12px;margin-bottom:24px;margin-top:10px;}
        .checkbox-input{appearance:none;width:18px;height:18px;border:1px solid rgba(201,168,76,0.4);border-radius:2px;background:transparent;cursor:pointer;position:relative;flex-shrink:0;margin-top:2px;transition:all .2s;}
        .checkbox-input:checked{background:var(--gold) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230a0a08' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E") center/75% no-repeat;border-color:var(--gold);}
        .checkbox-label{font-size:12px;font-weight:500;color:var(--text-mid);line-height:1.7;cursor:pointer;user-select:none;}
        .checkbox-label a{color:var(--gold);text-decoration:none;font-weight:700;transition:opacity .3s;}
        .checkbox-label a:hover{opacity:.7;}

        .btn{display:flex;align-items:center;justify-content:center;width:100%;padding:16px 32px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:14px;font-weight:900;letter-spacing:.08em;border:none;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .3s;}
        .btn:hover:not(:disabled){background:var(--cream);transform:translateY(-2px);}
        .btn:disabled{opacity:.3;cursor:not-allowed;filter:grayscale(100%);}

        .footer-text{font-size:13px;color:var(--text-muted);font-weight:500;margin-top:24px;text-align:center;}
        .footer-text a{color:var(--gold);font-weight:700;text-decoration:none;}
        .footer-text a:hover{opacity:.7;}

        @media(max-width:768px){.page{grid-template-columns:1fr;}.left{display:none;}.right{padding:48px 24px;min-height:100vh;}}
      `}</style>

      <div className="page">
        <div className="left">
          <Link href="/" className="brand">بلِّغ<span className="dot"/></Link>
          <h1 className="tagline">ابدأ رحلتك<br/>نحو <em>الصراحة.</em></h1>
          <p className="sub">احصل على رابطك الخاص واستقبل الحقيقة من من تعرفهم — بشكل مجهول تام.</p>
          <div className="perks">
            <div className="perk"><span className="perk-dot"/>مجاني تماماً بدون رسوم مخفية</div>
            <div className="perk"><span className="perk-dot"/>هوية المرسل مجهولة 100%</div>
            <div className="perk"><span className="perk-dot"/>رابطك جاهز فوراً بعد التسجيل</div>
          </div>
          <div className="bg-num">∞</div>
        </div>

        <div className="right">
          <div className="card-label">إنشاء حساب جديد</div>
          <h2 className="card-title">سجّل مجاناً</h2>
          <p className="card-desc">أنشئ حسابك في ثوانٍ واحصل على رابطك الشخصي.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">اسم المستخدم</label>
              <input
                type="text"
                name="username"
                required
                onChange={handleChange}
                className="form-input"
                placeholder="ahmed123"
                dir="ltr"
              />
            </div>

            <div className="form-group">
              <label className="form-label">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="form-input"
                placeholder="example@gmail.com"
                dir="ltr"
              />
            </div>

            <div className="form-group">
              <label className="form-label">كلمة المرور</label>
              <input
                type="password"
                name="password"
                required
                minLength="6"
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>

            {/* الشيك بوكس الجديد */}
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="terms-checkbox"
                className="checkbox-input"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="terms-checkbox" className="checkbox-label">
                لقد قرأت وأوافق على <Link href="/terms">شروط الاستخدام</Link> و <Link href="/privacy">سياسة الخصوصية</Link> و <Link href="/cookies">سياسة الكوكيز</Link>.
              </label>
            </div>

            {/* تم تحديث الـ disabled عشان يمنع التسجيل لو مش متعلم عليه */}
            <button type="submit" disabled={loading || !agreed} className="btn">
              {loading ? 'جاري التسجيل...' : 'إنشاء الحساب'}
            </button>
          </form>

          <p className="footer-text">
            لديك حساب؟ <Link href="/login">سجّل الدخول</Link>
          </p>
        </div>
      </div>
    </>
  );
}