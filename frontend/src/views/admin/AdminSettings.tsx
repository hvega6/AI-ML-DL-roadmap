import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Cog6ToothIcon as CogIcon, ArrowDownTrayIcon as SaveIcon } from '@heroicons/react/24/outline';

interface SettingsSection {
  title: string;
  description: string;
  settings: Setting[];
}

interface Setting {
  id: string;
  label: string;
  type: 'toggle' | 'text' | 'select' | 'number';
  value: any;
  options?: { value: string; label: string }[];
  description?: string;
}

const AdminSettings: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [settings, setSettings] = useState<SettingsSection[]>([
    {
      title: 'General Settings',
      description: 'Configure general platform settings',
      settings: [
        {
          id: 'maintenance-mode',
          label: 'Maintenance Mode',
          type: 'toggle',
          value: false,
          description: 'Enable maintenance mode to prevent user access'
        },
        {
          id: 'user-registration',
          label: 'User Registration',
          type: 'toggle',
          value: true,
          description: 'Allow new users to register'
        }
      ]
    },
    {
      title: 'Content Settings',
      description: 'Manage content visibility and access',
      settings: [
        {
          id: 'default-course-visibility',
          label: 'Default Course Visibility',
          type: 'select',
          value: 'public',
          options: [
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
            { value: 'draft', label: 'Draft' }
          ],
          description: 'Set default visibility for new courses'
        },
        {
          id: 'max-lessons-per-course',
          label: 'Maximum Lessons per Course',
          type: 'number',
          value: 50,
          description: 'Set maximum number of lessons allowed per course'
        }
      ]
    },
    {
      title: 'Email Settings',
      description: 'Configure email notifications',
      settings: [
        {
          id: 'welcome-email',
          label: 'Welcome Email',
          type: 'toggle',
          value: true,
          description: 'Send welcome email to new users'
        },
        {
          id: 'course-completion-email',
          label: 'Course Completion Email',
          type: 'toggle',
          value: true,
          description: 'Send email when user completes a course'
        }
      ]
    }
  ]);

  const handleSettingChange = (sectionIndex: number, settingId: string, newValue: any) => {
    const newSettings = [...settings];
    const setting = newSettings[sectionIndex].settings.find(s => s.id === settingId);
    if (setting) {
      setting.value = newValue;
      setSettings(newSettings);
    }
  };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to save settings
      console.log('Saving settings:', settings);
      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const renderSetting = (setting: Setting, sectionIndex: number) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div className="flex items-center">
            <button
              onClick={() => handleSettingChange(sectionIndex, setting.id, !setting.value)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                setting.value ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  setting.value ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        );
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(sectionIndex, setting.id, e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'
            }`}
          >
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(sectionIndex, setting.id, parseInt(e.target.value))}
            className={`mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'
            }`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <CogIcon className="h-8 w-8 text-blue-500 mr-3" />
              <h1 className="text-3xl font-bold">Admin Settings</h1>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <SaveIcon className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>

          <div className="space-y-8">
            {settings.map((section, sectionIndex) => (
              <div
                key={section.title}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow rounded-lg overflow-hidden`}
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    {section.description}
                  </p>
                  <div className="space-y-6">
                    {section.settings.map((setting) => (
                      <div key={setting.id} className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div>
                            <label
                              htmlFor={setting.id}
                              className="block text-sm font-medium"
                            >
                              {setting.label}
                            </label>
                            {setting.description && (
                              <p
                                className={`mt-1 text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                {setting.description}
                              </p>
                            )}
                          </div>
                          {renderSetting(setting, sectionIndex)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
