import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ComponentType<any>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin, isLoading, user } = useAuth();

  // Debug logging
  console.log('AdminRoute Debug:', {
    isAuthenticated,
    isAdmin,
    isLoading,
    user,
    userRole: user?.role,
    userIsAdmin: user?.isAdmin,
    path: rest.path
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: rest.location }
        }}
      />
    );
  }

  if (!isAdmin) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { 
            from: rest.location,
            error: 'You do not have permission to access this page.'
          }
        }}
      />
    );
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default AdminRoute;
