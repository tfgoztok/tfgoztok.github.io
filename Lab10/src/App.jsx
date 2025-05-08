import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '' });

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

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newBook = await response.json();
      setBooks([...books, newBook]);
      setFormData({ title: '', author: '' });
    } catch (err) {
      setError('Failed to add book');
    }
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;

    try {
      const response = await fetch(`${API_URL}/${editingBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const updated = await response.json();
      setBooks(books.map(book => book.id === editingBook.id ? updated : book));
      setEditingBook(null);
      setFormData({ title: '', author: '' });
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startEdit = (book) => {
    setEditingBook(book);
    setFormData({ title: book.title, author: book.author });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <h1>Book Library</h1>
      
      <form onSubmit={editingBook ? handleUpdateBook : handleAddBook}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
        />
        <button type="submit">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
        {editingBook && (
          <button type="button" onClick={() => {
            setEditingBook(null);
            setFormData({ title: '', author: '' });
          }}>
            Cancel
          </button>
        )}
      </form>

      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>By: {book.author}</p>
            <button onClick={() => startEdit(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App; 