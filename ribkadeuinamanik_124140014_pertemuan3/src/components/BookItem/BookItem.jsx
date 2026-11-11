import React from 'react';
import PropTypes from 'prop-types';
import './BookItem.css';

function BookItem({ book, onDelete, onEdit }) {
  const getBadgeClass = (status) => {
    if (status === 'milik') return 'badge-milik';
    if (status === 'baca') return 'badge-baca';
    return 'badge-beli';
  };

  const getStatusLabel = (status) => {
    if (status === 'milik') return 'Dimiliki';
    if (status === 'baca') return 'Sedang Dibaca';
    return 'Ingin Dibeli';
  };

  return (
    <div className="book-item">
      <div className="book-info">
        <h4 className="book-title">{book.title}</h4>
        <p className="book-author">Penulis: {book.author}</p>
        <span className={`status-badge ${getBadgeClass(book.status)}`}>
          {getStatusLabel(book.status)}
        </span>
      </div>
      <div className="book-actions">
        <button className="btn-edit" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(book.id)}>
          Hapus
        </button>
      </div>
    </div>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default BookItem;