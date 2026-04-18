"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '../../utils/axios';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({ username: '', email: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!userData || !token) { router.push('/login'); return; }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setProfileData({ username: parsedUser.username, email: parsedUser.email });
  }, [router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    try {
      await api.put('/auth/update-profile', profileData);
      toast.success('تم تحديث بياناتك بنجاح!');
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ أو أن اسم المستخدم محجوز');
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);
    try {
      await api.put('/auth/update-profile', passwords);
      toast.success('تم تغيير كلمة المرور بأمان');
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'كلمة المرور الحالية غير صحيحة');
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('هل أنت متأكد من حذف حسابك نهائياً؟ سيتم مسح جميع رسائلك ولن تتمكن من استرجاعها!')) return;
    setLoadingDelete(true);
    try {
      await api.delete('/auth/delete-account');
      toast.success('تم حذف الحساب وجميع البيانات نهائياً');
      localStorage.clear();
      router.push('/register');
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء حذف الحساب');
      setLoadingDelete(false);
    }
  };

  // دالة تسجيل الخروج فصلناها عشان نستخدمها في الناف السفلي والجانبي
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push('/login');
  };

  if (!user) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Cairo:wght@400;500;700;900&display=swap');
        :root{--ink:#0a0a08;--cream:#f5f0e8;--gold:#c9a84c;--smoke:#1e1e1a;--smoke-2:#2a2a25;--border:rgba(201,168,76,0.12);--text-muted:rgba(245,240,232,0.4);--text-mid:rgba(245,240,232,0.65);--mist:rgba(245,240,232,0.06);}
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{direction:rtl;}
        body{background:var(--ink);color:var(--cream);font-family:'Cairo',sans-serif;-webkit-font-smoothing:antialiased;}
        ::selection{background:var(--gold);color:var(--ink);}
        body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");opacity:.03;pointer-events:none;z-index:9999;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--ink);}::-webkit-scrollbar-thumb{background:var(--gold);}

        .layout{min-height:100vh;display:grid;grid-template-columns:260px 1fr;}

        .sidebar{background:var(--smoke);border-left:1px solid var(--border);padding:40px 0;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;}
        .sb-brand{font-family:'Playfair Display',serif;font-size:1.7rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;text-decoration:none;display:flex;align-items:center;gap:8px;padding:0 28px 36px;border-bottom:1px solid var(--border);margin-bottom:28px;}
        .dot{width:7px;height:7px;background:var(--gold);border-radius:50%;animation:pulse 2.5s ease-in-out infinite;flex-shrink:0;}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.6);opacity:.5;}}
        .sb-nav{list-style:none;padding:0 12px;flex:1;}
        .sb-nav li{margin-bottom:4px;}
        .sb-link,.sb-btn{display:flex;align-items:center;gap:10px;padding:11px 16px;font-size:13px;font-weight:700;color:var(--text-muted);text-decoration:none;background:none;border:none;width:100%;cursor:pointer;font-family:'Cairo',sans-serif;transition:all .25s;border-right:2px solid transparent;letter-spacing:.02em;}
        .sb-link:hover,.sb-btn:hover{color:var(--cream);background:var(--mist);border-right-color:var(--gold);}
        .sb-link.active{color:var(--gold);background:rgba(201,168,76,.08);border-right-color:var(--gold);}
        .sb-danger{color:rgba(224,112,96,.5)!important;}
        .sb-danger:hover{color:#e07060!important;background:rgba(184,76,54,.08)!important;border-right-color:#b84c36!important;}
        .sb-divider{height:1px;background:var(--border);margin:12px 28px;}
        .sb-user{padding:20px 28px 0;border-top:1px solid var(--border);margin-top:auto;}
        .sb-user-name{font-size:13px;font-weight:900;color:var(--cream);margin-bottom:2px;}
        .sb-user-role{font-size:11px;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;}

        .main{padding:48px;max-width:720px;}
        .page-label{font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;}
        .page-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;margin-bottom:40px;}

        .section{background:var(--smoke);border:1px solid var(--border);padding:36px;margin-bottom:14px;position:relative;}
        .section::before{content:'';position:absolute;top:0;right:0;width:40px;height:2px;background:var(--gold);}
        .section.danger{background:rgba(184,76,54,.06);border-color:rgba(184,76,54,.2);}
        .section.danger::before{background:#b84c36;}
        .sec-title{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--cream);margin-bottom:6px;letter-spacing:-.02em;}
        .sec-desc{font-size:13px;color:var(--text-muted);margin-bottom:28px;font-weight:500;line-height:1.6;}

        .form-group{margin-bottom:18px;}
        .form-label{display:block;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-mid);margin-bottom:8px;}
        .form-input{width:100%;padding:13px 18px;background:rgba(245,240,232,.04);border:1px solid var(--border);color:var(--cream);font-family:'Cairo',sans-serif;font-size:14px;font-weight:500;outline:none;transition:all .3s;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);}
        .form-input:focus{border-color:var(--gold);background:rgba(201,168,76,.04);}
        .form-input::placeholder{color:rgba(245,240,232,.2);}

        .btn-gold{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 28px;background:var(--gold);color:var(--ink);font-family:'Cairo',sans-serif;font-size:13px;font-weight:900;letter-spacing:.06em;border:none;cursor:pointer;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all .3s;}
        .btn-gold:hover:not(:disabled){background:var(--cream);transform:translateY(-1px);}
        .btn-gold:disabled{opacity:.4;cursor:not-allowed;}

        .btn-dark{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 28px;background:rgba(245,240,232,.07);color:var(--cream);border:1px solid var(--border);font-family:'Cairo',sans-serif;font-size:13px;font-weight:900;letter-spacing:.06em;cursor:pointer;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all .3s;}
        .btn-dark:hover:not(:disabled){border-color:rgba(201,168,76,.4);color:var(--gold);}
        .btn-dark:disabled{opacity:.4;cursor:not-allowed;}

        .btn-danger{display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 28px;background:rgba(184,76,54,.12);color:#e07060;border:1px solid rgba(184,76,54,.25);font-family:'Cairo',sans-serif;font-size:13px;font-weight:900;cursor:pointer;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);transition:all .3s;}
        .btn-danger:hover:not(:disabled){background:rgba(184,76,54,.25);color:#ff8070;}
        .btn-danger:disabled{opacity:.4;cursor:not-allowed;}

        /* --- إعدادات الموبايل والناف السُفلي --- */
        .mobile-nav{display:none;}

        @media(max-width:768px){
          .layout{grid-template-columns:1fr;}
          .sidebar{display:none;}
          .main{padding:24px 16px 100px;} /* padding-bottom عشان المحتوى ميختفيش */

          /* ستايل الشريط السفلي */
          .mobile-nav{
            display:flex;
            position:fixed;
            bottom:0;
            left:0;
            right:0;
            background:rgba(10,10,8,0.92);
            backdrop-filter:blur(16px);
            border-top:1px solid var(--border);
            z-index:999;
            justify-content:space-around;
            align-items:center;
            padding:12px 16px calc(12px + env(safe-area-inset-bottom));
          }

          .mn-link{
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:6px;
            text-decoration:none;
            color:rgba(245,240,232,.4);
            background:none;
            border:none;
            font-family:'Cairo',sans-serif;
            transition:color .3s;
            cursor:pointer;
          }

          .mn-link.active{color:var(--gold);}
          .mn-danger{color:rgba(224,112,96,.5);}
          .mn-danger:hover{color:#e07060;}

          .mn-icon{font-size:22px;line-height:1;}
          .mn-text{font-size:10px;font-weight:900;letter-spacing:.05em;}
        }
      `}</style>

      <div className="layout">
        <aside className="sidebar">
          <Link href="/" className="sb-brand">بلِّغ<span className="dot"/></Link>
          <ul className="sb-nav">
            <li><Link href="/dashboard" className="sb-link"><span>⊡</span> صندوق الرسائل</Link></li>
            <li><Link href="/settings" className="sb-link active"><span>◈</span> الإعدادات</Link></li>
            <li><Link href={`/u/${user?.username}`} target="_blank" className="sb-link"><span>◎</span> رابطي العام</Link></li>
          </ul>
          <div className="sb-divider"/>
          <ul className="sb-nav" style={{flex:'none'}}>
            <li>
              <button onClick={handleLogout} className="sb-btn sb-danger">
                <span>⇥</span> تسجيل الخروج
              </button>
            </li>
          </ul>
          <div className="sb-user">
            <div className="sb-user-name">@{user?.username}</div>
            <div className="sb-user-role">MEMBER · بلِّغ</div>
          </div>
        </aside>

        <main className="main">
          <div className="page-label">إدارة الحساب</div>
          <h1 className="page-title">الإعدادات</h1>

          {/* Profile Section */}
          <div className="section">
            <h2 className="sec-title">المعلومات الأساسية</h2>
            <p className="sec-desc">تعديل اسم المستخدم والبريد الإلكتروني المرتبطين بحسابك.</p>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label className="form-label">اسم المستخدم</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className="form-input"
                  dir="ltr"
                />
              </div>
              <div className="form-group">
                <label className="form-label">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="form-input"
                  dir="ltr"
                />
              </div>
              <button type="submit" disabled={loadingProfile} className="btn-gold">
                {loadingProfile ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="section">
            <h2 className="sec-title">الأمان وكلمة المرور</h2>
            <p className="sec-desc">تغيير كلمة المرور الخاصة بك بشكل آمن.</p>
            <form onSubmit={handleUpdatePassword}>
              <div className="form-group">
                <label className="form-label">كلمة المرور الحالية</label>
                <input
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  className="form-input"
                  placeholder="••••••••"
                  dir="ltr"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="form-input"
                  placeholder="••••••••"
                  dir="ltr"
                  required
                  minLength="6"
                />
              </div>
              <button type="submit" disabled={loadingPassword} className="btn-dark">
                {loadingPassword ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
              </button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="section danger">
            <h2 className="sec-title">منطقة الخطر</h2>
            <p className="sec-desc">
              بمجرد حذف حسابك، سيتم مسح جميع رسائلك وبياناتك نهائياً ولن تتمكن من استرجاعها.
              هذا الإجراء لا يمكن التراجع عنه.
            </p>
            <button onClick={handleDeleteAccount} disabled={loadingDelete} className="btn-danger">
              {loadingDelete ? 'جاري الحذف...' : 'حذف الحساب نهائياً'}
            </button>
          </div>
        </main>
      </div>

      {/* --- Mobile Bottom Navigation (يظهر للموبايل فقط) --- */}
      <nav className="mobile-nav">
        <Link href="/dashboard" className="mn-link">
          <span className="mn-icon">⊡</span>
          <span className="mn-text">الرسائل</span>
        </Link>
        <Link href="/settings" className="mn-link active">
          <span className="mn-icon">◈</span>
          <span className="mn-text">الإعدادات</span>
        </Link>
        <Link href={`/u/${user?.username}`} target="_blank" className="mn-link">
          <span className="mn-icon">◎</span>
          <span className="mn-text">رابطي</span>
        </Link>
        <button onClick={handleLogout} className="mn-link mn-danger">
          <span className="mn-icon">⇥</span>
          <span className="mn-text">خروج</span>
        </button>
      </nav>
    </>
  );
}