# SIWARGA — Sistem Informasi RW 06 (React + Vite)

Aplikasi front-end React untuk sistem informasi warga RW, hasil konversi dari prototipe HTML/JS ke project React modular yang siap dikembangkan dan di-deploy.

## Struktur project

```
siwarga-app/
├── index.html              # entry HTML (dipakai Vite)
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx             # entry point React
│   ├── App.jsx               # komponen utama + seluruh state aplikasi
│   ├── data.js                # data demo (akun, pengumuman, dll) + helper
│   ├── index.css              # semua styling
│   └── components/
│       ├── Sidebar.jsx
│       ├── Topbar.jsx
│       ├── LoginModal.jsx
│       ├── Toast.jsx
│       ├── Pill.jsx
│       └── pages/
│           ├── Dashboard.jsx
│           ├── Profil.jsx
│           ├── Pengumuman.jsx
│           ├── Pengaduan.jsx
│           ├── Surat.jsx
│           ├── Bayar.jsx
│           ├── Riwayat.jsx
│           ├── Saran.jsx
│           └── Admin.jsx
```

## Menjalankan di komputer sendiri

Butuh [Node.js](https://nodejs.org/) versi 18 ke atas.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk production

```bash
npm run build
```

Hasil build statis akan ada di folder **`dist/`** — inilah folder yang di-deploy.

```bash
npm run preview   # opsional: coba hasil build secara lokal
```

## Cara deploy (pilih salah satu)

### 1. Netlify
- **Drag & drop**: jalankan `npm run build`, lalu seret folder `dist/` ke https://app.netlify.com/drop
- **Via Git**: push project ini ke GitHub, hubungkan repo di Netlify, set:
  - Build command: `npm run build`
  - Publish directory: `dist`

### 2. Vercel
- Push ke GitHub, import repo di https://vercel.com/new
- Vercel otomatis mendeteksi Vite (build command `npm run build`, output `dist`)

### 3. GitHub Pages
- Push project ke repo GitHub
- Di `vite.config.js`, ubah `base: '/'` menjadi `base: '/nama-repo-kamu/'`
- Build: `npm run build`
- Deploy isi folder `dist/` ke branch `gh-pages` (bisa pakai package `gh-pages`, atau GitHub Actions)

### 4. Hosting statis lain (Firebase Hosting, cPanel, dll.)
- Jalankan `npm run build`
- Upload seluruh isi folder `dist/` ke hosting

## Catatan penting

- **Ini masih front-end saja / prototipe**: semua data (akun warga, iuran, pengaduan, surat, saran) disimpan di React state, **hilang saat halaman di-refresh**. Belum tersambung ke backend/database sungguhan.
- **Akun demo** untuk login (password otomatis terisi saat memilih akun di form login):
  | Username | Password | Role |
  |---|---|---|
  | abidzar | warga123 | warga |
  | rahmat | warga123 | warga |
  | siti | warga123 | warga |
  | bagas | warga123 | warga |
  | admin | admin123 | pengurus RW |
- Untuk versi produksi sungguhan, langkah selanjutnya yang disarankan:
  1. Buat backend (Node/Express, atau pakai layanan seperti Supabase/Firebase) untuk autentikasi asli dan penyimpanan data permanen.
  2. Ganti data statis di `src/data.js` dengan pemanggilan API (`fetch`/`axios`) ke backend tersebut.
  3. Integrasi pembayaran QRIS sungguhan (misalnya lewat payment gateway seperti Midtrans/Xendit) untuk menggantikan tombol demo "Saya sudah membayar".
  4. Tambahkan validasi & keamanan sisi server (saat ini validasi hanya di sisi client).

## Sudah diuji

Struktur project ini sudah divalidasi secara otomatis: seluruh file berhasil di-bundle tanpa error import, dan aplikasi berhasil dirender + diuji alurnya (login, ganti halaman, kirim pengaduan, bayar, verifikasi admin) di browser headless tanpa error — menggunakan konfigurasi JSX yang sama seperti default Vite (`@vitejs/plugin-react`).
