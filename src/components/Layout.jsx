import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logo from '../assets/images/logo/Logo-removebg-preview.png';

const navigation = [
  { to: '/', label: 'Inicio' },
  { to: '/metas', label: 'Metas' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/configuracoes', label: 'Configuracoes' },
];

export default function Layout({ children }) {
  const { user, logout } = useApp();

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          <img src={logo} alt="GymUp" />
          <div>
            <strong>GymUp</strong>
            <span>React edition</span>
          </div>
        </NavLink>

        <nav className="site-nav">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to={user ? '/perfil' : '/auth'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {user ? 'Perfil' : 'Entrar'}
          </NavLink>
          {user && (
            <button type="button" className="ghost-button" onClick={logout}>
              Sair
            </button>
          )}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <h3>GymUp</h3>
          <p>Projeto migrado para React sem dependencia de PHP ou banco.</p>
        </div>
        <div>
          <h4>Rotas principais</h4>
          <p>Inicio, metas, planos, perfil, configuracoes e sobre.</p>
        </div>
        <div>
          <h4>Estado atual</h4>
          <p>Dados persistidos localmente com localStorage para facilitar a evolucao futura.</p>
        </div>
      </footer>
    </div>
  );
}
