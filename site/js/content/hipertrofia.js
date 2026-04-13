let quill;
let anotacoes = {}; // chave = nome do exercício, valor = anotação
let sortable = null;
let dragEnabled = false;

// ======== PR VALIDATION + UPDATE ========

document.getElementById('savePr').addEventListener('click', () => {
    if (!exercicioSelecionado) {
        iziToast.warning({
            title: "Nenhum exercício selecionado",
            message: "Selecione um exercício antes de salvar o PR.",
            position: "topCenter"
        });
        return;
    }

    const input = document.getElementById('prInput');
    const valor = parseFloat(input.value);

    // validação
    if (isNaN(valor) || valor <= 0) {
        iziToast.error({
            title: "Valor inválido",
            message: "Digite um número válido maior que zero.",
            position: "topCenter"
        });
        return;
    }

    // ----- SALVAR NO BANCO -----
fetch("../../php/salvar_pr.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `exercicio=${encodeURIComponent(exercicioSelecionado.nome)}&carga=${valor}&anotacao=${encodeURIComponent(quill.getText().trim())}`
})
.then(r => r.text())
.then(res => {
    if(res.trim() === "ok"){
        iziToast.success({
            title: "PR salvo!",
            message: `Novo PR: ${valor} kg`,
            position: "topCenter",
            timeout: 2000
        });
    } else {
        iziToast.error({
            title: "Erro",
            message: "Não foi possível salvar o PR",
            position: "topCenter"
        });
    }
});


    // atualiza tabela
    preencherTabelaExercicios(exercicioSelecionado.grupo);
});
 
document.addEventListener('DOMContentLoaded', () => {
    quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Escreva sua anotação (máx 200 caracteres)...',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }]
            ]
        }
    });
 
    // limite de caracteres
    quill.on('text-change', () => {
        const text = quill.getText().trim();
        if (text.length > 200) {
            quill.deleteText(200, text.length);
            iziToast.info({
                title: "Limite atingido",
                message: "Máximo de 200 caracteres!",
                position: "topCenter",
                timeout: 2000
            });
        }
    });
 
    configurarFiltro();
    configurarEventosModal();
    atualizarGrupo();
});
 
document.getElementById('saveNotes').addEventListener('click', () => {
    if(!exercicioSelecionado){
        iziToast.warning({
            title:"Nenhum exercício",
            message:"Abra um exercício antes.",
            position:"topCenter"
        });
        return;
    }

    const anotacao = quill.getText().trim(); // pega o texto do editor

    fetch("../../php/salvar_pr.php", {
        method: "POST",
        headers: {"Content-Type":"application/x-www-form-urlencoded"},
        body: `exercicio=${encodeURIComponent(exercicioSelecionado.nome)}&carga=0&anotacao=${encodeURIComponent(anotacao)}`
    })
    .then(r=>r.text())
    .then(res=>{
        if(res.trim()==="ok"){
            iziToast.success({
                title:"Anotação salva!",
                message:"Anotação registrada no banco.",
                position:"topCenter"
            });
        } else {
            iziToast.error({
                title:"Erro",
                message:"Não salvou anotação.",
                position:"topCenter"
            });
        }
    });
});

 
function gerarEstrelas(valor) {
    if (valor < 0) valor = 0
    if (valor > 5) valor = 5
 
    const estrelasCheias = Math.floor(valor)
    const temMeiaEstrela = valor % 1 >= 0.5
    const estrelasVazias = 5 - estrelasCheias - (temMeiaEstrela ? 1 : 0)
 
    let html = ''
 
    //estrelas cheias
    for (let i = 0; i < estrelasCheias; i++) {
        html += `<span class="estrela cheia"> ★ </span>`
    }
 
    //meia estrela
    if (temMeiaEstrela) {
        html += `<span class="estrela meia"> ★ </span>`
    }
 
    //estrelas vazias
    for (let i = 0; i < estrelasVazias; i++) {
        html += `<span class="estrela"> ★ </span>`
    }
 
    return html
}
 
