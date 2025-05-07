import React from 'react';
import ProductsList from './ProductsList';
import './styles.css';

function App() {
  return (
    <div className="app">
      <h1>Product Inventory (useReducer Version)</h1>
      <ProductsList />
    </div>
  );
}

export default App; 