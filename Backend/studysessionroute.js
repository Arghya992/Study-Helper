const express = require('express');
const router = express.Router();
const {
  getSessions,
  createSession,
  getStats,
  deleteSession
} = require('../controllers/studySessionController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getSessions)
  .post(protect, createSession);

router.get('/stats', protect, getStats);

router.delete('/:id', protect, deleteSession);

module.exports = router;