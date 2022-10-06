import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const token = localStorage.getItem('TOKEN');

  const setToken = (token: string) => {
    localStorage.setItem('TOKEN', token);
  };

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (token: string) => {
    setToken(token);
    navigate('/home');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken('');
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
