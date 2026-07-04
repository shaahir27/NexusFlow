import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, demoLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const onDemoClick = async () => {
    try {
      await demoLogin();
      navigate('/');
    } catch (err) {
      setError('Demo login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          Login to NexusFlow
        </h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
            Login
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text-secondary)' }}>
          <small>OR</small>
        </div>

        <button 
          onClick={onDemoClick} 
          className="btn" 
          style={{ width: '100%', padding: '12px', border: '1px solid var(--accent-peach)', color: 'var(--accent-peach)', backgroundColor: 'transparent' }}
        >
          ✨ Try Evaluator Demo (1-Click)
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
