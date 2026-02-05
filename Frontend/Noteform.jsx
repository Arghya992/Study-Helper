import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from './FileUpload';
import { X } from 'lucide-react';

const NoteForm = ({ subjects, onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    subject: initialData?.subject?._id || initialData?.subject || '',
    title: initialData?.title || '',
    content: initialData?.content || '',
    tags: initialData?.tags || []
  });
  const [files, setFiles] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [existingFiles, setExistingFiles] = useState(initialData?.files || []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'code-block'],
      ['clean']
    ]
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitFormData = new FormData();
    submitFormData.append('subject', formData.subject);
    submitFormData.append('title', formData.title);
    submitFormData.append('content', formData.content);
    submitFormData.append('tags', JSON.stringify(formData.tags));
    
    files.forEach(file => {
      submitFormData.append('files', file);
    });

    onSubmit(submitFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Subject *</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a subject</option>
          {subjects.map(subject => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter note title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Content *</label>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
          modules={modules}
          className="bg-white"
          style={{ height: '250px', marginBottom: '50px' }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag(e)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a tag and press Enter"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-blue-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Existing Files (for edit mode) */}
      {existingFiles.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Existing Files</label>
          <div className="space-y-2">
            {existingFiles.map((file) => (
              <div key={file._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {file.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Attach Files (Optional)</label>
        <FileUpload files={files} setFiles={setFiles} />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          {initialData ? 'Update Note' : 'Create Note'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;