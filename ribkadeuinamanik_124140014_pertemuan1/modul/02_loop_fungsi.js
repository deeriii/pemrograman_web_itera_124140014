console.log("===BAB 2: LOOP DAN FUNGSI===");

//tabel perkalian

const angka = 7;
console.log(`---Tabel perkalian ${angka}---`);
for (let i = 0; i<=10; i++){
    console.log(`${angka} x ${i} = ${angka*i}`);
}

// faktorial
function hitungFaktorial(n){
    if(n < 0) return "Angka harus positif atau nol";
    let hasil = 1;
    for (let i = 1; i<= n; i++){
        hasil *= i;
    }
    return hasil;
}

const angkaFaktorial = 5;
console.log(`Faktorial dari ${angkaFaktorial} (${angkaFaktorial}!) = ${hitungFaktorial(angkaFaktorial)}`);

//bilangan prima
function cekBilanganPrima(angka) {
  if (angka <= 1) return false;
  for (let i = 2; i <= Math.sqrt(angka); i++) {
    if (angka % i === 0) return false;
  }
  return true;
}

const tesAngka = 17;
console.log(`Apakah ${tesAngka} bilangan prima? ${cekBilanganPrima(tesAngka) ? "Ya" : "Bukan"}`);

//kalkulator BMI
//rumus BMI = Berat (kg) / (Tinggi (m) * Tinggi (m))
function hitungBMI(beratKg, tinggiCm) {
  const tinggiM = tinggiCm / 100;
  const bmi = beratKg / (tinggiM * tinggiM);
  let kategori = "";

  if (bmi < 18.5) {
    kategori = "Kekurangan Berat Badan";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    kategori = "Normal (Ideal)";
  } else if (bmi >= 25 && bmi <= 29.9) {
    kategori = "Kelebihan Berat Badan";
  } else {
    kategori = "Obesitas";
  }

  return {
    skor: bmi.toFixed(2),
    kategori: kategori
  };
}

// Simulasi panggilan fungsi kalkulator BMI
const hasilBMI = hitungBMI(65, 170); // Berat 65kg, Tinggi 170cm
console.log(`BMI Result: ${hasilBMI.skor} (${hasilBMI.kategori})`);


//program FizzBuzz (1 - 100)
console.log("--- Program FizzBuzz (1 - 100) ---");
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
