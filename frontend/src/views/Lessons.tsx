import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { curriculum } from '../data/curriculum';
import { BookOpenIcon, BeakerIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const Lessons: React.FC = () => {
  const { theme } = useTheme();

  // Group lessons by phase number
  const lessonsByPhase = curriculum.lessons.reduce((acc, lesson) => {
    const phaseNumber = lesson.phase;
    const phase = curriculum.phases.find(p => p.number === phaseNumber);
    
    if (!phase) return acc;

    const existingPhase = acc.find(p => p.phaseNumber === phaseNumber);
    if (existingPhase) {
      existingPhase.lessons.push(lesson);
    } else {
      acc.push({
        phaseNumber,
        phaseTitle: phase.title,
        phaseDescription: phase.description,
        lessons: [lesson]
      });
    }
    return acc;
  }, [] as { phaseNumber: number; phaseTitle: string; phaseDescription: string; lessons: typeof curriculum.lessons }[]);

  const getPhaseIcon = (phaseNumber: number) => {
    switch (phaseNumber) {
      case 1:
        return <BookOpenIcon className="h-6 w-6" />;
      case 2:
        return <BeakerIcon className="h-6 w-6" />;
      case 3:
        return <AcademicCapIcon className="h-6 w-6" />;
      default:
        return <BookOpenIcon className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Curriculum
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your roadmap to mastering AI, ML, and DL
          </p>
        </div>

        <div className="space-y-8">
          {lessonsByPhase.map((phase) => (
            <div 
              key={phase.phaseNumber}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  {getPhaseIcon(phase.phaseNumber)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Phase {phase.phaseNumber}: {phase.phaseTitle}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {phase.phaseDescription}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {phase.lessons.sort((a, b) => a.weekNumber - b.weekNumber).map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${lesson.id}`}
                    className="block p-4 rounded-lg transition-all duration-200 transform hover:scale-105
                      bg-gray-50 dark:bg-gray-700 
                      hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium px-2 py-1 rounded 
                          bg-blue-100 dark:bg-gray-600 
                          text-blue-600 dark:text-gray-300">
                          Week {lesson.weekNumber}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-sm flex-grow text-gray-600 dark:text-gray-400">
                        {lesson.description}
                      </p>
                      <div className="flex items-center mt-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <BookOpenIcon className="h-4 w-4 mr-1" />
                          {lesson.content && lesson.content.theory && lesson.content.theory.points ? lesson.content.theory.points.length : 0} Topics
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;