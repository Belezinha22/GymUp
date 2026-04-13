//filtro de pesquisa de exercicio por dia
const filtro = document.getElementById("filtroDia");
const linhas = document.querySelectorAll("#treino table tbody tr");

filtro.addEventListener("change", () => {
    const valor = filtro.value;
    linhas.forEach(linha => {
        const dia = linha.querySelector("td").textContent.trim();
        if (valor === "todos" || dia === valor) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
});


// Dados dos exercícios com caminhos para imagens locais
const exerciciosData = [
    {
        nome: "Agachamento livre ou no Smith",
        dia: "Seg",
        series: "3 × 8–10",
        descanso: "60–90s",
        observacoes: "Coluna neutra; profundidade confortável",
        imagem: "../../img/general/exercises/agachamentoLivre.jpg",
        descricao: " Pise inteiro no chão, mantenha coluna neutra, desça até confortável.",
        dificuldade: 3.4
    },
    {
        nome: "Supino reto (halteres ou barra)",
        dia: "Seg",
        series: "3 × 8–10",
        descanso: "60–90s",
        observacoes: "Ombros para baixo, pés firmes",
        imagem: "../../../videos/supino.mp4",
        descricao: "Deite-se no banco, empurre o peso para cima mantendo os cotovelos alinhados.",
        dificuldade: 2.6
    },
    {
        nome: "Remada baixa na máquina",
        dia: "Seg",
        series: "3 × 10–12",
        descanso: "60–90s",
        observacoes: "Puxe com as costas, não só os braços",
        imagem: "../../img/general/exercises/remada.jpg",
        descricao: "Sente-se na máquina, puxe o peso em direção ao peito mantendo as costas retas.",
        dificuldade: 2.8
    },
    {
        nome: "Levantamento terra romeno (halteres)",
        dia: "Qua",
        series: "3 × 8–10",
        descanso: "75–90s",
        observacoes: "Dobre o quadril; coluna neutra",
        imagem: "../../img/general/exercises/terra.jpg",
        descricao: "Mantenha as costas retas, dobre o quadril para baixo e volte à posição inicial.",
        dificuldade: 4
    },
    {
        nome: "Desenvolvimento de ombros (halteres)",
        dia: "Qua",
        series: "3 × 10–12",
        descanso: "60–90s",
        observacoes: "Não hiperestenda a lombar",
        imagem: "../../img/general/exercises/desenvolvimento.jpg",
        descricao: "Sentado ou em pé, eleve os halteres acima da cabeça com controle.",
        dificuldade: 3.0
    },
    {
        nome: "Puxada na frente (pegada aberta)",
        dia: "Qua",
        series: "3 × 10–12",
        descanso: "60–90s",
        observacoes: "Peito aberto, desça controlando",
        imagem: "../../img/general/exercises/puxada.jpg",
        descricao: "Segure a barra com as mãos afastadas, puxe em direção ao peito.",
        dificuldade: 3.0
    },
    {
        nome: "Avanço / passada (halteres)",
        dia: "Sex",
        series: "2–3 × 10 por perna",
        descanso: "60–90s",
        observacoes: "Passo longo; joelho alinhado",
        imagem: "../../img/general/exercises/avanco.jpg",
        descricao: "Dê um passo à frente, desça até o joelho traseiro quase tocar o chão.",
        dificuldade: 2.8
    },
    {
        nome: "Tríceps na polia (corda)",
        dia: "Sex",
        series: "2–3 × 12–15",
        descanso: "45–60s",
        observacoes: "Cotovelos fixos ao corpo",
        imagem: "../../img/general/exercises/triceps.jpg",
        descricao: "Mantenha os cotovelos próximos ao corpo, estenda os braços para baixo.",
        dificuldade: 2.3
    },
    {
        nome: "Rosca direta (halteres)",
        dia: "Sex",
        series: "2–3 × 12–15",
        descanso: "45–60s",
        observacoes: "Sem balançar o tronco",
        imagem: "../../img/general/exercises/rosca.jpg",
        descricao: "Em pé ou sentado, flexione os cotovelos levando os halteres aos ombros.",
        dificuldade: 2.4
    },
    {
        nome: "Prancha",
        dia: "+",
        series: "2 × 20–40s",
        descanso: "45–60s",
        observacoes: "Umbigo para dentro, glúteos contraídos",
        imagem: "../../img/general/exercises/prancha.jpg",
        descricao: "Mantenha o corpo reto, apoiado nos antebraços e pontas dos pés.",
        dificuldade: 2.3
    }
];

// Variável global para armazenar o exercício selecionado
let exercicioSelecionado = null;

// Função para preencher a tabela com os exercícios
function preencherTabelaExercicios() {
    const tbody = document.querySelector("#treino table tbody");
    tbody.innerHTML = ''; // Limpa o conteúdo existente
    
    exerciciosData.forEach(exercicio => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-dia', exercicio.dia);
        tr.style.cursor = 'pointer';
        
        tr.innerHTML = `
            <td>${exercicio.dia}</td>
            <td>${exercicio.nome}</td>
            <td>${exercicio.series}</td>
            <td>${exercicio.descanso}</td>
            <td>${exercicio.observacoes}</td>
        `;
        
        // Adiciona o evento de clique para abrir o modal
        tr.addEventListener('click', () => abrirModal(exercicio));
        
        tbody.appendChild(tr);
    });
}

// Função para abrir o modal com o exercício selecionado
function abrirModal(exercicio) {
    exercicioSelecionado = exercicio;
    
    // Atualiza o conteúdo do modal
    document.getElementById('modalTitulo').textContent = exercicio.nome;
    document.getElementById('modalDescricao').textContent = exercicio.descricao;
    
    // Atualiza a imagem
    const modalMedia = document.getElementById('modalMedia');
    modalMedia.innerHTML = `<img src="${exercicio.imagem}" alt="${exercicio.nome}" style="width: 100%; max-height: 300px; border-radius: var(--radius); object-fit: cover;">`;
    
    // Exibe o modal
    document.getElementById('modalExercicio').style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
    exercicioSelecionado = null;
    document.getElementById('modalExercicio').style.display = 'none';
}

// Filtro de pesquisa de exercício por dia
function configurarFiltro() {
    const filtro = document.getElementById("filtroDia");
    const linhas = document.querySelectorAll("#treino table tbody tr");

    filtro.addEventListener("change", () => {
        const valor = filtro.value;
        linhas.forEach(linha => {
            const dia = linha.getAttribute("data-dia");
            if (valor === "todos" || dia === valor) {
                linha.style.display = "";
            } else {
                linha.style.display = "none";
            }
        });
    });
}

// Configura o evento de fechar modal ao clicar no X
function configurarEventosModal() {
    document.querySelector('.close').addEventListener('click', fecharModal);
    
    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalExercicio')) {
            fecharModal();
        }
    });
}

// Inicializa tudo quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    preencherTabelaExercicios();
    configurarFiltro();
    configurarEventosModal();
});