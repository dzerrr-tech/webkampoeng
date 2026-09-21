import Pill from '../Pill.jsx';

export default function PageRiwayat({ currentUser, riwayatByNik }){
  const isWarga = currentUser && currentUser.role === 'warga';
  if (!isWarga){
    return (
      <section className="page active">
        <h2 className="page-title">Riwayat bayar</h2>
        <p className="page-sub">Semua transaksi iuran sampah yang tercatat pada akun Anda.</p>
        <div className="locked-note">🔒 Masuk untuk melihat riwayat pembayaran Anda.</div>
      </section>
    );
  }
  const rows = riwayatByNik[currentUser.nik] || [];
  return (
    <section className="page active">
      <h2 className="page-title">Riwayat bayar</h2>
      <p className="page-sub">Semua transaksi iuran sampah yang tercatat pada akun Anda.</p>
      <div className="card">
        <table>
          <thead><tr><th>Periode</th><th>No. Transaksi</th><th>Metode</th><th>Jumlah</th><th>Status</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan="5" className="empty">Belum ada riwayat pembayaran.</td></tr>}
            {rows.map((r,i) => (
              <tr key={i}>
                <td>{r.periode}</td><td>{r.trx}</td><td>{r.metode}</td>
                <td>Rp {r.jumlah.toLocaleString('id-ID')}</td>
                <td><Pill status={r.status === 'Lunas' ? 'Selesai' : r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
