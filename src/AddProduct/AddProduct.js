import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.scss';
import NavAddProduct from '../Navigation/NavAddProduct';
import { MAINURL } from '../Const';

function AddProduct() {
  const location = useLocation();
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [property, setProperty] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [error, setError] = useState(false);
  const [errorSku, setErrorSku] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (height.length > 0 && width.length > 0 && length.length > 0) {
      setProperty(`${height}x${width}x${length}`);
    }
  }, [height, width, length]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (
      sku.length === 0 ||
      name.length === 0 ||
      price.length === 0 ||
      selectedOption.length === 0 ||
      property.length === 0 ||
      height.length === 0 ||
      width.length === 0 ||
      length.length === 0
    ) {
      setError(true);
    }
    const product = {
      sku: sku,
      type: selectedOption,
      name: name,
      price: price,
      featureVolume: property,
    };

    axios
      .post(`${MAINURL}/v1/products/add`, product)
      .then((response) => {
        if (response.data.message === 'Product has been created!') {
          navigate('/');
        }
        if (response.data.message === 'SKU already exists') {
          setErrorSku(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <>
      {location.pathname === '/addproduct' && (
        <NavAddProduct saveProduct={saveProduct} />
      )}
      <div className='addProductBody'>
        <form id='product_form'>
          <div>
            <label htmlFor='sku'>SKU</label>
            <input
              id='sku'
              type='text'
              value={sku}
              onChange={(e) => {
                setSku(e.target.value);
              }}
              required
            />
            {error && sku.length === 0 ? (
              <span className='inputError'>Please enter sku</span>
            ) : (
              ''
            )}
            {errorSku && (
              <span className='inputError'>
                The sku already exists, try unqiue sku
              </span>
            )}
          </div>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {error && name.length === 0 ? (
              <span className='inputError'>Please enter name</span>
            ) : (
              ''
            )}
          </div>

          <div>
            <label htmlFor='price'>Price($)</label>
            <input
              id='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            {error && price.length === 0 ? (
              <span className='inputError'>Please enter price</span>
            ) : (
              ''
            )}
          </div>
          <div>
            <label htmlFor='productType'>Product Type:</label>
            <select
              id='productType'
              value={selectedOption}
              onChange={handleOptionChange}
              required
            >
              <option value=''>Select Type</option>
              <option value='DVD'>DVD</option>
              <option value='Book'>Book</option>
              <option value='Furniture'>Furniture</option>
            </select>
            {error && selectedOption.length === 0 ? (
              <span className='inputError'>Please select product type</span>
            ) : (
              ''
            )}
          </div>

          {selectedOption === 'DVD' && (
            <div id='DVD'>
              <label htmlFor='size'>Please, provide size (MB):</label>
              <input
                type='text'
                name='size'
                id='size'
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              />
              {error && property.length === 0 ? (
                <span className='inputError'>Please enter size</span>
              ) : (
                ''
              )}
            </div>
          )}
          {selectedOption === 'Furniture' && (
            <div id='Furniture'>
              <label htmlFor='height'>Please, provide dimension (HxWxL):</label>
              <input
                type='text'
                name='height'
                id='height'
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder='Height (CM)'
              />
              {error && height.length === 0 ? (
                <span className='inputError'>Please enter height</span>
              ) : (
                ''
              )}
              <input
                type='text'
                name='width'
                id='width'
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder='Width (CM)'
              />
              {error && width.length === 0 ? (
                <span className='inputError'>Please enter width</span>
              ) : (
                ''
              )}
              <input
                type='text'
                name='length'
                id='length'
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder='Lenght (CM)'
              />
              {error && length.length === 0 ? (
                <span className='inputError'>Please enter length</span>
              ) : (
                ''
              )}
            </div>
          )}

          {selectedOption === 'Book' && (
            <div id='Book'>
              <label htmlFor='weight'>Please, provide weight (KG):</label>
              <input
                type='text'
                name='weight'
                id='weight'
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              />
              {error && property.length === 0 ? (
                <span className='inputError'>Please enter weight</span>
              ) : (
                ''
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default AddProduct;
