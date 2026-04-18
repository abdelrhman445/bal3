const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); 

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required.',
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      const field =
        existingUser.email === email.toLowerCase() ? 'Email' : 'Username';
      return res.status(409).json({
        success: false,
        message: `${field} is already taken.`,
      });
    }

    // qtp sender 6 num
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = Date.now() + 10 * 60 * 1000; // ينتهي بعد 10 دقائق

    // great user true or false
    const user = await User.create({ 
      username, 
      email, 
      password,
      otp,
      otpExpire 
    });

    // إرسال الإيميل
    const message = `مرحباً بك في منصتنا.\nكود التفعيل الخاص بك هو: ${otp}\nهذا الكود صالح لمدة 10 دقائق.`;
    
    try {
      await sendEmail({
        email: user.email,
        subject: 'كود تفعيل حسابك - منصة صارحني',
        message
      });

      res.status(201).json({
        success: true,
        message: 'Account created successfully. Please check your email for the OTP.',
      });
    } catch (error) {
      // إذا فشل الإرسال، نمسح الكود ليتمكن من طلبه لاحقاً
      user.otp = undefined;
      user.otpExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ 
        success: false, 
        message: 'Email could not be sent. Please try again.' 
      });
    }

  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    next(err);
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required.',
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      otp,
      otpExpire: { $gt: Date.now() }, // التأكد أن الكود لم ينتهِ
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP.',
      });
    }

    // تفعيل الحساب ومسح الـ OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    // إصدار التوكن بعد التفعيل الناجح
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Account verified successfully.',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // --- الإضافة الجديدة: التأكد من تفعيل الإيميل ---
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email first.',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Forgot Password (Send OTP)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ success: false, message: 'There is no user with that email.' });
    }

    // توليد كود OTP من 6 أرقام
    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetPasswordOtp = resetOtp;
    user.resetPasswordOtpExpire = Date.now() + 10 * 60 * 1000; // 10 دقائق
    await user.save({ validateBeforeSave: false });

    // إرسال الإيميل
    const message = `لقد طلبت إعادة تعيين كلمة المرور.\nكود الاسترجاع الخاص بك هو: ${resetOtp}\nصالح لمدة 10 دقائق.`;
    
    try {
      await sendEmail({
        email: user.email,
        subject: 'إعادة تعيين كلمة المرور - منصة صارحني',
        message
      });
      res.status(200).json({ success: true, message: 'Password reset OTP sent to email.' });
    } catch (error) {
      user.resetPasswordOtp = undefined;
      user.resetPasswordOtpExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: 'Email could not be sent.' });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordOtp: otp,
      resetPasswordOtpExpire: { $gt: Date.now() }
    }).select('+password');

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    // تعيين الباسوورد الجديد (الموديل هيعمله Hashing أوتوماتيك عشان الـ pre-save)
    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully. You can now login.' });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile (Username or Password)
// @route   PUT /api/auth/update-profile
// @access  Private (Needs Token)
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (req.body.username) {
      // التأكد أن اليوزرنيم الجديد مش محجوز لحد تاني
      const usernameExists = await User.findOne({ 
        username: req.body.username.toLowerCase(),
        _id: { $ne: user._id } 
      });
      if (usernameExists) {
        return res.status(400).json({ success: false, message: 'Username is already taken.' });
      }
      user.username = req.body.username;
    }

    if (req.body.password) {
      user.password = req.body.password; // الـ pre-save hook هيشفرها تلقائياً
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: { user: { id: user._id, username: user.username, email: user.email } }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete account and all its messages
// @route   DELETE /api/auth/delete-account
// @access  Private (Needs Token)
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // 1. مسح كل الرسائل المرتبطة بالمستخدم (Cascading Delete)
    const Message = require('../models/Message');
    await Message.deleteMany({ receiverId: userId });

    // 2. مسح المستخدم نفسه
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'Account and all associated messages have been deleted permanently.'
    });
  } catch (err) {
    next(err);
  }
};

// أضفهم هنا
module.exports = { register, verifyOtp, login, forgotPassword, resetPassword, updateProfile, deleteAccount };

