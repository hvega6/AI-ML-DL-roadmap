import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaDiscord,
  FaYoutube
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const socialLinks = [
    { icon: <FaDiscord className="w-5 h-5" />, url: 'https://discord.gg', label: 'Discord' },
    { icon: <FaGithub className="w-5 h-5" />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FaYoutube className="w-5 h-5" />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaLinkedinIn className="w-5 h-5" />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaFacebookF className="w-5 h-5" />, url: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className={`${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 to-black text-gray-300' 
        : 'bg-gradient-to-b from-blue-900 to-blue-950 text-white'
    } py-16 relative overflow-hidden`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl mb-4 text-white">About AI Learning</h4>
            <p className="text-sm leading-relaxed opacity-85">
              Empowering the next generation of AI developers with comprehensive learning paths, hands-on projects, and expert guidance.
            </p>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`${
                    isDarkMode 
                      ? 'hover:bg-gray-700 bg-gray-800' 
                      : 'hover:bg-blue-700 bg-blue-800'
                  } p-2 rounded-full transition-all duration-300 hover:scale-110`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', text: 'Home' },
                { to: '/curriculum', text: 'Learning Paths', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { to: '/resources', text: 'Resources' },
                { to: '/community', text: 'Community' },
                { to: '/blog', text: 'Blog' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    onClick={link.onClick}
                    className="text-sm opacity-85 hover:opacity-100 transition-opacity duration-200 hover:translate-x-1 inline-flex items-center group"
                  >
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      {link.text}
                    </span>
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-xl mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 opacity-85 hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@ailearning.dev" className="text-sm hover:underline">
                  contact@ailearning.dev
                </a>
              </li>
              <li className="flex items-center space-x-3 opacity-85 hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                  123 AI Learning Street<br />
                  Tech Valley, CA 94043
                </span>
              </li>
              <li className="flex items-center space-x-3 opacity-85 hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-xl mb-4 text-white">Stay Updated</h4>
            <p className="text-sm mb-4 opacity-85">
              Get the latest updates on AI trends, course releases, and learning resources.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 focus:border-blue-500' 
                      : 'bg-blue-800 border-blue-700 focus:border-blue-400'
                  } border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  required
                />
                <button
                  type="submit"
                  className={`mt-3 w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Subscribe
                </button>
              </div>
              {isSubscribed && (
                <p className="text-green-400 text-sm mt-2">
                  Thanks for subscribing! 🎉
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 mt-8 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-blue-800'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-85">
              &copy; {new Date().getFullYear()} AI Learning Platform. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {[
                { to: '/privacy', text: 'Privacy Policy' },
                { to: '/terms', text: 'Terms of Service' },
                { to: '/sitemap', text: 'Sitemap' },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-sm opacity-85 hover:opacity-100 transition-opacity duration-200"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
