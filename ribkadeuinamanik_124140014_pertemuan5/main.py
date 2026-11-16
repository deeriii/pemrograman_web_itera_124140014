#Skrip utama untuk menguji sistem manajemen perpustakaan

from library_item import Book, Magazine
from library import Library

if __name__ == "__main__":
    perpus = Library("Perpustakaan ITERA")

    # 1. Membuat objek Book dan Magazine
    buku1 = Book("B001", "Pemrograman Python OOP", 2024, "Ribka Manik", 320)
    buku2 = Book("B002", "Arsitektur Web Modern", 2023, "Ciko Deuina", 280)
    majalah1 = Magazine("M001", "National Geographic Indonesia", 2025, "Edisi Maret", "Gramedia")
    majalah2 = Magazine("M002", "Info Komputer", 2025, "Vol. 42", "Kompas Media")

    # 2. Menambahkan item ke perpustakaan
    print("=== Menambahkan Koleksi ===")
    perpus.tambah_item(buku1)
    perpus.tambah_item(buku2)
    perpus.tambah_item(majalah1)
    perpus.tambah_item(majalah2)

    # 3. Menampilkan daftar item yang tersedia
    perpus.tampilkan_item_tersedia()

    # 4. Menguji perubahan status peminjaman via @property setter
    print("\nSimulasi Peminjaman & Denda")
    buku1.is_dipinjam = True
    print(f"Status '{buku1.judul}' diubah menjadi dipinjam.")
    print(f"Simulasi denda telat 3 hari ({buku1.judul}): Rp {buku1.hitung_denda(3):,.2f}")
    print(f"Simulasi denda telat 3 hari ({majalah1.judul}): Rp {majalah1.hitung_denda(3):,.2f}")

    # 5. Menampilkan ulang katalog setelah ada item yang dipinjam
    perpus.tampilkan_item_tersedia()

    # 6. Mencari item berdasarkan ID dan Judul
    perpus.cari_item("B002")
    perpus.cari_item("National")