import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'بلِّغ — المنصة العربية للمصارحة المجهولة',
  description: 'استقبل رسائل صريحة ومجهولة من معارفك. رابط واحد، صراحة بلا قيود، وسرية مضمونة بالهندسة.',
  keywords: 'رسائل مجهولة, مصارحة, بلّغ, رسائل سرية, anonymous',
  openGraph: {
    title: 'بلِّغ — اسمع الحقيقة',
    description: 'المنصة العربية الأولى للمصارحة المجهولة',
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1e1e1a',
              color: '#f5f0e8',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              fontFamily: 'Cairo, sans-serif',
              fontSize: '14px',
              fontWeight: '700',
              borderRadius: '0',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            },
            success: {
              iconTheme: { primary: '#c9a84c', secondary: '#0a0a08' },
            },
            error: {
              iconTheme: { primary: '#b84c36', secondary: '#f5f0e8' },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
