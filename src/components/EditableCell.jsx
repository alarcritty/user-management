import React, { useState } from 'react';
import { Pencil, X, Check } from 'lucide-react';

const EditableCell = ({ value, onSave, field, userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState('');

  const validate = (val) => {
    if (field === 'name' && !val.trim()) {
      return 'Name is required';
    }
    if (field === 'email') {
      if (!val.trim()) {
        return 'Email is required';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  };

  const handleSave = () => {
    const validationError = validate(editValue);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSave(userId, field, editValue);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="relative">
        <div className="flex items-center space-x-1">
          <input
            type={field === 'email' ? 'email' : 'text'}
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyPress}
            className={`flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
              }`}
            autoFocus
          />
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-800 p-1"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <X size={16} />
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between group">
      <span className="flex-1">{value}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="ml-2 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
      >
        <Pencil size={14} />
      </button>
    </div>
  );
};

export default EditableCell;
