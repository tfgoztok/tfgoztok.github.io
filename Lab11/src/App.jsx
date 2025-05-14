import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddBook from './components/AddBook';
import ListBooks from './components/ListBooks';
import EditBook from './components/EditBook';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://67d17ef590e0670699ba5929.mockapi.io/books';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (formData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newBook = await response.json();
      setBooks([...books, newBook]);
    } catch (err) {
      setError('Failed to add book');
    }
  };

  const handleUpdateBook = async (id, formData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updated = await response.json();
      setBooks(books.map(book => book.id === id ? updated : book));
    } catch (err) {
      setError('Failed to update book');
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Delete this book?')) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <Router>
      <div className="app">
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add" className="nav-link">Add Book</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <ListBooks books={books} onDeleteBook={handleDeleteBook} />
          } />
          <Route path="/add" element={
            <AddBook onAddBook={handleAddBook} />
          } />
          <Route path="/edit/:id" element={
            <EditBook books={books} onUpdateBook={handleUpdateBook} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 