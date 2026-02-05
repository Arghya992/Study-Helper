const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  type: {
    type: String,
    enum: ['pomodoro', 'regular'],
    default: 'pomodoro'
  },
  completed: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudySession', studySessionSchema);