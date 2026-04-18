const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan'); 
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Connect to Database
connectDB();

// --- إضافة أمنية هامة ---
// إخبار السيرفر بأنه يعمل خلف بروكسي لضمان عمل الـ Rate Limit بشكل صحيح على الاستضافات
app.set('trust proxy', 1);

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // ضفنا الـ PUT منورة أهي
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));

// --- إضافة: تسجيل مسارات الطلبات في الـ Console ---
app.use(morgan('dev'));

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running.' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // --- تعديل بسيط: إخفاء تفاصيل الخطأ (Stack) في بيئة الإنتاج لحماية السيرفر ---
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});