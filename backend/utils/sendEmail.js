const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // التصميم الجديد للإيميل (HTML Template)
  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <style>
        body { margin: 0; padding: 0; font-family: 'Cairo', Arial, sans-serif; background-color: #0a0a08; color: #f5f0e8; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1a1a17; border: 1px solid #c9a84c33; border-radius: 12px; overflow: hidden; margin-top: 40px; }
        .header { background-color: #0a0a08; padding: 40px 20px; text-align: center; border-bottom: 2px solid #c9a84c; }
        .logo { font-size: 32px; font-weight: bold; color: #f5f0e8; text-decoration: none; letter-spacing: -1px; }
        .logo-dot { color: #c9a84c; }
        .content { padding: 40px; text-align: center; }
        .title { font-size: 24px; color: #c9a84c; margin-bottom: 20px; font-weight: 700; }
        .message { font-size: 16px; line-height: 1.6; color: #f5f0e8cc; margin-bottom: 30px; }
        .otp-box { background: linear-gradient(135deg, #c9a84c 0%, #a68a3d 100%); color: #0a0a08; padding: 20px 40px; font-size: 36px; font-weight: 900; letter-spacing: 8px; border-radius: 8px; display: inline-block; margin-bottom: 30px; box-shadow: 0 10px 20px rgba(0,0,0,0.3); }
        .footer { background-color: #0a0a08; padding: 20px; text-align: center; font-size: 12px; color: #f5f0e844; border-top: 1px solid #ffffff0a; }
        .warning { font-size: 13px; color: #b84c36; margin-top: 20px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">بلِّغ<span class="logo-dot">.</span></div>
        </div>
        <div class="content">
          <div class="title">إعادة تعيين كلمة المرور</div>
          <p class="message">لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك على منصة بلِّغ. استخدم الكود التالي لإتمام العملية:</p>
          <div class="otp-box">${options.otp}</div>
          <p class="message">هذا الكود صالح لمدة <strong>10 دقائق</strong> فقط.</p>
          <p class="warning">إذا لم تطلب هذا الكود، يمكنك تجاهل هذا الإيميل بأمان.</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} منصة بلِّغ — الحقيقة تستحق أن تُقال.<br>
          صُنع بكل حب في مصر 🇪🇬
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"منصة بلِّغ" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: htmlContent, // هنا بنبعت الـ HTML بدل التكست العادي
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
