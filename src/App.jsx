import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Notification from './components/Notification';
import UserForm from './components/UserForm';
import ColumnManager from './components/ColumnManager';
import UserList from './components/UserList';
const App = () => {
  const [users, setUsers] = useLocalStorage('users', []);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = useLocalStorage('visibleColumns', {
    id: true,
    name: true,
    email: true
  });

  const allColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];

  const simulateAsync = (fn) => {
    setIsLoading(true);
    setTimeout(() => {
      fn();
      setIsLoading(false);
    }, 500);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };
  let idCounter = 0;

  const generateId = () => {
    idCounter += 1;
    return idCounter;
  };

  const handleSave = (userData) => {
    const emailExists = users.some(user =>
      user.email.toLowerCase() === userData.email.toLowerCase() &&
      user.id !== editingUser?.id
    );

    if (emailExists) {
      showNotification('Email already exists!', 'error');
      return;
    }

    simulateAsync(() => {
      if (editingUser) {
        setUsers(users.map(user =>
          user.id === editingUser.id
            ? { ...user, ...userData }
            : user
        ));
        showNotification('User updated successfully!');
      } else {
        const newUser = {
          id: generateId(),
          ...userData
        };
        setUsers([...users, newUser]);
        showNotification('User created successfully!');
      }

      setShowForm(false);
      setEditingUser(null);
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      simulateAsync(() => {
        setUsers(prevUsers => {
          const updatedUsers = prevUsers.filter(user => user.id !== userId);
          console.log('Deleting user:', userId);
          console.log('Previous users count:', prevUsers.length);
          console.log('Updated users count:', updatedUsers.length);
          return updatedUsers;
        });
        showNotification('User deleted successfully!');
      });
    }
  };

  const handleUpdateField = (userId, field, value) => {
    if (field === 'email') {
      const emailExists = users.some(user =>
        user.email.toLowerCase() === value.toLowerCase() &&
        user.id !== userId
      );

      if (emailExists) {
        showNotification('Email already exists!', 'error');
        return;
      }
    }

    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, [field]: value }
        : user
    ));
    showNotification(`${field} updated successfully!`);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management System</h1>
          <p className="text-gray-600">Manage users with full CRUD operations</p>
        </div>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="space-y-6">
          {showForm && (
            <UserForm
              user={editingUser}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Plus size={16} />
                  <span>Add User</span>
                </button>
              )}

              <ColumnManager
                visibleColumns={visibleColumns}
                onColumnChange={setVisibleColumns}
                allColumns={allColumns}
              />
            </div>

            <div className="text-sm text-gray-500">
              Total Users: {users.length}
            </div>
          </div>

          <UserList
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUpdateField={handleUpdateField}
            visibleColumns={visibleColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
