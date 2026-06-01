import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/admin/login', form);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="admin-login-icon">🍎</span>
          <h1>Admin Login</h1>
          <p>Dhanta Orchards Management Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="admin@dhantaorchards.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Your password"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="form-status error">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="admin-login-back">
          <a href="/">← Back to website</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