// Dados dos exercícios com caminhos para imagens locais + grupo muscular
const exerciciosData = [
    // ================= A =================
    {
        grupo: "A",
        nome: "Supino reto com barra",
        dia: "Seg",
        series: "4 × 8–10",
        descanso: "60–90s",
        observacoes: "Mantenha pés firmes e ombros para baixo",
        imagem: "../../videos/supino.mp4",
        descricao: [
            "Deite-se no banco com os pés no chão.",
            "Retire a barra do suporte e desça até a linha do peito.",
            "Empurre a barra para cima até estender os cotovelos."
        ],
        equipamento: "Barra",
        agpMuscularPrincipal: "Peito",
        agpMuscularSecundario: "Triceps e ombros",
        dificuldade: 2.6,
        obs: "",
        pr: 0
    },
    {
        grupo: "A",
        nome: "Supino inclinado com halteres",
        dia: "Seg",
        series: "4 × 8–10",
        descanso: "60–90s",
        observacoes: "Ângulo de 30–45°, desça devagar",
        imagem: "../../videos/supinoInclinadoH.mp4",
        descricao: [
            "Deite-se no banco inclinado com halteres nas mãos.",
            "Desça os halteres até próximo ao peito.",
            "Empurre para cima unindo levemente os halteres no topo."
        ],
        equipamento: "Halteres",
        agpMuscularPrincipal: "Peito",
        agpMuscularSecundario: "Triceps e ombro",
        dificuldade: 2.7,
        obs: "",
        pr: 0
    },
    {
        grupo: "A",
        nome: "Crucifixo na máquina",
        dia: "Seg",
        series: "3 × 12",
        descanso: "60–90s",
        observacoes: "Movimento controlado, abra bem o peito",
        imagem: "../../videos/crucifixo.mp4",
        descricao: [
            "Ajuste o banco e apoie as costas.",
            "Com braços semiflexionados, abra até sentir alongar o peito.",
            "Traga os braços para frente, contraindo o peitoral."
        ],
        equipamento: "Máquina",
        agpMuscularPrincipal: "Peito",
        agpMuscularSecundario: "...",
        dificuldade: 2.5,
        obs: "",
        pr: 0
    },
    {
        grupo: "A",
        nome: "Tríceps pulley",
        dia: "Seg",
        series: "4 × 10",
        descanso: "60–90s",
        observacoes: "Cotovelos fixos junto ao corpo",
        imagem: "../../videos/tricepsPulley.mp4",
        descricao: [
            "Segure a barra/cabo com pegada pronada.",
            "Empurre para baixo até estender os cotovelos.",
            "Retorne devagar até 90°."
        ],
        equipamento: "Máquina",
        agpMuscularPrincipal: "Triceps",
        agpMuscularSecundario: "...",
        dificuldade: 2.3,
        obs: "",
        pr: 0
    },
    {
        grupo: "A",
        nome: "Tríceps francês",
        dia: "Seg",
        series: "3 × 12",
        descanso: "60–90s",
        observacoes: "Cuidado com a lombar, movimento controlado",
        imagem: "../../videos/tricepsFrances.mp4",
        descricao: [
            "Deite-se em um banco segurando a barra ou halteres.",
            "Flexione os cotovelos levando o peso em direção à testa.",
            "Estenda os braços para cima novamente."
        ],
        equipamento: "Halteres",
        agpMuscularPrincipal: "Triceps",
        agpMuscularSecundario: "",
        dificuldade: 2.4,
        obs: "",
        pr: 0
    },
 
    // ================= B =================
    {
        grupo: "B",
        nome: "Barra fixa ",
        dia: "Qua",
        series: "4 × 6–10",
        descanso: "75–90s",
        observacoes: "Peito aberto, suba até o queixo ultrapassar a barra",
        imagem: "../../videos/barraFixa.mp4",
        descricao: [
            "Segure a barra com pegada pronada.",
            "Suba até o queixo passar da barra.",
            "Desça devagar sem soltar totalmente."
        ],
        equipamento: "Máquina",
        agpMuscularPrincipal: "Dorsal",
        agpMuscularSecundario: "Costas superior, Biceps, Antebraço",
        dificuldade: 3.7,
        obs: "",
        pr: 0
    },
    {
        grupo: "B",
        nome: "Remada curvada",
        dia: "Qua",
        series: "4 × 8–10",
        descanso: "75–90s",
        observacoes: "Coluna neutra, barra próxima ao corpo",
        imagem: "../../videos/remadaCurvada.mp4",
        descricao: [
            "Segure a barra com pegada pronada.",
            "Flexione o quadril mantendo as costas retas.",
            "Puxe a barra até a altura do abdômen e retorne."
        ],
        equipamento: "Barra",
        agpMuscularPrincipal: "Costas superior",
        agpMuscularSecundario: "Dorsal, Biceps, Antebraço",
        dificuldade: 2.9,
        obs: "",
        pr: 0
    },
    {
        grupo: "B",
        nome: "Puxada frontal",
        dia: "Qua",
        series: "3 × 12",
        descanso: "60–90s",
        observacoes: "Desça a barra controlando, peito aberto",
        imagem: "../../videos/puxadaFrontal.mp4",
        descricao: [
            "Segure a barra com pegada aberta.",
            "Puxe até o topo do peito.",
            "Retorne controlando a subida."
        ],
        equipamento: "Máquina",
        agpMuscularPrincipal: "Dorsal",
        agpMuscularSecundario: "Costas superior, Biceps, Antebraço",
        dificuldade: 3.0,
        obs: "",
        pr: 0
    },
    {
        grupo: "B",
        nome: "Rosca direta",
        dia: "Qua",
        series: "4 × 10",
        descanso: "60–90s",
        observacoes: "Não balance o tronco",
        imagem: "../../videos/roscaDireta.mp4",
        descricao: [
            "Segure os halteres ou barra com braços estendidos.",
            "Flexione os cotovelos contraindo os bíceps.",
            "Desça devagar até estender novamente."
        ],
        equipamento: "Barra",
        agpMuscularPrincipal: "Biceps",
        agpMuscularSecundario: "...",
        dificuldade: 2.4,
        obs: "",
        pr: 0
    },
 
    // ================= C =================
    {
        grupo: "C",
        nome: "Agachamento livre",
        dia: "Sex",
        series: "4 × 8–10",
        descanso: "75–90s",
        observacoes: "Coluna neutra, desça até 90° ou mais se confortável",
        imagem: "../../videos/agachamentoLivre.mp4",
        descricao: [
            "Segure a barra sobre os trapézios.",
            "Flexione quadris e joelhos até atingir a profundidade.",
            "Suba empurrando os calcanhares no chão."
        ],
        equipamento: "Barra",
        agpMuscularPrincipal: "Quadriceps",
        agpMuscularSecundario: "Esquiotibiais, Glúteo",
        dificuldade: 3.4,
        obs: "",
        pr: 0
    },
    {
        grupo: "C",
        nome: "Leg press",
        dia: "Sex",
        series: "4 × 12",
        descanso: "75–90s",
        observacoes: "Pés firmes, não trave os joelhos",
        imagem: "../../videos/legPress.mp4",
        descricao: [
            "Sente-se no aparelho com os pés afastados na plataforma.",
            "Empurre até quase estender os joelhos.",
            "Flexione novamente retornando devagar."
        ],
        equipamento: "Máquina",
        agpMuscularPrincipal: "Quadriceps",
        agpMuscularSecundario: "Glúteos, Esquiotibiais",
        dificuldade: 3.6,
        obs: "",
        pr: 0
    },
    {
        grupo: "C",
        nome: "Stiff",
        dia: "Sex",
        series: "4 × 10",
        descanso: "75–90s",
        observacoes: "Joelhos semiflexionados, coluna reta",
        imagem: "../../videos/stiff.mp4",
        descricao: [
            "Segure a barra com pegada pronada.",
            "Desça a barra acompanhando as pernas até sentir alongar posterior da coxa.",
            "Suba contraindo glúteos e posteriores."
        ],
        equipamento: "Barra",
        agpMuscularPrincipal: "Esquiotibiais",
        agpMuscularSecundario: "Glúteos, Costas inferior, Costas superior, Dorsal",
        dificuldade: 3.0,
        obs: "",
        pr: 0
    },
    {
        grupo: "C",
        nome: "Elevação lateral",
        dia: "Sex",
        series: "3 × 12",
        descanso: "60–90s",
        observacoes: "Não ultrapasse a linha dos ombros",
        imagem: "../../videos/elevacaoLateral.mp4",
        descricao: [
            "Segure halteres ao lado do corpo.",
            "Eleve os braços lateralmente até a altura dos ombros.",
            "Desça controlando o movimento."
        ],
        equipamento: "Halteres",
        agpMuscularPrincipal: "Ombros",
        agpMuscularSecundario: "...",
        dificuldade: 2.7,
        obs: "",
        pr: 0
    },
    {
        grupo: "C",
        nome: "Desenvolvimento militar",
        dia: "Sex",
        series: "4 × 10",
        descanso: "75–90s",
        observacoes: "Não hiperestenda a lombar",
        imagem: "../../videos/desenvolvimentoMilitar.mp4",
        descricao: [
            "Segure a barra ou halteres na altura dos ombros.",
            "Empurre acima da cabeça até estender os braços.",
            "Retorne devagar."
        ],
        equipamento: "Barra",
        agpMuscularPrincipal: "Ombro",
        agpMuscularSecundario: "Triceps, Abdomen",
        dificuldade: 3.0,
        obs: "",
        pr: 0
    }
]
 
