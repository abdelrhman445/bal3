const Message = require('../models/Message');
const User = require('../models/User');

// --- إعداد فلتر الكلمات المسيئة ---
const Filter = require('bad-words');
const filter = new Filter();
// يمكنك إضافة أي كلمات عربية أو عامية تريد منعها هنا داخل الأقواس
filter.addWords('شتيمة1', 'شتيمة2', 'كلمة_مسيئة'); 

// @desc    Send anonymous message to a user by username
// @route   POST /api/messages/send/:username
// @access  Public
const sendMessage = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message content cannot be empty.',
      });
    }

    if (content.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot exceed 1000 characters.',
      });
    }

    // --- الإضافة الجديدة: فحص الكلمات المسيئة ---
    if (filter.isProfane(content.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Your message contains inappropriate language.',
      });
    }

    const receiver = await User.findOne({ username: username.toLowerCase() });
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: `User "${username}" does not exist.`,
      });
    }

    const message = await Message.create({
      receiverId: receiver._id,
      content: content.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Message sent anonymously.',
      data: {
        messageId: message._id,
        sentAt: message.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all messages for the logged-in user
// @route   GET /api/messages
// @access  Private
const getMyMessages = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find({ receiverId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('content createdAt isRead'), // أضفنا حقل isRead هنا ليعرفه الـ Frontend
      Message.countDocuments({ receiverId: req.user._id }),
    ]);

    // --- الإضافة الجديدة: تحديث حالة الرسائل غير المقروءة في هذه الصفحة فقط لتصبح مقروءة ---
    if (messages.length > 0) {
      // استخراج الـ IDs للرسائل التي لم تُقرأ بعد
      const unreadMessageIds = messages.filter(m => !m.isRead).map(m => m._id);
      
      if (unreadMessageIds.length > 0) {
        await Message.updateMany(
          { _id: { $in: unreadMessageIds } },
          { $set: { isRead: true } }
        );
      }
    }

    res.status(200).json({
      success: true,
      data: {
        messages,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a specific message by ID
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    if (message.receiverId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this message.',
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid message ID.' });
    }
    next(err);
  }
};

module.exports = { sendMessage, getMyMessages, deleteMessage };