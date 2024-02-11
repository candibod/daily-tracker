import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user_id = useRef('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      user_id.current = user.uid;
    }

    setIsLoading(false);
    return null;
  });

  if (!isLoading) {
    if (user_id.current.length > 0) {
      return children;
    }

    return <Navigate to="/login" />;
  }

  return null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
