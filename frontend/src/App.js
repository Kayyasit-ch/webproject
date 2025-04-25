// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './pages/ProductList.jsx';
import AddProduct from './pages/AddProduct.jsx';

function HomeButtons() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/')}>📦 go to product</button>
      <button onClick={() => navigate('/add')} style={{ marginLeft: '10px' }}>➕ go to add product</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <HomeButtons />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
