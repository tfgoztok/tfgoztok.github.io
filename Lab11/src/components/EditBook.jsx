import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook({ books, onUpdateBook }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', author: '' });
  const [book, setBook] = useState(null);

  useEffect(() => {
    const bookToEdit = books.find(b => b.id === id);
    if (bookToEdit) {
      setBook(bookToEdit);
      setFormData({ title: bookToEdit.title, author: bookToEdit.author });
    }
  }, [id, books]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;
    await onUpdateBook(id, formData);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="edit-book">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="button-group">
          <button type="submit">Update Book</button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBook; 