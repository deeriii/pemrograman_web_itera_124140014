import React from 'react';
import { useBooks } from '../../context/BookContext';
import BookItem from '../BookItem/BookItem';
import './BookList.css';

function BookList() {
  const { books, deleteBook, setEditingBook } = useBooks();

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 Tidak ada buku yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onDelete={deleteBook}
          onEdit={setEditingBook}
        />
      ))}
    </div>
  );
}

export default BookList;