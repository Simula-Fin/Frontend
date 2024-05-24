import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AuthProvider } from './utils/AuthContext';
import MyRoutes from './utils/Routes';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MyRoutes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
