import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  // العنوان هو أهم عامل في السيو. دمجنا اسم البراند مع أهم الكلمات البحثية
  title: 'بلِّغ (Ballegh) | موقع صراحة ورسائل مجهولة بسرية تامة',
  
  // الوصف لازم يكون جذاب ويحتوي على الكلمات اللي الناس بتبحث عنها في جمل مفيدة
  description: 'انضم إلى منصة بلِّغ، الموقع العربي الأول لإرسال واستقبال رسائل صراحة مجهولة. شارك رابطك الخاص، استقبل آراء أصدقائك بسرية وأمان تام، وبلّغ رسالتك دون كشف هويتك.',
  
  // تغطية شاملة لكل الكلمات المفتاحية المحتملة (عربي وإنجليزي)
  keywords: [
    'بلغ', 'بلّغ', 'ballegh', 'balgh',
    'صراحة', 'موقع صراحة', 'تطبيق صراحة', 'saraha', 'sarahny',
    'صارحني', 'رسائل صارحني', 'اسألني',
    'رسائل مجهولة', 'رسائل سرية', 'مصارحة', 'مصارحة مجهولة',
    'anonymous messages', 'secret messages',
    'بلغ رسالتك', 'اعرف رأي الناس فيك'
  ].join(', '),
  
  // إعدادات محركات البحث والعناكب
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // إعدادات الشير على السوشيال ميديا (مهمة جداً لجلب زيارات ترفع ترتيبك)
  openGraph: {
    title: 'بلِّغ — اسمع الحقيقة بسرية تامة',
    description: 'شارك رابطك الآن واستقبل رسائل صريحة ومجهولة من أصدقائك. سرية هويتك مضمونة.',
    url: 'https://bal3.vercel.app', // تأكد إن ده رابط الموقع الصحيح
    siteName: 'منصة بلِّغ',
    locale: 'ar_EG',
    type: 'website',
  },
  
  // إعدادات تويتر
  twitter: {
    card: 'summary_large_image',
    title: 'بلِّغ — المنصة العربية للمصارحة',
    description: 'استقبل رسائل صريحة ومجهولة من معارفك. رابط واحد، صراحة بلا قيود.',
  },

  // كود التحقق الخاص بجوجل (زي ما هو)
  verification: {
    google: 'YBC_Qlwfy5sAbt3IF2_gt6KjXC6TnqTkSZpXiSfKSAc',
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
