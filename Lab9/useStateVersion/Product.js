import React from 'react';

function Product({ id, name, price, inStock, onToggleStock }) {
  return (
    <div className="product">
      <h3 style={{ color: inStock ? 'green' : 'red' }}>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {inStock ? 'In Stock' : 'Out of Stock'}</p>
      <button onClick={onToggleStock}>
        {inStock ? 'Mark as Out of Stock' : 'Mark as In Stock'}
      </button>
    </div>
  );
}

export default Product; 