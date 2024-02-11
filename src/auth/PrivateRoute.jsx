import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { AuthProvider } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthProvider);

  console.log('coming in');
  if (loading) {
    return <span className="loading loading-dots loading-lg" />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
