const Note = require('../models/Note');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const getNotes = async (req, res) => {
  try {
    const { subject } = req.query;
    const query = { user: req.user._id };
    
    if (subject) {
      query.subject = subject;
    }

    const notes = await Note.find(query)
      .populate('subject', 'name color')
      .sort({ isPinned: -1, createdAt: -1 });
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { subject, title, content, tags, isAIGenerated } = req.body;
    
    const noteData = {
      user: req.user._id,
      subject,
      title,
      content,
      tags: tags ? JSON.parse(tags) : [],
      isAIGenerated: isAIGenerated === 'true',
      files: []
    };

    // Handle file uploads if present
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'study-helper/notes',
              resource_type: 'auto'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          const bufferStream = Readable.from(file.buffer);
          bufferStream.pipe(uploadStream);
        });

        noteData.files.push({
          name: file.originalname,
          url: uploadResult.secure_url,
          type: file.mimetype,
          size: file.size
        });
      }
    }

    const note = await Note.create(noteData);
    const populatedNote = await Note.findById(note._id).populate('subject', 'name color');
    res.status(201).json(populatedNote);
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Parse tags if they're a string
    const updateData = { ...req.body };
    if (typeof updateData.tags === 'string') {
      updateData.tags = JSON.parse(updateData.tags);
    }

    // Handle new file uploads
    if (req.files && req.files.length > 0) {
      const newFiles = [];
      for (const file of req.files) {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'study-helper/notes',
              resource_type: 'auto'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          const bufferStream = Readable.from(file.buffer);
          bufferStream.pipe(uploadStream);
        });

        newFiles.push({
          name: file.originalname,
          url: uploadResult.secure_url,
          type: file.mimetype,
          size: file.size
        });
      }

      updateData.files = [...(note.files || []), ...newFiles];
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('subject', 'name color');

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete files from Cloudinary
    if (note.files && note.files.length > 0) {
      for (const file of note.files) {
        const publicId = file.url.split('/').slice(-2).join('/').split('.')[0];
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      }
    }

    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    const populatedNote = await Note.findById(note._id).populate('subject', 'name color');
    res.json(populatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const fileIndex = note.files.findIndex(f => f._id.toString() === fileId);
    if (fileIndex === -1) {
      return res.status(404).json({ message: 'File not found' });
    }

    const file = note.files[fileIndex];
    const publicId = file.url.split('/').slice(-2).join('/').split('.')[0];
    
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting file from Cloudinary:', error);
    }

    note.files.splice(fileIndex, 1);
    await note.save();

    const populatedNote = await Note.findById(note._id).populate('subject', 'name color');
    res.json(populatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getNotes, 
  createNote, 
  updateNote, 
  deleteNote, 
  togglePin,
  deleteFile 
};