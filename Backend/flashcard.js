const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  deckName: {
    type: String,
    required: [true, 'Please provide a deck name'],
    trim: true
  },
  cards: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    lastReviewed: {
      type: Date
    },
    nextReview: {
      type: Date
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Flashcard', flashcardSchema);