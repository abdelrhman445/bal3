/** @type {import('next').NextConfig} */

// لستة المسارات الوهمية (فخ الهاكرز والـ Bots)
const honeypotPaths = [
  '/admin-panel/:path*',
  '/wp-admin/:path*',
  '/db-backup/:path*',
  '/api/v1/internal/:path*',
  '/debug/:path*',
  '/test-env/:path*',
  '/old-site/:path*',
  '/config.bak/:path*',
  '/phpmyadmin/:path*',
  '/.git/:path*'
];

const nextConfig = {
  /* تقدر تحط أي إعدادات تانية لـ Next.js هنا مستقبلاً */
  
  // دالة التحويلات (Redirects)
  async redirects() {
    return honeypotPaths.map((path) => ({
      source: path,
      destination: 'https://youtu.be/Qc3UMnv0BUI?si=cwEx23BVmDwfpEEj', // رابط يوتيوب للتشتيت
      permanent: false, // false عشان لو حبيت تغيرها بعدين المتصفح ميكنش حافظها
    }));
  },
};

export default nextConfig;