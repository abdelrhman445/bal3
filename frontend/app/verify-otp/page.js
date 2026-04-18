"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '../../utils/axios';

export default function VerifyOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('tempEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      toast.error('لم يتم العثور على بيانات التسجيل');
      router.push('/register');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      toast.success('تم تفعيل الحساب بنجاح!');
      localStorage.removeItem('tempEmail');
      localStorage.setItem('token', response.data.data.token);
      document.cookie = `token=${response.data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'الكود غير صحيح أو انتهت صلاحيته');
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

        .page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;position:relative;}
        .page::before{content:'';position:absolute;inset:0;background:linear-gradient(rgba(201,168,76,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.04) 1px,transparent 1px);background-size:48px 48px;}

        .card{width:100%;max-width:480px;background:var(--smoke);border:1px solid var(--border);padding:52px 48px;position:relative;z-index:2;}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}

        .brand{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;color:var(--cream);text-decoration:none;letter-spacing:-.03em;display:flex;align-items:center;gap:8px;margin-bottom:48px;}
        .dot{width:7px;height:7px;background:var(--gold);border-radius:50%;animation:pulse 2.5s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.6);opacity:.5;}}

        .step-wrap{display:flex;align-items:center;gap:8px;margin-bottom:32px;}
        .step-item{display:flex;align-items:center;justify-content:center;width:28px;height:28px;background:rgba(201,168,76,.1);border:1px solid var(--border);font-size:11px;font-weight:900;color:var(--text-muted);clip-path:polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);transition:all .3s;}
        .step-item.done{background:rgba(201,168,76,.2);color:var(--gold);border-color:rgba(201,168,76,.3);}
        .step-item.active{background:var(--gold);color:var(--ink);border-color:var(--gold);}
        .step-line{flex:1;height:1px;background:var(--border);}

        .card-label{font-size:11px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
        .card-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;margin-bottom:8px;}
        .card-desc{font-size:13px;color:var(--text-muted);margin-bottom:36px;line-height:1.7;font-weight:500;}
        .email-highlight{font-weight:900;color:var(--cream);font-family:monospace;direction:ltr;display:inline-block;}

        .otp-input{width:100%;text-align:center;font-size:2.2rem;letter-spacing:.5em;padding:18px;background:rgba(245,240,232,.04);border:1px solid var(--border);color:var(--cream);font-family:monospace;font-weight:700;outline:none;transition:all .3s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);margin-bottom:24px;}
        .otp-input:focus{border-color:var(--gold);background:rgba(201,168,76,.04);}
        .otp-input::placeholder{color:rgba(245,240,232,.15);}

        .btn{display:flex;align-items:center;justify-content:center;width:100%;padding:16px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:14px;font-weight:900;letter-spacing:.08em;border:none;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .3s;}
        .btn:hover:not(:disabled){background:var(--cream);transform:translateY(-2px);}
        .btn:disabled{opacity:.4;cursor:not-allowed;}

        .back-link{display:block;text-align:center;margin-top:20px;font-size:13px;font-weight:700;color:var(--text-muted);text-decoration:none;transition:color .3s;}
        .back-link:hover{color:var(--gold);}
      `}</style>

      <div className="page">
        <div className="card">
          <Link href="/" className="brand">بلِّغ<span className="dot"/></Link>

          <div className="step-wrap">
            <div className="step-item done">١</div>
            <div className="step-line"/>
            <div className="step-item active">٢</div>
            <div className="step-line"/>
            <div className="step-item">٣</div>
          </div>

          <div className="card-label">تفعيل الحساب</div>
          <h2 className="card-title">أدخل كود التحقق</h2>
          <p className="card-desc">
            أرسلنا كوداً مكوناً من 6 أرقام إلى{' '}
            <span className="email-highlight">{email}</span>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              maxLength="6"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              className="otp-input"
              placeholder="——————"
              dir="ltr"
            />

            <button type="submit" disabled={loading || otp.length !== 6} className="btn">
              {loading ? 'جاري التحقق...' : 'تأكيد وتفعيل الحساب'}
            </button>
          </form>

          <Link href="/register" className="back-link">← العودة للتسجيل</Link>
        </div>
      </div>
    </>
  );
}
