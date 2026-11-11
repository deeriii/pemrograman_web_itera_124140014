import React from 'react';
import { useBooks } from '../../context/BookContext';
import './Stats.css';

function Stats() {
  const { stats } = useBooks();

  return (
    <div className="container page-content">
      <header className="page-header">
        <h2>Statistik Koleksi Buku</h2>
        <p>Ringkasan pencapaian dan data koleksi buku pribadi Anda.</p>
      </header>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Buku</h4>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h4>Sudah Dimiliki</h4>
          <p className="stat-number color-milik">{stats.milik}</p>
        </div>
        <div className="stat-card">
          <h4>Sedang Dibaca</h4>
          <p className="stat-number color-baca">{stats.baca}</p>
        </div>
        <div className="stat-card">
          <h4>Ingin Dibeli</h4>
          <p className="stat-number color-beli">{stats.beli}</p>
        </div>
      </div>
      <div className="progress-card">
        <h3>Rasio Buku Sedang Dibaca</h3>
        <p>{stats.bacaPercentage}% dari seluruh buku Anda sedang aktif dibaca.</p>
      </div>
    </div>
  );
}

export default Stats;