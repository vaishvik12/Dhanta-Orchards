import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter  } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import ScrollToTop from '../src/components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop/>
      <App />
    </HashRouter>
  </React.StrictMode>
);

