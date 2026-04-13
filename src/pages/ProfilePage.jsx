import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const { user, selectedPlan, prs, history, updateProfile, addPr, addHistory } = useApp();
  const [profile, setProfile] = useState(user);
  const [prForm, setPrForm] = useState({ exercise: '', weight: '', date: new Date().toISOString().slice(0, 10) });
  const [historyForm, setHistoryForm] = useState({ date: new Date().toISOString().slice(0, 10), weight: '', waist: '', hip: '' });
  const bmi = useMemo(() => {
    if (!profile?.weight || !profile?.height) return null;
    return (profile.weight / (profile.height * profile.height)).toFixed(1);
  }, [profile]);
  const latestHistory = history[history.length - 1];

  const saveProfile = (event) => {
    event.preventDefault();
    updateProfile(profile);
  };

  const submitPr = (event) => {
    event.preventDefault();
    addPr({ ...prForm, weight: Number(prForm.weight) });
    setPrForm({ exercise: '', weight: '', date: new Date().toISOString().slice(0, 10) });
  };

  const submitHistory = (event) => {
    event.preventDefault();
    addHistory({ ...historyForm, weight: Number(historyForm.weight), waist: Number(historyForm.waist), hip: Number(historyForm.hip) });
    setHistoryForm({ date: new Date().toISOString().slice(0, 10), weight: '', waist: '', hip: '' });
  };

  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">Perfil</span>
        <h1>Painel pessoal sem banco, com persistencia local.</h1>
        <p>Este espaco substitui a antiga pagina em PHP e mantem os dados principais de forma simples no navegador.</p>
      </section>

      <section className="profile-top">
        <article className="profile-summary">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <div className="badge-row">
            <span className="soft-badge">Plano atual: {selectedPlan}</span>
            <span className="soft-badge">IMC: {bmi ?? '--'}</span>
            <span className="soft-badge">Objetivo: {profile.goal}</span>
          </div>
          <Link to={`/planos/${selectedPlan}`} className="inline-link">Abrir plano selecionado</Link>
        </article>

        <article className="info-card">
          <h3>Ultima leitura corporal</h3>
          {latestHistory ? (
            <>
              <p>Peso: {latestHistory.weight} kg</p>
              <p>Cintura: {latestHistory.waist} cm</p>
              <p>Quadril: {latestHistory.hip} cm</p>
            </>
          ) : (
            <p>Sem historico registrado ainda.</p>
          )}
        </article>
      </section>

      <section className="profile-grid">
        <form className="info-card" onSubmit={saveProfile}>
          <h3>Editar perfil</h3>
          <div className="split-grid">
            <label className="field">
              <span>Nome</span>
              <input value={profile.name} onChange={(e) => setProfile((c) => ({ ...c, name: e.target.value }))} />
            </label>
            <label className="field">
              <span>Idade</span>
              <input type="number" value={profile.age} onChange={(e) => setProfile((c) => ({ ...c, age: Number(e.target.value) }))} />
            </label>
            <label className="field">
              <span>Peso</span>
              <input type="number" step="0.1" value={profile.weight} onChange={(e) => setProfile((c) => ({ ...c, weight: Number(e.target.value) }))} />
            </label>
            <label className="field">
              <span>Altura</span>
              <input type="number" step="0.01" value={profile.height} onChange={(e) => setProfile((c) => ({ ...c, height: Number(e.target.value) }))} />
            </label>
            <label className="field full-span">
              <span>Objetivo</span>
              <input value={profile.goal} onChange={(e) => setProfile((c) => ({ ...c, goal: e.target.value }))} />
            </label>
          </div>
          <button type="submit" className="primary-button">Salvar perfil</button>
        </form>

        <form className="info-card" onSubmit={submitPr}>
          <h3>Adicionar PR</h3>
          <label className="field">
            <span>Exercicio</span>
            <input value={prForm.exercise} onChange={(e) => setPrForm((c) => ({ ...c, exercise: e.target.value }))} required />
          </label>
          <label className="field">
            <span>Carga</span>
            <input type="number" value={prForm.weight} onChange={(e) => setPrForm((c) => ({ ...c, weight: e.target.value }))} required />
          </label>
          <label className="field">
            <span>Data</span>
            <input type="date" value={prForm.date} onChange={(e) => setPrForm((c) => ({ ...c, date: e.target.value }))} required />
          </label>
          <button type="submit" className="primary-button">Registrar PR</button>
        </form>

        <form className="info-card" onSubmit={submitHistory}>
          <h3>Evolucao fisica</h3>
          <div className="split-grid">
            <label className="field full-span">
              <span>Data</span>
              <input type="date" value={historyForm.date} onChange={(e) => setHistoryForm((c) => ({ ...c, date: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Peso</span>
              <input type="number" value={historyForm.weight} onChange={(e) => setHistoryForm((c) => ({ ...c, weight: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Cintura</span>
              <input type="number" value={historyForm.waist} onChange={(e) => setHistoryForm((c) => ({ ...c, waist: e.target.value }))} required />
            </label>
            <label className="field full-span">
              <span>Quadril</span>
              <input type="number" value={historyForm.hip} onChange={(e) => setHistoryForm((c) => ({ ...c, hip: e.target.value }))} required />
            </label>
          </div>
          <button type="submit" className="primary-button">Salvar historico</button>
        </form>
      </section>

      <section className="tables-grid">
        <article className="table-card">
          <h3>Ultimos PRs</h3>
          <div className="simple-table">
            {prs.map((item) => (
              <div key={item.id} className="simple-table-row">
                <span>{item.exercise}</span>
                <span>{item.weight} kg</span>
                <span>{item.date}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="table-card">
          <h3>Historico corporal</h3>
          <div className="simple-table">
            {history.map((item) => (
              <div key={item.id} className="simple-table-row">
                <span>{item.date}</span>
                <span>{item.weight} kg</span>
                <span>{item.waist}/{item.hip} cm</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
