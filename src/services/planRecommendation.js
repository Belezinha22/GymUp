import { plans } from '../data/plans';

export const experienceLevels = [
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediario' },
  { value: 'avancado', label: 'Avancado' },
];

export const frequencyOptions = [
  { value: 2, label: '2 vezes por semana' },
  { value: 3, label: '3 vezes por semana' },
  { value: 4, label: '4 vezes por semana' },
  { value: 5, label: '5 vezes por semana' },
  { value: 6, label: '6 vezes por semana' },
];

const strategyRules = [
  {
    slug: 'iniciantes',
    reason: 'combina com adaptacao, aprendizado tecnico e frequencia inicial.',
    score: ({ objectiveSlug, experienceLevel, desiredFrequency }) => {
      let points = objectiveSlug === 'iniciantes' ? 8 : 0;
      if (experienceLevel === 'iniciante') points += 5;
      if (desiredFrequency <= 3) points += 2;
      return points;
    },
  },
  {
    slug: 'hipertrofia',
    reason: 'prioriza ganho de massa, progressao de carga e volume semanal maior.',
    score: ({ objectiveSlug, experienceLevel, desiredFrequency }) => {
      let points = objectiveSlug === 'hipertrofia' ? 8 : 0;
      if (experienceLevel !== 'iniciante') points += 2;
      if (desiredFrequency >= 4) points += 3;
      return points;
    },
  },
  {
    slug: 'emagrecimento',
    reason: 'favorece gasto calorico, rotina dinamica e manutencao de massa magra.',
    score: ({ objectiveSlug, desiredFrequency }) => {
      let points = objectiveSlug === 'emagrecimento' ? 8 : 0;
      if (desiredFrequency >= 3 && desiredFrequency <= 5) points += 3;
      return points;
    },
  },
  {
    slug: 'performance',
    reason: 'faz sentido para resistencia, potencia e treinos de maior intensidade.',
    score: ({ objectiveSlug, experienceLevel, desiredFrequency }) => {
      let points = objectiveSlug === 'performance' ? 8 : 0;
      if (experienceLevel === 'avancado') points += 4;
      if (desiredFrequency >= 4) points += 2;
      return points;
    },
  },
  {
    slug: 'bem-estar',
    reason: 'equilibra saude, constancia e treinos sustentaveis sem exageros.',
    score: ({ objectiveSlug, experienceLevel, desiredFrequency }) => {
      let points = objectiveSlug === 'bem-estar' ? 8 : 0;
      if (experienceLevel === 'iniciante') points += 1;
      if (desiredFrequency <= 4) points += 2;
      return points;
    },
  },
];

export function getPlanBySlug(slug) {
  return plans.find((plan) => plan.slug === slug) ?? plans[0];
}

export function recommendPlan(profile) {
  const desiredFrequency = Number(profile?.desiredFrequency ?? 3);
  const input = {
    objectiveSlug: profile?.trainingGoalSlug ?? profile?.goalSlug ?? 'iniciantes',
    experienceLevel: profile?.experienceLevel ?? 'iniciante',
    desiredFrequency,
  };

  const selectedStrategy = strategyRules
    .map((strategy) => ({ ...strategy, points: strategy.score(input) }))
    .sort((a, b) => b.points - a.points)[0];

  const plan = getPlanBySlug(selectedStrategy.slug);

  return {
    plan,
    slug: plan.slug,
    label: plan.label,
    reason: selectedStrategy.reason,
  };
}
