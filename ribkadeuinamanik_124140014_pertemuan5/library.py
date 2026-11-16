#Class Library untuk mengelola koleksi item perpustakaan
from library_item import LibraryItem

#Penjelasan dari class pengelola koleksi perpustakaan dengan atribut private
class Library:
    def __init__(self, nama_perpustakaan: str):
        self.nama_perpustakaan = nama_perpustakaan
        self.__koleksi: list[LibraryItem] = []

    def tambah_item(self, item: LibraryItem):
        self.__koleksi.append(item)
        print(f"[INFO] Berhasil menambahkan: '{item.judul}' (ID: {item.item_id})")

    #Penjelasan dari method polimorfik yang memanggil get_detail() tanpa membedakan jenis subclass
    def tampilkan_item_tersedia(self):
        print(f"\n=== KATALOG TERSEDIA DI {self.nama_perpustakaan.upper()} ===")
        ada_item = False
        for item in self.__koleksi:
            if not item.is_dipinjam:
                print(item.get_detail())
                ada_item = True
        if not ada_item:
            print("Tidak ada item yang tersedia saat ini.")

    def cari_item(self, kata_kunci: str):
        print(f"\nHasil Pencarian untuk '{kata_kunci}'")
        hasil = [
            item for item in self.__koleksi
            if kata_kunci.lower() in item.judul.lower() or kata_kunci.lower() == item.item_id.lower()
        ]
        if hasil:
            for item in hasil:
                print(item.get_detail())
        else:
            print("Item tidak ditemukan.")