import { NAV_ITEMS } from '../data.js';

export default function Sidebar({ page, setPage, currentUser, onOpenLogin, onLogout }){
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">🏠</div>
        <div>
          <h1>SIWARGA</h1>
          <p>Sistem Informasi RW 06</p>
        </div>
      </div>
      <nav>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={"nav-btn" + (page === item.id ? " active" : "")}
            onClick={() => setPage(item.id)}
          >
            <span className="ic">{item.icon}</span> {item.label}
          </button>
        ))}
        {currentUser && currentUser.role === 'admin' && (
          <button
            className={"nav-btn" + (page === 'admin' ? " active" : "")}
            onClick={() => setPage('admin')}
          >
            <span className="ic">🛡</span> Panel admin RW
          </button>
        )}
      </nav>
      <div className="sidebar-foot">
        {!currentUser ? (
          <button className="btn-login" onClick={onOpenLogin}>Masuk akun warga</button>
        ) : (
          <button className="btn-logout" onClick={onLogout}>Keluar</button>
        )}
      </div>
    </aside>
  );
}
