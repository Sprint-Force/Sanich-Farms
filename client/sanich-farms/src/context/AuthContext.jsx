import React from 'react';
import { AuthContext } from './AuthContextDefinition.js';
import { useAuth } from '../hooks/useAuth.js';

const AuthProvider = ({ children }) => {
  const authValue = useAuth();

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
