console.log("===BAB 3: ARRAY & OBJEK===");

//data awal
let daftarMahasiswa = [
  { nama: "Ciko Cikoko", nim: "124140001", prodi: "Teknik Informatika", nilai: 85 },
  { nama: "Siti Pertiwi", nim: "124140002", prodi: "Sistem Informasi", nilai: 92 },
  { nama: "Mikasa Uhuy", nim: "124140003", prodi: "Teknik Informatika", nilai: 78 },
  { nama: "Cibi Maruko", nim: "124140004", prodi: "Teknik Informatika", nilai: 88 },
  { nama: "Upin Dan Ipin", nim: "124140005", prodi: "Sistem Informasi", nilai: 65 }
];

//elemen dom
const tbody = document.getElementById("mhs-tbody");
const formMhs = document.getElementById("form-mahasiswa");
const inputNama = document.getElementById("input-nama");
const inputNim = document.getElementById("input-nim");
const inputJurusan = document.getElementById("input-prodi");
const inputNilai = document.getElementById("input-nilai");
const editIndexInput = document.getElementById("edit-index");
const btnSubmit = document.getElementById("btn-submit");
const infoOutput = document.getElementById("info-output");

//RENDER: menampilkan array ke tabel HTML (READ)
function renderTable(data = daftarMahasiswa) {
  tbody.innerHTML = "";
  data.forEach((mhs, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${mhs.nim}</td>
      <td>${mhs.nama}</td>
      <td>${mhs.prodi}</td>
      <td>${mhs.nilai}</td>
      <td>
        <button class="btn-edit" onclick="editMahasiswa(${index})">Edit</button>
        <button class="btn-delete" onclick="deleteMahasiswa(${index})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

//fungsi mencari mhs nilai tertinggi
function getNilaiTertinggi() {
  if (daftarMahasiswa.length === 0) return null;
  return daftarMahasiswa.reduce((max, mhs) => (mhs.nilai > max.nilai ? mhs : max), daftarMahasiswa[0]);
}

//filter mhs nilai di atas rata-rata
function getDiatasRataRata() {
  if (daftarMahasiswa.length === 0) return [];
  const total = daftarMahasiswa.reduce((sum, mhs) => sum + mhs.nilai, 0);
  const rataRata = total / daftarMahasiswa.length;
  return {
    rataRata: rataRata.toFixed(2),
    data: daftarMahasiswa.filter(mhs => mhs.nilai > rataRata)
  };
}

//fungsi pengurutn berdasarkan nama
function sortMahasiswaByNama(isAscending = true) {
  const sorted = [...daftarMahasiswa].sort((a, b) => {
    return isAscending 
      ? a.nama.localeCompare(b.nama) 
      : b.nama.localeCompare(a.nama);
  });
  renderTable(sorted);
}

//fitur crud

//CREATE & UPDATE (Submit Form Handler)
formMhs.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const nama = inputNama.value.trim();
  const nim = inputNim.value.trim();
  const prodi = inputJurusan.value.trim();
  const nilai = parseFloat(inputNilai.value);
  const editIndex = parseInt(editIndexInput.value);

  if (editIndex === -1) {
    //tambah baru (CREATE)
    daftarMahasiswa.push({ nama, nim, prodi, nilai });
    infoOutput.innerText = `Berhasil menambah data ${nama}`;
  } else {
    //perbarui (UPDATE)
    daftarMahasiswa[editIndex] = { nama, nim, prodi, nilai };
    editIndexInput.value = "-1";
    btnSubmit.innerText = "Tambah Mahasiswa";
    infoOutput.innerText = `Berhasil memperbarui data ${nama}`;
  }

  formMhs.reset();
  renderTable();
});

//prepare UPDATE (isi form untuk edit)
function editMahasiswa(index) {
  const mhs = daftarMahasiswa[index];
  inputNama.value = mhs.nama;
  inputNim.value = mhs.nim;
  inputJurusan.value = mhs.prodi;
  inputNilai.value = mhs.nilai;
  editIndexInput.value = index;
  btnSubmit.innerText = "Simpan Perubahan";
}

//DELETE
function deleteMahasiswa(index) {
  const namaDihapus = daftarMahasiswa[index].nama;
  if (confirm(`Yakin ingin menghapus data ${namaDihapus}?`)) {
    daftarMahasiswa.splice(index, 1);
    infoOutput.innerText = `Data ${namaDihapus} telah dihapus.`;
    renderTable();
  }
}

//tombol fitur tambahan
document.getElementById("btn-tertinggi").addEventListener("click", () => {
  const mhs = getNilaiTertinggi();
  if (mhs) {
    infoOutput.innerText = `Mahasiswa nilai tertinggi: ${mhs.nama} (${mhs.nilai})`;
    renderTable([mhs]);
  }
});

document.getElementById("btn-diatas-ratarata").addEventListener("click", () => {
  const result = getDiatasRataRata();
  infoOutput.innerText = `Rata-rata: ${result.rataRata}. Menampilkan ${result.data.length} mahasiswa di atas rata-rata.`;
  renderTable(result.data);
});

document.getElementById("btn-sort-asc").addEventListener("click", () => {
  sortMahasiswaByNama(true);
  infoOutput.innerText = "Diurutkan A-Z";
});

document.getElementById("btn-sort-desc").addEventListener("click", () => {
  sortMahasiswaByNama(false);
  infoOutput.innerText = "Diurutkan Z-A";
});

document.getElementById("btn-reset-view").addEventListener("click", () => {
  infoOutput.innerText = "";
  renderTable();
});

//render awal saat halaman dibuat
renderTable();