import { Link } from 'react-router-dom';
import { plans } from '../data/plans';
import { useApp } from '../context/AppContext';

export default function GoalsPage() {
  const { selectedPlan, choosePlan } = useApp();

  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">Metas</span>
        <h1>Escolha um plano e personalize a sua jornada.</h1>
        <p>
          Cada trilha foi mantida a partir do projeto original, mas agora com navegacao React e estado local
          persistido no navegador.
        </p>
      </section>

      <section className="goals-stack">
        {plans.map((plan) => {
          const active = selectedPlan === plan.slug;
          return (
            <article key={plan.slug} className={active ? 'goal-card active' : 'goal-card'}>
              <img src={plan.heroImage} alt={plan.label} />
              <div className="goal-card-content">
                <div className="goal-card-top">
                  <div>
                    <span className="eyebrow">{plan.label}</span>
                    <h2>{plan.title}</h2>
                  </div>
                  <span className="plan-frequency">{plan.frequency}</span>
                </div>
                <p>{plan.description}</p>
                <div className="badge-row">
                  {plan.badges.map((badge) => (
                    <span key={badge} className="soft-badge">{badge}</span>
                  ))}
                </div>
                <div className="goal-actions">
                  <button type="button" className="primary-button" onClick={() => choosePlan(plan.slug)}>
                    {active ? 'Plano selecionado' : 'Selecionar plano'}
                  </button>
                  <Link to={`/planos/${plan.slug}`} className="secondary-button">Abrir detalhes</Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
