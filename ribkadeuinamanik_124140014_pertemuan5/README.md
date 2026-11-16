# Sistem Manajemen Perpustakaan Sederhana (Python OOP)

## Identitas Mahasiswa
* **Nama:** Ribka Deuina Manik
* **NIM:** 124140014
* **Kelas:** RA

## Deskripsi Program
Program ini merupakan simulasi manajemen koleksi perpustakaan berbasis terminal yang menerapkan empat pilar utama Object-Oriented Programming (OOP) dalam Python:
1. **Abstraction & Inheritance:** Class `LibraryItem` dibuat sebagai Abstract Base Class (`ABC`) yang mendefinisikan kontrak method `get_detail()` dan `hitung_denda()`, lalu diwariskan ke subclass `Book` dan `Magazine`.
2. **Encapsulation:** Data penting seperti daftar koleksi (`__koleksi`) pada class `Library` dan status pinjam (`__is_dipinjam`) pada `LibraryItem` dilindungi menggunakan private attribute dan diakses secara aman melalui dekorator `@property`.
3. **Polymorphism:** Method `tampilkan_item_tersedia()` memanggil `item.get_detail()` secara seragam pada seluruh objek di dalam list koleksi, namun menghasilkan format output yang berbeda sesuai jenis objeknya (`Book` atau `Magazine`).

## Panduan Menjalankan Program
Pastikan Python 3.10+ sudah terpasang, lalu jalankan perintah berikut di terminal pada direktori proyek:
```bash
python main.py
```

## Screenshot Output
![Output Program](/img/ft1.png)