import Link from 'next/link';

export const metadata = {
  title: 'الصفحة غير موجودة | بلِّغ',
};

export default function NotFound() {
  return (
    <>
      <style>{`
        .not-found-page { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; position: relative; overflow: hidden; }
        .nf-bg-text { position: absolute; font-family: 'Playfair Display', serif; font-size: clamp(150px, 30vw, 400px); font-weight: 900; color: transparent; -webkit-text-stroke: 1px rgba(201,168,76,0.06); user-select: none; z-index: 0; line-height: 1; display: flex; align-items: center; justify-content: center; }
        .nf-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
        .nf-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: var(--cream); margin-bottom: 16px; letter-spacing: -0.03em; }
        .nf-title em { font-style: italic; color: var(--gold); }
        .nf-desc { font-size: 16px; color: var(--text-muted); max-width: 400px; line-height: 1.8; margin-bottom: 40px; font-weight: 500; }
        .btn-nf { padding: 18px 44px; background: var(--gold); color: var(--ink); font-size: 14px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%); transition: all 0.3s; display: inline-flex; align-items: center; gap: 12px; }
        .btn-nf:hover { background: var(--cream); transform: translateY(-3px); box-shadow: 0 15px 40px rgba(201,168,76,0.2); }
      `}</style>

      <div className="not-found-page">
        <div className="nf-bg-text">404</div>
        <div className="nf-content">
          <h1 className="nf-title">الطريق <em>مسدود.</em></h1>
          <p className="nf-desc">
            يبدو أنك ضللت الطريق، أو أن صاحب هذا الرابط قام بحذف حسابه هرباً من الحقيقة! 
          </p>
          <Link href="/" className="btn-nf">
            العودة للرئيسية
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
        </div>
      </div>
    </>
  );
}