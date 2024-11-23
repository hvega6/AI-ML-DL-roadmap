import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, AcademicCapIcon, ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useParticles } from '../context/ParticleContext';
import { Feature } from '../types';
import Modal from '../components/Modal';
import Register from './Register';
import Login from './Login';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const particles = useParticles();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
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
        threshold: 0.5,
        rootMargin: '-100px 0px'
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <div className={`relative min-h-screen flex items-center ${isDarkMode ? 'bg-gray-900' : 'bg-blue-400'}`}>
        {/* Particle Container */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute rounded-full mix-blend-screen"
                style={{
                  width: `${particle.particleSize}px`,
                  height: `${particle.particleSize}px`,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  backgroundColor: isDarkMode 
                    ? `hsla(${particle.hue}, 100%, 75%, 0.7)`
                    : `hsla(${particle.hue}, 100%, 45%, 0.6)`,
                  animation: `
                    float-${i} ${particle.duration}s infinite ${particle.delay}s linear,
                    fade ${particle.duration}s infinite ${particle.delay}s ease-in-out
                  `,
                  mixBlendMode: isDarkMode ? 'screen' : 'multiply',
                }}
              />
            ))}
          </div>
          <style>
            {`
              ${particles.map((particle, i) => `
                @keyframes float-${i} {
                  0% {
                    transform: translate(0, 0) rotate(0deg) scale(0);
                  }
                  50% {
                    transform: translate(${particle.translateX/2}%, ${particle.translateY/2}%) rotate(${particle.rotationAngle/2}deg) scale(1);
                  }
                  100% {
                    transform: translate(${particle.translateX}%, ${particle.translateY}%) rotate(${particle.rotationAngle}deg) scale(0);
                  }
                }
              `).join('\n')}

              @keyframes fade {
                0%, 100% { opacity: 0; }
                20%, 80% { opacity: 1; }
              }
            `}
          </style>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className={`text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-blue-900'} sm:text-5xl lg:text-6xl`}>
              Master AI, ML & Deep Learning
            </h1>
            <p className={`mt-6 text-xl ${isDarkMode ? 'text-gray-300' : 'text-blue-900'} max-w-3xl`}>
              Your comprehensive learning platform for Artificial Intelligence, Machine Learning, and Deep Learning. Start your journey from basics to advanced concepts with structured learning paths.
            </p>
            <div className="mt-10 flex space-x-4">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white 
                  ${isDarkMode 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                  } transition-colors duration-200`}
              >
                Start Learning
              </button>
              <Link 
                to="/curriculum" 
                className={`inline-flex items-center px-6 py-3 border text-base font-medium rounded-md 
                  ${isDarkMode 
                    ? 'text-white hover:bg-blue-600 border-white' 
                    : 'text-blue-900 border-blue-900 hover:bg-blue-600 hover:text-white'
                  } transition-colors duration-200`}
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
      <div className={`relative min-h-screen flex items-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="absolute inset-x-0 top-12 bottom-2">
          {particles.map((particle, i) => (
            <div
              key={`section-particle-${i}`}
              className="absolute rounded-full mix-blend-screen"
              style={{
                width: `${particle.particleSize}px`,
                height: `${particle.particleSize}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                backgroundColor: isDarkMode 
                  ? `hsla(${particle.hue}, 100%, 75%, 0.7)`
                  : `hsla(${particle.hue}, 100%, 45%, 0.6)`,
                animation: `
                  float-${i} ${particle.duration}s infinite ${particle.delay}s linear,
                  fade ${particle.duration}s infinite ${particle.delay}s ease-in-out
                `,
                mixBlendMode: isDarkMode ? 'screen' : 'multiply',
              }}
            />
          ))}
        </div>
        <div className="relative z-10 w-full py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={imageRef}
              className={`transform transition-all duration-1000 ease-in-out ${
                isImageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
              }`}
            >
              {/* Mobile View */}
              <div className="block sm:hidden">
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
                        src="/images/infography.png"
                        alt="AI Learning Roadmap Infographic"
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block">
                <div className="relative group cursor-pointer p-4">
                  <div className="transform-gpu transition-transform duration-300 ease-out group-hover:scale-105">
                    <img
                      src="/images/infography.png"
                      alt="AI Learning Roadmap Infographic"
                      className="mx-auto w-full h-auto rounded-lg shadow-lg"
                      style={{ maxWidth: '1300px' }}
                    />
                  </div>
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
