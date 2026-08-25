import bemSaudeImage from '../assets/images/plans/bem_saude.jpg';
import emagDefImage from '../assets/images/plans/emag_def.jpg';
import hipertrofiaImage from '../assets/images/plans/hipertrofia.jpg';
import iniciantesImage from '../assets/images/plans/iniciantes.jpg';
import perfCondImage from '../assets/images/plans/perf_cond.jpg';
import agachamentoLivreVideo from '../assets/videos/agachamentoLivre.mp4';
import barraFixaVideo from '../assets/videos/barraFixa.mp4';
import crucifixoVideo from '../assets/videos/crucifixo.mp4';
import desenvolvimentoMilitarVideo from '../assets/videos/desenvolvimentoMilitar.mp4';
import elevacaoLateralVideo from '../assets/videos/elevacaoLateral.mp4';
import legPressVideo from '../assets/videos/legPress.mp4';
import puxadaFrontalVideo from '../assets/videos/puxadaFrontal.mp4';
import remadaCurvadaVideo from '../assets/videos/remadaCurvada.mp4';
import roscaDiretaVideo from '../assets/videos/roscaDireta.mp4';
import stiffVideo from '../assets/videos/stiff.mp4';
import supinoVideo from '../assets/videos/supino.mp4';
import supinoInclinadoHVideo from '../assets/videos/supinoInclinadoH.mp4';
import tricepsPulleyVideo from '../assets/videos/tricepsPulley.mp4';

