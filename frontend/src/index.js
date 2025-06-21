import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Wir können später eine CSS-Datei für globales Styling erstellen

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 