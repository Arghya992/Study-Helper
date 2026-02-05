import { Pin, Edit2, Trash2, FileText, Download } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {note.subject && (
              <span
                className="px-2 py-1 rounded text-xs font-semibold text-white"
                style={{ backgroundColor: note.subject.color }}
              >
                {note.subject.name}
              </span>
            )}
            {note.isPinned && (
              <Pin size={16} className="text-yellow-500 fill-yellow-500" />
            )}
            {note.isAIGenerated && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                AI
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onTogglePin(note._id)}
            className={`${note.isPinned ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600`}
          >
            <Pin size={18} />
          </button>
          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {stripHtml(note.content)}
      </p>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {note.files && note.files.length > 0 && (
        <div className="border-t pt-3">
          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <FileText size={14} />
            {note.files.length} file{note.files.length > 1 ? 's' : ''} attached
          </p>
          <div className="space-y-1">
            {note.files.map((file) => (
              <a
                key={file._id}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
              >
                <Download size={12} />
                {file.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-400 mt-3">
        {new Date(note.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </div>
    </div>
  );
};

export default NoteCard;