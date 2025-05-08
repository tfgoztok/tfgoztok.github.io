import React, { useState } from 'react';
import { useBookContext } from '../context/BookContext';
import EditBookForm from './EditBookForm';

const BookList = () => {
  const { books, deleteBook, loading, error } = useBookContext();
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="book-list">
      <h2>Book Library</h2>
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onClose={() => setEditingBook(null)}
        />
      )}
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <div className="book-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(book)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList; 