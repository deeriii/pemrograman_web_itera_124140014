import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Halaman yang Anda cari tidak tersedia.</p>
      <Link to="/" style={{ color: '#0284c7', fontWeight: 600 }}>
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFound;