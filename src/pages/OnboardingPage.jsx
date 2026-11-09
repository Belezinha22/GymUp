import { useMemo, useState } from 'react';
import { plans } from '../data/plans';
import { useApp } from '../context/AppContext';
import { experienceLevels, frequencyOptions, recommendPlan } from '../services/planRecommendation';

export default function OnboardingPage() {
  const { user, completeOnboarding } = useApp();
  const registeredGoal = String(user?.goal ?? '').toLocaleLowerCase();
  const initialPlan = plans.find((plan) => registeredGoal && plan.label.toLocaleLowerCase().includes(registeredGoal))?.slug
    ?? plans[0]?.slug
    ?? 'iniciantes';
  const [answers, setAnswers] = useState({
    trainingGoalSlug: initialPlan,
    experienceLevel: 'iniciante',
    desiredFrequency: 3,
  });

  const recommendation = useMemo(() => recommendPlan(answers), [answers]);

  const handleSubmit = (event) => {
    event.preventDefault();
    completeOnboarding(answers);
  };

  return (
    <div className="page onboarding-page">
      <section className="onboarding-panel">
        <div className="onboarding-copy">
          <span className="eyebrow">Primeiro acesso</span>
          <h1>Vamos ajustar sua recomendação inicial.</h1>
          <p>Responda para o GymUp calcular um plano a partir do seu objetivo, nível e frequência. Você poderá editar esses dados no perfil.</p>
          <div className="recommendation-preview">
            <span>Plano recomendado</span>
            <strong>{recommendation.label}</strong>
            <p>{recommendation.reason}</p>
          </div>
        </div>

        <form className="auth-card onboarding-card" onSubmit={handleSubmit}>
          <h2>Olá, {user?.name || 'atleta'}</h2>
          <label className="field">
            <span>Qual é seu objetivo?</span>
            <select value={answers.trainingGoalSlug} onChange={(event) => setAnswers((current) => ({ ...current, trainingGoalSlug: event.target.value }))}>
              {plans.map((plan) => <option key={plan.slug} value={plan.slug}>{plan.label}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Nível de experiência</span>
            <select value={answers.experienceLevel} onChange={(event) => setAnswers((current) => ({ ...current, experienceLevel: event.target.value }))}>
              {experienceLevels.map((level) => <option key={level.value} value={level.value}>{level.label}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Frequência desejada</span>
            <select value={answers.desiredFrequency} onChange={(event) => setAnswers((current) => ({ ...current, desiredFrequency: Number(event.target.value) }))}>
              {frequencyOptions.map((frequency) => <option key={frequency.value} value={frequency.value}>{frequency.label}</option>)}
            </select>
          </label>
          <button type="submit" className="primary-button">Confirmar recomendação</button>
        </form>
      </section>
    </div>
  );
}
