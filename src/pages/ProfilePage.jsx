import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const { user, selectedPlan, prs, history, updateProfile, addHistory } = useApp();
  const [profile, setProfile] = useState(user);
  const [historyForm, setHistoryForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    chest: '',
    waist: '',
    hip: '',
    arm: '',
    thigh: '',
    calf: '',
  });
  const [chartExercise, setChartExercise] = useState('');
  const [chartRange, setChartRange] = useState('90');
  const bmi = useMemo(() => {
    if (!profile?.weight || !profile?.height) return null;
    return (profile.weight / (profile.height * profile.height)).toFixed(1);
  }, [profile]);
  const latestHistory = history[history.length - 1];
  const exerciseOptions = useMemo(() => {
    return [...new Set(prs.map((item) => item.exercise).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }, [prs]);

  const selectedChartExercise = chartExercise || exerciseOptions[0] || '';

  const chartData = useMemo(() => {
    if (!selectedChartExercise) return [];

    const now = new Date();
    const rangeDays = chartRange === 'all' ? null : Number(chartRange);

    return prs
      .filter((item) => item.exercise === selectedChartExercise)
      .filter((item) => {
        if (!rangeDays) return true;
        const itemDate = new Date(`${item.date}T00:00:00`);
        const diffInDays = (now - itemDate) / (1000 * 60 * 60 * 24);
        return diffInDays <= rangeDays;
      })
      .sort((a, b) => {
        const dateDiff = new Date(a.date) - new Date(b.date);
        return dateDiff || Number(a.id) - Number(b.id);
      });
  }, [prs, selectedChartExercise, chartRange]);

  const chartModel = useMemo(() => {
    const width = 720;
    const height = 260;
    const padding = { top: 24, right: 24, bottom: 46, left: 54 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const gridLines = Array.from({ length: 4 }, (_, index) => {
      const y = padding.top + (innerHeight / 3) * index;
      return { y };
    });

    if (!chartData.length) {
      return { width, height, padding, points: [], path: '', minWeight: 0, maxWeight: 0, gridLines };
    }

    const weights = chartData.map((item) => Number(item.weight));
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const weightRange = Math.max(maxWeight - minWeight, 1);
    const step = chartData.length > 1 ? innerWidth / (chartData.length - 1) : 0;

    const points = chartData.map((item, index) => {
      const x = padding.left + (chartData.length > 1 ? step * index : innerWidth / 2);
      const y = padding.top + innerHeight - ((Number(item.weight) - minWeight) / weightRange) * innerHeight;

      return { ...item, x, y };
    });

    const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

    return { width, height, padding, points, path, minWeight, maxWeight, gridLines };
  }, [chartData]);

  const firstChartPoint = chartData[0];
  const lastChartPoint = chartData[chartData.length - 1];
  const loadEvolution = firstChartPoint && lastChartPoint ? Number(lastChartPoint.weight) - Number(firstChartPoint.weight) : 0;

  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR');
  };

  const saveProfile = (event) => {
    event.preventDefault();
    updateProfile(profile);
  };


  const submitHistory = (event) => {
    event.preventDefault();
    addHistory({
      ...historyForm,
      chest: Number(historyForm.chest),
      waist: Number(historyForm.waist),
      hip: Number(historyForm.hip),
      arm: Number(historyForm.arm),
      thigh: Number(historyForm.thigh),
      calf: Number(historyForm.calf),
    });
    setHistoryForm({
      date: new Date().toISOString().slice(0, 10),
      chest: '',
      waist: '',
      hip: '',
      arm: '',
      thigh: '',
      calf: '',
    });
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
          <h3>Ultimas medidas corporais</h3>
          {latestHistory ? (
            <>
              <p>Peito: {latestHistory.chest ?? '--'} cm</p>
              <p>Cintura: {latestHistory.waist ?? '--'} cm</p>
              <p>Braco: {latestHistory.arm ?? '--'} cm</p>
              <p>Panturrilha: {latestHistory.calf ?? '--'} cm</p>
            </>
          ) : (
            <p>Sem historico registrado ainda.</p>
          )}
        </article>
      </section>

      <section className="profile-grid">
        <form className="info-card profile-form-card" onSubmit={saveProfile}>
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
          </div>
          <button type="submit" className="primary-button">Salvar perfil</button>
        </form>

        <form className="info-card" onSubmit={submitHistory}>
          <h3>Medidas corporais</h3>
          <div className="split-grid">
            <label className="field full-span">
              <span>Data</span>
              <input type="date" value={historyForm.date} onChange={(e) => setHistoryForm((c) => ({ ...c, date: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Peito (cm)</span>
              <input type="number" step="0.1" value={historyForm.chest} onChange={(e) => setHistoryForm((c) => ({ ...c, chest: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Cintura (cm)</span>
              <input type="number" step="0.1" value={historyForm.waist} onChange={(e) => setHistoryForm((c) => ({ ...c, waist: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Quadril (cm)</span>
              <input type="number" step="0.1" value={historyForm.hip} onChange={(e) => setHistoryForm((c) => ({ ...c, hip: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Braco (cm)</span>
              <input type="number" step="0.1" value={historyForm.arm} onChange={(e) => setHistoryForm((c) => ({ ...c, arm: e.target.value }))} required />
            </label>
            <label className="field">
              <span>Coxa (cm)</span>
              <input type="number" step="0.1" value={historyForm.thigh} onChange={(e) => setHistoryForm((c) => ({ ...c, thigh: e.target.value }))} required />
            </label>
            <label className="field full-span">
              <span>Panturrilha (cm)</span>
              <input type="number" step="0.1" value={historyForm.calf} onChange={(e) => setHistoryForm((c) => ({ ...c, calf: e.target.value }))} required />
            </label>
          </div>
          <button type="submit" className="primary-button">Salvar medidas</button>
        </form>
      </section>

      <section className="chart-panel">
        <div className="workout-panel-header">
          <div>
            <span className="eyebrow">Evolucao de carga</span>
            <h2>Grafico por exercicio</h2>
          </div>
          <div className="chart-controls">
            <select value={selectedChartExercise} onChange={(event) => setChartExercise(event.target.value)}>
              {exerciseOptions.length ? (
                exerciseOptions.map((exercise) => (
                  <option key={exercise} value={exercise}>
                    {exercise}
                  </option>
                ))
              ) : (
                <option value="">Sem exercicios</option>
              )}
            </select>
            
          </div>
        </div>

        {chartData.length ? (
          <>
            <div className="chart-summary">
              <span>
                Registros: <strong>{chartData.length}</strong>
              </span>
              <span>
                Maior carga: <strong>{chartModel.maxWeight} kg</strong>
              </span>
              <span>
                Evolucao: <strong>{loadEvolution >= 0 ? '+' : ''}{loadEvolution} kg</strong>
              </span>
            </div>
            <div className="load-chart" aria-label={`Evolucao de carga em ${selectedChartExercise}`}>
              <svg viewBox={`0 0 ${chartModel.width} ${chartModel.height}`} role="img">
                {chartModel.gridLines.map((line) => (
                  <line
                    key={`horizontal-${line.y}`}
                    x1={chartModel.padding.left}
                    y1={line.y}
                    x2={chartModel.width - chartModel.padding.right}
                    y2={line.y}
                    className="chart-grid-line horizontal"
                  />
                ))}
                {chartModel.points.map((point) => (
                  <line
                    key={`vertical-${point.id}`}
                    x1={point.x}
                    y1={chartModel.padding.top}
                    x2={point.x}
                    y2={chartModel.height - chartModel.padding.bottom}
                    className="chart-grid-line vertical"
                  />
                ))}
                <line
                  x1={chartModel.padding.left}
                  y1={chartModel.padding.top}
                  x2={chartModel.padding.left}
                  y2={chartModel.height - chartModel.padding.bottom}
                  className="chart-axis"
                />
                <line
                  x1={chartModel.padding.left}
                  y1={chartModel.height - chartModel.padding.bottom}
                  x2={chartModel.width - chartModel.padding.right}
                  y2={chartModel.height - chartModel.padding.bottom}
                  className="chart-axis"
                />
                <text x="12" y={chartModel.padding.top + 4} className="chart-label">
                  {chartModel.maxWeight} kg
                </text>
                <text x="12" y={chartModel.height - chartModel.padding.bottom + 4} className="chart-label">
                  {chartModel.minWeight} kg
                </text>
                {chartModel.path && <path d={chartModel.path} className="chart-line" />}
                {chartModel.points.map((point) => (
                  <g key={point.id}>
                    <circle cx={point.x} cy={point.y} r="5" className="chart-point" />
                    <text x={point.x} y={point.y - 12} textAnchor="middle" className="chart-value">
                      {point.weight} kg
                    </text>
                    <text x={point.x} y={chartModel.height - 18} textAnchor="middle" className="chart-label">
                      {formatDate(point.date)}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </>
        ) : (
          <p className="muted-text">Registre cargas em Adicionar PR para visualizar a evolucao por periodo.</p>
        )}
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
          <h3>Medidas corporais</h3>
          <div className="simple-table body-measure-table">
            {history.map((item) => (
              <div key={item.id} className="simple-table-row">
                <span>{item.date}</span>
                <span>Peito {item.chest ?? '--'} cm</span>
                <span>Cintura {item.waist ?? '--'} cm</span>
                <span>Quadril {item.hip ?? '--'} cm</span>
                <span>Braco {item.arm ?? '--'} cm</span>
                <span>Coxa {item.thigh ?? '--'} cm</span>
                <span>Panturrilha {item.calf ?? '--'} cm</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
