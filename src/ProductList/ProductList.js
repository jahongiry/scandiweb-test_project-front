import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.scss';
import { useLocation } from 'react-router-dom';
import NavProductList from '../Navigation/NavProductList';

function ProductList() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost/scandiweb-api/v1/products')
      .then((response) => setProducts(response.data.message))
      .catch((error) => setError(error));
  }, []);

  function handleSelect(sku) {
    setSelected((selected) => [...selected, sku]);
  }

  function handleDeselect(sku) {
    setSelected((selected) => selected.filter((s) => s !== sku));
  }

  function handleDeleteAll() {
    axios
      .delete('http://localhost/scandiweb-api/v1/products/delete', {
        data: { sku: selected },
      })
      .then((response) =>
        setProducts(products.filter((p) => !selected.includes(p.sku)))
      )
      .catch((error) => setError(error));
  }

  return (
    <>
      {location.pathname === '/' && (
        <NavProductList handleDeleteAll={handleDeleteAll} />
      )}

      <div className='productContainer'>
        <ul>
          {products.map((product) => (
            <li className='eachProductContainer' key={product.sku}>
              <div className='delete-checkbox'>
                <input
                  className='delete-checkbox'
                  id='delete-checkbox'
                  type='checkbox'
                  onChange={() =>
                    selected.includes(product.sku)
                      ? handleDeselect(product.sku)
                      : handleSelect(product.sku)
                  }
                />
              </div>
              <span className='skuOnList'>{product.sku}</span>
              <span>{product.name}</span>
              <span>Price: {product.price}</span>
              {product.size && <span>Size: {product.size}</span>}
              {product.weight && <span>Weight: {product.weight}</span>}
              {product.dimension && <span>Dimension {product.dimension}</span>}
            </li>
          ))}
        </ul>
        {error && <div>Error: {error.message}</div>}
      </div>
    </>
  );
}

export default ProductList;
