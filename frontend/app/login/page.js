"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '../../utils/axios';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', formData);
      toast.success('أهلاً بك مجدداً!');
      localStorage.setItem('token', response.data.data.token);
      document.cookie = `token=${response.data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'البريد أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=Cairo:wght@400;500;700;900&display=swap');
        :root{--ink:#0a0a08;--cream:#f5f0e8;--gold:#c9a84c;--smoke:#1e1e1a;--smoke-2:#2a2a25;--border:rgba(201,168,76,0.12);--text-muted:rgba(245,240,232,0.4);--text-mid:rgba(245,240,232,0.65);}
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
        .sub{font-size:14px;color:var(--text-muted);line-height:1.8;font-weight:500;position:relative;z-index:2;}
        .bg-num{position:absolute;bottom:-80px;left:-20px;font-family:'Playfair Display',serif;font-size:280px;font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.06);line-height:1;user-select:none;pointer-events:none;}

        .right{padding:80px 64px;background:var(--smoke);border-right:1px solid var(--border);display:flex;flex-direction:column;justify-content:center;}
        .card-label{font-size:11px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
        .card-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;margin-bottom:6px;}
        .card-desc{font-size:13px;color:var(--text-muted);margin-bottom:36px;line-height:1.7;font-weight:500;}

        .form-group{margin-bottom:18px;}
        .form-label{display:block;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-mid);margin-bottom:8px;}
        .form-input{width:100%;padding:14px 18px;background:rgba(245,240,232,.04);border:1px solid var(--border);color:var(--cream);font-family:'Cairo',sans-serif;font-size:14px;font-weight:500;outline:none;transition:all .3s;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);}
        .form-input:focus{border-color:var(--gold);background:rgba(201,168,76,.04);}
        .form-input::placeholder{color:rgba(245,240,232,.2);}

        .forgot-link{display:block;text-align:left;font-size:12px;font-weight:700;color:var(--text-muted);text-decoration:none;margin-top:6px;transition:color .3s;}
        .forgot-link:hover{color:var(--gold);}

        .btn{display:flex;align-items:center;justify-content:center;width:100%;padding:16px 32px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:14px;font-weight:900;letter-spacing:.08em;border:none;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .3s;margin-top:20px;}
        .btn:hover:not(:disabled){background:var(--cream);transform:translateY(-2px);}
        .btn:disabled{opacity:.4;cursor:not-allowed;}

        .footer-text{font-size:13px;color:var(--text-muted);font-weight:500;margin-top:24px;text-align:center;}
        .footer-text a{color:var(--gold);font-weight:700;text-decoration:none;}
        .footer-text a:hover{opacity:.7;}

        @media(max-width:768px){.page{grid-template-columns:1fr;}.left{display:none;}.right{padding:48px 24px;min-height:100vh;}}
      `}</style>

      <div className="page">
        <div className="left">
          <Link href="/" className="brand">بلِّغ<span className="dot"/></Link>
          <h1 className="tagline">عُد لصندوق<br/><em>الحقيقة.</em></h1>
          <p className="sub">لوحة تحكمك تنتظرك. الرسائل الجديدة وصلت.</p>
          <div className="bg-num">↩</div>
        </div>

        <div className="right">
          <div className="card-label">بوابة الدخول</div>
          <h2 className="card-title">تسجيل الدخول</h2>
          <p className="card-desc">أدخل بياناتك للوصول إلى رسائلك السرية.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                dir="ltr"
              />
              <Link href="/forgot-password" className="forgot-link">نسيت كلمة المرور؟</Link>
            </div>

            <button type="submit" disabled={loading} className="btn">
              {loading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>

          <p className="footer-text">
            ليس لديك حساب؟ <Link href="/register">أنشئ حساباً الآن</Link>
          </p>
        </div>
      </div>
    </>
  );
}
