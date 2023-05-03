import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './ProductList/ProductList';
import AddProduct from './AddProduct/AddProduct';
import Footer from './Footer/Footer';

function App() {
  const [productSaved, setProductSaved] = useState(false);

  const handleProductSave = () => {
    setProductSaved(true);
  };

  return (
    <div className='main'>
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
