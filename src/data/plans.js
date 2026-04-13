export const plans = [
  {
    slug: 'iniciantes',
    label: 'Iniciantes',
    title: 'O plano perfeito para quem esta comecando',
    heroImage: '/img/general/iniciantes.jpg',
    description:
      'Crie consistencia, aprenda os fundamentos e desenvolva confianca com treinos simples, progressivos e eficientes.',
    frequency: '2 a 3 vezes por semana',
    objective: 'Aprender a executar exercicios corretamente e construir o habito.',
    badges: ['Sem complicacao', '30 a 45 min', 'Base tecnica forte'],
    warmup: [
      '5 minutos de cardio leve antes de comecar.',
      'Mobilidade de ombro, quadril e tornozelos.',
      'Uma serie leve do primeiro exercicio.',
    ],
    recovery: [
      'Volta a calma com caminhada leve.',
      'Alongamentos leves de 30 a 40 segundos.',
      'Hidratacao e refeicao completa depois do treino.',
    ],
    faq: [
      {
        question: 'Quantos dias por semana sao suficientes?',
        answer: 'Para quem esta no inicio, 2 ou 3 treinos bem feitos ja geram progresso.',
      },
      {
        question: 'Preciso treinar pesado logo no comeco?',
        answer: 'Nao. A prioridade aqui e aprender tecnica, consistencia e controle de carga.',
      },
    ],
    workouts: [
      { day: 'Treino A', exercise: 'Agachamento goblet', sets: '3 x 10', rest: '60 s', notes: 'Tronco firme e amplitude confortavel.', video: '/videos/agachamentoLivre.mp4', equipment: 'Halter', primaryMuscle: 'Quadriceps', secondaryMuscle: 'Gluteos e core', difficulty: 2.4, description: ['Segure o halter proximo ao peito.', 'Desca com o tronco firme e joelhos alinhados.', 'Suba empurrando o chao com os pes.'] },
      { day: 'Treino A', exercise: 'Supino reto', sets: '3 x 10', rest: '75 s', notes: 'Pes firmes no chao e controle na descida.', video: '/videos/supino.mp4', equipment: 'Barra', primaryMuscle: 'Peito', secondaryMuscle: 'Triceps e ombro', difficulty: 2.7, description: ['Deite no banco com escapulas estaveis.', 'Desca a barra de forma controlada.', 'Empurre mantendo punhos alinhados.'] },
      { day: 'Treino B', exercise: 'Puxada frontal', sets: '3 x 12', rest: '60 s', notes: 'Puxe com as costas, nao apenas com os bracos.', video: '/videos/puxadaFrontal.mp4', equipment: 'Polia', primaryMuscle: 'Dorsal', secondaryMuscle: 'Biceps e antebraco', difficulty: 2.9, description: ['Mantenha o peito aberto.', 'Puxe a barra em direcao ao topo do peito.', 'Suba controlando sem perder postura.'] },
      { day: 'Treino B', exercise: 'Leg press', sets: '3 x 12', rest: '75 s', notes: 'Controle o movimento sem travar os joelhos.', video: '/videos/legPress.mp4', equipment: 'Maquina', primaryMuscle: 'Quadriceps', secondaryMuscle: 'Gluteos e posteriores', difficulty: 2.8, description: ['Apoie bem a lombar no encosto.', 'Empurre a plataforma com os pes inteiros.', 'Retorne com amplitude confortavel.'] },
    ],
  },
  {
    slug: 'hipertrofia',
    label: 'Hipertrofia',
    title: 'O plano ideal para aumentar massa muscular',
    heroImage: '/img/general/hipertrofia.jpg',
    description:
      'Treinos estruturados, progressao de carga e volume adequado para construir musculo com consistencia.',
    frequency: '5 a 6 vezes por semana',
    objective: 'Ganho de massa muscular e melhora de forca com boa recuperacao.',
    badges: ['Boas praticas', '45 a 60 min', 'Foco em progressao'],
    warmup: ['5 minutos de bike ou esteira.', 'Mobilidade de quadril, ombros e tornozelos.', 'Serie de aproximacao com carga leve.'],
    recovery: ['Respiracao controlada por 2 minutos.', 'Alongamento leve de areas mais tensas.', 'Sono e ingestao proteica como prioridade.'],
    faq: [
      { question: 'Quantas repeticoes sao mais comuns?', answer: 'Faixas entre 6 e 12 repeticoes costumam funcionar muito bem para hipertrofia.' },
      { question: 'Preciso ir ate a falha em tudo?', answer: 'Nao. Treinar perto da falha ja costuma ser suficiente sem desgastar demais.' },
    ],
    workouts: [
      { day: 'Peito e triceps', exercise: 'Supino inclinado com halteres', sets: '4 x 8', rest: '90 s', notes: 'Suba com controle e estabilize bem os ombros.', video: '/videos/supinoInclinadoH.mp4', equipment: 'Halteres', primaryMuscle: 'Peito superior', secondaryMuscle: 'Triceps e deltoide anterior', difficulty: 2.8, description: ['Ajuste o banco entre 30 e 45 graus.', 'Desca os halteres ate perto do peito.', 'Suba com controle sem bater os halteres.'] },
      { day: 'Peito e triceps', exercise: 'Crucifixo', sets: '3 x 12', rest: '60 s', notes: 'Amplitude confortavel sem perder o controle.', video: '/videos/crucifixo.mp4', equipment: 'Maquina', primaryMuscle: 'Peito', secondaryMuscle: 'Deltoide anterior', difficulty: 2.5, description: ['Mantenha cotovelos semi flexionados.', 'Abra o peito com controle.', 'Feche o movimento sentindo o peitoral.'] },
      { day: 'Costas e biceps', exercise: 'Remada curvada', sets: '4 x 10', rest: '90 s', notes: 'Mantenha o tronco estavel e puxe com as costas.', video: '/videos/remadaCurvada.mp4', equipment: 'Barra', primaryMuscle: 'Costas', secondaryMuscle: 'Biceps e lombar', difficulty: 3.1, description: ['Incline o tronco mantendo coluna neutra.', 'Puxe a barra em direcao ao abdomen.', 'Desca sem relaxar a postura.'] },
      { day: 'Costas e biceps', exercise: 'Rosca direta', sets: '3 x 12', rest: '60 s', notes: 'Evite balancar o corpo.', video: '/videos/roscaDireta.mp4', equipment: 'Barra', primaryMuscle: 'Biceps', secondaryMuscle: 'Antebraco', difficulty: 2.4, description: ['Cotovelos proximos ao corpo.', 'Suba sem impulsionar o tronco.', 'Desca de forma controlada.'] },
      { day: 'Pernas', exercise: 'Stiff', sets: '4 x 10', rest: '90 s', notes: 'Quadril para tras e coluna neutra.', video: '/videos/stiff.mp4', equipment: 'Barra', primaryMuscle: 'Posterior de coxa', secondaryMuscle: 'Gluteos e lombar', difficulty: 3.0, description: ['Desloque o quadril para tras.', 'Mantenha joelhos semi flexionados.', 'Suba contraindo gluteos e posteriores.'] },
    ],
  },
  {
    slug: 'emagrecimento',
    label: 'Emagrecimento e definicao',
    title: 'O plano para reduzir gordura sem perder ritmo',
    heroImage: '/img/general/emag_def.jpg',
    description:
      'Combina cardio inteligente, musculacao estrategica e rotina sustentavel para reduzir gordura corporal.',
    frequency: '4 a 5 vezes por semana',
    objective: 'Elevar gasto calorico, preservar massa magra e melhorar condicionamento.',
    badges: ['Alta aderencia', 'Treinos dinamicos', 'Resultados sustentaveis'],
    warmup: ['5 a 7 minutos de cardio progressivo.', 'Movimentos articulares de corpo inteiro.', 'Ativacao leve de pernas e core.'],
    recovery: ['Caminhada leve no fim do treino.', 'Alongamentos de quadril e posterior.', 'Hidratacao consistente ao longo do dia.'],
    faq: [
      { question: 'Cardio todo dia e obrigatorio?', answer: 'Nao. O mais importante e um plano que voce consiga manter com regularidade.' },
      { question: 'Posso fazer musculacao e cardio juntos?', answer: 'Sim. Essa combinacao costuma funcionar muito bem para emagrecimento.' },
    ],
    workouts: [
      { day: 'Circuito', exercise: 'Agachamento livre', sets: '3 x 15', rest: '45 s', notes: 'Movimento continuo e controle de respiracao.', video: '/videos/agachamentoLivre.mp4', equipment: 'Barra', primaryMuscle: 'Quadriceps', secondaryMuscle: 'Gluteos e core', difficulty: 3.2, description: ['Posicione a barra com estabilidade.', 'Desca em ritmo constante.', 'Suba sem perder alinhamento.'] },
      { day: 'Circuito', exercise: 'Barra fixa assistida', sets: '3 x 8', rest: '60 s', notes: 'Priorize amplitude e postura.', video: '/videos/barraFixa.mp4', equipment: 'Barra ou maquina assistida', primaryMuscle: 'Dorsal', secondaryMuscle: 'Biceps', difficulty: 3.3, description: ['Inicie com escapulas ativas.', 'Suba com o peito aberto.', 'Desca controlando todo o caminho.'] },
      { day: 'Cardio tecnico', exercise: 'Desenvolvimento militar', sets: '3 x 12', rest: '45 s', notes: 'Tronco firme e movimento completo.', video: '/videos/desenvolvimentoMilitar.mp4', equipment: 'Barra', primaryMuscle: 'Ombros', secondaryMuscle: 'Triceps e core', difficulty: 3.0, description: ['Leve a barra da linha dos ombros para cima.', 'Evite arquear demais a lombar.', 'Controle a descida.'] },
    ],
  },
  {
    slug: 'performance',
    label: 'Performance e condicionamento',
    title: 'O plano para elevar resistencia, potencia e mobilidade',
    heroImage: '/img/general/perf_cond.jpg',
    description:
      'Uma rotina voltada para melhorar desempenho em treinos intensos e ampliar a capacidade fisica geral.',
    frequency: '4 a 5 vezes por semana',
    objective: 'Desenvolver resistencia aerobica, potencia e mobilidade.',
    badges: ['Treinos intensos', 'Condicionamento global', 'Boa mobilidade'],
    warmup: ['Ativacao dinamica de corpo inteiro.', 'Cardio curto com progressao de ritmo.', 'Mobilidade de quadril e torax.'],
    recovery: ['Respiracao nasal e volta a calma.', 'Alongamentos de cadeia anterior e posterior.', 'Sono e hidratacao em dia.'],
    faq: [
      { question: 'Esse plano serve so para avancados?', answer: 'Nao. Ele pode ser adaptado, mas faz mais sentido para quem ja tem uma base minima.' },
      { question: 'Preciso abandonar musculacao?', answer: 'Nao. A musculacao continua sendo um apoio importante para performance.' },
    ],
    workouts: [
      { day: 'Potencia', exercise: 'Leg press explosivo', sets: '4 x 8', rest: '75 s', notes: 'Subida forte e descida controlada.', video: '/videos/legPress.mp4', equipment: 'Maquina', primaryMuscle: 'Quadriceps', secondaryMuscle: 'Gluteos', difficulty: 3.0, description: ['Empurre com intencao explosiva.', 'Controle completamente o retorno.', 'Mantenha joelhos alinhados.'] },
      { day: 'Potencia', exercise: 'Puxada frontal', sets: '4 x 10', rest: '60 s', notes: 'Controle escapular em toda a repeticao.', video: '/videos/puxadaFrontal.mp4', equipment: 'Polia', primaryMuscle: 'Dorsal', secondaryMuscle: 'Biceps', difficulty: 2.9, description: ['Ative escapulas antes de puxar.', 'Desca a barra ate o peito.', 'Suba sem perder tensao.'] },
      { day: 'Suporte', exercise: 'Elevacao lateral', sets: '3 x 15', rest: '45 s', notes: 'Evite impulso excessivo.', video: '/videos/elevacaoLateral.mp4', equipment: 'Halteres', primaryMuscle: 'Deltoide lateral', secondaryMuscle: 'Trapezio superior', difficulty: 2.6, description: ['Eleve os halteres ate a linha dos ombros.', 'Mantenha cotovelos levemente flexionados.', 'Nao use balanco para subir.'] },
    ],
  },
  {
    slug: 'bem-estar',
    label: 'Bem-estar e saude',
    title: 'O plano equilibrado para cuidar do corpo e da mente',
    heroImage: '/img/general/bem_saude.jpg',
    description:
      'Um programa com foco em regularidade, vitalidade, postura e qualidade de vida, sem exageros desnecessarios.',
    frequency: '3 a 4 vezes por semana',
    objective: 'Melhorar disposicao, postura, mobilidade e saude geral.',
    badges: ['Leve e consistente', 'Todas as idades', 'Corpo e mente'],
    warmup: ['Movimentos articulares leves por 5 minutos.', 'Caminhada ou bike com ritmo confortavel.', 'Respiracao e foco antes de comecar.'],
    recovery: ['Alongamentos tranquilos no fim do treino.', 'Pausa breve para respiracao e relaxamento.', 'Manter boa rotina de sono e alimentacao.'],
    faq: [
      { question: 'Precisa ser um treino pesado para funcionar?', answer: 'Nao. O foco aqui e regularidade e sensacao de bem-estar sustentavel.' },
      { question: 'Serve para quem esta voltando a treinar?', answer: 'Sim. Essa proposta funciona muito bem para retomar uma rotina.' },
    ],
    workouts: [
      { day: 'Full body', exercise: 'Supino reto', sets: '3 x 12', rest: '60 s', notes: 'Carga confortavel e boa execucao.', video: '/videos/supino.mp4', equipment: 'Barra', primaryMuscle: 'Peito', secondaryMuscle: 'Triceps', difficulty: 2.7, description: ['Mantenha os pes fixos no chao.', 'Desca controlando a barra.', 'Suba sem perder alinhamento.'] },
      { day: 'Full body', exercise: 'Triceps pulley', sets: '3 x 15', rest: '45 s', notes: 'Cotovelos estaveis e movimento limpo.', video: '/videos/tricepsPulley.mp4', equipment: 'Polia', primaryMuscle: 'Triceps', secondaryMuscle: 'Antebraco', difficulty: 2.2, description: ['Cotovelos proximos ao corpo.', 'Empurre o cabo para baixo.', 'Retorne sem perder tensao.'] },
      { day: 'Full body', exercise: 'Remada curvada', sets: '3 x 12', rest: '60 s', notes: 'Controle da lombar e postura.', video: '/videos/remadaCurvada.mp4', equipment: 'Barra', primaryMuscle: 'Costas', secondaryMuscle: 'Biceps e lombar', difficulty: 3.1, description: ['Mantenha quadril dobrado e coluna neutra.', 'Puxe a barra em direcao ao corpo.', 'Desca sem desmontar a postura.'] },
    ],
  },
];
