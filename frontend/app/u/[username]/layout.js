// المسار: app/u/[username]/layout.js

export async function generateMetadata({ params }) {
  // التعديل الجوهري: عمل await للـ params لأنها Promise في إصدارات Next.js الحديثة
  const resolvedParams = await params;
  const username = resolvedParams.username || 'مستخدم';

  // الرابط الفعلي لموقعك على Vercel لضمان ظهور الصورة والروابط
  const siteUrl = 'https://bal3.vercel.app';

  return {
    // العنوان اللي بيظهر في جوجل والتبويبات
    title: `صارح ${username} بسرية تامة | بلِّغ`,
    description: `أرسل رسالة مجهولة إلى ${username} دون أن يعرف هويتك. الحقيقة تستحق أن تُقال.`,
    
    // إعدادات الـ Open Graph (فيسبوك، واتساب، وغيرهم)
    openGraph: {
      title: `صارح ${username} بسرية تامة`,
      description: `أرسل رسالة مجهولة إلى ${username} دون أن يعرف هويتك.`,
      url: `${siteUrl}/u/${username}`,
      siteName: 'منصة بلِّغ',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`, // رابط الصورة الفعلي في مجلد public
          width: 1200,
          height: 630,
          alt: `صارح ${username} على بلِّغ`,
        },
      ],
      locale: 'ar_EG',
      type: 'profile',
    },

    // إعدادات تويتر (X)
    twitter: {
      card: 'summary_large_image',
      title: `صارح ${username} بسرية`,
      description: `أرسل رسالتك المجهولة الآن عبر منصة بلِّغ.`,
      images: [`${siteUrl}/og-image.jpg`],
    },
  };
}

export default function UserProfileLayout({ children }) {
  // الحفاظ على الوظيفة الأصلية بتمرير الـ children
  return <>{children}</>;
}
