import { useState } from 'react';
import Pill from '../Pill.jsx';

export default function PageSaran({ currentUser, saranList, onSubmit }){
  const [topik, setTopik] = useState('Fasilitas umum');
  const [isi, setIsi] = useState('');
  const [anon, setAnon] = useState(false);
  const [msg, setMsg] = useState(null);

  function handleSubmit(){
    if (!isi.trim()){
      setMsg({ type:'err', text:'Isi saran wajib diisi.' });
      return;
    }
    onSubmit({ topik, isi: isi.trim(), anon });
    setIsi(''); setAnon(false);
    setMsg({ type:'ok', text:'Saran terkirim, terima kasih atas masukannya.' });
  }

  return (
    <section className="page active">
      <h2 className="page-title">Saran RW</h2>
      <p className="page-sub">Sampaikan masukan untuk pengurus dan lihat tanggapan mereka.</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>Tulis saran</h3>
          <label>Topik</label>
          <select value={topik} onChange={e => setTopik(e.target.value)}>
            <option>Fasilitas umum</option><option>Keamanan</option><option>Kebersihan</option><option>Administrasi</option><option>Lainnya</option>
          </select>
          <label>Isi saran</label>
          <textarea value={isi} onChange={e => setIsi(e.target.value)} placeholder="Tuliskan ide atau masukan Anda"></textarea>
          <div className="checkbox-row">
            <input type="checkbox" checked={anon} onChange={e => setAnon(e.target.checked)} /> Kirim sebagai anonim
          </div>
          <button className="btn btn-gold" style={{width:'100%'}} onClick={handleSubmit}>Kirim saran</button>
          {msg && <div className={msg.type === 'ok' ? 'msg-ok' : 'msg-err'}>{msg.text}</div>}
        </div>
        <div className="card">
          <h3>Masukan warga</h3>
          {saranList.map(s => (
            <div className="list-item" key={s.id}>
              <div>
                <div className="ttl">{s.isi}</div>
                <div className="meta">{s.id} · {s.tanggal} · {s.anon ? 'Anonim' : s.nama} · {s.topik}</div>
                {s.tanggapan && (
                  <div className="meta" style={{background:'#f4f2e9', padding:'8px 10px', borderRadius:8, marginTop:6}}>
                    <b>Tanggapan pengurus:</b> {s.tanggapan}
                  </div>
                )}
              </div>
              <Pill status={s.status} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
