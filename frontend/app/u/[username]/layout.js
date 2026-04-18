// المسار: app/u/[username]/layout.js

export async function generateMetadata({ params }) {
  const username = params.username;

  return {
    title: `صارح ${username} بسرية تامة | بلِّغ`,
    description: `أرسل رسالة مجهولة إلى ${username} دون أن يعرف هويتك. الحقيقة تستحق أن تُقال.`,
    openGraph: {
      title: `صارح ${username} بسرية تامة`,
      description: `أرسل رسالة مجهولة إلى ${username} دون أن يعرف هويتك.`,
      url: `https://ballegh.app/u/${username}`,
      siteName: 'منصة بلِّغ',
      images: [
        {
          url: 'https://ballegh.app/og-image.jpg', // صورة الموقع اللي هتظهر في الشير
          width: 1200,
          height: 630,
        },
      ],
      locale: 'ar_EG',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `صارح ${username} بسرية`,
      description: `أرسل رسالتك المجهولة الآن.`,
    },
  };
}

export default function UserProfileLayout({ children }) {
  return <>{children}</>;
}