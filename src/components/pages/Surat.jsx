import { useState } from 'react';
import Pill from '../Pill.jsx';
import { SURAT_JENIS_DATA } from '../../data.js';

export default function PageSurat({ currentUser, suratList, onSubmit }){
  const [jenis, setJenis] = useState(SURAT_JENIS_DATA[0].nama);
  const [keperluan, setKeperluan] = useState('');
  const [lampiran, setLampiran] = useState('');
  const [msg, setMsg] = useState(null);

  const isWarga = currentUser && currentUser.role === 'warga';
  const list = isWarga ? suratList.filter(s => s.nik === currentUser.nik) : suratList;

  function handleSubmit(){
    if (!keperluan.trim()){
      setMsg({ type:'err', text:'Keperluan wajib diisi.' });
      return;
    }
    onSubmit({ jenis, keperluan: keperluan.trim() });
    setKeperluan(''); setLampiran('');
    setMsg({ type:'ok', text:'Pengajuan surat terkirim.' });
  }

  return (
    <section className="page active">
      <h2 className="page-title">Surat digital</h2>
      <p className="page-sub">Ajukan surat keterangan tanpa perlu datang ke Balai RW.</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>Pilih jenis surat</h3>
          <div className="surat-grid">
            {SURAT_JENIS_DATA.map(s => (
              <div className={"surat-opt" + (s.nama === jenis ? " selected" : "")} key={s.nama} onClick={() => setJenis(s.nama)}>
                <div className="ic">📄</div>
                <b>{s.nama}</b>
                <span>{s.est}</span>
              </div>
            ))}
          </div>
          <h3>Pengajuan saya</h3>
          {list.length === 0 && <div className="empty">Belum ada pengajuan surat.</div>}
          {list.map(s => (
            <div className="list-item" key={s.id}>
              <div><div className="ttl">{s.jenis}</div><div className="meta">{s.id} · {s.tanggal}</div></div>
              <Pill status={s.status} />
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Formulir pengajuan</h3>
          {!isWarga ? (
            <div className="locked-note">🔒 Masuk untuk mengajukan surat.</div>
          ) : (
            <div>
              <label>Jenis surat</label>
              <select value={jenis} onChange={e => setJenis(e.target.value)}>
                {SURAT_JENIS_DATA.map(s => <option key={s.nama}>{s.nama}</option>)}
              </select>
              <label>Keperluan</label>
              <textarea value={keperluan} onChange={e => setKeperluan(e.target.value)} placeholder="Contoh: syarat pendaftaran sekolah"></textarea>
              <label>Lampiran</label>
              <input type="text" value={lampiran} onChange={e => setLampiran(e.target.value)} placeholder="Unggah scan KTP / KK (maks. 2MB)" />
              <button className="btn btn-dark" style={{width:'100%', marginTop:16}} onClick={handleSubmit}>Ajukan surat</button>
              {msg && <div className={msg.type === 'ok' ? 'msg-ok' : 'msg-err'}>{msg.text}</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
