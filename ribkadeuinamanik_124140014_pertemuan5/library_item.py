#Abstract class LibraryItem dan subclass Book & Magazine
from abc import ABC, abstractmethod

#Penjelasan dari abstractclass sebagai cetak biru dasar semua item perpustakaan
class LibraryItem(ABC):
    def __init__(self, item_id: str, judul: str, tahun: int):
    #Penjelasan dari atribut protected dan private untuk enkapsulasi data
        self._item_id = item_id
        self._judul = judul
        self._tahun = tahun
        self.__is_dipinjam = False

    @property
    def item_id(self) -> str:
        return self._item_id

    @property
    def judul(self) -> str:
        return self._judul

    #Penjelasan dariproperty getter dan setter untuk mengatur status peminjaman item
    @property
    def is_dipinjam(self) -> bool:
        return self.__is_dipinjam

    @is_dipinjam.setter
    def is_dipinjam(self, status: bool):
        if not isinstance(status, bool):
            raise ValueError("Status peminjaman harus berupa boolean (True/False)!")
        self.__is_dipinjam = status

    @abstractmethod
    def get_detail(self) -> str:
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        pass


#Penjelasan dari subclass Book yang mewarisi LibraryItem dan mengimplementasikan method abstract
class Book(LibraryItem):
    def __init__(self, item_id: str, judul: str, tahun: int, penulis: str, halaman: int):
        super().__init__(item_id, judul, tahun)
        self.penulis = penulis
        self.halaman = halaman

    def get_detail(self) -> str:
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return f"[Buku - {self.item_id}] {self.judul} ({self._tahun}) | Penulis: {self.penulis} ({self.halaman} hal) | Status: {status}"

    def hitung_denda(self, hari_terlambat: int) -> float:
        return max(0, hari_terlambat) * 2000.0


#Penjelasan dari subclass Magazine yang mewarisi LibraryItem dengan perilaku spesifik majalah
class Magazine(LibraryItem):
    def __init__(self, item_id: str, judul: str, tahun: int, edisi: str, penerbit: str):
        super().__init__(item_id, judul, tahun)
        self.edisi = edisi
        self.penerbit = penerbit

    def get_detail(self) -> str:
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return f"[Majalah - {self.item_id}] {self.judul} ({self._tahun}) | Edisi: {self.edisi} - {self.penerbit} | Status: {status}"

    def hitung_denda(self, hari_terlambat: int) -> float:
        return max(0, hari_terlambat) * 1000.0