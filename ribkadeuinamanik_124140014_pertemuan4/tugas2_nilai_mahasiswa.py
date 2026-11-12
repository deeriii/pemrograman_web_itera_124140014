# Pengelolaan Data Nilai Mahasiswa

def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung Nilai Akhir berdasarkan bobot:
    30% UTS + 40% UAS + 30% Tugas
    """
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)

def tentukan_grade(nilai_akhir: float) -> str:
    """Konversi nilai akhir ke skala grade huruf (A, B, C, D, E)."""
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

# Dataset minimal 5 Mahasiswa
daftar_mahasiswa = [
    {"nama": "Ribka Manik", "nim": "124140014", "nilai_uts": 95, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Deuina Manik",   "nim": "124140015", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Ciko Cikoko", "nim": "124140016", "nilai_uts": 92, "nilai_uas": 95, "nilai_tugas": 90},
    {"nama": "Coki Sitohang", "nim": "124140017", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 65},
    {"nama": "Maruko Chan",   "nim": "124140018", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]

if __name__ == "__main__":
    # Hitung nilai akhir dan grade untuk setiap mahasiswa
    for mhs in daftar_mahasiswa:
        na = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        mhs["nilai_akhir"] = na
        mhs["grade"] = tentukan_grade(na)

    # tabel hasil
    print("===========================================================================")
    print("                    DAFTAR NILAI AKHIR MAHASISWA                           ")
    print(f"{'NO':<4} | {'NIM':<10} | {'NAMA':<18} | {'UTS':<5} | {'UAS':<5} | {'TUGAS':<5} | {'AKHIR':<6} | {'GRADE':<5}")
    print("-" * 75)
    
    for index, mhs in enumerate(daftar_mahasiswa, start=1):
        print(f"{index:<4} | {mhs['nim']:<10} | {mhs['nama']:<18} | {mhs['nilai_uts']:<5} | "
              f"{mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<5} | {mhs['nilai_akhir']:<6.2f} | {mhs['grade']:<5}")
    
    print("===========================================================================")

    # Cari nilai tertinggi dan terendah
    mhs_tertinggi = max(daftar_mahasiswa, key=lambda x: x["nilai_akhir"])
    mhs_terendah  = min(daftar_mahasiswa, key=lambda x: x["nilai_akhir"])

    print("\nREKAPITULASI STATISTIK")
    print(f"Mahasiswa Nilai Tertinggi : {mhs_tertinggi['nama']} ({mhs_tertinggi['nim']}) - "
          f"Nilai Akhir: {mhs_tertinggi['nilai_akhir']:.2f} (Grade {mhs_tertinggi['grade']})")
    print(f"Mahasiswa Nilai Terendah  : {mhs_terendah['nama']} ({mhs_terendah['nim']}) - "
          f"Nilai Akhir: {mhs_terendah['nilai_akhir']:.2f} (Grade {mhs_terendah['grade']})")