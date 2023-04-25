import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.scss';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => setError(error));
  }, []);

  function handleSelect(id) {
    setSelected((selected) => [...selected, id]);
  }

  function handleDeselect(id) {
    setSelected((selected) => selected.filter((s) => s !== id));
  }

  function handleDeleteAll() {
    axios
      .delete('/api/products', { data: { selected } })
      .then((response) =>
        setProducts(products.filter((p) => !selected.includes(p.id)))
      )
      .catch((error) => setError(error));
  }

  const productsList = [
    { id: 1, sku: 'test1', name: 'Acme Disk', price: '1.00', size: 700 },
    { id: 2, sku: 'test2', name: 'Acme Disk', price: '1.00', size: 700 },
    { id: 3, sku: 'test3', name: 'Acme Disk', price: '1.00', size: 700 },
    { id: 4, sku: 'test3', name: 'Acme Disk', price: '1.00', size: 700 },
    { id: 1, sku: 'test1', name: 'Acme Disk', price: '1.00', size: 700 },
    { id: 2, sku: 'test2', name: 'Acme Disk', price: '1.00', size: 700 },
  ];

  return (
    <div className='productContainer'>
      {/* <button onClick={handleDeleteAll}>Delete All</button> */}
      <ul>
        {productsList.map((product) => (
          <li className='eachProductContainer' key={product.sku}>
            <input
              className='delete-checkbox'
              type='checkbox'
              checked={selected.includes(product.id)}
              onChange={() =>
                selected.includes(product.id)
                  ? handleDeselect(product.id)
                  : handleSelect(product.id)
              }
            />
            <span>{product.sku}</span>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>{product.size}</span>
          </li>
        ))}
      </ul>
      {/* {error && <div>Error: {error.message}</div>} */}
    </div>
  );
}

export default ProductList;
