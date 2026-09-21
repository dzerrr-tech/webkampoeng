import { useState, useEffect } from 'react';

export default function LoginModal({ open, onClose, accounts, onLogin }){
  const [username, setUsername] = useState(accounts[0].username);
  const [password, setPassword] = useState(accounts[0].password);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setUsername(accounts[0].username);
      setPassword(accounts[0].password);
      setError('');
    }
  }, [open]);

  function handleUserChange(uname){
    setUsername(uname);
    const acc = accounts.find(a => a.username === uname);
    setPassword(acc ? acc.password : '');
  }

  function handleSubmit(){
    const acc = accounts.find(a => a.username === username && a.password === password);
    if (!acc){
      setError('Username atau kata sandi salah.');
      return;
    }
    onLogin(acc);
  }

  return (
    <div className={"modal-bg" + (open ? " show" : "")}>
      <div className="modal">
        <h3>Masuk akun warga</h3>
        <p>Gunakan akun yang terdaftar pada data warga RW 06.</p>
        <label>Pilih akun (demo)</label>
        <select value={username} onChange={e => handleUserChange(e.target.value)}>
          {accounts.map(a => (
            <option key={a.username} value={a.username}>
              {a.nama} ({a.role === 'admin' ? 'pengurus' : 'warga'})
            </option>
          ))}
        </select>
        <label>Kata sandi</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <small className="hint">Demo: kata sandi sudah terisi otomatis sesuai akun yang dipilih.</small>
        {error && <div className="msg-err">{error}</div>}
        <div className="close-row">
          <button className="btn btn-ghost" onClick={onClose}>Batal</button>
          <button className="btn btn-dark" onClick={handleSubmit}>Masuk</button>
        </div>
      </div>
    </div>
  );
}
