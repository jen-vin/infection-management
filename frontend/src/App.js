import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CasesPage from './pages/CasesPage';
import ContactsPage from './pages/ContactsPage';
import StatisticsPage from './pages/StatisticsPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/Auth/PrivateRoute';
import './App.css';

const Navigation = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>Infection Management</h2>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/cases" className="nav-link">Fälle</Link>
        <Link to="/contacts" className="nav-link">Kontakte</Link>
        <Link to="/statistics" className="nav-link">Statistiken</Link>
      </div>
      <div className="nav-actions">
        <button onClick={handleLogout} className="logout-btn">Abmelden</button>
      </div>
    </nav>
  );
};

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/cases" 
            element={
              <PrivateRoute>
                <AppLayout>
                  <CasesPage />
                </AppLayout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/contacts" 
            element={
              <PrivateRoute>
                <AppLayout>
                  <ContactsPage />
                </AppLayout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/statistics" 
            element={
              <PrivateRoute>
                <AppLayout>
                  <StatisticsPage />
                </AppLayout>
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 