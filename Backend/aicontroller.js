const { generateNotes, generateQuiz, generateFlashcards } = require('../services/aiService');
const Note = require('../models/Note');
const Quiz = require('../models/Quiz');
const Flashcard = require('../models/Flashcard');

// Generate AI Notes
const aiGenerateNotes = async (req, res) => {
  try {
    const { topic, subject, additionalContext } = req.body;

    if (!topic || !subject) {
      return res.status(400).json({ message: 'Topic and subject are required' });
    }

    const content = await generateNotes(topic, subject, additionalContext);

    // Create the note
    const note = await Note.create({
      user: req.user._id,
      subject,
      title: topic,
      content,
      isAIGenerated: true,
      tags: ['AI Generated']
    });

    const populatedNote = await Note.findById(note._id).populate('subject', 'name color');
    res.status(201).json(populatedNote);
  } catch (error) {
    console.error('AI Notes Generation Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Generate AI Quiz
const aiGenerateQuiz = async (req, res) => {
  try {
    const { topic, subject, numberOfQuestions = 5, difficulty = 'medium' } = req.body;

    if (!topic || !subject) {
      return res.status(400).json({ message: 'Topic and subject are required' });
    }

    const questions = await generateQuiz(topic, subject, numberOfQuestions, difficulty);

    // Create the quiz
    const quiz = await Quiz.create({
      user: req.user._id,
      subject,
      title: `${topic} - AI Generated Quiz`,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer
      }))
    });

    const populatedQuiz = await Quiz.findById(quiz._id).populate('subject', 'name color');
    res.status(201).json(populatedQuiz);
  } catch (error) {
    console.error('AI Quiz Generation Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Generate AI Flashcards
const aiGenerateFlashcards = async (req, res) => {
  try {
    const { content, subject, deckName, numberOfCards = 10 } = req.body;

    if (!content || !subject || !deckName) {
      return res.status(400).json({ message: 'Content, subject, and deck name are required' });
    }

    const cards = await generateFlashcards(content, subject, numberOfCards);

    // Create the flashcard deck
    const flashcard = await Flashcard.create({
      user: req.user._id,
      subject,
      deckName: `${deckName} - AI Generated`,
      cards: cards.map(card => ({
        question: card.question,
        answer: card.answer,
        difficulty: card.difficulty || 'medium'
      }))
    });

    const populatedFlashcard = await Flashcard.findById(flashcard._id)
      .populate('subject', 'name color');
    res.status(201).json(populatedFlashcard);
  } catch (error) {
    console.error('AI Flashcard Generation Error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  aiGenerateNotes,
  aiGenerateQuiz,
  aiGenerateFlashcards
};