import { useState } from 'react';
import Pill from '../Pill.jsx';

export default function PagePengaduan({ currentUser, pengaduanList, onSubmit }){
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Kebersihan');
  const [uraian, setUraian] = useState('');
  const [msg, setMsg] = useState(null);

  const isWarga = currentUser && currentUser.role === 'warga';
  const list = isWarga ? pengaduanList.filter(p => p.nik === currentUser.nik) : pengaduanList;

  function handleSubmit(){
    if (!judul.trim() || !uraian.trim()){
      setMsg({ type:'err', text:'Judul dan uraian wajib diisi.' });
      return;
    }
    onSubmit({ judul: judul.trim(), kategori, uraian: uraian.trim() });
    setJudul(''); setUraian('');
    setMsg({ type:'ok', text:'Pengaduan terkirim ke pengurus RW.' });
  }

  return (
    <section className="page active">
      <h2 className="page-title">Pengaduan</h2>
      <p className="page-sub">Laporkan masalah lingkungan dan pantau statusnya sampai selesai.</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>{isWarga ? 'Pengaduan saya' : 'Pengaduan warga'}</h3>
          {list.length === 0 && <div className="empty">Belum ada pengaduan.</div>}
          {list.map(p => (
            <div className="list-item" key={p.id}>
              <div>
                <div className="ttl">{p.judul}</div>
                <div className="meta">{p.id} · dikirim {p.tanggal}</div>
                <div className="meta" style={{background:'#f4f2e9', padding:'8px 10px', borderRadius:8, marginTop:6}}>
                  {p.tanggapan || 'Menunggu tindak lanjut pengurus.'}
                </div>
              </div>
              <Pill status={p.status} />
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Buat pengaduan baru</h3>
          {!isWarga ? (
            <div className="locked-note">🔒 Masuk untuk mengirim pengaduan.</div>
          ) : (
            <div>
              <label>Judul pengaduan</label>
              <input type="text" value={judul} onChange={e => setJudul(e.target.value)} placeholder="Contoh: Lampu jalan mati" />
              <label>Kategori</label>
              <select value={kategori} onChange={e => setKategori(e.target.value)}>
                <option>Kebersihan</option><option>Keamanan</option><option>Infrastruktur</option><option>Kelistrikan</option><option>Lainnya</option>
              </select>
              <label>Uraian</label>
              <textarea value={uraian} onChange={e => setUraian(e.target.value)} placeholder="Jelaskan lokasi dan kondisinya"></textarea>
              <button className="btn btn-dark" style={{width:'100%', marginTop:16}} onClick={handleSubmit}>Kirim pengaduan</button>
              {msg && <div className={msg.type === 'ok' ? 'msg-ok' : 'msg-err'}>{msg.text}</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
