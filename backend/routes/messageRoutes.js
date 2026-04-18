const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMyMessages,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middlewares/auth');
const { messageLimiter } = require('../middlewares/rateLimiter');

// POST /api/messages/send/:username — Public, rate limited
router.post('/send/:username', messageLimiter, sendMessage);

// GET /api/messages — Private
router.get('/', protect, getMyMessages);

// DELETE /api/messages/:id — Private
router.delete('/:id', protect, deleteMessage);

module.exports = router;
