import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext, { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './components/Navbar';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>;
  
  return user ? children : <Navigate to="/login" />;
};

// Layout Wrapper
const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </>
  );
};

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#242F49',
                color: '#F3F4F6',
                border: '1px solid #384358'
              }
            }}
          />
          <AppRoutes />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
