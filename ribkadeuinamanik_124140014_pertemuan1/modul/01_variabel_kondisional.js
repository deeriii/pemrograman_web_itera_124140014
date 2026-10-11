console.log("=== BAB 1: VARIABEL & KONDISIONAL ===");

//nama, umur, kota

var nama = "Ribka Deuina Manik";
let usia = 20;
var kota_asal = "Pematang Siantar";

console.log(`Data Diri: Nama: ${nama}, Usia: ${usia}, Kota Asal: ${kota_asal}`);


//pengecekan kelulusan
let nilaiUjian = 75;
if (nilaiUjian >= 70) {
  console.log(`Nilai: ${nilaiUjian} -> Status: LULUS`);
} else {
  console.log(`Nilai: ${nilaiUjian} -> Status: TIDAK LULUS`);
}


//pengecekan kategori umur

let umur = 20;
var kategori = "";

if (umur < 12){
    kategori = "Anak-anak";
} else if (umur >= 12 && umur <= 17){
    kategori = "Remaja";
} else if (umur >= 18 && umur <= 59){
    kategori = "Dewasa";
} else {
    kategori = "Lansia"
}

console.log(`Umur: ${umur} tahun -> kategori: ${kategori}`);

//Switch-case konversi angka ke hari
let angkaHari = 3;
let dayName = "";

switch (angkaHari) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;
  case 7:
    dayName = "Sunday";
    break;
  default:
    dayName = "Invalid day number";
}

console.log(`Angka Hari: ${angkaHari} -> Day: ${dayName}`);

let skor = 90;
let gradeNilai =  skor >= 90 ? "A":
                  skor >= 80 ? "B":
                  skor >= 70 ? "C":
                  skor >= 60 ? "D": "E";

console.log(`Skor: ${skor} -> Grade: ${gradeNilai}`);
