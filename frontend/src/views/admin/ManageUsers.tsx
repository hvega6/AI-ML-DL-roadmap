import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { TrashIcon, PencilIcon, UserPlusIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'inactive' | 'banned';
}

const ManageUsers: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock data - Replace with actual API call
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'user1@example.com',
        role: 'user',
        createdAt: '2023-01-01',
        lastLogin: '2023-12-01',
        status: 'active',
      },
      {
        id: '2',
        email: 'admin@example.com',
        role: 'admin',
        createdAt: '2023-01-01',
        lastLogin: '2023-12-01',
        status: 'active',
      },
      // Add more mock users as needed
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = (userId: string) => {
    // Implement delete functionality
    console.log('Delete user:', userId);
  };

  const handleEditUser = (userId: string) => {
    // Implement edit functionality
    console.log('Edit user:', userId);
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <button
            className={`flex items-center px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${
              isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Last Login
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
              }`}>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : user.status === 'inactive'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.createdAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className={`p-1 rounded-md ${
                            isDarkMode
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <PencilIcon className="h-5 w-5 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className={`p-1 rounded-md ${
                            isDarkMode
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
