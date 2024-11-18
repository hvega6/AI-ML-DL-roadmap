import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Lesson from './views/Lesson';
import Login from './views/Login';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/lesson/:id" component={Lesson} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;