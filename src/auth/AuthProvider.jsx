import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { useMemo, useState, useEffect, useContext, createContext } from 'react';

import { auth } from './firebase';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user, loading);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // const generateUserInfo = (userInfo, loadingInfo) => {
  //   console.log({ userInfo, loadingInfo });
  //   return { userInfo, loadingInfo };
  // };

  // const authValue = useMemo(() => generateUserInfo(user, loading), [user, loading]);

  const authValue = useMemo(
    () => ({
      user,
      loading,
    }),
    [user, loading]
  );

  return (
    // <AuthContext.Provider value={useMemo(() => ({ user, loading }), [user, loading])}>{children}</AuthContext.Provider>
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthProvider = () => useContext(AuthContext);