// Variável global para armazenar o exercício selecionado
let exercicioSelecionado = null;
 
// Função para preencher a tabela com os exercícios filtrados
function preencherTabelaExercicios(filtroGrupo = "A", filtroDia = "todos") {
    const tbody = document.querySelector("#treino table tbody");
    tbody.innerHTML = ''; // Limpa
 
    exerciciosData.forEach(exercicio => {
        if ((filtroGrupo === exercicio.grupo) &&
            (filtroDia === "todos" || exercicio.dia === filtroDia)) {
 
            const tr = document.createElement('tr');
            tr.dataset.grupo = exercicio.grupo;
            tr.dataset.dia = exercicio.dia;
            tr.style.cursor = 'pointer';
 
            tr.innerHTML = `
                <td>${exercicio.dia}</td>
                <td>${exercicio.nome}</td>
                <td>${exercicio.series}</td>
                <td>${exercicio.descanso}</td>
                <td>${exercicio.observacoes}</td>
                <td>${exercicio.pr}kg</td>
            `;
 
            tr.addEventListener('click', () => {
                if (!dragEnabled) { // só abre modal se NÃO estiver em modo edição
                    abrirModal(exercicio);
                }
            });
            tbody.appendChild(tr);
        }
    });
}
 
// Modal
function abrirModal(exercicio) {
    exercicioSelecionado = exercicio;
 
    document.getElementById('modalTitulo').textContent = exercicio.nome;
 
    const video = document.querySelector('#modalMedia video');
    video.src = exercicio.imagem + "?v=" + Date.now();
    video.load();
    video.play();
 
 
    const ul = document.getElementById('modalDescricao');
    ul.innerHTML = "";
    exercicio.descricao.forEach(desc => {
        const li = document.createElement("li");
        li.textContent = desc;
        ul.appendChild(li);
    });
 
    const ulInfo = document.getElementById('exercicioInfo');
    ulInfo.innerHTML = "";
 
    const informacoes = [];
 
    if (exercicio.dificuldade !== undefined) {
        const liDificuldade = document.createElement('p')
        liDificuldade.innerHTML = `${gerarEstrelas(exercicio.dificuldade)}`
        ulInfo.appendChild(liDificuldade)
    }
 
    if (exercicio.equipamento) {
        const equipamentos = Array.isArray(exercicio.equipamento)
            ? exercicio.equipamento
            : exercicio.equipamento.split(",");
        equipamentos.forEach(e => {
            if (e.trim() !== "") {
                informacoes.push(`
                    <li style="background-color:#191616; width: auto; padding: 2px; border-radius: 5px; margin-bottom: 5px;">
                        <span style="color:#FF7043; margin-left: 5px;">
                            Equipamento
                        </span>: ${e.trim()}
                    </li>`);
            }
        });
    }
 
    if (exercicio.agpMuscularPrincipal) {
        informacoes.push(`
            <li style="background-color:#191616; width: auto; padding: 2px; border-radius: 5px; margin-bottom: 5px;">
                <span style="color:#FF7043; margin-left: 5px;">
                    Musculo principal
                </span>: ${exercicio.agpMuscularPrincipal}
            </li>`);
    }
 
    if (exercicio.agpMuscularSecundario) {
        informacoes.push(`
            <li style="background-color:#191616; width: auto; padding: 2px; border-radius: 5px; margin-bottom: 5px;">
                <span style="color:#FF7043; margin-left: 5px;">
                    Musculo secundario
                </span>: ${exercicio.agpMuscularSecundario}
            </li>`);
    }
 
    informacoes.forEach(info => {
        const li = document.createElement('li');
        li.innerHTML = info;
        ulInfo.appendChild(li);
    });
 
    // Carregar anotação existente no editor
    if (anotacoes[exercicio.nome]) {
        quill.root.innerHTML = anotacoes[exercicio.nome];
    } else {
        quill.root.innerHTML = "";
    }
 
 
    document.getElementById('modalExercicio').style.display = 'flex';
}
 
 
 
