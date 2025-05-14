import React from 'react';
import { Link } from 'react-router-dom';

function ListBooks({ books, onDeleteBook }) {
  return (
    <div className="list-books">
      <h2>Book Library</h2>
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>By: {book.author}</p>
            <div className="book-actions">
              <Link to={`/edit/${book.id}`} className="edit-link">
                Edit
              </Link>
              <button onClick={() => onDeleteBook(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListBooks; 