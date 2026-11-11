import { useMemo } from 'react';

function useBookStats(books = []) {
  const stats = useMemo(() => {
    const total = books.length;
    const milik = books.filter((b) => b.status === 'milik').length;
    const baca = books.filter((b) => b.status === 'baca').length;
    const beli = books.filter((b) => b.status === 'beli').length;

    return {
      total,
      milik,
      baca,
      beli,
      bacaPercentage: total > 0 ? ((baca / total) * 100).toFixed(0) : 0,
    };
  }, [books]);

  return stats;
}

export default useBookStats;