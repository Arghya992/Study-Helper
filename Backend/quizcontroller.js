const Quiz = require('../models/Quiz');

const getQuizzes = async (req, res) => {
  try {
    const { subject } = req.query;
    const query = { user: req.user._id };
    
    if (subject) {
      query.subject = subject;
    }

    const quizzes = await Quiz.find(query)
      .populate('subject', 'name color')
      .sort({ createdAt: -1 });
    
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createQuiz = async (req, res) => {
  try {
    const { subject, title, questions } = req.body;
    const quiz = await Quiz.create({
      user: req.user._id,
      subject,
      title,
      questions
    });
    
    const populatedQuiz = await Quiz.findById(quiz._id)
      .populate('subject', 'name color');
    res.status(201).json(populatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('subject', 'name color');

    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await quiz.deleteOne();
    res.json({ message: 'Quiz removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitQuizAttempt = async (req, res) => {
  try {
    const { score, totalQuestions } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    quiz.attempts.push({
      score,
      totalQuestions,
      date: new Date()
    });

    await quiz.save();

    const populatedQuiz = await Quiz.findById(quiz._id)
      .populate('subject', 'name color');
    res.json(populatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuizAttempt
};