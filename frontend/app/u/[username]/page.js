// المسار: app/u/[username]/page.js
"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '../../../utils/axios';

export default function SendMessagePage() {
  const params = useParams();
  const username = params.username;

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error('لا يمكنك إرسال رسالة فارغة!');
    setLoading(true);
    try {
      await api.post(`/messages/send/${username}`, { content });
      setIsSent(true);
      toast.success('تم الإرسال بنجاح!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setLoading(false);
    }
  };

  const sharedStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=Cairo:wght@400;500;700;900&display=swap');
    :root{--ink:#0a0a08;--cream:#f5f0e8;--gold:#c9a84c;--smoke:#1e1e1a;--smoke-2:#2a2a25;--border:rgba(201,168,76,0.12);--text-muted:rgba(245,240,232,0.4);--text-mid:rgba(245,240,232,0.65);}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{direction:rtl;}
    body{background:var(--ink);color:var(--cream);font-family:'Cairo',sans-serif;-webkit-font-smoothing:antialiased;}
    ::selection{background:var(--gold);color:var(--ink);}
    body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");opacity:.03;pointer-events:none;z-index:9999;}

    .page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;position:relative;}
    .page::before{content:'';position:absolute;inset:0;background:linear-gradient(rgba(201,168,76,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.04) 1px,transparent 1px);background-size:48px 48px;}

    .brand{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:900;color:var(--cream);text-decoration:none;letter-spacing:-.03em;display:flex;align-items:center;gap:8px;margin-bottom:36px;}
    .dot{width:7px;height:7px;background:var(--gold);border-radius:50%;animation:pulse 2.5s ease-in-out infinite;}
    @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.6);opacity:.5;}}
  `;

  if (isSent) {
    return (
      <>
        <style>{sharedStyles + `
          .card{width:100%;max-width:480px;background:var(--smoke);border:1px solid var(--border);padding:60px 48px;text-align:center;position:relative;z-index:2;}
          .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
          .success-icon{width:72px;height:72px;background:rgba(201,168,76,.1);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);font-size:2rem;}
          .success-title{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;color:var(--cream);margin-bottom:10px;letter-spacing:-.02em;}
          .success-sub{font-size:14px;color:var(--text-muted);font-weight:500;margin-bottom:36px;line-height:1.7;}
          .send-again{display:inline-flex;align-items:center;padding:13px 28px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:13px;font-weight:900;border:none;cursor:pointer;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all .3s;}
          .send-again:hover{background:var(--cream);}
          .footer-area{margin-top:28px;}
          .footer-text{font-size:12px;color:var(--text-muted);font-weight:500;margin-bottom:8px;}
          .footer-link{font-size:13px;font-weight:900;color:var(--gold);text-decoration:none;letter-spacing:.05em;}
          .footer-link:hover{opacity:.7;}
        `}</style>
        <div className="page">
          <div className="card">
            <Link href="/" className="brand">بلِّغ<span className="dot"/></Link>
            <div className="success-icon">✓</div>
            <h2 className="success-title">وصلت رسالتك بأمان!</h2>
            <p className="success-sub">
              تم إرسال رسالتك لـ <strong>@{username}</strong> بشكل مجهول تام.
              لن يعرف أحد هويتك أبداً.
            </p>
            <button onClick={() => { setIsSent(false); setContent(''); }} className="send-again">
              إرسال رسالة أخرى
            </button>
            <div className="footer-area">
              <p className="footer-text">هل تريد استقبال رسائل مجهولة أنت أيضاً؟</p>
              <Link href="/register" className="footer-link">أنشئ حسابك الآن — مجاناً ←</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{sharedStyles + `
        .wrap{width:100%;max-width:500px;position:relative;z-index:2;}
        .card-top{background:var(--smoke-2);border:1px solid var(--border);border-bottom:none;padding:36px;position:relative;overflow:hidden;}
        .card-top::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
        .top-label{font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
        .top-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;margin-bottom:6px;}
        .top-user{font-size:.95rem;font-weight:700;color:var(--gold);font-family:monospace;direction:ltr;display:inline-block;}
        .top-bg{position:absolute;bottom:-20px;left:-10px;font-family:'Playfair Display',serif;font-size:120px;font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.06);user-select:none;pointer-events:none;line-height:1;}

        .card-body{background:var(--smoke);border:1px solid var(--border);padding:36px;}
        .textarea{width:100%;padding:16px 18px;background:rgba(245,240,232,.04);border:1px solid var(--border);color:var(--cream);font-family:'Cairo',sans-serif;font-size:14px;font-weight:500;line-height:1.8;resize:none;outline:none;transition:all .3s;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);display:block;margin-bottom:14px;}
        .textarea:focus{border-color:var(--gold);background:rgba(201,168,76,.03);}
        .textarea::placeholder{color:rgba(245,240,232,.2);}
        .char-count{font-size:11px;color:var(--text-muted);font-weight:700;text-align:left;margin-bottom:16px;letter-spacing:.05em;font-family:monospace;}
        .privacy-note{display:flex;align-items:center;justify-content:center;gap:8px;font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:20px;letter-spacing:.05em;}

        .btn{display:flex;align-items:center;justify-content:center;width:100%;padding:16px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:14px;font-weight:900;letter-spacing:.08em;border:none;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .3s;}
        .btn:hover:not(:disabled){background:var(--cream);transform:translateY(-2px);}
        .btn:disabled{opacity:.4;cursor:not-allowed;}

        .footer-area{text-align:center;margin-top:28px;}
        .footer-text{font-size:12px;color:var(--text-muted);font-weight:500;margin-bottom:6px;}
        .footer-link{font-size:13px;font-weight:900;color:var(--gold);text-decoration:none;}
        .footer-link:hover{opacity:.7;}
      `}</style>

      <div className="page">
        <div className="wrap">
          <Link href="/" className="brand">بلِّغ<span className="dot"/></Link>

          <div className="card-top">
            <div className="top-label">رسالة مجهولة</div>
            <h1 className="top-title">أرسل رسالة سرية إلى</h1>
            <div className="top-user">@{username}</div>
            <div className="top-bg">✉</div>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="5"
                placeholder="اكتب رسالتك هنا... لن يعرف أحد هويتك"
                className="textarea"
                required
                maxLength={500}
              />
              <div className="char-count">{content.length}/500</div>

              <div className="privacy-note">
                ⬡ جميع الرسائل مجهولة المصدر ومشفرة بالكامل
              </div>

              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="btn"
              >
                {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>

          <div className="footer-area">
            <p className="footer-text">هل تريد استقبال رسائل مجهولة أنت أيضاً؟</p>
            <Link href="/register" className="footer-link">أنشئ حسابك الآن — مجاناً ←</Link>
          </div>
        </div>
      </div>
    </>
  );
}