import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

const BookContext = createContext();

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books_data_ribka', [
    { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
    { id: 2, title: 'Bumi', author: 'Tere Liye', status: 'baca' },
    { id: 3, title: 'Atomic Habits', author: 'James Clear', status: 'beli' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingBook, setEditingBook] = useState(null);

  const stats = useBookStats(books);

  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, id: Date.now() }]);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'all' || book.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const value = {
    books: filteredBooks,
    allBooksCount: books.length,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    editingBook,
    setEditingBook,
    addBook,
    updateBook,
    deleteBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};