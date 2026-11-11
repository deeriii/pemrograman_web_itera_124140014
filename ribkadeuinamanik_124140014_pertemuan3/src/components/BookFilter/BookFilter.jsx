import React from 'react';
import { useBooks } from '../../context/BookContext';
import './BookFilter.css';

function BookFilter() {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter } = useBooks();

  return (
    <div className="book-filter">
      <input
        type="text"
        className="search-input"
        placeholder="Cari judul atau penulis..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="filter-buttons">
        <button
          className={statusFilter === 'all' ? 'active' : ''}
          onClick={() => setStatusFilter('all')}
        >
          Semua
        </button>
        <button
          className={statusFilter === 'milik' ? 'active' : ''}
          onClick={() => setStatusFilter('milik')}
        >
          Dimiliki
        </button>
        <button
          className={statusFilter === 'baca' ? 'active' : ''}
          onClick={() => setStatusFilter('baca')}
        >
          Sedang Dibaca
        </button>
        <button
          className={statusFilter === 'beli' ? 'active' : ''}
          onClick={() => setStatusFilter('beli')}
        >
          Ingin Dibeli
        </button>
      </div>
    </div>
  );
}

export default BookFilter;