import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './application/Router';

const token = window.csrf_token;

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router csrfToken={token} />
    </BrowserRouter>
  </React.StrictMode>
);


