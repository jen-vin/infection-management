import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Einfache Validierung für Demo-Zwecke
    if (credentials.username === 'admin' && credentials.password === 'password') {
      // Erfolgreicher Login
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      setError('Ungültige Anmeldedaten. Verwende admin/password für Demo.');
    }
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(''); // Fehler zurücksetzen bei Eingabe
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Infection Management System</h1>
          <p>Anmeldung für Gesundheitsbehörden</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Benutzername:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
              placeholder="Benutzername eingeben"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder="Passwort eingeben"
            />
          </div>

          <button type="submit" className="login-btn">
            Anmelden
          </button>
        </form>

        <div className="demo-info">
          <h3>Demo-Anmeldedaten:</h3>
          <p><strong>Benutzername:</strong> admin</p>
          <p><strong>Passwort:</strong> password</p>
        </div>

        <div className="login-footer">
          <p>Nur für autorisierte Gesundheitsbehörden</p>
          <p>© 2024 Infection Management System</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
