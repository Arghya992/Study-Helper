const express = require('express');
const router = express.Router();
const {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  updateCardReview
} = require('../controllers/flashcardController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getFlashcards)
  .post(protect, createFlashcard);

router.route('/:id')
  .put(protect, updateFlashcard)
  .delete(protect, deleteFlashcard);

router.put('/:id/review', protect, updateCardReview);

module.exports = router;