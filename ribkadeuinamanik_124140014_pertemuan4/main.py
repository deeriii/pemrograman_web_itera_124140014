# File utama

# Import seluruh modul sebagai alias
import math_operations as mo

# Import fungsi dan konstanta spesifik dari modul
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI

def main():
    print("PENGUJIAN MODUL OPERASI MATEMATIKA")
    print(f"Konstanta PI yang digunakan : {PI}\n")

    # 1. Pengujian geometri 
    print("1. PERHITUNGAN BENTUK GEOMETRI")
    sisi = 5.0
    print(f"Persegi (s={sisi})")
    print(f"Luas: {mo.luas_persegi(sisi):.2f}")
    print(f"Keliling: {mo.keliling_persegi(sisi):.2f}")

    p, l = 10.0, 4.0
    print(f"\nPersegi Panjang (p={p}, l={l})")
    print(f"Luas: {mo.luas_persegi_panjang(p, l):.2f}")
    print(f"Keliling: {mo.keliling_persegi_panjang(p, l):.2f}")

    r = 7.0
    print(f"\nLingkaran (r={r})")
    print(f"Luas: {mo.luas_lingkaran(r):.2f}")
    print(f"Keliling: {mo.keliling_lingkaran(r):.2f}")

    # 2. Pengujian konversi suhu 
    print("\n2. KONVERSI TEMPERATUR SUHU")
    suhu_celsius = 36.5
    f = celsius_ke_fahrenheit(suhu_celsius)
    k = celsius_ke_kelvin(suhu_celsius)

    print(f"Suhu awal: {suhu_celsius:.2f} °C")
    print(f"Hasil Fahrenheit: {f:.2f} °F")
    print(f"Hasil Kelvin: {k:.2f} K")

if __name__ == "__main__":
    main()