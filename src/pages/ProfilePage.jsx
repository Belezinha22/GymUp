import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import fullBodyFront from '../assets/images/bodyParts/fullBodyFront.png';
import back from '../assets/images/bodyParts/back.png';

const muscleHotspots = [
  { id: 'biceps-left', label: 'Biceps esquerdo', x: 33, y: 31 },
  { id: 'biceps-right', label: 'Biceps direito', x: 67, y: 31 },
  { id: 'forearm-left', label: 'Antebraco esquerdo', x: 25, y: 44 },
  { id: 'forearm-right', label: 'Antebraco direito', x: 75, y: 44 },
  { id: 'thigh-left', label: 'Coxa esquerda', x: 43, y: 61 },
  { id: 'thigh-right', label: 'Coxa direita', x: 57, y: 61 },
  { id: 'calf-left', label: 'Panturrilha esquerda', x: 43, y: 79 },
  { id: 'calf-right', label: 'Panturrilha direita', x: 57, y: 79 },
];

const backMuscleHotspots = [
  { id: 'trapezius-left', label: 'Trapezio esquerdo', x: 44, y: 22 },
  { id: 'trapezius-right', label: 'Trapezio direito', x: 56, y: 22 },
  { id: 'rear-deltoid-left', label: 'Deltoide posterior esquerdo', x: 32, y: 30 },
  { id: 'rear-deltoid-right', label: 'Deltoide posterior direito', x: 68, y: 30 },
  { id: 'triceps-back-left', label: 'Triceps esquerdo', x: 27, y: 40 },
  { id: 'triceps-back-right', label: 'Triceps direito', x: 73, y: 40 },
  { id: 'lat-left', label: 'Dorsal esquerdo', x: 39, y: 39 },
  { id: 'lat-right', label: 'Dorsal direito', x: 61, y: 39 },
  { id: 'lower-back', label: 'Lombar', x: 50, y: 49 },
  { id: 'glute-left', label: 'Gluteo esquerdo', x: 43, y: 60 },
  { id: 'glute-right', label: 'Gluteo direito', x: 57, y: 60 },
  { id: 'hamstring-left', label: 'Posterior de coxa esquerdo', x: 43, y: 72 },
  { id: 'hamstring-right', label: 'Posterior de coxa direito', x: 57, y: 72 },
  { id: 'calf-back-left', label: 'Panturrilha esquerda', x: 43, y: 84 },
  { id: 'calf-back-right', label: 'Panturrilha direita', x: 57, y: 84 },
];

export default function ProfilePage() {
  const { user, prs, history, updateProfile, addHistory } = useApp();
  const [profile, setProfile] = useState(user);
  const [historyForm, setHistoryForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    chest: '',
    waist: '',
    abdomen: '',
    hip: '',
    arm: '',
    forearm: '',
    thigh: '',
    calf: '',
  });
  const [chartExercise, setChartExercise] = useState('');
  const [chartRange, setChartRange] = useState('90');
  const bmi = useMemo(() => {
    if (!profile?.weight || !profile?.height) return null;
    return (profile.weight / (profile.height * profile.height)).toFixed(1);
  }, [profile]);
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
      abdomen: Number(historyForm.abdomen),
      hip: Number(historyForm.hip),
      arm: Number(historyForm.arm),
      forearm: Number(historyForm.forearm),
      thigh: Number(historyForm.thigh),
      calf: Number(historyForm.calf),
    });
    setHistoryForm({
      date: new Date().toISOString().slice(0, 10),
      chest: '',
      waist: '',
      abdomen: '',
      hip: '',
      arm: '',
      forearm: '',
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

      <section className="body-front-section" aria-label="Mapa muscular frontal">
        <div className="body-front-map">
          <img src={fullBodyFront} alt="Corpo humano visto de frente" />
          {muscleHotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              type="button"
              className="muscle-hotspot"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-label={hotspot.label}
            >
              <span className="muscle-tooltip">{hotspot.label}</span>
            </button>
          ))}
        </div>
        <div className='body-back-map'>
          <img src={back} alt="Corpo humano visto de costas" />
          {backMuscleHotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              type="button"
              className="muscle-hotspot"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-label={hotspot.label}
            >
              <span className="muscle-tooltip">{hotspot.label}</span>
            </button>
          ))}
        </div>
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
            <label className="field full-span">
              <span>Gordura corporal (%)</span>
              <input type="number" step="0.1" value={profile.bodyFat ?? ''} onChange={(e) => setProfile((c) => ({ ...c, bodyFat: Number(e.target.value) }))} />
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
              <span>Abdomen (cm)</span>
              <input type="number" step="0.1" value={historyForm.abdomen} onChange={(e) => setHistoryForm((c) => ({ ...c, abdomen: e.target.value }))} required />
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
              <span>Antebraco (cm)</span>
              <input type="number" step="0.1" value={historyForm.forearm} onChange={(e) => setHistoryForm((c) => ({ ...c, forearm: e.target.value }))} required />
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
                <span>Abdomen {item.abdomen ?? '--'} cm</span>
                <span>Quadril {item.hip ?? '--'} cm</span>
                <span>Braco {item.arm ?? '--'} cm</span>
                <span>Antebraco {item.forearm ?? '--'} cm</span>
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
