import { useMemo, useState } from 'react';
import { plans } from '../data/plans';
import { useApp } from '../context/AppContext';
import { experienceLevels, frequencyOptions, recommendPlan } from '../services/planRecommendation';

export default function OnboardingPage() {
  const { user, completeOnboarding } = useApp();
  const [answers, setAnswers] = useState({
    trainingGoalSlug: plans[0]?.slug ?? 'iniciantes',
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
          <h1>Vamos ajustar sua recomendacao inicial.</h1>
          <p>
            Responda uma vez para o GymUp calcular o plano mais adequado. Depois, esses dados ficam
            disponiveis para edicao no perfil.
          </p>
          <div className="recommendation-preview">
            <span>Recomendacao atual</span>
            <strong>{recommendation.label}</strong>
            <p>{recommendation.reason}</p>
          </div>
        </div>

        <form className="auth-card onboarding-card" onSubmit={handleSubmit}>
          <h2>Ola, {user?.name || 'atleta'}</h2>
          <label className="field">
            <span>Qual seu objetivo?</span>
            <select
              value={answers.trainingGoalSlug}
              onChange={(event) => setAnswers((current) => ({ ...current, trainingGoalSlug: event.target.value }))}
            >
              {plans.map((plan) => (
                <option key={plan.slug} value={plan.slug}>
                  {plan.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Nivel</span>
            <select
              value={answers.experienceLevel}
              onChange={(event) => setAnswers((current) => ({ ...current, experienceLevel: event.target.value }))}
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Frequencia desejada</span>
            <select
              value={answers.desiredFrequency}
              onChange={(event) => setAnswers((current) => ({ ...current, desiredFrequency: Number(event.target.value) }))}
            >
              {frequencyOptions.map((frequency) => (
                <option key={frequency.value} value={frequency.value}>
                  {frequency.label}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="primary-button">Confirmar recomendacao</button>
        </form>
      </section>
    </div>
  );
}
