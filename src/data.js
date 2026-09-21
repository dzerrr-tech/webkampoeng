/* =========================================================
   SIWARGA — data demo (in-memory, disimpan di React state).
   Dalam produksi, seluruh data awal ini diganti dengan
   data dari backend/database.
   ========================================================= */

export const ACCOUNTS = [
  { nik:'3273010304990002', kk:'3273011204180007', nama:'Abidzar Al-Ghifari', status:'Kepala Keluarga', anggota:4, rt:'004', rw:'006', alamat:'Jl. Melati Indah No. 24', telepon:'0812-9042-5511', email:'abidzar@warga.rw06.id', username:'abidzar', password:'warga123', role:'warga', pekerjaan:'Wiraswasta' },
  { nik:'3273010207910003', kk:'3273011204180021', nama:'Rahmat Hidayat', status:'Kepala Keluarga', anggota:3, rt:'002', rw:'006', alamat:'Jl. Anggrek No. 8', telepon:'0813-1122-3344', email:'rahmat@warga.rw06.id', username:'rahmat', password:'warga123', role:'warga', pekerjaan:'Karyawan Swasta' },
  { nik:'3273015005920005', kk:'3273011204180033', nama:'Siti Nurhaliza', status:'Anggota Keluarga', anggota:5, rt:'003', rw:'006', alamat:'Jl. Kenanga No. 15', telepon:'0857-9988-1122', email:'siti@warga.rw06.id', username:'siti', password:'warga123', role:'warga', pekerjaan:'Guru' },
  { nik:'3273011112890007', kk:'3273011204180044', nama:'Bagas Prakoso', status:'Kepala Keluarga', anggota:2, rt:'004', rw:'006', alamat:'Jl. Melati Indah No. 30', telepon:'0821-3344-5566', email:'bagas@warga.rw06.id', username:'bagas', password:'warga123', role:'warga', pekerjaan:'Wirausaha' },
  { nik:'3273010101800001', kk:'3273011204180001', nama:'Pengurus RW 06', status:'Pengurus RW', anggota:1, rt:'000', rw:'006', alamat:'Balai Warga RW 06', telepon:'0812-0000-0006', email:'admin@rw06.id', username:'admin', password:'admin123', role:'admin', pekerjaan:'Pengurus RW' }
];

export const SURAT_JENIS_DATA = [
  { nama:'Surat Keterangan Tidak Mampu', est:'Estimasi 2 hari kerja' },
  { nama:'Surat Keterangan Domisili', est:'Estimasi 1 hari kerja' },
  { nama:'Surat Keterangan Usaha', est:'Estimasi 2 hari kerja' },
  { nama:'Surat Pengantar RT/RW', est:'Estimasi 1 hari kerja' }
];

export const NAV_ITEMS = [
  { id:'dashboard', label:'Dashboard', icon:'▦' },
  { id:'profil', label:'Data pribadi', icon:'👤' },
  { id:'pengumuman', label:'Pengumuman', icon:'📣' },
  { id:'pengaduan', label:'Pengaduan', icon:'✉' },
  { id:'surat', label:'Surat digital', icon:'📄' },
  { id:'bayar', label:'Bayar sampah', icon:'🗑' },
  { id:'riwayat', label:'Riwayat bayar', icon:'🧾' },
  { id:'saran', label:'Saran RW', icon:'💡' },
];

export function today(){
  const d = new Date();
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return d.getDate()+' '+bulan[d.getMonth()]+' '+d.getFullYear();
}

export function initials(nama){
  return nama.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
}

export function pillClass(status){
  const map = { 'Diproses':'diproses', 'Selesai':'selesai', 'Belum':'belum', 'Menunggu verifikasi':'diproses', 'Lunas':'selesai' };
  return map[status] || 'diproses';
}

export const INITIAL_PENGUMUMAN = [
  { judul:'Kerja bakti serentak RW 06', kategori:'Kegiatan', tanggal:'24 Agustus 2026', isi:'Kerja bakti membersihkan saluran air dan area gang akan dilaksanakan serentak di seluruh RT.' },
  { judul:'Penyesuaian iuran sampah bulan September', kategori:'Iuran', tanggal:'18 Agustus 2026', isi:'Mulai September 2026 iuran pengangkutan sampah disesuaikan mengikuti kenaikan biaya operasional.' },
  { judul:'Jadwal posyandu balita', kategori:'Kesehatan', tanggal:'11 Agustus 2026', isi:'Posyandu balita rutin dilaksanakan setiap tanggal 15 di Balai Warga RW 06.' },
];

