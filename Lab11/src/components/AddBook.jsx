import React, { useState } from 'react';

function AddBook({ onAddBook }) {
  const [formData, setFormData] = useState({ title: '', author: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;
    await onAddBook(formData);
    setFormData({ title: '', author: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-book">
      <h2>Add New Book</h2>
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
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook; 