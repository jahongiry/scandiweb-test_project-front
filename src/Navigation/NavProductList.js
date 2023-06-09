import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function NavProductList({ handleDeleteAll }) {
  return (
    <div className='naviagtion'>
      <nav>
        <ul>
          <li>
            <Link to='/'>
              <h1 className='pageName'>Product List</h1>
            </Link>
          </li>
          <li>
            <Link to='/addproduct'>
              <button className='add-btn'>ADD</button>
            </Link>
            <button onClick={handleDeleteAll} id='delete-product-button'>
              MASS DELETE
            </button>
          </li>
        </ul>
      </nav>
      <hr className='navLine' />
    </div>
  );
}

export default NavProductList;
