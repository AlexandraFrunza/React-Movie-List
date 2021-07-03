import React, { useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../shared/useLocalStorage';

const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useLocalStorage(null, 'authToken');
  const [user, setUser] = useLocalStorage(null, 'authUser');

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, [setToken, setUser]);

  const contextValue = useMemo(
    () => ({ token, setToken, user, setUser, logout }),
    [token, setToken, user, setUser, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