function fecharModal() {
    exercicioSelecionado = null;
    document.getElementById('modalExercicio').style.display = 'none';
    const video = document.querySelector('#modalMedia video')
    video.pause()
}
 
// Eventos do modal
function configurarEventosModal() {
    document.querySelector('.close').addEventListener('click', fecharModal);
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalExercicio')) {
            fecharModal();
        }
    });
}
 
// Controle de grupos musculares
const grupos = ["A", "B", "C"];
let indiceGrupo = 0;
let filtroDiaAtual = "todos";
 
const grupoAtualSpan = document.getElementById("grupoAtual");
const btnPrev = document.getElementById("prevGrupo");
const btnNext = document.getElementById("nextGrupo");
 
function atualizarGrupo(direcao = "next") {
    const grupo = grupos[indiceGrupo];
    grupoAtualSpan.textContent = grupo;
 
    const tbody = document.querySelector("#treino table tbody");
    if (!tbody) {
        console.error("Tabela não encontrada");
        return;
    }
 
    const linhasAtuais = tbody.querySelectorAll("tr");
 
    // 1. Animar as linhas atuais para fora
    gsap.to(linhasAtuais, {
        x: direcao === "prev" ? 50 : -100,   // reduzido para movimento mais suave
        opacity: 0,
        stagger: 0, // stagger menor para mais fluidez
        duration: 0.1, // duração ligeiramente maior
        ease: "power2.out", // easing suave
        onComplete: () => {
            // 2. Depois que sumirem, renderiza as novas linhas
            preencherTabelaExercicios(grupo, filtroDiaAtual);
 
            const novasLinhas = tbody.querySelectorAll("tr");
 
            // Coloca fora da tela antes de animar
            gsap.set(novasLinhas, {
                x: direcao === "prev" ? -100 : 100, // vem do lado oposto
                opacity: 0
            });
 
            // 3. Anima as novas linhas entrando
            gsap.to(novasLinhas, {
                x: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.1, // duração maior para entrada
                ease: "power2.out"
            });
        }
    });
}
 
 
btnPrev.addEventListener("click", () => {
    indiceGrupo = (indiceGrupo - 1 + grupos.length) % grupos.length;
    atualizarGrupo("prev");
});
 
