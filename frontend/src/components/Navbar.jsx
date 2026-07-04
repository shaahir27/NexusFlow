import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: '700' }} onClick={closeMenu}>
          🌌 NexusFlow
        </Link>
        
        {user && (
          <>
            <button className="hamburger" onClick={toggleMenu}>
              {isOpen ? '✕' : '☰'}
            </button>
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
              <span style={{ color: 'var(--text-secondary)' }}>Welcome, {user.name}</span>
              <button 
                onClick={handleLogout} 
                className="btn" 
                style={{ backgroundColor: 'var(--bg-deep)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
