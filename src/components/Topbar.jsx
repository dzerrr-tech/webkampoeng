import { initials } from '../data.js';

export default function Topbar({ currentUser, onBell }){
  return (
    <header className="topbar">
      <div className="who">
        <div className={"avatar" + (!currentUser ? " guest" : "")}>
          {currentUser ? initials(currentUser.nama) : '?'}
        </div>
        <div>
          <div className="name">{currentUser ? currentUser.nama : 'Tamu / warga umum'}</div>
          <div className="sub">
            {currentUser
              ? (currentUser.role === 'admin' ? 'Pengurus RW 06' : `RT ${currentUser.rt} / RW ${currentUser.rw} · ${currentUser.status}`)
              : 'Masuk untuk buka data pribadi'}
          </div>
        </div>
      </div>
      <div className="bell" onClick={onBell}><span className="dot"></span>🔔</div>
    </header>
  );
}
