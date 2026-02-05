const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt
} = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getQuizzes)
  .post(protect, createQuiz);

router.route('/:id')
  .put(protect, updateQuiz)
  .delete(protect, deleteQuiz);

router.post('/:id/attempt', protect, submitQuizAttempt);

module.exports = router;