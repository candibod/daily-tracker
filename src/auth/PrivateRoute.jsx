import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (user) {
    return children;
  }

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return <span>Loading...</span>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
