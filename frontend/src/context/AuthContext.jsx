import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  const api = axios.create({
    baseURL: 'https://nexusflow-9ksp.onrender.com/api',
  });

  useEffect(() => {
    // Check for token in localStorage on load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const res = await api.post('/users/login', { email, password });
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        toast.success('Successfully logged in!');
      }
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // Register
  const register = async (name, email, password) => {
    try {
      const res = await api.post('/users/register', { name, email, password });
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        toast.success('Account created successfully!');
      }
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Demo Login
  const demoLogin = async () => {
    try {
      const res = await api.post('/users/demo');
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        toast.success('Logged in as Evaluator Demo!');
      }
      return true;
    } catch (error) {
      toast.error('Demo login failed');
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
