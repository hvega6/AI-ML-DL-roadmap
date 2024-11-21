import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ParticleProvider } from './context/ParticleContext';
import Home from './views/Home';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Lesson from './views/Lesson';
import Lessons from './views/Lessons';
import Curriculum from './views/Curriculum';
import Resources from './views/Resources';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <ParticleProvider>
          <AuthProvider>
            <div className="min-h-screen">
              <Navigation />
              <Switch>
                {/* Public Routes */}
                <Route exact path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                
                {/* Learning Routes */}
                <Route exact path="/lessons" component={Lessons} />
                <Route path="/lesson/:id" component={Lesson} />
                <Route path="/curriculum" component={Curriculum} />
                <Route path="/resources" component={Resources} />
              </Switch>
            </div>
          </AuthProvider>
        </ParticleProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;