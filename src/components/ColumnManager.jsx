import React, { useState } from 'react';
import { Settings, ChevronDown } from 'lucide-react';

const ColumnManager = ({ visibleColumns, onColumnChange, allColumns }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleColumn = (columnKey) => {
    const newVisibleColumns = { ...visibleColumns };
    newVisibleColumns[columnKey] = !newVisibleColumns[columnKey];
    onColumnChange(newVisibleColumns);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Settings size={16} />
        <span>Manage Columns</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-48">
          <div className="p-2">
            {allColumns.map((column) => (
              <label key={column.key} className="flex items-center space-x-2 py-1 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibleColumns[column.key]}
                  onChange={() => toggleColumn(column.key)}
                  className="rounded"
                />
                <span className="text-sm">{column.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ColumnManager;
