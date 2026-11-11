import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookItem from './BookItem';

const mockFn = typeof vi !== 'undefined' ? vi.fn : jest.fn;
const clearMocks = typeof vi !== 'undefined' ? vi.clearAllMocks : jest.clearAllMocks;

describe('Komponen BookItem (Unit Tests)', () => {
  const dummyBook = {
    id: 101,
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    status: 'baca',
  };

  const mockDelete = mockFn();
  const mockEdit = mockFn();

  beforeEach(() => {
    clearMocks();
  });

  test('1. Merender judul buku dengan benar', () => {
    render(<BookItem book={dummyBook} onDelete={mockDelete} onEdit={mockEdit} />);
    expect(screen.getByText('Filosofi Teras')).toBeInTheDocument();
  });

  test('2. Merender nama penulis dengan benar', () => {
    render(<BookItem book={dummyBook} onDelete={mockDelete} onEdit={mockEdit} />);
    expect(screen.getByText('Penulis: Henry Manampiring')).toBeInTheDocument();
  });

  test('3. Merender status badge "Sedang Dibaca"', () => {
    render(<BookItem book={dummyBook} onDelete={mockDelete} onEdit={mockEdit} />);
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
  });

  test('4. Memanggil fungsi onDelete saat tombol Hapus diklik', () => {
    render(<BookItem book={dummyBook} onDelete={mockDelete} onEdit={mockEdit} />);
    const deleteBtn = screen.getByText('Hapus');
    fireEvent.click(deleteBtn);
    expect(mockDelete).toHaveBeenCalledWith(101);
  });

  test('5. Memanggil fungsi onEdit saat tombol Edit diklik', () => {
    render(<BookItem book={dummyBook} onDelete={mockDelete} onEdit={mockEdit} />);
    const editBtn = screen.getByText('Edit');
    fireEvent.click(editBtn);
    expect(mockEdit).toHaveBeenCalledWith(dummyBook);
  });
});