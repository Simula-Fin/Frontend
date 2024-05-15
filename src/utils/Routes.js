// Routes.js
import React from 'react';
import TestPage from '../pages/dash/teste';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from '../pages/login/App';

const MyRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/teste" element={<TestPage/>}/>
        </Routes>
    </Router>
  );
}

export default MyRoutes;