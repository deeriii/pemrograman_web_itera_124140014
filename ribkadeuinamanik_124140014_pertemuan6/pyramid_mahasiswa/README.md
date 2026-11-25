# REST API Manajemen Mahasiswa dan Matakuliah (Pyramid + PostgreSQL)

Proyek ini adalah aplikasi backend REST API sederhana menggunakan framework **Pyramid**, **SQLAlchemy**, dan database **PostgreSQL** untuk mengelola data **Mahasiswa** dan **Matakuliah** dengan operasi CRUD (*Create, Read, Update, Delete*).

- **Nama:** Ribka Deuina Manik
- **NIM:** 124140014
- **Kelas:** RA

---

## Teknologi yang Digunakan
- Python 3
- Pyramid Web Framework
- SQLAlchemy & Alembic (ORM dan Migrasi Database)
- PostgreSQL (Database)

---

## Struktur Proyek
```text
ribkadeuinamanik_124140014_pertemuan6/
├── img/                            # Screenshot hasil pengujian API
└── pyramid_mahasiswa/
    ├── pyramid_mahasiswa/
    │   ├── alembic/                # Skrip migrasi database
    │   ├── models/                 # Model database (Mahasiswa & Matakuliah)
    │   ├── scripts/
    │   │   └── initialize_db.py    # Skrip inisialisasi data awal
    │   ├── static/                 # Aset statis
    │   ├── templates/              # Template tampilan
    │   ├── views/                  # Logika CRUD endpoint API
    │   ├── __init__.py             # Inisialisasi aplikasi Pyramid
    │   ├── pshell.py               # Konfigurasi interactive shell
    │   ├── routes.py               # Definisi URL endpoint API
    │   └── tests.py                # Pengujian unit
    ├── CHANGES.txt
    ├── development.ini             # Konfigurasi server & database PostgreSQL
    ├── MANIFEST.in
    ├── production.ini
    ├── pytest.ini
    ├── README.md
    └── setup.py                    # Konfigurasi dependensi proyek
```

---

## Cara Instalasi dan Menjalankan Aplikasi

1. **Aktifkan Virtual Environment**
   ```powershell
   ..\venv\Scripts\Activate.ps1
   ```

2. **Install Dependensi Proyek**
   ```powershell
   pip install -e .
   ```

3. **Konfigurasi Database**
   Pastikan database PostgreSQL sudah dibuat, lalu sesuaikan `sqlalchemy.url` pada file `development.ini`:
   ```ini
   sqlalchemy.url = postgresql://username:password@localhost:5432/nama_database
   ```

4. **Jalankan Migrasi Tabel (Alembic)**
   ```powershell
   alembic -c development.ini upgrade head
   ```

5. **Jalankan Server Pengembangan**
   ```powershell
   pserve development.ini --reload
   ```
   Server akan berjalan di `http://127.0.0.1:6543`.

---

## Daftar Endpoint API

### 1. Endpoint Mahasiswa
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/mahasiswa` | Mengambil semua data mahasiswa |
| `GET` | `/api/mahasiswa/{id}` | Mengambil detail data mahasiswa berdasarkan ID |
| `POST` | `/api/mahasiswa` | Menambahkan data mahasiswa baru |
| `PUT` | `/api/mahasiswa/{id}` | Memperbarui data mahasiswa berdasarkan ID |
| `DELETE` | `/api/mahasiswa/{id}` | Menghapus data mahasiswa berdasarkan ID |

**Contoh Body JSON (POST `/api/mahasiswa`):**
```json
{
  "nim": "12345",
  "nama": "Budi Santoso",
  "jurusan": "Teknik Informatika",
  "tanggal_lahir": "2000-05-15",
  "alamat": "Jl. Merdeka No. 123, Bandung"
}
```

### 2. Endpoint Matakuliah
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/matakuliah` | Mengambil semua data matakuliah |
| `GET` | `/api/matakuliah/{id}` | Mengambil detail data matakuliah berdasarkan ID |
| `POST` | `/api/matakuliah` | Menambahkan data matakuliah baru |
| `PUT` | `/api/matakuliah/{id}` | Memperbarui data matakuliah berdasarkan ID |
| `DELETE` | `/api/matakuliah/{id}` | Menghapus data matakuliah berdasarkan ID |

**Contoh Body JSON (POST `/api/matakuliah`):**
```json
{
  "kode_mk": "IF2110",
  "nama_mk": "Algoritma dan Struktur Data",
  "sks": 4,
  "semester": 3
}
```

---

## Contoh Perintah Pengujian (Windows PowerShell)

**Tambah Data Matakuliah (POST):**
```powershell
$body = '{"kode_mk":"IF2110","nama_mk":"Algoritma dan Struktur Data","sks":4,"semester":3}'
$body | curl.exe -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d "@-"
```

**Ambil Semua Data (GET):**
```powershell
curl.exe -X GET http://localhost:6543/api/matakuliah
```

**Ubah Data (PUT):**
```powershell
$body = '{"nama_mk":"Algoritma & Struktur Data Lanjut","sks":4}'
$body | curl.exe -X PUT http://localhost:6543/api/matakuliah/1 -H "Content-Type: application/json" -d "@-"
```

**Hapus Data (DELETE):**
```powershell
curl.exe -X DELETE http://localhost:6543/api/matakuliah/3
```

---

## Hasil Pengujian & Penanganan Error

Seluruh endpoint CRUD serta validasi error telah diuji dan berjalan sesuai spesifikasi:
- **HTTP 200 / 201:** Operasi `GET`, `POST`, `PUT`, dan `DELETE` berhasil dijalankan dan mengembalikan respons JSON.
- **HTTP 400 (Bad Request):** Sistem menolak input yang tidak valid (seperti NIM kosong atau nilai `sks`/`semester` kurang dari atau sama dengan `0`).
- **HTTP 404 (Not Found):** Sistem mengembalikan pesan error JSON saat ID data tidak ditemukan di database.

### Dokumentasi Pengujian
![Hasil Uji Mahasiswa](img/g1.png)
![Hasil Uji Matakuliah](img/g2.png)