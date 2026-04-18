export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/', // السماح بالأرشفة العامة
      disallow: [
        // 1. المسارات الحقيقية اللي عايزين نمنع أرشفتها
        '/dashboard/', 
        '/settings/',
        
        // 2. مسارات وهمية (Tarpit/Honeypot) لتشتيت الهاكرز والـ Bots
        '/admin-panel/',
        '/wp-admin/',
        '/db-backup/',
        '/api/v1/internal/',
        '/debug/',
        '/test-env/',
        '/old-site/',
        '/config.bak/',
        '/phpmyadmin/',
        '/.git/'
      ],
    },
    sitemap: 'https://bal3.vercel.app/sitemap.xml',
  };
}
