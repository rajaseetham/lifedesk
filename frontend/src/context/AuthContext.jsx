import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lifedesk_user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 1,
      email: 'rajaseetha@example.com',
      fullName: 'Rajaseetha',
      token: 'mock-jwt-token-lifedesk-privacy-first-2026'
    };
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('lifedesk_token') || 'mock-jwt-token-lifedesk-privacy-first-2026';
  });

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('lifedesk_user', JSON.stringify(user));
      localStorage.setItem('lifedesk_token', token);
    } else {
      localStorage.removeItem('lifedesk_user');
      localStorage.removeItem('lifedesk_token');
    }
  }, [user, token]);

  const login = async (email, password) => {
    // Standard auth login workflow with fallback mock for standalone desktop execution
    const mockUser = {
      id: Date.now(),
      email,
      fullName: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
      token: 'jwt-header.' + btoa(JSON.stringify({ sub: email, exp: Date.now() + 86400000 })) + '.signature'
    };
    setUser(mockUser);
    setToken(mockUser.token);
    return { success: true, user: mockUser };
  };

  const register = async (fullName, email, password) => {
    const newUser = {
      id: Date.now(),
      email,
      fullName,
      token: 'jwt-header.' + btoa(JSON.stringify({ sub: email, exp: Date.now() + 86400000 })) + '.signature'
    };
    setUser(newUser);
    setToken(newUser.token);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
