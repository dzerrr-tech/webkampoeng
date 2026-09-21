import Pill from '../Pill.jsx';

export default function PageDashboard({ currentUser, iuranByNik, notifLog, pengumumanList, pengaduanList, setPage }){
  const iuran = currentUser && currentUser.role === 'warga'
    ? iuranByNik[currentUser.nik]
    : { periode:'Agustus 2026', jumlah:45000, jatuhTempo:'30 Agustus 2026' };
  const mine = currentUser && currentUser.role === 'warga'
    ? pengaduanList.filter(p => p.nik === currentUser.nik)
    : pengaduanList;

  return (
    <section className="page active">
      <h2 className="page-title">Dashboard warga RW 06</h2>
      <p className="page-sub">Dashboard, pengumuman, dan layanan umum terbuka untuk siapa saja. Masuk hanya diperlukan untuk membuka data pribadi.</p>

      <div className="grid grid-2">
        <div className="hero">
          <div className="eyebrow">Iuran sampah — <span>{iuran.periode}</span></div>
          <p className="amount">Rp {iuran.jumlah.toLocaleString('id-ID')}</p>
          <div className="due">Jatuh tempo <span>{iuran.jatuhTempo}</span></div>
          <button className="btn btn-gold" onClick={() => setPage('bayar')}>Bayar via QRIS</button>
          <button className="btn btn-outline" style={{marginLeft:8}} onClick={() => setPage('riwayat')}>Riwayat bayar</button>
        </div>
        <div className="card">
          <h3>Notifikasi otomatis</h3>
          <div>
            {notifLog.slice(0,3).map((n,i) => (
              <div className="list-item" key={i}>
                <div><div className="ttl">{n.text}</div><div className="meta">{n.waktu}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="quick-grid">
        <div className="quick-card" onClick={() => setPage('profil')}><div className="quick-ic">👤</div><b>Data pribadi</b><span>Profil warga</span></div>
        <div className="quick-card" onClick={() => setPage('pengumuman')}><div className="quick-ic">📣</div><b>Pengumuman</b><span>Info dari RW</span></div>
        <div className="quick-card" onClick={() => setPage('bayar')}><div className="quick-ic">🗑</div><b>Bayar sampah</b><span>Via QRIS</span></div>
        <div className="quick-card" onClick={() => setPage('surat')}><div className="quick-ic">📄</div><b>Surat digital</b><span>Pengajuan surat</span></div>
        <div className="quick-card" onClick={() => setPage('pengaduan')}><div className="quick-ic">✉</div><b>Pengaduan</b><span>Diproses / selesai</span></div>
      </div>

      <div className="grid grid-2-rev">
        <div className="card">
          <div className="card-head"><h3>Pengumuman terbaru</h3><button className="link-more" onClick={() => setPage('pengumuman')}>Semua →</button></div>
          <div>
            {pengumumanList.slice(0,3).map((p,i) => (
              <div className="list-item" key={i}>
                <div><span className="tag">{p.kategori}</span><br /><span className="meta">{p.tanggal}</span><div className="ttl">{p.judul}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Status pengaduan saya</h3><button className="link-more" onClick={() => setPage('pengaduan')}>Semua →</button></div>
          <div>
            {mine.length === 0 && <div className="empty">Belum ada pengaduan.</div>}
            {mine.slice(0,3).map((p,i) => (
              <div className="list-item" key={i}>
                <div><div className="ttl">{p.judul}</div><div className="meta">{p.id} · {p.tanggal}</div></div>
                <Pill status={p.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
