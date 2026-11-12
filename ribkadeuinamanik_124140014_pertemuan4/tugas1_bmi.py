# Program penghitung BMI

def hitung_bmi(berat_kg: float, tinggi_m: float) -> float:
    """
    Menghitung nilai Body Mass Index (BMI).
    Formula: BMI = berat / (tinggi * tinggi)
    """
    return berat_kg / (tinggi_m ** 2)

def tentukan_kategori_bmi(bmi: float) -> str:
    """
    Determining kategori status berat badan berdasarkan nilai BMI.
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif 18.5 <= bmi < 25.0:
        return "Berat badan normal"
    elif 25.0 <= bmi < 30.0:
        return "Berat badan berlebih"
    else:
        return "Obesitas"

# Program Utama
if __name__ == "__main__":
    
    print("PROGRAM PENGHITUNG BMI SEDERHANA")
    
    # Input data dari pengguna
    try:
        berat = float(input("Masukkan berat badan (kg) : "))
        tinggi = float(input("Masukkan tinggi badan (m)  : "))
        
        if berat <= 0 or tinggi <= 0:
            print("\n[Error] Berat dan tinggi badan harus lebih besar dari 0!")
        else:
            nilai_bmi = hitung_bmi(berat, tinggi)
            kategori = tentukan_kategori_bmi(nilai_bmi)
            
            print("\nHASIL ANALISIS BMI")
            print(f"Berat Badan  : {berat:.2f} kg")
            print(f"Tinggi Badan : {tinggi:.2f} m")
            print(f"Nilai BMI    : {nilai_bmi:.2f}")
            print(f"Kategori     : {kategori}")
    except ValueError:
        print("\n[Error] Input harus berupa angka valid!")