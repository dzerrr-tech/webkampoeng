export default function PagePengumuman({ pengumumanList }){
  return (
    <section className="page active">
      <h2 className="page-title">Pengumuman</h2>
      <p className="page-sub">Informasi dan kegiatan terbaru dari pengurus RW 06.</p>
      <div className="card">
        {pengumumanList.map((p,i) => (
          <div className="list-item" key={i}>
            <div>
              <span className="tag">{p.kategori}</span> <span className="meta">{p.tanggal}</span>
              <div className="ttl">{p.judul}</div>
              <div className="meta">{p.isi}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
