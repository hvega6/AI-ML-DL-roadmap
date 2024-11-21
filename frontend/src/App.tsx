import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';

// Protected Route wrapper component
const ProtectedRoute: React.FC<{ component: React.ComponentType<any>; path: string; exact?: boolean }> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

// Admin Route wrapper component
const AdminRoute: React.FC<{ component: React.ComponentType<any>; path: string; exact?: boolean }> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  
  return (
    <Route
      {...rest}
      render={props =>
        user && user.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            {/* Add more routes here */}
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;