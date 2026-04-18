const express = require('express');
const router = express.Router();
const { register, login , verifyOtp , forgotPassword, resetPassword , updateProfile, deleteAccount} = require('../controllers/authController');
const { authLimiter } = require('../middlewares/rateLimiter');

// استدعاء حماية المسارات
const { protect } = require('../middlewares/auth'); 
// POST /api/auth/register
router.post('/register', authLimiter, register);

// POST /api/auth/verify-otp
router.post('/verify-otp', verifyOtp); 

// POST /api/auth/login
router.post('/login', authLimiter, login);

//password reset routes
router.post('/forgot-password', forgotPassword); 
router.post('/reset-password', resetPassword); 


// Protected routes for profile management
router.put('/update-profile', protect, updateProfile);
router.delete('/delete-account', protect, deleteAccount);


module.exports = router;
