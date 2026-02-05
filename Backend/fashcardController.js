
const Flashcard = require('../models/Flashcard');

const getFlashcards = async (req, res) => {
  try {
    const { subject } = req.query;
    const query = { user: req.user._id };
    
    if (subject) {
      query.subject = subject;
    }

    const flashcards = await Flashcard.find(query)
      .populate('subject', 'name color')
      .sort({ createdAt: -1 });
    
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFlashcard = async (req, res) => {
  try {
    const { subject, deckName, cards } = req.body;
    const flashcard = await Flashcard.create({
      user: req.user._id,
      subject,
      deckName,
      cards
    });
    
    const populatedFlashcard = await Flashcard.findById(flashcard._id)
      .populate('subject', 'name color');
    res.status(201).json(populatedFlashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard deck not found' });
    }

    if (flashcard.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('subject', 'name color');

    res.json(updatedFlashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard deck not found' });
    }

    if (flashcard.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await flashcard.deleteOne();
    res.json({ message: 'Flashcard deck removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCardReview = async (req, res) => {
  try {
    const { cardId, difficulty } = req.body;
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard deck not found' });
    }

    if (flashcard.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const card = flashcard.cards.id(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    card.lastReviewed = new Date();
    card.reviewCount += 1;
    card.difficulty = difficulty;

    // Simple spaced repetition
    const intervals = { easy: 7, medium: 3, hard: 1 };
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + intervals[difficulty]);
    card.nextReview = nextReview;

    await flashcard.save();

    const populatedFlashcard = await Flashcard.findById(flashcard._id)
      .populate('subject', 'name color');
    res.json(populatedFlashcard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  updateCardReview
};