export const INITIAL_PENGADUAN = [
  { id:'ADU-2026-041', nik:'3273010304990002', judul:'Lampu jalan mati di gang 3', kategori:'Kelistrikan', uraian:'Lampu jalan di gang 3 mati sejak 3 hari lalu.', tanggal:'22 Agustus 2026', status:'Diproses', tanggapan:'Sudah diteruskan ke petugas kelistrikan RW.' },
  { id:'ADU-2026-038', nik:'3273010304990002', judul:'Saluran air tersumbat depan No. 18', kategori:'Kebersihan', uraian:'Saluran air tersumbat sampah plastik.', tanggal:'09 Agustus 2026', status:'Selesai', tanggapan:'Selesai dibersihkan pada 12 Agustus 2026.' },
  { id:'ADU-2026-035', nik:'3273010304990002', judul:'Parkir kendaraan menutup akses', kategori:'Infrastruktur', uraian:'Mobil parkir sembarangan menutup akses gang.', tanggal:'02 Agustus 2026', status:'Selesai', tanggapan:'Pemilik kendaraan sudah diberi teguran tertulis.' },
];

export const INITIAL_SURAT = [
  { id:'SRT-0231', nik:'3273010304990002', jenis:'Surat Keterangan Domisili', tanggal:'20 Agustus 2026', status:'Diproses' },
  { id:'SRT-0198', nik:'3273010304990002', jenis:'Surat Pengantar RT/RW', tanggal:'05 Agustus 2026', status:'Selesai' },
];

export const INITIAL_SARAN = [
  { id:'SRN-072', nama:'Warga RT 002', anon:false, topik:'Fasilitas umum', isi:'Mohon dibuat taman baca kecil di pos ronda gang 2.', tanggal:'19 Agustus 2026', status:'Diproses', tanggapan:'Sedang dibahas pada rapat pengurus bulan ini.' },
  { id:'SRN-065', nama:'Anonim', anon:true, topik:'Keamanan', isi:'Perlu penambahan lampu di jalur masuk RW.', tanggal:'28 Juli 2026', status:'Selesai', tanggapan:'Sudah dipasang 3 titik lampu tambahan.' },
];

export const INITIAL_VERIFIKASI_QUEUE = [
  { trx:'TRX-8902', nik:'3273010207910003', nama:'Rahmat Hidayat', periode:'Agustus 2026', metode:'QRIS', jumlah:45000 },
  { trx:'TRX-8903', nik:'3273015005920005', nama:'Siti Nurhaliza', periode:'Agustus 2026', metode:'QRIS', jumlah:45000 },
  { trx:'TRX-8904', nik:'3273011112890007', nama:'Bagas Prakoso', periode:'Agustus 2026', metode:'Transfer', jumlah:90000 },
];

export const INITIAL_NOTIF_LOG = [
  { text:'Pembayaran Juli terverifikasi', waktu:'3 hari lalu' },
  { text:'Pengaduan ADU-2026-041 sedang diproses', waktu:'5 hari lalu' },
  { text:'Pengumuman baru: Kerja bakti serentak', waktu:'1 minggu lalu' },
];

export function buildInitialIuranByNik(){
  const obj = {};
  ACCOUNTS.filter(a => a.role === 'warga').forEach(a => {
    obj[a.nik] = { periode:'Agustus 2026', jumlah:45000, status:'Belum', jatuhTempo:'30 Agustus 2026' };
  });
  return obj;
}

export function buildInitialRiwayatByNik(){
  const obj = {};
  ACCOUNTS.filter(a => a.role === 'warga').forEach(a => {
    obj[a.nik] = [
      { periode:'Juli 2026', trx:'TRX-8820', metode:'QRIS', jumlah:45000, status:'Lunas' },
      { periode:'Juni 2026', trx:'TRX-8711', metode:'QRIS', jumlah:45000, status:'Lunas' },
    ];
  });
  return obj;
}