btnNext.addEventListener("click", () => {
    indiceGrupo = (indiceGrupo + 1) % grupos.length;
    atualizarGrupo("next");
});
 
 
// Filtro de pesquisa de exercício por dia
function configurarFiltro() {
    const filtro = document.getElementById("filtroDia");
    filtro.addEventListener("change", () => {
        filtroDiaAtual = filtro.value;
        atualizarGrupo();
    });
}
 

 
// iziToast
setTimeout(() => {
    iziToast.info({
        title: "Dica:",
        message: "Clique em um exercício para mais informações!",
        position: "topCenter",
        timeout: 4000,
        close: true,
        backgroundColor: '#1e1e1e',
        titleColor: '#f87b0fff',
        progressBarColor: '#f87b0fff',
        iconColor: '#fff',
        messageColor: '#fff',
        icon: 'fas fa-info-circle'
    })
}, 1000);
 
 
const btnAbrir = document.querySelector('.btnAbrir');
const popUp = document.getElementById('popUp');
const fechar = document.getElementById('fechar');
 
btnAbrir.addEventListener('click', () => {
    popUp.style.display = 'flex';
});
 
fechar.addEventListener('click', () => {
    popUp.style.display = 'none';
});
 
// Fecha clicando fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === popUp) {
        popUp.style.display = 'none';
    }
});
 
 
 
//draggable itens:
 
const editListBtn = document.querySelector('.edit')
const editListBtnIcon = document.getElementById('icon')
 
function toggleAcoes() {
    const icons = document.querySelectorAll('#treino table tbody .menu-icon')
 
    icons.forEach(icon => {
        if (dragEnabled) {
            icon.classList.remove('hidden')
            gsap.fromTo(icon,
                {
                    opacity: 0,
                    scale: 0,
                    rotation: -90
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: "back.out(2)"
                }
            )

        } else {
            gsap.to(icon, {
                opacity: 0,
                scale: 0,
                rotation: 90,
                duration: 0.3,
                ease: "back.in(2)",
                onComplete: () => icon.classList.add('hidden')
            });
        }
    })
}
 
editListBtn.addEventListener('click', () => {
    gsap.to(editListBtnIcon, {
        duration: 0.2,
        scale: 0,
        rotation: 180,
        ease: "back.in(1.7)",
        onComplete: () => {
            // troca o ícone
            editListBtnIcon.classList.toggle('fa-pen');
            editListBtnIcon.classList.toggle('fa-check');
 
            // anima a entrada
            gsap.fromTo(editListBtnIcon,
                { scale: 0, rotation: -180 },
                { duration: 0.3, scale: 1, rotation: 0, ease: "back.out(1.7)" }
            );
 
            // habilita/desabilita draggable
            const tbody = document.querySelector("#treino table tbody");
            if (!dragEnabled) {
                sortable = new Sortable(tbody, {
                    animation: 150,
                    handle: "tr", // cada linha da tabela é arrastável
                });
                dragEnabled = true;
                toggleAcoes()
            } else {
                sortable.option("disabled", true); // bloqueia arrastar
                dragEnabled = false;
                toggleAcoes()
            }
        }
    });
});