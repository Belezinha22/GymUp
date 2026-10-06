const planByIntent = {
  emagrecimento: {
    label: 'Emagrecimento e definição',
    frequency: '4 a 5 treinos por semana',
    goal: 'cumprir pelo menos 16 sessões de treino e manter caminhadas leves nos dias de descanso',
    focus: 'combinar musculação, cardio moderado e uma rotina alimentar sustentável',
  },
  hipertrofia: {
    label: 'Hipertrofia',
    frequency: '4 a 5 treinos por semana',
    goal: 'cumprir pelo menos 16 sessões de treino e registrar a progressão de carga em 3 exercícios',
    focus: 'priorizar técnica, progressão gradual de carga, sono e ingestão proteica adequada',
  },
  performance: {
    label: 'Performance e condicionamento',
    frequency: '3 a 4 treinos por semana',
    goal: 'cumprir 12 a 16 sessões e evoluir o tempo ou a distância de um exercício cardiovascular',
    focus: 'equilibrar força, cardio e mobilidade, preservando dias de recuperação',
  },
  iniciantes: {
    label: 'Iniciantes',
    frequency: '2 a 3 treinos por semana',
    goal: 'completar 8 a 12 treinos e aprender a execução de quatro movimentos básicos',
    focus: 'construir consistência e técnica antes de aumentar o volume ou a carga',
  },
  bemEstar: {
    label: 'Bem-estar e saúde',
    frequency: '3 treinos por semana',
    goal: 'cumprir 12 sessões, incluir mobilidade e manter uma rotina regular de sono',
    focus: 'buscar regularidade, movimento diário e recuperação suficiente',
  },
};

function normalize(text = '') {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getIntent(message, profileGoal) {
  const text = normalize(message);
  if (/(dor|lesao|machuquei|fisio|medicamento|doenca)/.test(text)) return 'saude';
  if (/(emagrec|perder peso|perda de peso|secar|gordura|defin)/.test(text)) return 'emagrecimento';
  if (/(hipertrof|ganhar massa|massa muscular|musculo|muscular)/.test(text)) return 'hipertrofia';
  if (/(corrida|correr|resistencia|condicionamento|performance|folego)/.test(text)) return 'performance';
  if (/(iniciante|comec|nunca treinei|primeira vez)/.test(text)) return 'iniciantes';
  if (/(saude|bem estar|disposicao|qualidade de vida)/.test(text)) return 'bemEstar';

  const savedGoal = normalize(profileGoal);
  if (savedGoal.includes('emagrec')) return 'emagrecimento';
  if (savedGoal.includes('hipertrof') || savedGoal.includes('massa')) return 'hipertrofia';
  if (savedGoal.includes('performance') || savedGoal.includes('condicion')) return 'performance';
  if (savedGoal.includes('iniciante')) return 'iniciantes';
  return 'bemEstar';
}

export function getLocalRecommendation(message, user) {
  const intent = getIntent(message, user?.goal);
  const name = user?.name?.split(' ')[0] || 'atleta';

  if (intent === 'saude') {
    return `${name}, se há dor, lesão ou alguma condição de saúde, a prioridade é uma avaliação com profissional de saúde. Posso ajudar a montar metas gerais de consistência, mas não substituo orientação médica ou de fisioterapia.`;
  }

  const recommendation = planByIntent[intent];
  const profileNote = user?.goal ? ` Considerei também a meta salva no seu perfil: ${user.goal}.` : '';

  return `Minha sugestão local para você é a trilha “${recommendation.label}”.${profileNote}\n\nMeta dos próximos 30 dias: ${recommendation.goal}.\n\nRitmo recomendado: ${recommendation.frequency}.\n\nFoco: ${recommendation.focus}.\n\nAjuste a intensidade se sentir dor persistente e procure um profissional para orientações clínicas ou nutricionais individualizadas.`;
}
