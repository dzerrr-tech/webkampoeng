import { initials } from '../../data.js';

export default function PageProfil({ currentUser, onToast }){
  if (!currentUser || currentUser.role !== 'warga'){
    return (
      <section className="page active">
        <h2 className="page-title">Data pribadi</h2>
        <p className="page-sub">Data kependudukan yang tercatat pada pengurus RW 06.</p>
        <div className="locked-note">🔒 Masuk ke akun warga Anda untuk melihat data pribadi.</div>
      </section>
    );
  }
  const a = currentUser;
  const fields = [
    ['Nama lengkap', a.nama], ['NIK', a.nik], ['Nomor KK', a.kk], ['Status keluarga', a.status],
    ['Pekerjaan', a.pekerjaan], ['Jumlah anggota keluarga', a.anggota + ' orang'], ['Alamat', a.alamat],
    ['RT / RW', a.rt + ' / ' + a.rw], ['Telepon', a.telepon], ['Email', a.email],
  ];
  return (
    <section className="page active">
      <h2 className="page-title">Data pribadi</h2>
      <p className="page-sub">Data kependudukan yang tercatat pada pengurus RW 06.</p>
      <div className="grid grid-2">
        <div className="card" style={{textAlign:'center'}}>
          <div className="avatar" style={{width:64, height:64, fontSize:20, margin:'0 auto 14px'}}>{initials(a.nama)}</div>
          <div style={{fontWeight:700, fontSize:17}}>{a.nama}</div>
          <div className="sub" style={{color:'var(--muted)', fontSize:13, marginBottom:12}}>RT {a.rt} / RW {a.rw}</div>
          <div className="pill selesai" style={{display:'inline-block', marginBottom:16}}>Terverifikasi pengurus</div>
          <button className="btn btn-ghost" style={{width:'100%', marginBottom:8}} onClick={() => onToast('Permintaan perubahan data terkirim ke pengurus RW.')}>Ajukan perubahan data</button>
        </div>
        <div className="card">
          <h3>Rincian data</h3>
          <div className="grid grid-2-rev" style={{gap:'14px 24px'}}>
            {fields.map(([label, value]) => (
              <div key={label}><label style={{margin:0}}>{label}</label><div>{value}</div></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
