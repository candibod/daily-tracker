import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { useMemo, useState, useEffect, createContext } from 'react';

import { auth } from './firebase';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = useMemo(
    () => ({
      user,
      loading,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
