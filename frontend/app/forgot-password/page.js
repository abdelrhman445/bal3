"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '../../utils/axios';

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', { email });
      toast.success(response.data.message || 'تم إرسال كود الاسترجاع!');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'لم يتم العثور على حساب بهذا البريد');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, otp, newPassword });
      toast.success('تم تغيير كلمة المرور بنجاح!');
      router.push('/login');
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

        .form-group{margin-bottom:18px;}
        .form-label{display:block;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-mid);margin-bottom:8px;}
        .form-input{width:100%;padding:14px 18px;background:rgba(245,240,232,.04);border:1px solid var(--border);color:var(--cream);font-family:'Cairo',sans-serif;font-size:14px;font-weight:500;outline:none;transition:all .3s;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);}
        .form-input:focus{border-color:var(--gold);background:rgba(201,168,76,.04);}
        .form-input::placeholder{color:rgba(245,240,232,.2);}

        .otp-input{width:100%;text-align:center;font-size:2rem;letter-spacing:.5em;padding:16px;background:rgba(245,240,232,.04);border:1px solid var(--border);color:var(--cream);font-family:monospace;font-weight:700;outline:none;transition:all .3s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);}
        .otp-input:focus{border-color:var(--gold);background:rgba(201,168,76,.04);}
        .otp-input::placeholder{color:rgba(245,240,232,.15);}

        .btn{display:flex;align-items:center;justify-content:center;width:100%;padding:16px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:14px;font-weight:900;letter-spacing:.08em;border:none;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .3s;margin-top:20px;}
        .btn:hover:not(:disabled){background:var(--cream);transform:translateY(-2px);}
        .btn:disabled{opacity:.4;cursor:not-allowed;}

        .back-btn{background:none;border:none;font-family:'Cairo',sans-serif;font-size:13px;font-weight:700;color:var(--text-muted);cursor:pointer;transition:color .3s;padding:0;margin-top:8px;display:flex;align-items:center;gap:6px;}
        .back-btn:hover{color:var(--gold);}

        .back-link{display:block;text-align:center;margin-top:20px;font-size:13px;font-weight:700;color:var(--text-muted);text-decoration:none;transition:color .3s;}
        .back-link:hover{color:var(--gold);}
      `}</style>

      <div className="page">
        <div className="card">
          <Link href="/" className="brand">بلِّغ<span className="dot"/></Link>

          <div className="step-wrap">
            <div className={`step-item ${step >= 1 ? (step > 1 ? 'done' : 'active') : ''}`}>١</div>
            <div className="step-line"/>
            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>٢</div>
          </div>

          {step === 1 && (
            <>
              <div className="card-label">استعادة الحساب</div>
              <h2 className="card-title">نسيت كلمة المرور؟</h2>
              <p className="card-desc">أدخل بريدك المسجل وسنرسل لك كود الاسترجاع فوراً.</p>

              <form onSubmit={handleSendOTP}>
                <div className="form-group">
                  <label className="form-label">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="example@gmail.com"
                    dir="ltr"
                  />
                </div>

                <button type="submit" disabled={loading || !email} className="btn">
                  {loading ? 'جاري الإرسال...' : 'إرسال كود الاسترجاع'}
                </button>
              </form>

              <Link href="/login" className="back-link">← العودة لتسجيل الدخول</Link>
            </>
          )}

          {step === 2 && (
            <>
              <button className="back-btn" onClick={() => setStep(1)}>← تعديل البريد</button>
              <br/>
              <div className="card-label">تعيين كلمة مرور جديدة</div>
              <h2 className="card-title">أدخل الكود والكلمة الجديدة</h2>
              <p className="card-desc">أدخل الكود المرسل لبريدك ثم كلمة المرور الجديدة.</p>

              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label className="form-label">كود التحقق (OTP)</label>
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
                </div>

                <div className="form-group">
                  <label className="form-label">كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    required
                    minLength="6"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>

                <button type="submit" disabled={loading || otp.length !== 6 || newPassword.length < 6} className="btn">
                  {loading ? 'جاري الحفظ...' : 'حفظ كلمة المرور الجديدة'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
