import { Plus } from 'lucide-react';

const SubjectSelector = ({ subjects, selectedSubject, onSelectSubject, onAddSubject }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700">Filter by Subject</h3>
        <button
          onClick={onAddSubject}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
        >
          <Plus size={16} />
          Add Subject
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectSubject(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${!selectedSubject 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          All Subjects
        </button>
        {subjects.map(subject => (
          <button
            key={subject._id}
            onClick={() => onSelectSubject(subject._id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${selectedSubject === subject._id
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            style={selectedSubject === subject._id ? { backgroundColor: subject.color } : {}}
          >
            {subject.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;