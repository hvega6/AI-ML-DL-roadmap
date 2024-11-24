import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ParticleProvider } from './context/ParticleContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navigation from './components/Navigation';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Lessons from './views/Lessons';
import Lesson from './views/Lesson';
import Curriculum from './views/Curriculum';
import Resources from './views/Resources';
import Profile from './views/Profile';
import AdminDashboard from './views/admin/AdminDashboard';
import AdminSettings from './views/admin/AdminSettings';
import ManageUsers from './views/admin/ManageUsers';
import ManageContent from './views/admin/ManageContent';
import AuthModal from './components/AuthModal';

const AppContent: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login');
  const { isDarkMode } = useTheme();

  const handleLoginClick = () => {
    setAuthModalView('login');
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalView('register');
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleSwitchAuthView = () => {
    setAuthModalView(prev => prev === 'login' ? 'register' : 'login');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Navigation 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleAuthModalClose}
        view={authModalView}
        onSwitchView={handleSwitchAuthView}
      />

      <main className="pt-16 flex-1">
        <Switch>
          {/* Public Routes */}
          <Route exact path="/" component={Home} />
          <Route path="/curriculum" component={Curriculum} />
          <Route path="/resources" component={Resources} />
          
          {/* Protected Routes */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/lessons" component={Lessons} />
          <PrivateRoute path="/lesson/:id" component={Lesson} />
          <PrivateRoute path="/profile" component={Profile} />

          {/* Admin Routes */}
          <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute path="/admin/settings" component={AdminSettings} />
          <AdminRoute path="/admin/users" component={ManageUsers} />
          <AdminRoute path="/admin/content" component={ManageContent} />
          
          {/* Catch all route */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <ParticleProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ParticleProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;