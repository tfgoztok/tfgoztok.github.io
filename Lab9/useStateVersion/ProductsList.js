import React, { useState } from 'react';
import Product from './Product';

const initialProducts = [
  { id: 1, name: 'Apple', price: 1, inStock: true },
  { id: 2, name: 'Banana', price: 1, inStock: false },
  { id: 3, name: 'Cherry', price: 2, inStock: true }
];

function ProductsList() {
  const [products, setProducts] = useState(initialProducts);

  const toggleStock = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, inStock: !product.inStock }
        : product
    ));
  };

  return (
    <div className="products-list">
      {products.map(product => (
        <Product 
          key={product.id} 
          {...product} 
          onToggleStock={() => toggleStock(product.id)} 
        />
      ))}
    </div>
  );
}

export default ProductsList; 