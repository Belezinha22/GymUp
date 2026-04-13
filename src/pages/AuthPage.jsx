import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const loginForm = { email: '', password: '' };
const registerForm = {
  name: '',
  email: '',
  password: '',
  age: 18,
  weight: 70,
  height: 1.7,
  goal: 'Hipertrofia',
};

export default function AuthPage() {
  const { login, register } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login');
  const [loginData, setLoginData] = useState(loginForm);
  const [registerData, setRegisterData] = useState(registerForm);
  const [feedback, setFeedback] = useState('');
  const target = location.state?.from ?? '/perfil';

  const handleLogin = (event) => {
    event.preventDefault();
    const result = login(loginData);

    if (result.ok) {
      navigate(target);
      return;
    }

    setFeedback(result.message);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    register(registerData);
    navigate('/perfil');
  };

  return (
    <div className="page auth-page">
      <section className="auth-panel">
        <div className="auth-copy">
          <span className="eyebrow">Acesso</span>
          <h1>Entre para acompanhar sua jornada ou crie um perfil local.</h1>
          <p>
            Como esta versao nao usa banco, os dados ficam salvos no seu navegador. Para testar rapido, use
            `demo@gymup.com` e `123456`.
          </p>
          <div className="auth-switcher">
            <button type="button" className={mode === 'login' ? 'primary-button' : 'secondary-button'} onClick={() => setMode('login')}>
              Login
            </button>
            <button type="button" className={mode === 'register' ? 'primary-button' : 'secondary-button'} onClick={() => setMode('register')}>
              Cadastro
            </button>
          </div>
        </div>

        {mode === 'login' ? (
          <form className="auth-card" onSubmit={handleLogin}>
            <label className="field">
              <span>Email</span>
              <input type="email" value={loginData.email} onChange={(e) => setLoginData((current) => ({ ...current, email: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Senha</span>
              <input type="password" value={loginData.password} onChange={(e) => setLoginData((current) => ({ ...current, password: e.target.value }))} required />
            </label>
            <button type="submit" className="primary-button">Entrar</button>
            {feedback && <p className="error-text">{feedback}</p>}
          </form>
        ) : (
          <form className="auth-card" onSubmit={handleRegister}>
            <label className="field">
              <span>Nome</span>
              <input value={registerData.name} onChange={(e) => setRegisterData((current) => ({ ...current, name: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={registerData.email} onChange={(e) => setRegisterData((current) => ({ ...current, email: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Senha</span>
              <input type="password" value={registerData.password} onChange={(e) => setRegisterData((current) => ({ ...current, password: e.target.value }))} required />
            </label>
            <div className="split-grid">
              <label className="field">
                <span>Idade</span>
                <input type="number" value={registerData.age} onChange={(e) => setRegisterData((current) => ({ ...current, age: Number(e.target.value) }))} />
              </label>
              <label className="field">
                <span>Peso</span>
                <input type="number" step="0.1" value={registerData.weight} onChange={(e) => setRegisterData((current) => ({ ...current, weight: Number(e.target.value) }))} />
              </label>
              <label className="field">
                <span>Altura</span>
                <input type="number" step="0.01" value={registerData.height} onChange={(e) => setRegisterData((current) => ({ ...current, height: Number(e.target.value) }))} />
              </label>
              <label className="field">
                <span>Objetivo</span>
                <select value={registerData.goal} onChange={(e) => setRegisterData((current) => ({ ...current, goal: e.target.value }))}>
                  <option>Hipertrofia</option>
                  <option>Emagrecimento</option>
                  <option>Condicionamento</option>
                  <option>Bem-estar</option>
                </select>
              </label>
            </div>
            <button type="submit" className="primary-button">Criar perfil</button>
          </form>
        )}
      </section>
    </div>
  );
}
