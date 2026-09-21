import Pill from '../Pill.jsx';

export default function PageBayar({ currentUser, iuranByNik, onSubmitBayar, setPage }){
  const isWarga = currentUser && currentUser.role === 'warga';
  if (!isWarga){
    return (
      <section className="page active">
        <h2 className="page-title">Bayar sampah</h2>
        <p className="page-sub">Selesaikan iuran pengangkutan sampah bulan ini lewat QRIS.</p>
        <div className="locked-note">🔒 Masuk untuk melihat dan membayar tagihan Anda.</div>
      </section>
    );
  }
  const iuran = iuranByNik[currentUser.nik];
  const btnLabel = iuran.status === 'Belum'
    ? 'Saya sudah membayar'
    : (iuran.status === 'Menunggu verifikasi' ? 'Menunggu verifikasi pengurus' : 'Sudah lunas');

  return (
    <section className="page active">
      <h2 className="page-title">Bayar sampah</h2>
      <p className="page-sub">Selesaikan iuran pengangkutan sampah bulan ini lewat QRIS.</p>
      <div className="grid grid-2-rev">
        <div className="card">
          <div className="card-head">
            <span style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase'}}>Tagihan {iuran.periode.toUpperCase()}</span>
            <Pill status={iuran.status} />
          </div>
          <p style={{fontSize:28, fontWeight:700, margin:'4px 0 16px'}}>Rp {iuran.jumlah.toLocaleString('id-ID')}</p>
          <div className="list-item"><span className="meta">Jenis iuran</span><b>Pengangkutan sampah</b></div>
          <div className="list-item"><span className="meta">Periode</span><b>{iuran.periode}</b></div>
          <div className="list-item"><span className="meta">Jatuh tempo</span><b>{iuran.jatuhTempo}</b></div>
          <div className="list-item"><span className="meta">Biaya admin</span><b>Rp 0</b></div>
          <div className="locked-note" style={{marginTop:14, textAlign:'left'}}>🛡 Pembayaran diverifikasi pengurus RW maksimal 1x24 jam, lalu notifikasi otomatis dikirim ke akun Anda.</div>
        </div>
        <div className="card qris-box">
          <h3>Scan QRIS untuk membayar</h3>
          <div className="qris-img">QR</div>
          <div className="qris-note">Berlaku 15 menit · a.n. Kas RW 06</div>
          <button className="btn btn-dark" style={{width:'100%'}} disabled={iuran.status !== 'Belum'} onClick={onSubmitBayar}>{btnLabel}</button>
          <button className="link-more" style={{marginTop:10}} onClick={() => setPage('riwayat')}>Lihat riwayat pembayaran</button>
        </div>
      </div>
    </section>
  );
}
