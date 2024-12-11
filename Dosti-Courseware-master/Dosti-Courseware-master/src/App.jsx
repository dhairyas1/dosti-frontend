import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from './pages/Course';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" element={<Course />} />
      </Routes>
    </Router>
  );
}

export default App; 