import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

function BookForm() {
  const { addBook, editingBook, updateBook, setEditingBook } = useBooks();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('beli');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setStatus(editingBook.status);
      setErrors({});
    } else {
      setTitle('');
      setAuthor('');
      setStatus('beli');
    }
  }, [editingBook]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Judul buku wajib diisi!';
    if (!author.trim()) errs.author = 'Nama penulis wajib diisi!';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingBook) {
      updateBook({ ...editingBook, title, author, status });
    } else {
      addBook({ title, author, status });
    }

    setTitle('');
    setAuthor('');
    setStatus('beli');
    setErrors({});
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h3>{editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>

      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          id="title"
          type="text"
          className={errors.title ? 'input-error' : ''}
          placeholder="Masukkan judul buku..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          type="text"
          className={errors.author ? 'input-error' : ''}
          placeholder="Masukkan nama penulis..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <span className="error-text">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Buku</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="milik">Sudah Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {editingBook && (
          <button type="button" className="btn-cancel" onClick={() => setEditingBook(null)}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;