import React from 'react';
import { BookProvider } from './context/BookContext';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
  return (
    <BookProvider>
      <div className="app">
        <header>
          <h1>Book Library Management for Lab10</h1>
        </header>
        <main>
          <AddBookForm />
          <BookList />
        </main>
      </div>
    </BookProvider>
  );
}

export default App; 