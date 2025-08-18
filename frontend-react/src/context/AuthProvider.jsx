import React, { createContext, useState } from 'react'
import { isAuthenticated } from '../utils/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
