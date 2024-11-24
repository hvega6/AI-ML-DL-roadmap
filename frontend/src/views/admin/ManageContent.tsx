import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface ContentItem {
  id: string;
  title: string;
  type: 'course' | 'lesson' | 'resource';
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
}

const ManageContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Mock data - Replace with actual API call
  useEffect(() => {
    const mockContent: ContentItem[] = [
      {
        id: '1',
        title: 'Introduction to Machine Learning',
        type: 'course',
        status: 'published',
        lastModified: '2023-12-01',
        author: 'John Doe',
      },
      {
        id: '2',
        title: 'Neural Networks Basics',
        type: 'lesson',
        status: 'draft',
        lastModified: '2023-12-02',
        author: 'Jane Smith',
      },
      {
        id: '3',
        title: 'Deep Learning Resources',
        type: 'resource',
        status: 'published',
        lastModified: '2023-12-03',
        author: 'John Doe',
      },
    ];

    setTimeout(() => {
      setContent(mockContent);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDeleteContent = (contentId: string) => {
    // Implement delete functionality
    console.log('Delete content:', contentId);
  };

  const handleEditContent = (contentId: string) => {
    // Implement edit functionality
    console.log('Edit content:', contentId);
  };

  const toggleExpand = (contentId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (expandedItems.has(contentId)) {
      newExpandedItems.delete(contentId);
    } else {
      newExpandedItems.add(contentId);
    }
    setExpandedItems(newExpandedItems);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Content</h1>
          <div className="flex space-x-4">
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Course
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Lesson
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-purple-500 hover:bg-purple-600'
              } text-white`}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Resource
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-300'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="all">All Types</option>
            <option value="course">Courses</option>
            <option value="lesson">Lessons</option>
            <option value="resource">Resources</option>
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
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
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
              }`}>
                {filteredContent.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className={`mr-2 p-1 rounded-md ${
                            isDarkMode
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {expandedItems.has(item.id) ? (
                            <ChevronDownIcon className="h-4 w-4" />
                          ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                          )}
                        </button>
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getStatusColor(item.status)
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.lastModified}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditContent(item.id)}
                          className={`p-1 rounded-md ${
                            isDarkMode
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <PencilIcon className="h-5 w-5 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteContent(item.id)}
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

export default ManageContent;
