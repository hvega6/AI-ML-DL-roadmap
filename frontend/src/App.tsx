import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ParticleProvider } from './context/ParticleContext';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import Lessons from './views/Lessons';
import Lesson from './views/Lesson';
import Curriculum from './views/Curriculum';
import Resources from './views/Resources';
import Profile from './views/Profile';

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
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/curriculum" component={Curriculum} />
                <Route path="/resources" component={Resources} />
                
                {/* Protected Routes */}
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/lessons" component={Lessons} />
                <PrivateRoute path="/lesson/:id" component={Lesson} />
                <PrivateRoute path="/profile" component={Profile} />
                
                {/* Catch all route */}
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>
          </AuthProvider>
        </ParticleProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;