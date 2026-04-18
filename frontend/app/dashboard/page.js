"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '../../utils/axios';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      toast.error('يرجى تسجيل الدخول أولاً');
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/messages');
      setMessages(response.data.data.messages);
    } catch (error) {
      toast.error('حدث خطأ أثناء جلب الرسائل');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    const link = `${origin}/u/${user?.username}`;
    navigator.clipboard.writeText(link);
    toast.success('تم نسخ الرابط! شاركه الآن');
  };

  const handleDeleteMessage = async (msgId) => {
    try {
      await api.delete(`/messages/${msgId}`);
      setMessages(messages.filter(m => m._id !== msgId));
      toast.success('تم حذف الرسالة');
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    toast.success('تم تسجيل الخروج');
    router.push('/login');
  };

  if (loading) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');:root{--ink:#0a0a08;--gold:#c9a84c;}body{background:var(--ink);display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}.logo{font-family:'Playfair Display',serif;font-size:3rem;font-weight:900;color:var(--gold);opacity:.5;animation:p 1.5s ease-in-out infinite;}@keyframes p{0%,100%{opacity:.3;}50%{opacity:.9;}}`}</style>
        <div className="logo">بلِّغ</div>
      </>
    );
  }

  const unreadCount = messages.filter(m => !m.isRead).length;

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

        /* Sidebar */
        .sidebar{background:var(--smoke);border-left:1px solid var(--border);padding:40px 0;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;}
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
        .sb-badge{margin-right:auto;background:var(--gold);color:var(--ink);font-size:10px;font-weight:900;padding:2px 7px;font-family:monospace;}

        .sb-user{padding:20px 28px 0;border-top:1px solid var(--border);margin-top:auto;}
        .sb-user-name{font-size:13px;font-weight:900;color:var(--cream);margin-bottom:2px;}
        .sb-user-role{font-size:11px;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;}

        /* Main */
        .main{padding:48px;overflow-y:auto;}
        .dash-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:48px;padding-bottom:28px;border-bottom:1px solid var(--border);}
        .dash-label{font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;}
        .dash-title{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:900;color:var(--cream);letter-spacing:-.03em;line-height:1;}
        .dash-time{font-size:12px;color:var(--text-muted);font-weight:700;letter-spacing:.05em;}

        /* Link Card */
        .link-card{background:var(--smoke-2);border:1px solid var(--border);padding:36px;margin-bottom:28px;position:relative;overflow:hidden;}
        .link-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
        .lc-label{font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;}
        .lc-desc{font-size:13px;color:var(--text-muted);margin-bottom:20px;font-weight:500;}
        .lc-url{display:flex;align-items:center;gap:12px;background:rgba(245,240,232,.04);border:1px solid var(--border);padding:13px 18px;}
        .lc-code{flex:1;font-family:monospace;font-size:13px;color:var(--cream);direction:ltr;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
        .copy-btn{padding:8px 18px;background:var(--gold);color:var(--ink);border:none;font-family:'Cairo',sans-serif;font-size:12px;font-weight:900;cursor:pointer;clip-path:polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);transition:all .3s;white-space:nowrap;letter-spacing:.05em;}
        .copy-btn:hover{background:var(--cream);}

        /* Stats */
        .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;}
        .stat-card{background:var(--smoke);border:1px solid var(--border);padding:24px 28px;position:relative;}
        .stat-card::before{content:'';position:absolute;top:0;right:0;width:32px;height:2px;background:var(--gold);}
        .stat-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--cream);letter-spacing:-.04em;line-height:1;margin-bottom:6px;}
        .stat-label{font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;}

        /* Messages */
        .msgs-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
        .msgs-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:var(--cream);letter-spacing:-.02em;display:flex;align-items:center;gap:10px;}
        .count-badge{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;background:rgba(201,168,76,.12);border:1px solid var(--border);color:var(--gold);font-size:11px;font-weight:900;font-family:monospace;}

        .msg-card{background:var(--smoke);border:1px solid var(--border);padding:24px 28px;margin-bottom:10px;position:relative;transition:all .3s;}
        .msg-card:hover{border-color:rgba(201,168,76,.25);}
        .msg-card.unread{border-right:3px solid var(--gold);}
        .msg-top{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
        .msg-date{font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:.08em;}
        .new-badge{font-size:10px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);background:rgba(201,168,76,.1);padding:3px 10px;margin-right:auto;}
        .msg-text{font-size:14px;color:var(--text-mid);line-height:1.8;font-weight:500;}
        .del-btn{position:absolute;bottom:14px;left:18px;background:none;border:none;color:rgba(245,240,232,.12);cursor:pointer;padding:4px;transition:color .3s;font-size:16px;line-height:1;}
        .del-btn:hover{color:#e07060;}

        .empty{text-align:center;padding:80px 40px;border:1px dashed var(--border);}
        .empty-icon{font-family:'Playfair Display',serif;font-size:4rem;color:rgba(201,168,76,.1);margin-bottom:16px;}
        .empty-text{font-size:14px;color:var(--text-muted);font-weight:500;line-height:1.7;}

        /* --- إعدادات الموبايل والناف السُفلي --- */
        .mobile-nav{display:none;}
        
        @media(max-width:768px){
          .layout{grid-template-columns:1fr;}
          .sidebar{display:none;}
          
          /* زودنا padding-bottom هنا عشان المحتوى ميستخباش ورا الناف بار */
          .main{padding:24px 16px 100px;} 
          
          .stats-grid{grid-template-columns:1fr 1fr;}
          
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
          
          /* تصغير بسيط للهيدر في الموبايل */
          .dash-title{font-size:1.8rem;}
          .dash-time{display:none;} /* إخفاء الوقت في الموبايل لتوفير المساحة */
        }
      `}</style>

      <div className="layout">
        {/* Sidebar (يظهر للكمبيوتر فقط) */}
        <aside className="sidebar">
          <Link href="/" className="sb-brand">بلِّغ<span className="dot"/></Link>

          <ul className="sb-nav">
            <li>
              <Link href="/dashboard" className="sb-link active">
                <span>⊡</span> صندوق الرسائل
                {unreadCount > 0 && <span className="sb-badge">{unreadCount}</span>}
              </Link>
            </li>
            <li>
              <Link href="/settings" className="sb-link">
                <span>◈</span> الإعدادات
              </Link>
            </li>
            <li>
              <Link href={`/u/${user?.username}`} target="_blank" className="sb-link">
                <span>◎</span> رابطي العام
              </Link>
            </li>
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

        {/* Main Content */}
        <main className="main">
          <div className="dash-header">
            <div>
              <div className="dash-label">لوحة التحكم</div>
              <h1 className="dash-title">أهلاً، {user?.username}</h1>
            </div>
            <div className="dash-time">
              {new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">{messages.length}</div>
              <div className="stat-label">إجمالي الرسائل</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{unreadCount}</div>
              <div className="stat-label">غير مقروءة</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{messages.length - unreadCount}</div>
              <div className="stat-label">مقروءة</div>
            </div>
          </div>

          {/* Link Card */}
          <div className="link-card">
            <div className="lc-label">رابطك السري</div>
            <p className="lc-desc">شارك هذا الرابط في ستوريهاتك لاستقبال رسائل مجهولة</p>
            <div className="lc-url">
              <code className="lc-code">{origin}/u/{user?.username}</code>
              <button onClick={copyLink} className="copy-btn">نسخ الرابط</button>
            </div>
          </div>

          {/* Messages */}
          <div className="msgs-header">
            <h2 className="msgs-title">
              الرسائل
              <span className="count-badge">{messages.length}</span>
            </h2>
          </div>

          {messages.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✉</div>
              <p className="empty-text">لم تصلك أي رسائل بعد.<br/>شارك رابطك لتبدأ في استقبال الصراحة!</p>
            </div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div key={msg._id} className={`msg-card${!msg.isRead ? ' unread' : ''}`}>
                  <div className="msg-top">
                    <span className="msg-date">
                      {new Date(msg.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {!msg.isRead && <span className="new-badge">جديد</span>}
                  </div>
                  <p className="msg-text">{msg.content}</p>
                  <button className="del-btn" onClick={() => handleDeleteMessage(msg._id)} title="حذف الرسالة">✕</button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* --- Mobile Bottom Navigation (يظهر للموبايل فقط) --- */}
      <nav className="mobile-nav">
        <Link href="/dashboard" className="mn-link active">
          <span className="mn-icon">⊡</span>
          <span className="mn-text">الرسائل</span>
        </Link>
        <Link href="/settings" className="mn-link">
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