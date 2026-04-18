const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Receiver is required'],
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      minlength: [1, 'Message cannot be empty'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    // --- الحقل الجديد لحالة الرسالة ---
    isRead: {
      type: Boolean,
      default: false, // الحالة الافتراضية: الرسالة لم تُقرأ بعد
    },
  },
  { timestamps: true }
);

// --- تحسين الأداء (Compound Indexing) ---
// هذه الفهرسة ستجعل استعلام جلب رسائل المستخدم (مرتبة بالتاريخ) سريعاً جداً مهما زاد عدد الرسائل
messageSchema.index({ receiverId: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);