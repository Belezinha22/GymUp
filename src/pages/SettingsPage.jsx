import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const storageKey = 'gymup:settings';

const defaultSettings = {
  reminders: true,
  weeklySummary: true,
  compactCards: false,
  defaultUnit: 'kg',
  language: 'pt-BR',
};

const languageLabels = {
  'pt-BR': 'Português',
  'en-US': 'English',
  'es-ES': 'Español',
};

function readSettings() {
  const storedSettings = localStorage.getItem(storageKey);
  return storedSettings ? { ...defaultSettings, ...JSON.parse(storedSettings) } : defaultSettings;
}

export default function SettingsPage() {
  const { user, selectedPlan } = useApp();
  const [settings, setSettings] = useState(readSettings);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (name, value) => {
    setSettings((current) => ({ ...current, [name]: value }));
    setFeedback('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(storageKey, JSON.stringify(settings));
    setFeedback('Configurações salvas com sucesso.');
  };

  return (
    <div className="page settings-page">
      <section className="page-header">
        <span className="eyebrow">Configurações</span>
        <h1>Ajuste como o GymUp organiza sua experiência.</h1>
        <p>
          Preferências salvas localmente no navegador, acompanhando a proposta atual do projeto sem banco de dados.
        </p>
      </section>

      <section className="settings-grid">
        <form className="info-card settings-card" onSubmit={handleSubmit}>
          <h3>Preferências do app</h3>
          <label className="setting-option">
            <input
              type="checkbox"
              checked={settings.reminders}
              onChange={(event) => updateSetting('reminders', event.target.checked)}
            />
            <span>
              <strong>Lembretes de treino</strong>
              <small>Manter avisos e chamadas para registrar treinos ativos.</small>
            </span>
          </label>
          <label className="setting-option">
            <input
              type="checkbox"
              checked={settings.weeklySummary}
              onChange={(event) => updateSetting('weeklySummary', event.target.checked)}
            />
            <span>
              <strong>Resumo semanal</strong>
              <small>Destacar evolução, PRs e medidas recentes no painel.</small>
            </span>
          </label>
          <label className="setting-option">
            <input
              type="checkbox"
              checked={settings.compactCards}
              onChange={(event) => updateSetting('compactCards', event.target.checked)}
            />
            <span>
              <strong>Cartões compactos</strong>
              <small>Reduzir espaçamento das áreas de treino em telas menores.</small>
            </span>
          </label>

          <label className="field">
            <span>Unidade padrão de carga</span>
            <select
              value={settings.defaultUnit}
              onChange={(event) => updateSetting('defaultUnit', event.target.value)}
            >
              <option value="kg">Quilogramas (kg)</option>
              <option value="lb">Libras (lb)</option>
            </select>
          </label>

          <label className="field">
            <span>Línguas</span>
            <select
              value={settings.language}
              onChange={(event) => updateSetting('language', event.target.value)}
            >
              <option value="pt-BR">Português</option>
              <option value="en-US">English</option>
              <option value="es-ES">Español</option>
            </select>
          </label>

          <button type="submit" className="primary-button">Salvar configurações</button>
          {feedback && <p className="success-text">{feedback}</p>}
        </form>

        <aside className="info-card settings-card">
          <h3>Estado atual</h3>
          <div className="settings-summary">
            <div>
              <span>Usuário</span>
              <strong>{user?.name ?? 'Visitante'}</strong>
            </div>
            <div>
              <span>Plano selecionado</span>
              <strong>{selectedPlan}</strong>
            </div>
            <div>
              <span>Persistência</span>
              <strong>localStorage</strong>
            </div>
            <div>
              <span>Idioma</span>
              <strong>{languageLabels[settings.language]}</strong>
            </div>
          </div>
          <p>
            Esta página centraliza configurações simples agora e pode receber preferências de conta,
            notificações e integrações quando o backend entrar no projeto.
          </p>
        </aside>
      </section>
    </div>
  );
}
