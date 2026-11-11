import React from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

function Home() {
  return (
    <div className="container page-content">
      <header className="page-header">
        <h2>Daftar Koleksi Buku</h2>
        <p>Kelola koleksi, daftar bacaan, dan rencana beli buku Anda di sini.</p>
      </header>
      <BookForm />
      <BookFilter />
      <BookList />
    </div>
  );
}

export default Home;