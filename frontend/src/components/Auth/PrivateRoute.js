import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Prüfe, ob der Benutzer authentifiziert ist
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Wenn nicht authentifiziert, zur Login-Seite umleiten
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wenn authentifiziert, die geschützte Komponente rendern
  return children;
};

export default PrivateRoute;
