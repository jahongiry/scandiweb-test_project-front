import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.scss';

function AddProduct() {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to save the product goes here
    // Once the product is successfully saved, redirect to the ProductList page
    navigate('/');
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='addProductBody'>
      <form id='product_form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='sku'>SKU</label>
          <input
            id='sku'
            type='text'
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='price'>Price($)</label>
          <input
            id='price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='productType'>Product Type:</label>
          <select
            id='productType'
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value=''>Select Type</option>
            <option value='Disk'>Disk</option>
            <option value='Book'>Book</option>
            <option value='Furniture'>Furniture</option>
          </select>
        </div>

        {selectedOption === 'Disk' && (
          <div id='form1'>
            <label htmlFor='size'>Size:</label>
            <input type='text' name='size' id='size' />
          </div>
        )}

        {selectedOption === 'Furniture' && (
          <div id='form2'>
            <label htmlFor='height'>Height:</label>
            <input type='text' name='height' id='height' />
            <label htmlFor='width'>Width:</label>
            <input type='text' name='width' id='width' />
            <label htmlFor='length'>Length:</label>
            <input type='text' name='length' id='length' />
          </div>
        )}

        {selectedOption === 'Book' && (
          <div id='form3'>
            <label htmlFor='weight'>Weight:</label>
            <input type='text' name='weight' id='weight' />
          </div>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
