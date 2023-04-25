import React from 'react';
import { Link } from 'react-router-dom';

function NavAddProduct() {
  return (
    <div className='naviagtion'>
      <nav>
        <ul>
          <li>
            <Link to='/addproduct'>
              <h1 className='pageName'>Add Product</h1>
            </Link>
          </li>
          <li>
            <button type='submit' className='add-btn'>
              Save
            </button>
            <Link to='/'>
              <button className='cancel-btn'>Cancel </button>
            </Link>
          </li>
        </ul>
      </nav>
      <hr className='navLine' />
    </div>
  );
}

export default NavAddProduct;
