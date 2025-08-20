import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import EditableCell from './EditableCell';

const UserList = ({ users, onEdit, onDelete, onUpdateField, visibleColumns }) => {
  const allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  const visibleColumnsList = allColumns.filter(col => visibleColumns[col.key]);

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No users found. Add your first user!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {visibleColumnsList.map((column) => (
                <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                {visibleColumnsList.map((column) => (
                  <td key={`${user.id}-${column.key}`} className="px-6 py-4 whitespace-nowrap">
                    {column.key === 'id' ? (
                      <span className="text-sm text-gray-500">{user[column.key]}</span>
                    ) : (
                      <EditableCell
                        value={user[column.key]}
                        onSave={onUpdateField}
                        field={column.key}
                        userId={user.id}
                      />
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit user"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
