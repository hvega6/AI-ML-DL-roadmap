import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, AcademicCapIcon, ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { Feature } from '../types';
import Modal from '../components/Modal';
import Register from './Register';
import Login from './Login';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
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

  const renderParticles = () => {
    return Array.from({ length: 300 }, (_, i) => {
      // Randomize particle properties
      const delay = Math.random() * 14;
      const duration = 14 + Math.random() * 2;
      const hue = Math.floor(Math.random() * 360);
      const size = Math.random() * 3 + 1; // 1-4px
      const translateX = Math.random() * 200 + 100; // 100-300px
      const rotateZ = Math.random() * 360;
      const rotateY = Math.random() * 360;

      return (
        <div 
          key={i} 
          className="absolute w-[2px] h-[2px] rounded-full opacity-0"
          style={{
            animation: `orbit${i} ${duration}s infinite`,
            animationDelay: `${delay}s`,
            backgroundColor: `hsla(${hue}, 100%, 50%, 1)`,
          }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   w-0 h-0 perspective-[1000px] animate-[rotate_14s_infinite_linear]"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {renderParticles()}
      </div>
      
      {/* Hero Section */}
      <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <style>{`
            @keyframes particleAnimation {
              0%, 100% { 
                opacity: 0;
                transform: scale(0) translateX(0) translateY(0);
              }
              20%, 80% { 
                opacity: 1;
                transform: scale(1) translateX(calc(var(--translate-x))) translateY(calc(var(--translate-y)));
              }
            }

            @keyframes hoverAnimation {
              0%, 100% { 
                opacity: 0;
                transform: 
                  scale(0) 
                  translateX(calc(-2px + ${Math.random() * 4}px)) 
                  translateY(calc(-2px + ${Math.random() * 4}px));
              }
              20%, 80% { 
                opacity: 1;
                transform: 
                  scale(1) 
                  translateX(calc(-1px + ${Math.random() * 2}px)) 
                  translateY(calc(-1px + ${Math.random() * 2}px));
              }
              50% {
                transform: 
                  scale(1) 
                  translateX(calc(-3px + ${Math.random() * 6}px)) 
                  translateY(calc(-3px + ${Math.random() * 6}px));
              }
            }
          `}</style>
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
          >
            {/* Hovering Stationary Particles */}
            {Array.from({ length: 200 }, (_, i) => {
              const delay = Math.random() * 14;
              const duration = 14;
              const hue = Math.floor(Math.random() * 360);

              return (
                <div 
                  key={`hover-${i}`} 
                  className="absolute w-[2px] h-[2px] rounded-full"
                  style={{
                    animation: `hoverAnimation ${duration}s infinite`,
                    animationDelay: `${delay}s`,
                    backgroundColor: `hsla(${hue}, 100%, 50%, 0.7)`,
                    top: `${Math.random() * 120}%`,
                    left: `${Math.random() * 120}%`,
                    transform: 'translate(-50%, -50%)', // Center each particle
                  }}
                />
              );
            })}

            {/* Random Moving Particles */}
            {Array.from({ length: 300 }, (_, i) => {
              const delay = Math.random() * 5;
              const duration = 5 + Math.random() * 5;
              const hue = Math.floor(Math.random() * 360);
              
              // Calculate translation with larger range
              const translateX = (Math.random() * 400 - 200) + 'px';
              const translateY = (Math.random() * 400 - 200) + 'px';

              return (
                <div 
                  key={`move-${i}`} 
                  className="absolute w-[2px] h-[2px] rounded-full"
                  style={{
                    animation: `particleAnimation ${duration}s infinite`,
                    animationDelay: `${delay}s`,
                    backgroundColor: `hsla(${hue}, 100%, 50%, 0.7)`,
                    top: `${Math.random() * 120}%`,
                    left: `${Math.random() * 120}%`,
                    '--translate-x': translateX,
                    '--translate-y': translateY,
                    transform: 'translate(-50%, -50%)', // Center each particle
                  }}
                />
              );
            })}
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Master AI, ML & Deep Learning
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              Your comprehensive learning platform for Artificial Intelligence, Machine Learning, and Deep Learning. Start your journey from basics to advanced concepts with structured learning paths.
            </p>
            <div className="mt-10 flex space-x-4">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-base bg-blue-500 hover:bg-gray-700 transition-colors duration-200"
              >
                Start Learning
              </button>
              <Link 
                to="/curriculum" 
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition-colors duration-200"
              >
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-blue-900'
              }`}>
              What You'll Learn
            </h2>
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-blue-600'
              }`}>
              Comprehensive curriculum covering the most in-demand AI and ML skills
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className={`flow-root ${isDarkMode
                      ? 'bg-gray-900 border-gray-700'
                      : 'bg-white/50 border-blue-200'
                    } rounded-lg px-6 pb-8 h-full border shadow-lg`}>
                    <div className="-mt-6">
                      <h3 className={`mt-8 text-lg font-medium ${isDarkMode ? 'text-white' : 'text-blue-900'
                        } tracking-tight`}>
                        {feature.title}
                      </h3>
                      <p className={`mt-5 text-base ${isDarkMode ? 'text-gray-400' : 'text-blue-700'
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
        className={`relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8 sm:py-12`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={imageRef}
            className="transform transition-all duration-1000 ease-in-out"
          >
            {/* Mobile View */}
            <div className={`block sm:hidden transform transition-all duration-1000 ease-in-out ${
              isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
            }`}>
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <button
                  onClick={() => setIsImageExpanded(!isImageExpanded)}
                  className="w-full flex items-center justify-between p-2 text-left"
                >
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    View AI Learning Roadmap
                  </span>
                  {isImageExpanded ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </button>
                {isImageExpanded && (
                  <div className="mt-4">
                    <img
                      src={new URL('/src/public/main/infography.png', import.meta.url).href}
                      alt="AI Learning Roadmap Infographic"
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Desktop View */}
            <div className={`hidden sm:block transform transition-all duration-1000 ease-in-out ${
              isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
            }`}>
              <div className="relative group cursor-pointer p-4">
                <div className="transform-gpu transition-transform duration-300 ease-out group-hover:scale-105">
                  <img
                    src={new URL('/src/public/main/infography.png', import.meta.url).href}
                    alt="AI Learning Roadmap Infographic"
                    className="mx-auto w-full h-auto rounded-lg shadow-lg"
                    style={{ maxWidth: '1000px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} py-12 sm:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
              What Our Learners Say
            </h2>
            <p className={`mt-4 text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-blue-600'}`}>
              Join thousands of successful learners who transformed their careers
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Alex Johnson',
                role: 'ML Engineer at Google',
                feedback: 'The structured curriculum and hands-on projects helped me transition from a data analyst to an ML engineer. The community support was invaluable!',
                img: 'https://randomuser.me/api/portraits/men/1.jpg',
                rating: 5
              },
              {
                name: 'Emily Carter',
                role: 'AI Researcher',
                feedback: 'From zero programming knowledge to building deep learning models. The step-by-step approach and real-world projects made the difference.',
                img: 'https://randomuser.me/api/portraits/women/2.jpg',
                rating: 5
              },
              {
                name: 'Michael Smith',
                role: 'Data Science Lead',
                feedback: 'The advanced projects and capstones prepared me for real-world challenges. Now leading a team of data scientists!',
                img: 'https://randomuser.me/api/portraits/men/3.jpg',
                rating: 5
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`rounded-xl shadow-xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-900 border border-gray-700'
                    : 'bg-white/90 backdrop-blur-sm border border-blue-100'
                }`}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-4 ring-blue-500/20"
                  />
                  <div className="ml-4">
                    <p className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className={`text-base sm:text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.feedback}"
                </p>
                <div className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <a
                    href="#"
                    className={`inline-flex items-center text-sm font-medium ${
                      isDarkMode
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-600 hover:text-blue-500'
                    }`}
                  >
                    Read full story
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

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
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          } ${isDarkMode
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
