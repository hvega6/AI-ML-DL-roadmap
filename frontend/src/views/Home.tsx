import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, AcademicCapIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { Feature } from '../types';
import Modal from '../components/Modal';
import Register from './Register';
import Login from './Login';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: '-100px 0px' // Adds a negative margin to delay the trigger
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const features: Feature[] = [
    {
      title: 'Machine Learning Fundamentals',
      description: 'Learn the core concepts of ML including supervised learning, unsupervised learning, and model evaluation.'
    },
    {
      title: 'Deep Learning & Neural Networks',
      description: 'Master neural networks, deep learning frameworks, and advanced architectures.'
    },
    {
      title: 'AI Applications',
      description: 'Build real-world AI applications in computer vision, NLP, and reinforcement learning.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-blue-600'} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Master AI, ML & Deep Learning
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Your comprehensive learning platform for Artificial Intelligence, Machine Learning, and Deep Learning. Start your journey from basics to advanced concepts with structured learning paths.
          </p>
          <div className="mt-10 flex space-x-4">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                isDarkMode 
                  ? 'text-base bg-blue-500 hover:bg-gray-700' 
                  : 'text-white bg-blue-700 hover:bg-blue-600'
              } transition-colors duration-200`}
            >
              Start Learning
            </button>
            <Link to="/curriculum" className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition-colors duration-200">
              View Curriculum
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold ${
              isDarkMode ? 'text-white' : 'text-blue-900'
            }`}>
              What You'll Learn
            </h2>
            <p className={`mt-4 text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-blue-600'
            }`}>
              Comprehensive curriculum covering the most in-demand AI and ML skills
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className={`flow-root ${
                    isDarkMode 
                      ? 'bg-gray-900 border-gray-700' 
                      : 'bg-white/50 border-blue-200'
                    } rounded-lg px-6 pb-8 h-full border shadow-lg`}>
                    <div className="-mt-6">
                      <h3 className={`mt-8 text-lg font-medium ${
                        isDarkMode ? 'text-white' : 'text-blue-900'
                      } tracking-tight`}>
                        {feature.title}
                      </h3>
                      <p className={`mt-5 text-base ${
                        isDarkMode ? 'text-gray-400' : 'text-blue-700'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Image Section */}
      <div 
        ref={imageRef}
        className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-500'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`transform transition-all duration-1000 ease-out
              ${isImageVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-32'
              }`}
          >
            <img
              src={new URL('/src/public/main/infography.png', import.meta.url).href}
              alt="AI Learning Roadmap Infographic"
              className="mx-auto max-w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              style={{ maxWidth: '1200px' }}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <Register 
          isModal 
          onClose={() => setIsRegisterModalOpen(false)} 
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      </Modal>

      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login 
          isModal 
          onClose={() => setIsLoginModalOpen(false)} 
          onSwitchToRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
      </Modal>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        } ${
          isDarkMode
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-blue-700 hover:bg-blue-800 text-white'
        }`}
        style={{ zIndex: 1000 }}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Home;
