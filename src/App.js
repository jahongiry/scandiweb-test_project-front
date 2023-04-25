import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProductList from './ProductList/ProductList';
import AddProduct from './AddProduct/AddProduct';
import NavProductList from './Navigation/NavProductList';
import NavAddProduct from './Navigation/NavAddProduct';
import Footer from './Footer/Footer';

function App() {
  const [productSaved, setProductSaved] = useState(false);
  const location = useLocation();

  const handleProductSave = () => {
    setProductSaved(true);
  };

  return (
    <div className='main'>
      {location.pathname === '/addproduct' && <NavAddProduct />}
      {location.pathname === '/' && <NavProductList />}
      <Routes>
        <Route
          path='/addproduct'
          element={<AddProduct onProductSave={handleProductSave} />}
        />
        <Route path='/' element={<ProductList />} />
        {productSaved && <Navigate to='/' replace />}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
