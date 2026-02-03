import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import StyleList from './pages/StyleList';
import StyleForm from './pages/StyleForm';
import StyleDetail from './pages/StyleDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/styles" replace />} />
          <Route path="styles" element={<StyleList />} />
          <Route path="styles/new" element={<StyleForm />} />
          <Route path="styles/:id/edit" element={<StyleForm />} />
          <Route path="styles/:id" element={<StyleDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
