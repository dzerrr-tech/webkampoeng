import { useState } from 'react';
import Pill from '../Pill.jsx';

export default function PageAdmin({
  currentUser, accounts, iuranByNik, pengaduanList, saranList, verifikasiQueue,
  pengumumanList, notifLog, onVerifyPayment, onSubmitPengumuman, onTindakLanjut, onTindakSelesai
}){
  const [apJudul, setApJudul] = useState('');
  const [apKategori, setApKategori] = useState('Kegiatan');
  const [apIsi, setApIsi] = useState('');
  const [tindakDrafts, setTindakDrafts] = useState({});

  if (!currentUser || currentUser.role !== 'admin') return null;

  const wargaCount = accounts.filter(a => a.role === 'warga').length;
  const lunas = Object.values(iuranByNik).filter(i => i.status === 'Lunas').length;
  const persenIuran = wargaCount ? Math.round((lunas / wargaCount) * 100) : 0;

  const openItems = [
    ...pengaduanList.filter(p => p.status !== 'Selesai').map(p => ({ type:'Pengaduan', id:p.id, judul:p.judul, ref:p })),
    ...saranList.filter(s => s.status !== 'Selesai').map(s => ({ type:'Saran', id:s.id, judul:s.isi, ref:s })),
  ];

  function handlePengumumanSubmit(){
    if (!apJudul.trim() || !apIsi.trim()){
      return;
    }
    onSubmitPengumuman({ judul: apJudul.trim(), kategori: apKategori, isi: apIsi.trim() });
    setApJudul(''); setApIsi('');
  }

  return (
    <section className="page active">
      <h2 className="page-title">Panel admin RW</h2>
      <p className="page-sub">Kelola pengumuman, verifikasi pembayaran, dan tindak lanjut saran/pengaduan warga.</p>

      <div className="stat-grid">
        <div className="stat-card"><div className="lbl">Total warga</div><div className="val">{wargaCount}</div><div className="sub">{wargaCount} kepala keluarga</div></div>
        <div className="stat-card"><div className="lbl">Iuran terbayar</div><div className="val">{persenIuran}%</div><div className="sub">Agustus 2026</div></div>
        <div className="stat-card"><div className="lbl">Pengaduan aktif</div><div className="val">{pengaduanList.filter(p => p.status === 'Diproses').length}</div><div className="sub">mendekati tenggat</div></div>
        <div className="stat-card"><div className="lbl">Saran baru</div><div className="val">{saranList.filter(s => s.status === 'Diproses').length}</div><div className="sub">belum ditanggapi</div></div>
      </div>

      <div className="grid grid-2-rev">
        <div className="card">
          <h3>Verifikasi pembayaran</h3>
          {verifikasiQueue.length === 0 && <div className="empty">Tidak ada pembayaran menunggu verifikasi.</div>}
          {verifikasiQueue.map((v, idx) => (
            <div className="verify-item" key={v.trx}>
              <div><div className="ttl">{v.nama}</div><div className="meta">{v.trx} · {v.periode} · {v.metode} · Rp {v.jumlah.toLocaleString('id-ID')}</div></div>
              <div className="verify-actions">
                <button className="circle-btn ok" onClick={() => onVerifyPayment(idx, true)}>✓</button>
                <button className="circle-btn no" onClick={() => onVerifyPayment(idx, false)}>✕</button>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Kelola pengumuman</h3>
          <label>Judul pengumuman</label>
          <input type="text" value={apJudul} onChange={e => setApJudul(e.target.value)} placeholder="Judul pengumuman" />
          <label>Kategori</label>
          <select value={apKategori} onChange={e => setApKategori(e.target.value)}>
            <option>Kegiatan</option><option>Iuran</option><option>Kesehatan</option><option>Keamanan</option><option>Umum</option>
          </select>
          <label>Isi pengumuman</label>
          <textarea value={apIsi} onChange={e => setApIsi(e.target.value)} placeholder="Isi pengumuman"></textarea>
          <button className="btn btn-dark" style={{width:'100%', marginTop:14}} onClick={handlePengumumanSubmit}>Terbitkan &amp; kirim notifikasi</button>
          <div style={{marginTop:16}}>
            {pengumumanList.slice(0,4).map((p,i) => (
              <div className="list-item" key={i}>
                <div className="ttl" style={{fontWeight:500}}>{p.judul}</div><div className="meta">{p.tanggal}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{marginTop:18}}>
        <div className="card">
          <h3>Tindak lanjut pengaduan &amp; saran</h3>
          {openItems.length === 0 && <div className="empty">Semua pengaduan &amp; saran sudah ditindaklanjuti.</div>}
          {openItems.map((o, idx) => (
            <div className="list-item" style={{flexDirection:'column', alignItems:'stretch'}} key={o.type + o.id}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div><span className="tag">{o.type}</span> <span className="meta">{o.id}</span><div className="ttl">{o.judul}</div></div>
                <Pill status={o.ref.status} />
              </div>
              <div style={{display:'flex', gap:8, marginTop:8}}>
                <input
                  type="text" placeholder="Tulis tanggapan..."
                  style={{flex:1, padding:'8px 10px', border:'1px solid var(--border)', borderRadius:8, fontSize:13}}
                  value={tindakDrafts[idx] || ''}
                  onChange={e => setTindakDrafts({ ...tindakDrafts, [idx]: e.target.value })}
                />
                <button className="btn btn-ghost" onClick={() => { onTindakLanjut(o, tindakDrafts[idx] || ''); }}>Kirim</button>
                <button className="btn btn-dark" onClick={() => onTindakSelesai(o)}>Selesai</button>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Notifikasi otomatis terkirim</h3>
          {notifLog.map((n,i) => (
            <div className="list-item" key={i}>
              <div><div className="ttl" style={{fontWeight:500}}>{n.text}</div><div className="meta">{n.waktu}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
