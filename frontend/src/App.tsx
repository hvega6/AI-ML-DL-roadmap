import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Lesson from './views/Lesson';
import Login from './views/Login';
import Curriculum from './views/Curriculum';
import Resources from './views/Resources';
import Lessons from './views/Lessons';
import { useTheme } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <main className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/lesson/:id" component={Lesson} />
          <Route path="/login" component={Login} />
          <Route path="/curriculum" component={Curriculum} />
          <Route path="/resources" component={Resources} />
          <Route path="/lessons" component={Lessons} />
          <Route path="*" component={Home} />
        </Switch>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;