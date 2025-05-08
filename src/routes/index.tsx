import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import AR from '../pages/ar/App';
import Quiz from '../pages/quiz';


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/wimmelbild/" element={<Home />} />
        <Route path="/wimmelbild/ar" element={<AR />} />
        <Route path="/wimmelbild/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;