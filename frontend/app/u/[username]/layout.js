export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  const siteUrl = 'https://bal3.vercel.app';

  return {
    title: `صارح ${username} بسرية تامة | بلِّغ`,
    description: `أرسل رسالة مجهولة إلى ${username} دون أن يعرف هويتك. الحقيقة تستحق أن تُقال.`,
    
    openGraph: {
      title: `صارح ${username} بسرية تامة`,
      description: `أرسل رسالة مجهولة إلى ${username} دون أن يعرف هويتك.`,
      url: `${siteUrl}/u/${username}`,
      siteName: 'منصة بلِّغ',
      images: [
        {
          url: `${siteUrl}/og-image.jpg`, 
          width: 1200,
          height: 630,
          alt: `صارح ${username} على منصة بلِّغ`,
        },
      ],
      locale: 'ar_EG',
      type: 'profile',
    },

    twitter: {
      card: 'summary_large_image',
      title: `صارح ${username} بسرية`,
      description: `أرسل رسالتك المجهولة الآن عبر منصة بلِّغ.`,
      images: [`${siteUrl}/og-image.jpg`],
    },
  };
}

export default function UserProfileLayout({ children }) {
  return <>{children}</>;
}
