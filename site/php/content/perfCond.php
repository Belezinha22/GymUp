<?php

?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GymUp | Performance e condicionamento</title>
    <link rel="shortcut icon" href="../../img/logo/Logo-removebg-preview.png" type="image/x-icon">
    <link rel="stylesheet" href="../../css/content/hipertrofia.css">
    <meta name="description"
        content="Guia simples e direto para começar na academia com segurança: aquecimento, treino, exercícios base, nutrição e dúvidas." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/izitoast/dist/css/iziToast.min.css">
    <script src="https://cdn.jsdelivr.net/npm/izitoast/dist/js/iziToast.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/animations/shift-away.css" />
    <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">

</head>

<body>

    <div>
        <main class="container">
            <!-- HERO -->
            <a href="../meta_criar.php">
                <button class="changePlan btn">
                    Mudar plano
                </button>
            </a>
            <section class="hero" id="topo">
                <div>
                    <h1>O plano certo para elevar seu desempenho</h1>
                    <p>Desenvolva força, resistência e agilidade com treinos voltados à performance. Ideal para quem busca melhorar o condicionamento físico e ultrapassar limites.
                    </p>
                    <div class="badges">
                        <span class="badge">Foco em potência e resistência</span>
                        <span class="badge">4–5 dias/semana • 45–75min</span>
                        <span class="badge">Para atletas e praticantes avançados</span>
                    </div>
                </div>
            </section>
            <!-- POR ONDE COMEÇAR -->
            <section id="comecar">
                <h2>Descrição</h2>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Objetivo:</h3>
                        <ul class="list">
                            <li> - Melhorar força, potência, resistência e agilidade.</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>Frequência:</h3>
                        <ul class="list">
                            <li>- 3 a 5 vezes por semana</li>
                        </ul>
                    </div>
                </div>
            </section>
            <!-- PLANO DE TREINO -->
            <section id="treino">
                <h2>Plano de treino fixo</h2>
                <p class="lead" style="border-bottom: 2px solid var(--cta-clr); width: 317px;">
                    Lembre-se de usar cargas leves no início.
                </p>

                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="margin: 0;">Exercícios</h3>
                        <button class="edit" title="Editar ordem dos exercícios">
                            <i id="icon" class="fa-solid fa-pen"></i>
                        </button>
                    </div>

                    <table aria-label="Plano de treino fixo">
                        <thead>
                            <tr>
                                <th>Exercício</th>
                                <th>Séries</th>
                                <th>Descanso</th>
                                <th>Observações</th>
                                <th>PR</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <!-- AQUECIMENTO & ALONGAMENTO -->
            <section>
                <h2>Aquecimento &amp; pós-treino</h2>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Aquecimento</h3>
                        <ul class="list">
                            <li> Cardio leve de 5 minutos</li>
                            <li> Mobilidade dinâmica das principais articulações</li>
                            <li> Ativação muscular específica para os movimentos do treino</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>Depois do treino</h3>
                        <ul class="list">
                            <li> Alongamento ativo para reduzir tensão muscular</li>
                            <li> Respiração profunda e relaxamento</li>
                            <li> Hidratação e, se necessário, suplementação para recuperação rápida</li>
                        </ul>
                    </div>
                </div>
            </section>
            <!-- NUTRIÇÃO BÁSICA -->
            <section id="nutricao">
                <h2>Nutrição básica</h2>
                <div class="grid grid-3">
                    <div class="card">
                        <ul class="list">
                            <li> Balanceada, garantindo energia suficiente para treinos intensos.</li>
                            <li> Carboidratos de absorção média/alta antes e depois do treino.</li>
                            <li> Proteínas suficientes para recuperação e adaptação muscular.</li>
                        </ul>
                        <p class="note">Inclua proteína em todas as refeições.</p>
                    </div>
                    <div class="card">
                        <h3>Antes &amp; depois do treino</h3>
                        <ul class="list">
                            <li> <b>Antes</b>: 60–120 min — carbo + proteína (ex.: pão + ovos).</li>
                            <li> Hidrate-se ao longo do dia.</li>
                            <li> <b>Depois</b>: refeição completa em até 2h.</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3>Erros comuns</h3>
                        <ul class="list">
                            <li> Pular refeições por longos períodos.</li>
                            <li> Suplementar sem necessidade.</li>
                            <li> Beber pouca água.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <!-- FAQ -->
            <section id="faq">
                <h2>Dúvidas frequentes</h2>
                <details>
                    <summary>Quantas vezes devo treinar por semana para hipertrofia?</summary>
                    <p class="muted muted-faq">
                        Normalmente 4–6 vezes por semana, dependendo do nível de experiência e recuperação.
                    </p>
                </details>
                <details>
                    <summary>Quantas séries e repetições são ideais?</summary>
                    <p class="muted muted-faq">
                        Para hipertrofia, costuma-se usar 3–5 séries de 6–12 repetições por exercício.
                    </p>
                </details>
                <details>
                    <summary>Devo treinar até a falha?</summary>
                    <p class="muted muted-faq">
                        Chegar próximo da falha muscular é útil, mas não é preciso ir até a falha em todos os
                        exercícios.
                    </p>
                </details>
                <details>
                    <summary>Cardio atrapalha a hipertrofia?</summary>
                    <p class="muted muted-faq">
                        Não necessariamente. Cardio moderado pode ajudar na saúde cardiovascular e recuperação, desde
                        que
                        não comprometa a energia para treinar..
                    </p>
                </details>
            </section>
        </main>
        <div class="popUp" id="popUp">
            <div class="popUp-content">
                <h2 class="popUpTitle">Por que ABC?</h2>
                <ul class="popUpDesc">
                    <h2>Organiza os grupos musculares</h2>
                    <li>Divide o corpo em 3 partes principais.</li>
                    <li>Isso garante que cada músculo tenha seu dia de foco.</li>
                </ul>
                <ul class="popUpDesc">
                    <h2>Dá tempo de recuperação</h2>
                    <li>O músculo cresce no descanso, não só no treino.</li>
                    <li>Com ABC, você treina um grupo enquanto outro descansa (geralmente 48h ou mais).</li>
                </ul>
                <ul class="popUpDesc">
                    <h2>Equilibra intensidade e frequência</h2>
                    <li>É possível treinar 3 a 6 vezes por semana, adaptando ao tempo disponível.</li>
                    <li>Permite trabalhar cada grupo com boa intensidade sem sobrecarregar.</li>
                </ul>
                <ul class="popUpDesc">
                    <h2>Versátil para iniciantes e intermediários</h2>
                    <li>Para iniciantes: ajuda a criar disciplina e organização.</li>
                    <li>Para intermediários: dá intensidade suficiente para estimular hipertrofia.</li>
                </ul>
                <i class="fa-solid fa-close" id="fechar"></i>
            </div>
        </div>
        <div class="" id="editPopUp">
        </div>
        <!-- Modal -->
        <div id="modalExercicio" class="modal">
            <div class="modal-content">
                <div class="leftPart">
                    <span class="close">&times;</span>
                    <h3 id="modalTitulo"></h3>
                    <div id="modalMedia" style="margin-top:15px;">
                        <!-- A imagem ou video será carregada dinamicamente pelo JavaScript -->
                        <video src="" autoplay loop muted controls>
                        </video>
                    </div>
                    <ul id="modalDescricao" class="modalDescricao"></ul>
                </div>
                <div class="rightPart">
                    <div class="showStars">
                        <h3>
                            Dificuldade
                        </h3>
                    </div>
                    <ul id="exercicioInfo"></ul>
                    <div class="notes">
                        <h3>Minhas Anotações</h3>
                        <div id="editor"></div>
                        <button id="saveNotes" class="saveNotes">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </div>
                    <div class="input-pr" style="display: flex; flex-direction: column;">
                        <label for="prInput" style="margin-top: 20px;">Seu PR (kg):</label>
                        <input type="number" id="prInput" min="0" placeholder="Ex: 80"
                            style="margin-top: 10px; padding: 10px; width: 130px;">
                        <button id="savePr" style="margin-top: 10px; padding: 10px;">Salvar PR</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal de edição -->
        <div id="modalEdicao" class="modal">
            <div class="modal-content">
                <span class="close" id="closeEdicao">&times;</span>
                <h2>Editar Exercício</h2>
                <form id="formEdicao">
                    <label>Nome do exercício:</label>
                    <input type="text" id="editNome" class="input-edicao">
                    <label>Séries e repetições:</label>
                    <input type="text" id="editSeries" class="input-edicao">
                    <label>Tempo de descanso:</label>
                    <input type="text" id="editDescanso" class="input-edicao">
                    <label>Substituir vídeo:</label>
                    <input type="file" id="editVideo" accept="video/*" class="input-edicao">
                    <div class="btns-edicao">
                        <button type="button" id="resetEdicao" class="btn">Resetar</button>
                        <button type="button" id="salvarEdicao" class="btn">Salvar no Exercício</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="transition"></div>

    <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
    <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
    <script src="../../js/content/perfCond.js"></script>
</body>

</html>