import { useState, useRef } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import LoginModal from './components/LoginModal.jsx';
import Toast from './components/Toast.jsx';
import PageDashboard from './components/pages/Dashboard.jsx';
import PageProfil from './components/pages/Profil.jsx';
import PagePengumuman from './components/pages/Pengumuman.jsx';
import PagePengaduan from './components/pages/Pengaduan.jsx';
import PageSurat from './components/pages/Surat.jsx';
import PageBayar from './components/pages/Bayar.jsx';
import PageRiwayat from './components/pages/Riwayat.jsx';
import PageSaran from './components/pages/Saran.jsx';
import PageAdmin from './components/pages/Admin.jsx';
import {
  ACCOUNTS, today,
  INITIAL_PENGUMUMAN, INITIAL_PENGADUAN, INITIAL_SURAT, INITIAL_SARAN,
  INITIAL_VERIFIKASI_QUEUE, INITIAL_NOTIF_LOG,
  buildInitialIuranByNik, buildInitialRiwayatByNik,
} from './data.js';

export default function App(){
  const [page, setPageRaw] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const toastTimer = useRef(null);

  const [pengumumanList, setPengumumanList] = useState(INITIAL_PENGUMUMAN);
  const [pengaduanList, setPengaduanList] = useState(INITIAL_PENGADUAN);
  const [suratList, setSuratList] = useState(INITIAL_SURAT);
  const [saranList, setSaranList] = useState(INITIAL_SARAN);
  const [iuranByNik, setIuranByNik] = useState(buildInitialIuranByNik);
  const [riwayatByNik, setRiwayatByNik] = useState(buildInitialRiwayatByNik);
  const [verifikasiQueue, setVerifikasiQueue] = useState(INITIAL_VERIFIKASI_QUEUE);
  const [notifLog, setNotifLog] = useState(INITIAL_NOTIF_LOG);

  const seq = useRef({ adu:42, srt:232, srn:73, trx:8905 });

  function showToast(msg){
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(''), 2600);
  }

  function addNotif(text){
    setNotifLog(prev => [{ text, waktu:'Baru saja' }, ...prev]);
  }

  function setPage(id){
    if (id === 'admin' && (!currentUser || currentUser.role !== 'admin')){
      setPageRaw('dashboard');
      showToast('Halaman ini khusus pengurus RW.');
      return;
    }
    setPageRaw(id);
  }

  function handleLogin(acc){
    setCurrentUser(acc);
    setLoginOpen(false);
    showToast('Berhasil masuk sebagai ' + acc.nama);
    setPageRaw('dashboard');
  }
  function handleLogout(){
    setCurrentUser(null);
    showToast('Anda telah keluar.');
    setPageRaw('dashboard');
  }

  function handleSubmitPengaduan({ judul, kategori, uraian }){
    seq.current.adu++;
    const id = 'ADU-2026-' + seq.current.adu;
    setPengaduanList(prev => [{ id, nik: currentUser.nik, judul, kategori, uraian, tanggal: today(), status:'Diproses', tanggapan:'' }, ...prev]);
    addNotif('Pengaduan baru dikirim: ' + judul);
  }

  function handleSubmitSurat({ jenis, keperluan }){
    seq.current.srt++;
    const id = 'SRT-' + seq.current.srt;
    setSuratList(prev => [{ id, nik: currentUser.nik, jenis, tanggal: today(), status:'Diproses' }, ...prev]);
    addNotif('Pengajuan surat baru: ' + jenis);
  }

  function handleSubmitSaran({ topik, isi, anon }){
    seq.current.srn++;
    const id = 'SRN-' + seq.current.srn;
    const nama = (currentUser && !anon) ? currentUser.nama : 'Anonim';
    setSaranList(prev => [{ id, nama, anon, topik, isi, tanggal: today(), status:'Diproses', tanggapan:'' }, ...prev]);
  }

  function handleSubmitBayar(){
    if (!currentUser) return;
    const iuran = iuranByNik[currentUser.nik];
    if (iuran.status !== 'Belum') return;
    seq.current.trx++;
    const trx = 'TRX-' + seq.current.trx;
    setIuranByNik(prev => ({ ...prev, [currentUser.nik]: { ...prev[currentUser.nik], status:'Menunggu verifikasi' } }));
    setVerifikasiQueue(prev => [...prev, { trx, nik: currentUser.nik, nama: currentUser.nama, periode: iuran.periode, metode:'QRIS', jumlah: iuran.jumlah }]);
    showToast('Konfirmasi pembayaran terkirim, menunggu verifikasi pengurus.');
  }

  function handleVerifyPayment(idx, approve){
    const v = verifikasiQueue[idx];
    if (approve){
      setIuranByNik(prev => ({ ...prev, [v.nik]: { ...prev[v.nik], status:'Lunas' } }));
      setRiwayatByNik(prev => ({
        ...prev,
        [v.nik]: [{ periode:v.periode, trx:v.trx, metode:v.metode, jumlah:v.jumlah, status:'Lunas' }, ...(prev[v.nik] || [])]
      }));
      addNotif('Pembayaran ' + v.nama + ' terverifikasi (' + v.periode + ')');
      showToast('Pembayaran ' + v.nama + ' disetujui.');
    } else {
      setIuranByNik(prev => ({ ...prev, [v.nik]: { ...prev[v.nik], status:'Belum' } }));
      addNotif('Pembayaran ' + v.nama + ' ditolak, mohon diunggah ulang');
      showToast('Pembayaran ' + v.nama + ' ditolak.');
    }
    setVerifikasiQueue(prev => prev.filter((_, i) => i !== idx));
  }

  function handleSubmitPengumuman({ judul, kategori, isi }){
    setPengumumanList(prev => [{ judul, kategori, tanggal: today(), isi }, ...prev]);
    addNotif('Pengumuman baru: ' + judul);
    showToast('Pengumuman diterbitkan & notifikasi terkirim ke warga.');
  }

  function handleTindakLanjut(item, text){
    if (!text.trim()) return;
    if (item.type === 'Pengaduan'){
      setPengaduanList(prev => prev.map(p => p.id === item.id ? { ...p, tanggapan: text } : p));
    } else {
      setSaranList(prev => prev.map(s => s.id === item.id ? { ...s, tanggapan: text } : s));
    }
    showToast('Tanggapan tersimpan.');
  }
  function handleTindakSelesai(item){
    if (item.type === 'Pengaduan'){
      setPengaduanList(prev => prev.map(p => p.id === item.id ? { ...p, status:'Selesai' } : p));
    } else {
      setSaranList(prev => prev.map(s => s.id === item.id ? { ...s, status:'Selesai' } : s));
    }
    addNotif(item.type + ' ' + item.id + ' ditandai selesai');
    showToast(item.type + ' ditandai selesai.');
  }

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} currentUser={currentUser} onOpenLogin={() => setLoginOpen(true)} onLogout={handleLogout} />
      <main>
        <Topbar currentUser={currentUser} onBell={() => setPage('dashboard')} />
        <div className="content">
          {page === 'dashboard' && <PageDashboard currentUser={currentUser} iuranByNik={iuranByNik} notifLog={notifLog} pengumumanList={pengumumanList} pengaduanList={pengaduanList} setPage={setPage} />}
          {page === 'profil' && <PageProfil currentUser={currentUser} onToast={showToast} />}
          {page === 'pengumuman' && <PagePengumuman pengumumanList={pengumumanList} />}
          {page === 'pengaduan' && <PagePengaduan currentUser={currentUser} pengaduanList={pengaduanList} onSubmit={handleSubmitPengaduan} />}
          {page === 'surat' && <PageSurat currentUser={currentUser} suratList={suratList} onSubmit={handleSubmitSurat} />}
          {page === 'bayar' && <PageBayar currentUser={currentUser} iuranByNik={iuranByNik} onSubmitBayar={handleSubmitBayar} setPage={setPage} />}
          {page === 'riwayat' && <PageRiwayat currentUser={currentUser} riwayatByNik={riwayatByNik} />}
          {page === 'saran' && <PageSaran currentUser={currentUser} saranList={saranList} onSubmit={handleSubmitSaran} />}
          {page === 'admin' && (
            <PageAdmin
              currentUser={currentUser}
              accounts={ACCOUNTS}
              iuranByNik={iuranByNik}
              pengaduanList={pengaduanList}
              saranList={saranList}
              verifikasiQueue={verifikasiQueue}
              pengumumanList={pengumumanList}
              notifLog={notifLog}
              onVerifyPayment={handleVerifyPayment}
              onSubmitPengumuman={handleSubmitPengumuman}
              onTindakLanjut={handleTindakLanjut}
              onTindakSelesai={handleTindakSelesai}
            />
          )}
        </div>
      </main>

      <button className="fab" onClick={() => setPage('saran')}>💡 Saran RW</button>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} accounts={ACCOUNTS} onLogin={handleLogin} />
      <Toast message={toastMsg} />
    </div>
  );
}
