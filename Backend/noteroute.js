const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  deleteFile
} = require('../controllers/noteController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(protect, getNotes)
  .post(protect, upload.array('files', 5), createNote);

router.route('/:id')
  .put(protect, upload.array('files', 5), updateNote)
  .delete(protect, deleteNote);

router.put('/:id/pin', protect, togglePin);
router.delete('/:id/files/:fileId', protect, deleteFile);

module.exports = router;