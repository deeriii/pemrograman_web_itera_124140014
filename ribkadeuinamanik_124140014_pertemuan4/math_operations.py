# Modul matematika dan program pemanggil
import math

# Konstanta
PI: float = 3.141592653589793

# 1. FUNGSI GEOMETRI

def luas_persegi(sisi: float) -> float:
    """Menhitung luas persegi (sisi x sisi)."""
    return sisi * sisi

def keliling_persegi(sisi: float) -> float:
    """Menhitung keliling persegi (4 x sisi)."""
    return 4 * sisi

def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menhitung luas persegi panjang (panjang x lebar)."""
    return panjang * lebar

def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menhitung keliling persegi panjang (2 x (panjang + lebar))."""
    return 2 * (panjang + lebar)

def luas_lingkaran(r: float) -> float:
    """Menhitung luas lingkaran (PI x r^2)."""
    return PI * (r ** 2)

def keliling_lingkaran(r: float) -> float:
    """Menhitung keliling lingkaran (2 x PI x r)."""
    return 2 * PI * r


# 2. FUNGSI KONVERSI SUHU 

def celsius_ke_fahrenheit(celsius: float) -> float:
    """Mengonversi derajat Celsius ke Fahrenheit."""
    return (celsius * 9 / 5) + 32

def celsius_ke_kelvin(celsius: float) -> float:
    """Mengonversi derajat Celsius ke Kelvin."""
    return celsius + 273.15


# Testing mandiri modul
if __name__ == "__main__":
    print("[TEST MODUL] Menjalankan uji coba internal math_operations.py:")
    print("Luas Persegi:", luas_persegi(4))
    print("Luas Lingkaran:", luas_lingkaran(7))
    print("Konversi 100 C -> F:", celsius_ke_fahrenheit(100))