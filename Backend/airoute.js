const express = require('express');
const router = express.Router();
const {
  aiGenerateNotes,
  aiGenerateQuiz,
  aiGenerateFlashcards
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/generate-notes', protect, aiGenerateNotes);
router.post('/generate-quiz', protect, aiGenerateQuiz);
router.post('/generate-flashcards', protect, aiGenerateFlashcards);

module.exports = router;