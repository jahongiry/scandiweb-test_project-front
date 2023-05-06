import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.scss';
import { useLocation } from 'react-router-dom';
import NavProductList from '../Navigation/NavProductList';
import { MAINURL } from '../Const';

function ProductList() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${MAINURL}/v1/products`)
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
      .delete(`${MAINURL}/v1/products/delete`, {
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
              <input
                className='delete-checkbox'
                type='checkbox'
                onChange={() =>
                  selected.includes(product.sku)
                    ? handleDeselect(product.sku)
                    : handleSelect(product.sku)
                }
              />
              <p className='skuOnList'>{product.sku}</p>
              <p>{product.name}</p>
              <p>Price: {product.price}</p>
              {product.size && <p>Size: {product.size}</p>}
              {product.weight && <p>Weight: {product.weight}</p>}
              {product.dimension && <p>Dimension {product.dimension}</p>}
            </li>
          ))}
        </ul>
        {error && <div>Error: {error.message}</div>}
      </div>
    </>
  );
}

export default ProductList;
