import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Products from './pages/Products';
import EditProduct from './pages/EditProduct';
import ProductForm from './pages/ProductForm'; 
import Navbar from './components/Navbar/Navbar ';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
       
        <Route path="/products" element={<Products />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />

        <Route path="/add-product" element={<ProductForm />} /> 
        <Route path="/edit-product/:id" element={<ProductForm />} /> 
     
      </Routes>
    </Router>
  );
};

export default App;

