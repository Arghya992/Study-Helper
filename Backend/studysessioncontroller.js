const StudySession = require('../models/StudySession');
const User = require('../models/User');
const Subject = require('../models/Subject');

const getSessions = async (req, res) => {
  try {
    const { subject, startDate, endDate } = req.query;
    const query = { user: req.user._id };
    
    if (subject) {
      query.subject = subject;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const sessions = await StudySession.find(query)
      .populate('subject', 'name color')
      .sort({ date: -1 });
    
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSession = async (req, res) => {
  try {
    const { subject, duration, type, notes, date } = req.body;
    
    const session = await StudySession.create({
      user: req.user._id,
      subject,
      duration,
      type,
      notes,
      date: date || new Date()
    });

    // Update user's total study time
    const user = await User.findById(req.user._id);
    user.totalStudyTime += duration;
    
    // Update study streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastStudy = user.lastStudyDate ? new Date(user.lastStudyDate) : null;
    
    if (lastStudy) {
      lastStudy.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today - lastStudy) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        user.studyStreak += 1;
      } else if (daysDiff > 1) {
        user.studyStreak = 1;
      }
    } else {
      user.studyStreak = 1;
    }
    
    user.lastStudyDate = new Date();
    await user.save();

    // Update subject's total study time
    if (subject) {
      const subjectDoc = await Subject.findById(subject);
      if (subjectDoc) {
        subjectDoc.totalStudyTime += duration;
        await subjectDoc.save();
      }
    }

    const populatedSession = await StudySession.findById(session._id)
      .populate('subject', 'name color');
    
    res.status(201).json(populatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const sessions = await StudySession.find({ user: req.user._id });
    const user = await User.findById(req.user._id);

    const totalSessions = sessions.length;
    const totalTime = user.totalStudyTime;
    
    // Sessions by subject
    const sessionsBySubject = await StudySession.aggregate([
      { $match: { user: req.user._id } },
      { 
        $group: {
          _id: '$subject',
          totalDuration: { $sum: '$duration' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent 7 days activity
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSessions = await StudySession.find({
      user: req.user._id,
      date: { $gte: sevenDaysAgo }
    });

    const dailyActivity = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyActivity[dateStr] = 0;
    }

    recentSessions.forEach(session => {
      const dateStr = new Date(session.date).toISOString().split('T')[0];
      if (dailyActivity[dateStr] !== undefined) {
        dailyActivity[dateStr] += session.duration;
      }
    });

    res.json({
      totalSessions,
      totalTime,
      studyStreak: user.studyStreak,
      sessionsBySubject,
      dailyActivity
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await StudySession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await session.deleteOne();
    res.json({ message: 'Session removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSessions, createSession, getStats, deleteSession };