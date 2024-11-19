import React, { useState } from 'react';
import { curriculum } from '../data/curriculum';
import { Lesson, Phase, WeekNumber } from '../types/lessons';

const LessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'code' | 'practice'>('theory');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Week {lesson.weekNumber}: {lesson.title}
      </h3>
      <p className="text-gray-700 dark:text-white mb-4">{lesson.description}</p>

      <div className="flex mb-4 border-b border-gray-200">
        {['theory', 'code', 'practice'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-700 dark:text-white'
            }`}
            onClick={() => setActiveTab(tab as 'theory' | 'code' | 'practice')}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === 'theory' && (
          <div>
            <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {lesson.content.theory.title}
            </h4>
            <ul className="list-disc pl-5 space-y-2">
              {lesson.content.theory.points.map((point, index) => (
                <li key={index} className="text-gray-700 dark:text-white">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'code' && (
          <div>
            <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {lesson.content.code.title}
            </h4>
            <p className="text-gray-700 dark:text-white mb-4">
              {lesson.content.code.description}
            </p>
            {lesson.content.code.example && (
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                <code className="text-gray-900 dark:text-white">{lesson.content.code.example}</code>
              </pre>
            )}
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Quiz: {lesson.content.practice.quiz.title}
              </h4>
              <p className="text-gray-700 dark:text-white">
                {lesson.content.practice.quiz.description}
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Coding Exercise: {lesson.content.practice.coding.title}
              </h4>
              <p className="text-gray-700 dark:text-white">
                {lesson.content.practice.coding.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PhaseSection: React.FC<{ phase: Phase; lessons: Lesson[] }> = ({ phase, lessons }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Phase {phase.number}: {phase.title}
      </h2>
      <p className="text-gray-700 dark:text-white mb-8">{phase.description}</p>
      <div className="space-y-6">
        {lessons
          .filter((lesson) => lesson.phase === phase.number)
          .map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
      </div>
    </div>
  );
};

const Lessons: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Lesson Plans</h1>
      <div className="space-y-12">
        {curriculum.phases.map((phase) => (
          <PhaseSection
            key={phase.number}
            phase={phase}
            lessons={curriculum.lessons}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
