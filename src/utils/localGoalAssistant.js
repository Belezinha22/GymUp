const planByIntent = {
  emagrecimento: { label: 'Emagrecimento e definição', frequency: 'Comece com 3 a 4 sessões semanais', goal: 'planejar 12 sessões no próximo mês e acompanhar sua constância', focus: 'combinar musculação e cardio em um ritmo sustentável, com descanso entre sessões' },
  hipertrofia: { label: 'Hipertrofia', frequency: 'Comece com 3 a 4 sessões semanais', goal: 'registrar cargas e repetições em cada treino durante 4 semanas', focus: 'priorizar execução controlada, progressão gradual e recuperação adequada' },
  performance: { label: 'Performance e condicionamento', frequency: 'Comece com 3 sessões semanais', goal: 'fazer 12 sessões e registrar um indicador, como tempo ou distância', focus: 'alternar estímulos de força e cardio e aumentar o esforço gradualmente' },
  iniciantes: { label: 'Começo consistente', frequency: 'Comece com 2 a 3 sessões semanais', goal: 'completar 8 sessões no próximo mês e aprender os movimentos com calma', focus: 'criar uma rotina realista e dar prioridade à técnica antes de aumentar a carga' },
  bemEstar: { label: 'Bem-estar e saúde', frequency: 'Comece com 3 sessões semanais', goal: 'marcar 12 momentos de atividade física no próximo mês', focus: 'variar os movimentos, respeitar o descanso e encontrar uma rotina que caiba na semana' },
};

function normalize(text = '') {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getIntent(message, profileGoal) {
  const text = normalize(message);
  if (/(dor|lesao|machuquei|fisio|medicamento|doenca|sintoma)/.test(text)) return 'saude';
  if (/(emagrec|perder peso|perda de peso|secar|gordura|defin)/.test(text)) return 'emagrecimento';
  if (/(hipertrof|ganhar massa|massa muscular|musculo|muscular|ficar forte)/.test(text)) return 'hipertrofia';
  if (/(corrida|correr|resistencia|condicionamento|performance|folego|cardio)/.test(text)) return 'performance';
  if (/(iniciante|comec|nunca treinei|primeira vez)/.test(text)) return 'iniciantes';
  if (/(saude|bem estar|disposicao|qualidade de vida|mobilidade)/.test(text)) return 'bemEstar';

  // Only use the saved goal when the person explicitly asks for a suggestion.
  if (/^(me ajuda|ajuda|sugestao|sugestoes|o que voce recomenda|me recomenda|quero uma meta|quero sugestao)[!.? ]*$/.test(text)) {
    const savedGoal = normalize(profileGoal);
    if (savedGoal.includes('emagrec')) return 'emagrecimento';
    if (savedGoal.includes('hipertrof') || savedGoal.includes('massa')) return 'hipertrofia';
    if (savedGoal.includes('performance') || savedGoal.includes('condicion')) return 'performance';
    if (savedGoal.includes('inici')) return 'iniciantes';
    if (savedGoal.includes('saude') || savedGoal.includes('bem estar')) return 'bemEstar';
  }
  return 'indefinido';
}

export function getLocalRecommendation(message, user) {
  const intent = getIntent(message, user?.goal);
  const name = user?.name?.trim().split(/\s+/)[0];

  if (intent === 'saude') {
    return `${name ? `${name}, ` : ''}se você está com dor, lesão ou sintomas, evite treinar a região afetada e procure um profissional de saúde. Posso ajudar com metas gerais quando for seguro retomar, mas não consigo diagnosticar nem prescrever exercícios para tratar isso.`;
  }

  if (intent === 'indefinido') {
    return 'Posso ajudar você a definir uma meta de treino. O que é mais importante agora: ganhar massa, emagrecer, melhorar o condicionamento, começar a treinar ou cuidar do bem-estar?';
  }

  const recommendation = planByIntent[intent];
  const profileGoal = normalize(user?.goal);
  const profileMatches = profileGoal && (
    (intent === 'hipertrofia' && (profileGoal.includes('hipertrof') || profileGoal.includes('massa')))
    || (intent === 'emagrecimento' && profileGoal.includes('emagrec'))
    || (intent === 'performance' && (profileGoal.includes('performance') || profileGoal.includes('condicion')))
    || (intent === 'iniciantes' && profileGoal.includes('inici'))
    || (intent === 'bemEstar' && (profileGoal.includes('saude') || profileGoal.includes('bem estar')))
  );
  const greeting = name ? `${name}, ` : '';
  const profileNote = profileMatches ? `Isso também combina com a meta do seu perfil (${user.goal}). ` : '';

  return `${greeting}${profileNote}uma boa direção é ${recommendation.label.toLowerCase()}.\n\nMeta para as próximas 4 semanas: ${recommendation.goal}.\n\nRitmo inicial: ${recommendation.frequency}.\n\nPriorize: ${recommendation.focus}.\n\nAjuste a frequência à sua rotina. Se sentir dor persistente, interrompa o exercício e procure orientação profissional.`;
}
