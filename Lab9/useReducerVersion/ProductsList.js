import React, { useReducer } from 'react';
import Product from './Product';

const initialProducts = [
  { id: 1, name: 'Apple', price: 1, inStock: true },
  { id: 2, name: 'Banana', price: 1, inStock: false },
  { id: 3, name: 'Cherry', price: 2, inStock: true }
];

const TOGGLE_STOCK = 'TOGGLE_STOCK';

function productsReducer(state, action) {
  switch (action.type) {
    case TOGGLE_STOCK:
      return state.map(product =>
        product.id === action.payload
          ? { ...product, inStock: !product.inStock }
          : product
      );
    default:
      return state;
  }
}

function ProductsList() {
  const [products, dispatch] = useReducer(productsReducer, initialProducts);

  const toggleStock = (productId) => {
    dispatch({ type: TOGGLE_STOCK, payload: productId });
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