export const plans = [
  {
    slug: 'iniciantes',
    label: 'Iniciantes',
    title: 'O plano perfeito para quem está começando',
    heroImage: iniciantesImage,
    description:
      'Crie consistência, aprenda os fundamentos e desenvolva confiança com treinos simples, progressivos e eficientes.',
    frequency: '2 a 3 vezes por semana',
    objective: 'Aprender a executar exercícios corretamente e construir o hábito.',
    badges: ['Sem complicação', '30 a 45 min', 'Base técnica forte'],
    warmup: [
      '5 minutos de cardio leve antes de começar.',
      'Mobilidade de ombro, quadril e tornozelos.',
      'Uma série leve do primeiro exercício.',
    ],
    recovery: [
      'Volta a calma com caminhada leve.',
      'Alongamentos leves de 30 a 40 segundos.',
      'Hidratação e refeição completa depois do treino.',
    ],
    faq: [
      {
        question: 'Quantos dias por semana são suficientes?',
        answer: 'Para quem está no início, 2 ou 3 treinos bem feitos já geram progresso.',
      },
      {
        question: 'Preciso treinar pésado logo no começo?',
        answer: 'Não. A prioridade aqui é aprender técnica, consistência e controle de carga.',
      },
    ],
    workouts: [
      { day: 'Treino A', exercise: 'Agachamento goblet', sets: '3 x 10', rest: '60 s', notes: 'Tronco firme e amplitude confortável.', video: agachamentoLivreVideo, equipment: 'Halter', primaryMuscle: 'Quadríceps', secondaryMuscle: 'Glúteos e core', difficulty: 2.4, description: ['Segure o halter próximo ao peito.', 'Desca com o tronco firme e joelhos alinhados.', 'Suba empurrando o chão com os pés.'] },
      { day: 'Treino A', exercise: 'Supino reto', sets: '3 x 10', rest: '75 s', notes: 'Pés firmes no chão e controle na descida.', video: supinoVideo, equipment: 'Barra', primaryMuscle: 'Peito', secondaryMuscle: 'Tríceps e ombro', difficulty: 2.7, description: ['Deite no banco com escápulas estáveis.', 'Desca a barra de forma controlada.', 'Empurre mantendo punhos alinhados.'] },
      { day: 'Treino B', exercise: 'Puxada frontal', sets: '3 x 12', rest: '60 s', notes: 'Puxe com as costas, não apenas com os braços.', video: puxadaFrontalVideo, equipment: 'Polia', primaryMuscle: 'Dorsal', secondaryMuscle: 'Bíceps e antebraço', difficulty: 2.9, description: ['Mantenha o peito aberto.', 'Puxe a barra em direção ao topo do peito.', 'Suba controlando sem perder postura.'] },
      { day: 'Treino B', exercise: 'Leg press', sets: '3 x 12', rest: '75 s', notes: 'Controle o movimento sem travar os joelhos.', video: legPressVideo, equipment: 'Máquina', primaryMuscle: 'Quadríceps', secondaryMuscle: 'Glúteos e posteriores', difficulty: 2.8, description: ['Apoie bem a lombar no encosto.', 'Empurre a plataforma com os pés inteiros.', 'Retorne com amplitude confortável.'] },
    ],
  },
  {
    slug: 'hipertrofia',
    label: 'Hipertrofia',
    title: 'O plano ideal para aumentar massa muscular',
    heroImage: hipertrofiaImage,
    description:
      'Treinos estruturados, progressão de carga e volume adequado para construir músculo com consistência.',
    frequency: '5 a 6 vezes por semana',
    objective: 'Ganho de massa muscular e melhora de força com boa recuperação.',
    badges: ['Boas práticas', '45 a 60 min', 'Foco em progressão'],
    warmup: ['5 minutos de bike ou esteira.', 'Mobilidade de quadril, ombros e tornozelos.', 'Série de aproximação com carga leve.'],
    recovery: ['Respiração controlada por 2 minutos.', 'Alongamento leve de áreas mais tensas.', 'Sono e ingestão proteica como prioridade.'],
    faq: [
      { question: 'Quantas repetições são mais comuns?', answer: 'Faixas entre 6 e 12 repetições costumam funcionar muito bem para hipertrofia.' },
      { question: 'Preciso ir até a falha em tudo?', answer: 'Não. Treinar perto da falha já costuma ser suficiente sem desgastar demais.' },
    ],
    workouts: [
      { day: 'Peito e triceps', exercise: 'Supino inclinado com halteres', sets: '4 x 8', rest: '90 s', notes: 'Suba com controle e estabilize bem os ombros.', video: supinoInclinadoHVideo, equipment: 'Halteres', primaryMuscle: 'Peito superior', secondaryMuscle: 'Tríceps e deltoide anterior', difficulty: 2.8, description: ['Ajuste o banco entre 30 e 45 graus.', 'Desca os halteres até perto do peito.', 'Suba com controle sem bater os halteres.'] },
      { day: 'Peito e triceps', exercise: 'Crucifixo', sets: '3 x 12', rest: '60 s', notes: 'Amplitude confortável sem perder o controle.', video: crucifixoVideo, equipment: 'Máquina', primaryMuscle: 'Peito', secondaryMuscle: 'Deltoide anterior', difficulty: 2.5, description: ['Mantenha cotovelos semiflexionados.', 'Abra o peito com controle.', 'Feche o movimento sentindo o peitoral.'] },
      { day: 'Costas e biceps', exercise: 'Remada curvada', sets: '4 x 10', rest: '90 s', notes: 'Mantenha o tronco estável e puxe com as costas.', video: remadaCurvadaVideo, equipment: 'Barra', primaryMuscle: 'Costas', secondaryMuscle: 'Bíceps e lombar', difficulty: 3.1, description: ['Incline o tronco mantendo coluna neutra.', 'Puxe a barra em direção ao abdômen.', 'Desca sem relaxar a postura.'] },
      { day: 'Costas e biceps', exercise: 'Rosca direta', sets: '3 x 12', rest: '60 s', notes: 'Evite balançar o corpo.', video: roscaDiretaVideo, equipment: 'Barra', primaryMuscle: 'Bíceps', secondaryMuscle: 'Antebraço', difficulty: 2.4, description: ['Cotovelos próximos ao corpo.', 'Suba sem impulsionar o tronco.', 'Desca de forma controlada.'] },
      { day: 'Pernas', exercise: 'Stiff', sets: '4 x 10', rest: '90 s', notes: 'Quadril para trás e coluna neutra.', video: stiffVideo, equipment: 'Barra', primaryMuscle: 'Posterior de coxa', secondaryMuscle: 'Glúteos e lombar', difficulty: 3.0, description: ['Desloque o quadril para trás.', 'Mantenha joelhos semiflexionados.', 'Suba contraindo gluteos e posteriores.'] },
    ],
  },
  {
    slug: 'emagrecimento',
    label: 'Emagrecimento e definição',
    title: 'O plano para reduzir gordura sem perder ritmo',
    heroImage: emagDefImage,
    description:
      'Combina cardio inteligente, musculação estratégica e rotina sustentável para reduzir gordura corporal.',
    frequency: '4 a 5 vezes por semana',
    objective: 'Elevar gasto calórico, preservar massa magra e melhorar condicionamento.',
    badges: ['Alta aderência', 'Treinos dinâmicos', 'Resultados sustentáveis'],
    warmup: ['5 a 7 minutos de cardio progressivo.', 'Movimentos articulares de corpo inteiro.', 'Ativação leve de pernas e core.'],
    recovery: ['Caminhada leve no fim do treino.', 'Alongamentos de quadril e posterior.', 'Hidratação consistente ao longo do dia.'],
    faq: [
      { question: 'Cardio todo dia e obrigatório?', answer: 'Não. O mais importante e um plano que você consiga manter com regularidade.' },
      { question: 'Posso fazer musculação e cardio juntos?', answer: 'Sim. Essa combinação costuma funcionar muito bem para emagrecimento.' },
    ],
    workouts: [
      { day: 'Circuito', exercise: 'Agachamento livre', sets: '3 x 15', rest: '45 s', notes: 'Movimento contínuo e controle de respiração.', video: agachamentoLivreVideo, equipment: 'Barra', primaryMuscle: 'Quadríceps', secondaryMuscle: 'Glúteos e core', difficulty: 3.2, description: ['Posicione a barra com estabilidade.', 'Desca em ritmo constante.', 'Suba sem perder alinhamento.'] },
      { day: 'Circuito', exercise: 'Barra fixa assistida', sets: '3 x 8', rest: '60 s', notes: 'Priorize amplitude e postura.', video: barraFixaVideo, equipment: 'Barra ou máquina assistida', primaryMuscle: 'Dorsal', secondaryMuscle: 'Bíceps', difficulty: 3.3, description: ['Inicie com escápulas ativas.', 'Suba com o peito aberto.', 'Desca controlando todo o caminho.'] },
      { day: 'Cardio técnico', exercise: 'Desenvolvimento militar', sets: '3 x 12', rest: '45 s', notes: 'Tronco firme e movimento completo.', video: desenvolvimentoMilitarVideo, equipment: 'Barra', primaryMuscle: 'Ombros', secondaryMuscle: 'Tríceps e core', difficulty: 3.0, description: ['Leve a barra da linha dos ombros para cima.', 'Evite arquear demais a lombar.', 'Controle a descida.'] },
    ],
  },
  {
    slug: 'performance',
    label: 'Performance e condicionamento',
    title: 'O plano para elevar resistência, potencia e mobilidade',
    heroImage: perfCondImage,
    description:
      'Uma rotina voltada para melhorar desempenho em treinos intensos e ampliar a capacidade física geral.',
    frequency: '4 a 5 vezes por semana',
    objective: 'Desenvolver resistência aeróbica, potencia e mobilidade.',
    badges: ['Treinos intensos', 'Condicionamento global', 'Boa mobilidade'],
    warmup: ['Ativação dinamica de corpo inteiro.', 'Cardio curto com progressão de ritmo.', 'Mobilidade de quadril e tórax.'],
    recovery: ['Respiração nasal e volta a calma.', 'Alongamentos de cadeia anterior e posterior.', 'Sono e hidratacao em dia.'],
    faq: [
      { question: 'Esse plano serve só para avançados?', answer: 'Não. Ele pode ser adaptado, mas faz mais sentido para quem já tem uma base mínima.' },
      { question: 'Preciso abandonar musculação?', answer: 'Não. A musculação continua sendo um apoio importante para performance.' },
    ],
    workouts: [
      { day: 'Potência', exercise: 'Leg press explosivo', sets: '4 x 8', rest: '75 s', notes: 'Subida forte e descida controlada.', video: legPressVideo, equipment: 'Máquina', primaryMuscle: 'Quadríceps', secondaryMuscle: 'Glúteos', difficulty: 3.0, description: ['Empurre com intenção explosiva.', 'Controle completamente o retorno.', 'Mantenha joelhos alinhados.'] },
      { day: 'Potência', exercise: 'Puxada frontal', sets: '4 x 10', rest: '60 s', notes: 'Controle escapular em toda a repetição.', video: puxadaFrontalVideo, equipment: 'Polia', primaryMuscle: 'Dorsal', secondaryMuscle: 'Bíceps', difficulty: 2.9, description: ['Ative escápulas antes de puxar.', 'Desca a barra até o peito.', 'Suba sem perder tensão.'] },
      { day: 'Suporte', exercise: 'Elevação lateral', sets: '3 x 15', rest: '45 s', notes: 'Evite impulso excessivo.', video: elevacaoLateralVideo, equipment: 'Halteres', primaryMuscle: 'Deltoide lateral', secondaryMuscle: 'Trapézio superior', difficulty: 2.6, description: ['Eleve os halteres até a linha dos ombros.', 'Mantenha cotovelos levemente flexionados.', 'Não use balanço para subir.'] },
    ],
  },
  {
    slug: 'bem-estar',
    label: 'Bem-estar e saúde',
    title: 'O plano equilibrado para cuidar do corpo e da mente',
    heroImage: bemSaudeImage,
    description:
      'Um programa com foco em regularidade, vitalidade, postura e qualidade de vida, sem exageros desnecessarios.',
    frequency: '3 a 4 vezes por semana',
    objective: 'Melhorar disposição, postura, mobilidade e saúde geral.',
    badges: ['Leve e consistente', 'Todas as idades', 'Corpo e mente'],
    warmup: ['Movimentos articulares leves por 5 minutos.', 'Caminhada ou bike com ritmo confortável.', 'Respiração e foco antes de começar.'],
    recovery: ['Alongamentos tranquilos no fim do treino.', 'Pausa breve para respiração e relaxamento.', 'Manter boa rotina de sono e alimentação.'],
    faq: [
      { question: 'Precisa ser um treino pésado para funcionar?', answer: 'Não. O foco aqui é regularidade e sensação de bem-estar sustentável.' },
      { question: 'Serve para quem está voltando a treinar?', answer: 'Sim. Essa proposta funciona muito bem para retomar uma rotina.' },
    ],
    workouts: [
      { day: 'Full body', exercise: 'Supino reto', sets: '3 x 12', rest: '60 s', notes: 'Carga confortável e boa execução.', video: supinoVideo, equipment: 'Barra', primaryMuscle: 'Peito', secondaryMuscle: 'Tríceps', difficulty: 2.7, description: ['Mantenha os pés fixos no chão.', 'Desca controlando a barra.', 'Suba sem perder alinhamento.'] },
      { day: 'Full body', exercise: 'Tríceps pulley', sets: '3 x 15', rest: '45 s', notes: 'Cotovelos estáveis e movimento limpo.', video: tricepsPulleyVideo, equipment: 'Polia', primaryMuscle: 'Tríceps', secondaryMuscle: 'Antebraço', difficulty: 2.2, description: ['Cotovelos próximos ao corpo.', 'Empurre o cabo para baixo.', 'Retorne sem perder tensão.'] },
      { day: 'Full body', exercise: 'Remada curvada', sets: '3 x 12', rest: '60 s', notes: 'Controle da lombar e postura.', video: remadaCurvadaVideo, equipment: 'Barra', primaryMuscle: 'Costas', secondaryMuscle: 'Bíceps e lombar', difficulty: 3.1, description: ['Mantenha quadril dobrado e coluna neutra.', 'Puxe a barra em direção ao corpo.', 'Desca sem desmontar a postura.'] },
    ],
  },
];
