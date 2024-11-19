import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Tab } from '@headlessui/react';
import { BookOpenIcon, VideoCameraIcon, ServerIcon } from '@heroicons/react/24/outline';

type ResourceType = 'books' | 'videos' | 'datasets';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
type Topic = 'python' | 'math' | 'ml' | 'dl' | 'all';

interface Resource {
  title: string;
  description: string;
  link: string;
  type: ResourceType;
  difficulty: DifficultyLevel;
  topic: Topic;
  thumbnail?: string;
}

const Resources: React.FC = () => {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<Topic>('all');

  const resources: Resource[] = [
    {
      title: "Deep Learning with Python",
      description: "François Chollet's comprehensive guide to deep learning with Python and Keras",
      link: "https://www.manning.com/books/deep-learning-with-python",
      type: "books",
      difficulty: "intermediate",
      topic: "dl",
      thumbnail: "https://images.manning.com/360/480/resize/book/3/8991f37-0d42-4906-9a7f-65d2db58ab9d/Chollet-2ED-HI.png"
    },
    {
      title: "Neural Networks from Scratch",
      description: "Step-by-step guide to building neural networks from scratch",
      link: "https://www.youtube.com/watch?v=example",
      type: "videos",
      difficulty: "intermediate",
      topic: "dl",
      thumbnail: "https://img.youtube.com/vi/example/maxresdefault.jpg"
    },
    {
      title: "MNIST Dataset",
      description: "Classic dataset for digit recognition, perfect for beginners",
      link: "https://www.kaggle.com/c/digit-recognizer",
      type: "datasets",
      difficulty: "beginner",
      topic: "ml",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/27/MnistExamples.png"
    },
  ];

  const filteredResources = resources.filter(
    resource => 
      (difficultyFilter === 'all' || resource.difficulty === difficultyFilter) &&
      (topicFilter === 'all' || resource.topic === topicFilter)
  );

  const categories = [
    { id: 'books', name: 'Books', icon: BookOpenIcon },
    { id: 'videos', name: 'Videos', icon: VideoCameraIcon },
    { id: 'datasets', name: 'Datasets', icon: ServerIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Curated collection of the best AI/ML learning materials
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as DifficultyLevel | 'all')}
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value as Topic)}
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          >
            <option value="all">All Topics</option>
            <option value="python">Python</option>
            <option value="math">Mathematics</option>
            <option value="ml">Machine Learning</option>
            <option value="dl">Deep Learning</option>
          </select>
        </div>

        {/* Resource Categories */}
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
            {categories.map(({ id, name, icon: Icon }) => (
              <Tab
                key={id}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-white dark:bg-gray-800 shadow text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-blue-600'
                  }`
                }
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span>{name}</span>
                </div>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {categories.map(({ id }) => (
              <Tab.Panel key={id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources
                    .filter(resource => resource.type === id)
                    .map((resource, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                      >
                        {resource.thumbnail && (
                          <div className="aspect-w-16 aspect-h-9">
                            {resource.type === 'videos' ? (
                              <ReactPlayer
                                url={resource.link}
                                width="100%"
                                height="100%"
                                light={resource.thumbnail}
                                controls
                              />
                            ) : (
                              <img
                                src={resource.thumbnail}
                                alt={resource.title}
                                className="object-cover w-full h-full"
                              />
                            )}
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {resource.difficulty}
                            </span>
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              Learn More →
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Resources;
