const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // نفس الخدمة المستخدمة في كودك الأصلي
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // --- بداية قالب الـ HTML الاحترافي ---
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <style>
        body { margin: 0; padding: 0; font-family: 'Cairo', Arial, sans-serif; background-color: #0a0a08; color: #f5f0e8; }
        .container { max-width: 600px; margin: 40px auto; background-color: #1a1a17; border: 1px solid rgba(201, 168, 76, 0.2); border-radius: 12px; overflow: hidden; }
        .header { background-color: #0a0a08; padding: 40px 20px; text-align: center; border-bottom: 2px solid #c9a84c; }
        .logo { font-size: 32px; font-weight: bold; color: #f5f0e8; text-decoration: none; }
        .logo-dot { color: #c9a84c; }
        .content { padding: 40px; text-align: center; }
        .title { font-size: 24px; color: #c9a84c; margin-bottom: 20px; font-weight: 700; }
        .message { font-size: 16px; line-height: 1.6; color: rgba(245, 240, 232, 0.8); margin-bottom: 30px; }
        .otp-box { background: linear-gradient(135deg, #c9a84c 0%, #a68a3d 100%); color: #0a0a08; padding: 20px 40px; font-size: 36px; font-weight: 900; letter-spacing: 8px; border-radius: 8px; display: inline-block; margin-bottom: 30px; box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        .footer { background-color: #0a0a08; padding: 20px; text-align: center; font-size: 12px; color: rgba(245, 240, 232, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.05); }
        .warning { font-size: 13px; color: #b84c36; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">بلِّغ<span class="logo-dot">.</span></div>
        </div>
        <div class="content">
          <div class="title">${options.subject}</div>
          <p class="message">استخدم الكود التالي لإتمام العملية المطلوبة على حسابك. لضمان أمنك، لا تشارك هذا الكود مع أي شخص.</p>
          
          {/* تعديل ذكي: يبحث عن الـ otp المباشر أو يستخرجه من نص الرسالة */}
          <div class="otp-box">
            ${options.otp || (options.message ? options.message.match(/\d+/)?.[0] : '------')}
          </div>
          
          <p class="message">هذا الكود صالح لمدة <strong>10 دقائق</strong> فقط.</p>
          <p class="warning">إذا لم تطلب هذا الكود، يمكنك تجاهل هذا الإيميل بأمان.</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} منصة بلِّغ — الحقيقة تستحق أن تُقال.
        </div>
      </div>
    </body>
    </html>
  `;
  // --- نهاية قالب الـ HTML ---

  const mailOptions = {
    from: `"منصة بلِّغ" <${process.env.EMAIL_USER}>`, // اسم العرض تم تحسينه للعربية
    to: options.email,
    subject: options.subject,
    text: options.message, // الحفاظ على النسخة النصية للأجهزة القديمة
    html: htmlContent,    // إرسال النسخة المصممة
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
